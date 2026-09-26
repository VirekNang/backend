"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const create_login_email_dto_1 = require("./dto/create-login-email.dto");
const bcrypt = __importStar(require("bcrypt"));
const public_decorator_1 = require("./public.decorator");
const login_security_service_1 = require("./login-security.service");
let AuthController = class AuthController {
    authService;
    loginSecurity;
    constructor(authService, loginSecurity) {
        this.authService = authService;
        this.loginSecurity = loginSecurity;
    }
    async login(body, request) {
        try {
            const adminUser = await this.authService.findAdminUserByEmail(body.Email);
            if (!adminUser || !adminUser.Password) {
                try {
                    await this.loginSecurity.recordLogin({ userType: 'admin', email: body.Email, success: false, failureReason: 'invalid_credentials' }, request);
                }
                catch { }
                throw new common_1.UnauthorizedException('Invalid email or password (user not found)');
            }
            const valid = await bcrypt.compare(body.Password, adminUser.Password);
            if (!valid) {
                try {
                    await this.loginSecurity.recordLogin({ userType: 'admin', email: body.Email, success: false, failureReason: 'invalid_credentials' }, request);
                }
                catch { }
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const hasAdminPermissions = adminUser.IsAdmin;
            if (!hasAdminPermissions) {
                const token = await this.authService.signToken({
                    UserID: adminUser.UserID,
                    Email: adminUser.Email,
                    UserType: 'admin',
                });
                try {
                    await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request);
                }
                catch { }
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
            const deviceIdHeader = request.headers['x-device-id'];
            let device = deviceIdHeader ? await this.authService.findDevice(deviceIdHeader) : null;
            const belongsToUser = device?.UserID === adminUser.UserID;
            if (!device || !belongsToUser || !device.IsVerified) {
                if (device && belongsToUser && device.IsBlocked) {
                    throw new common_1.UnauthorizedException('This device has been blocked by the administrator.');
                }
                const tempDeviceId = !device || !belongsToUser
                    ? require('crypto').randomUUID()
                    : deviceIdHeader;
                const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);
                if (!device || !belongsToUser) {
                    device = await this.authService.createDevice(adminUser.UserID, tempDeviceId, userAgent);
                }
                if (adminUser.IsAdmin && !(await this.authService.hasVerifiedDevice(adminUser.UserID))) {
                    await this.authService.markDeviceVerified(device.DeviceID);
                    await this.authService.updateDeviceLogin(device.DeviceID);
                    const token = await this.authService.signToken({ UserID: adminUser.UserID, Email: adminUser.Email, UserType: 'admin' });
                    try {
                        await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request);
                    }
                    catch { }
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
                const ipAddress = request.headers['x-forwarded-for'] || request.ip || 'Unknown';
                const locationHeader = request.headers['x-login-location'];
                const location = locationHeader || 'Unknown';
                await this.authService.createVerificationRequest(device.DeviceID, adminUser.UserID, ipAddress, location);
                try {
                    await this.loginSecurity.sendNewDeviceAlert(adminUser, ipAddress, location, device.UserAgent ?? userAgent);
                }
                catch (e) {
                    console.error('Telegram alert failed', e);
                }
                return {
                    status: 'requires_verification',
                    tempDeviceId,
                    userId: adminUser.UserID,
                };
            }
            await this.authService.updateDeviceLogin(device.DeviceID);
            const token = await this.authService.signToken({ UserID: adminUser.UserID, Email: adminUser.Email, UserType: 'admin' });
            try {
                await this.loginSecurity.recordLogin({ userId: adminUser.UserID, userType: 'admin', email: adminUser.Email, success: true }, request);
            }
            catch { }
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
        }
        catch (err) {
            require('fs').writeFileSync('login-error.log', err?.message + '\n' + err?.stack);
            if (err?.status || err?.statusCode)
                throw err;
            console.error('[LOGIN ERROR]', err?.message, err?.stack);
            throw new common_1.HttpException('Login failed due to a server error. Please try again.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyPinAndPhone(body, request) {
        const user = await this.authService.getAdminUser(body.userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (user.PinCode !== body.pin || user.Phone !== body.phone) {
            throw new common_1.UnauthorizedException('Invalid PIN or Phone Number');
        }
        let device = await this.authService.findDevice(body.tempDeviceId);
        if (device && device.UserID !== user.UserID) {
            device = null;
        }
        if (!device) {
            const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);
            const deviceIdentifier = await this.authService.findDevice(body.tempDeviceId)
                ? require('crypto').randomUUID()
                : body.tempDeviceId;
            device = await this.authService.createDevice(user.UserID, deviceIdentifier, userAgent);
        }
        else if (device.IsBlocked) {
            throw new common_1.UnauthorizedException('This device has been blocked.');
        }
        const ipAddress = request.headers['x-forwarded-for'] || request.ip || 'Unknown';
        const locationHeader = request.headers['x-login-location'];
        const location = locationHeader || 'Unknown';
        const verificationRequest = await this.authService.createVerificationRequest(device.DeviceID, user.UserID, ipAddress, location);
        if (user.IsAdmin && !await this.authService.hasVerifiedDevice(user.UserID)) {
            await this.authService.markDeviceVerified(device.DeviceID);
            await this.authService.approveVerificationRequest(verificationRequest.RequestID);
            return { status: 'APPROVED' };
        }
        try {
            await this.loginSecurity.sendNewDeviceAlert(user, ipAddress, location, device.UserAgent ?? '');
        }
        catch (e) {
            console.error('Telegram alert failed', e);
        }
        return { status: 'pending_admin' };
    }
    async checkApproval(body) {
        const result = await this.authService.checkDeviceApproval(body.tempDeviceId);
        if (result.status === 'APPROVED') {
            if (!result.userId)
                return { status: 'rejected' };
            const user = await this.authService.getAdminUser(result.userId);
            if (!user)
                return { status: 'rejected' };
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
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_login_email_dto_1.LoginEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify-pin-and-phone'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPinAndPhone", null);
__decorate([
    (0, common_1.Post)('check-approval'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkApproval", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        login_security_service_1.LoginSecurityService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map