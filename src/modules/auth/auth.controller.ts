import {
  Controller, Post, Body, UnauthorizedException, Req, HttpException, HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginEmailDto } from './dto/create-login-email.dto';
import * as bcrypt from 'bcrypt';
import { Public } from './public.decorator';
import { LoginSecurityService } from './login-security.service';
import type { FastifyRequest } from 'fastify';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginSecurity: LoginSecurityService,
  ) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginEmailDto, @Req() request: FastifyRequest) {
    try {
      const adminUser = await this.authService.findAdminUserByEmail(body.Email);
      if (!adminUser || !adminUser.Password) {
        try { await this.loginSecurity.recordLogin({ userType: 'admin', email: body.Email, success: false, failureReason: 'invalid_credentials' }, request); } catch {}
        throw new UnauthorizedException('Invalid email or password (user not found)');
      }

      const valid = await bcrypt.compare(body.Password, adminUser.Password);
      if (!valid) {
        try { await this.loginSecurity.recordLogin({ userType: 'admin', email: body.Email, success: false, failureReason: 'invalid_credentials' }, request); } catch {}
        throw new UnauthorizedException('Invalid email or password');
      }

      const hasAdminPermissions = adminUser.IsAdmin;

      // Employees with only CASHIER_ACCESS use the normal username/password sign-in flow.
      // Requiring a separate device approval for every cashier makes routine POS access
      // impractical; device approval is reserved for administrators and users with admin panel permissions.
      if (!hasAdminPermissions) {
        const token = await this.authService.signToken({
          UserID: adminUser.UserID,
          Email: adminUser.Email,
          UserType: 'admin',
        });
        try { await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request); } catch {}
        return {
          status: 'success',
          token,
          user: {
            UserID: adminUser.UserID,
            Username: adminUser.Username,
            Email: adminUser.Email,
            Image: adminUser.Image || 'default.png',
            IsAdmin: false,
            Permissions: adminUser.Permissions ?? [],
          },
        };
      }

      // Check device verification
      const deviceIdHeader = request.headers['x-device-id'] as string;
      let device = deviceIdHeader ? await this.authService.findDevice(deviceIdHeader) : null;

      // Device identifiers belong to a single user.  Browsers that were used
      // by another account may still send an old identifier, so never attach a
      // new user's approval request to that other user's device record.
      const belongsToUser = device?.UserID === adminUser.UserID;

      if (!device || !belongsToUser || !device.IsVerified) {
        if (device && belongsToUser && device.IsBlocked) {
           throw new UnauthorizedException('This device has been blocked by the administrator.');
        }
        const tempDeviceId = !device || !belongsToUser
          ? require('crypto').randomUUID()
          : deviceIdHeader;
        const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);

        if (!device || !belongsToUser) {
          device = await this.authService.createDevice(adminUser.UserID, tempDeviceId, userAgent);
        }

        // Bootstrap the account's first trusted device
        if (adminUser.IsAdmin && !(await this.authService.hasVerifiedDevice(adminUser.UserID))) {
          await this.authService.markDeviceVerified(device.DeviceID);
          await this.authService.updateDeviceLogin(device.DeviceID);
          const token = await this.authService.signToken({ UserID: adminUser.UserID, Email: adminUser.Email, UserType: 'admin' });
          try { await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request); } catch {}
          return {
            status: 'success',
            token,
            tempDeviceId,
            user: {
              UserID: adminUser.UserID,
              Username: adminUser.Username,
              Email: adminUser.Email,
              Image: adminUser.Image || 'default.png',
              IsAdmin: adminUser.IsAdmin ?? false,
              Permissions: adminUser.Permissions ?? [],
            },
          };
        }

        const ipAddress = (request.headers['x-forwarded-for'] as string) || request.ip || 'Unknown';
        const locationHeader = request.headers['x-login-location'] as string;
        const location = locationHeader || 'Unknown';

        // Immediately create a pending verification request so the admin panel shows it
        await this.authService.createVerificationRequest(device.DeviceID, adminUser.UserID, ipAddress, location);

        try { await this.loginSecurity.sendNewDeviceAlert(adminUser, ipAddress, location, device.UserAgent ?? userAgent); } catch (e) { console.error('Telegram alert failed', e); }

        return {
          status: 'requires_verification',
          tempDeviceId,
          userId: adminUser.UserID,
        };
      }

      // Update LastLoginAt
      await this.authService.updateDeviceLogin(device.DeviceID);

      // Build a JWT using admin user's own ID & email
      const token = await this.authService.signToken({ UserID: adminUser.UserID, Email: adminUser.Email, UserType: 'admin' });
      try { await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request); } catch {}
      
      return {
        status: 'success',
        token,
        user: {
          UserID: adminUser.UserID,
          Username: adminUser.Username,
          Email: adminUser.Email,
          Image: adminUser.Image || 'default.png',
          IsAdmin: adminUser.IsAdmin ?? false,
          Permissions: adminUser.Permissions ?? [],
        },
      };
    } catch (err: any) {
      require('fs').writeFileSync('login-error.log', err?.message + '\n' + err?.stack);
      if (err?.status || err?.statusCode) throw err; // rethrow HTTP exceptions
      console.error('[LOGIN ERROR]', err?.message, err?.stack);
      throw new HttpException('Login failed due to a server error. Please try again.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-pin-and-phone')
  @Public()
  async verifyPinAndPhone(@Body() body: { tempDeviceId: string, userId: number, pin: string, phone: string }, @Req() request: FastifyRequest) {
    const user = await this.authService.getAdminUser(body.userId);
    if (!user) throw new UnauthorizedException('User not found');
    
    // Check PIN and Phone
    if (user.PinCode !== body.pin || user.Phone !== body.phone) {
        throw new UnauthorizedException('Invalid PIN or Phone Number');
    }

    let device = await this.authService.findDevice(body.tempDeviceId);
    if (device && device.UserID !== user.UserID) {
       // Do not allow a request to be linked to another account's device.
       device = null;
    }
    if (!device) {
       const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);
       const deviceIdentifier = await this.authService.findDevice(body.tempDeviceId)
         ? require('crypto').randomUUID()
         : body.tempDeviceId;
       device = await this.authService.createDevice(user.UserID, deviceIdentifier, userAgent);
    } else if (device.IsBlocked) {
       throw new UnauthorizedException('This device has been blocked.');
    }

    const ipAddress = request.headers['x-forwarded-for'] as string || request.ip || 'Unknown';
    const locationHeader = request.headers['x-login-location'] as string;
    const location = locationHeader || 'Unknown';

    const verificationRequest = await this.authService.createVerificationRequest(device.DeviceID, user.UserID, ipAddress, location);

    // Bootstrap the account's first trusted device.  Without this exception an
    // administrator with no active session has nobody who can approve it.
    // Every later device still requires approval from an existing admin device.
    if (user.IsAdmin && !await this.authService.hasVerifiedDevice(user.UserID)) {
      await this.authService.markDeviceVerified(device.DeviceID);
      await this.authService.approveVerificationRequest(verificationRequest.RequestID);
      return { status: 'APPROVED' };
    }
    
    // Try to send telegram alert for new device request
    try { await this.loginSecurity.sendNewDeviceAlert(user, ipAddress, location, device.UserAgent ?? ''); } catch (e) { console.error('Telegram alert failed', e); }

    return { status: 'pending_admin' };
  }

  @Post('check-approval')
  @Public()
  async checkApproval(@Body() body: { tempDeviceId: string }) {
     const result = await this.authService.checkDeviceApproval(body.tempDeviceId);
     if (result.status === 'APPROVED') {
        if (!result.userId) return { status: 'rejected' };
        const user = await this.authService.getAdminUser(result.userId);
        if (!user) return { status: 'rejected' };
        const token = await this.authService.signToken({ UserID: user.UserID, Email: user.Email, UserType: 'admin' });
        return {
          status: 'APPROVED',
          token,
          user: {
            UserID: user.UserID,
            Username: user.Username,
            Email: user.Email,
            Image: user.Image || 'default.png',
            IsAdmin: user.IsAdmin ?? false,
            Permissions: user.Permissions ?? [],
          },
        };
     }
     return result;
  }
}
