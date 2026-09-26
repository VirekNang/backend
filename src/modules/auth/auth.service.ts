import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

export type TokenPayload = { UserID: number; Email: string; UserType: 'admin' | 'app'; SessionID: string };

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

  finduserByemail(emailOrUsername: string) {
    return this.prisma.users.findFirst({
      where: {
        OR: [
          { Email: emailOrUsername },
          { Username: emailOrUsername }
        ]
      },
    });
  }

  findAdminUserByEmail(emailOrUsername: string) {
    return this.prisma.users.findFirst({
      where: {
        OR: [
          { Email: emailOrUsername },
          { Username: emailOrUsername }
        ]
      },
      include: { Permissions: true },
    });
  }

  finduserByid(id: number) {
    return this.prisma.users.findUnique({
      where: { UserID: id },
    });
  }

  getAdminUser(id: number) {
    return this.prisma.users.findUnique({
      where: { UserID: id },
      include: { Permissions: true }
    });
  }

  CreateUser(data: {
    Username: string;
    Email: string;
    Password?: string;
    Image?: string;
  }) {
    return this.prisma.users.create({ data: data as any });
  }

  findAccount(provider: string, providerAccountID: string) {
    return null as any;
  }

  updateAccount(
    accId: number,
    data: {
      RefreshToken?: string;
      AccessToken?: string;
      ExpiresAt?: number;
      TokenType?: string;
      Scope?: string;
      IDToken?: string;
      SessionState?: string;
    },
  ) {
    return null as any;
  }

  createAccount(data: {
    UserID: number;
    AccountType: string;
    Provider: string;
    ProviderAccountID: string;
    RefreshToken?: string;
    AccessToken?: string;
    ExpiresAt?: number;
    TokenType?: string;
    Scope?: string;
    IDToken?: string;
    SessionState?: string;
  }) {
    return null as any;
  }

  CreateCustomer(data: {
    UserID: number;
    CustomerNo?: string;
    CustomerName: string;
    Gender: string;
    Location: string;
    Address: string;
    Phone: string;
    MemberShip: string;
    MemberStatus: string;
    Note: string;
  }) {
    return this.prisma.$transaction(async (prisma) => {
      const created = await prisma.customer.create({
        data: {
          ...data,
          CustomerNo: data.CustomerNo || `TMP-${Date.now()}`,
        },
      });

      const customerNo = `CUT-${String(created.CustomerID).padStart(4, '0')}`;
      if (created.CustomerNo !== customerNo) {
        return prisma.customer.update({
          where: { CustomerID: created.CustomerID },
          data: { CustomerNo: customerNo },
        });
      }

      return created;
    });
  }

  findCustomerByPhone(phone: string) {
    return this.prisma.customer.findFirst({
      where: { Phone: phone },
    });
  }

  async ensureGuestCustomer(data: { CustomerName: string; Phone: string }) {
    const phone = data.Phone.trim();
    const customerName = data.CustomerName.trim() || 'Guest Customer';

    const existing = phone ? await this.findCustomerByPhone(phone) : null;
    if (existing && customerName !== 'Guest Customer') {
      return existing;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    const uniqueId = `${phoneDigits || 'walkin'}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const syntheticEmail = `guest-${uniqueId}@guest.local`;

    const user = await this.prisma.users.create({
      data: {
        Username: customerName,
        Email: syntheticEmail,
        Image: 'default.png',
      } as any,
    });

    return this.CreateCustomer({
      UserID: user.UserID,
      CustomerNo: `GUEST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      CustomerName: customerName,
      Gender: 'Unknown',
      Location: '',
      Address: '',
      Phone: phone || 'Walk-in',
      MemberShip: 'Guest',
      MemberStatus: 'Active',
      Note: data.CustomerName.trim() || data.Phone.trim() ? 'Guest requested an invoice' : 'Default walk-in guest customer',
    });
  }

  async signToken(payload: { UserID: number; Email: string; UserType?: 'admin' | 'app' }) {
    const SessionID = randomUUID();
    const expiresInMs = 8 * 60 * 60 * 1000;
    await this.prisma.loginSession.create({
      data: { SessionID, UserID: payload.UserID, UserType: payload.UserType ?? 'app', ExpiresAt: new Date(Date.now() + expiresInMs) },
    });
    return this.jwt.sign({ ...payload, UserType: payload.UserType ?? 'app', SessionID });
  }

  verifyToken(token: string) {
    return this.jwt.verifyAsync<TokenPayload>(token);
  }

  async validateSession(payload: TokenPayload) {
    const session = await this.prisma.loginSession.findUnique({ where: { SessionID: payload.SessionID } });
    if (!session || session.RevokedAt || session.ExpiresAt <= new Date() || session.UserID !== payload.UserID || session.UserType !== payload.UserType) return null;
    if (payload.UserType === 'admin') {
      const user = await this.prisma.users.findUnique({ where: { UserID: payload.UserID } });
      return user && user.IsActive && !user.IsDelete ? { ...user, UserType: 'admin' } : null;
    }
    const user = await this.prisma.users.findUnique({ where: { UserID: payload.UserID } });
    return user ? { ...user, UserType: 'app' } : null;
  }

  upsertPhoneVerification(phone: string, otp: string, expiresAt: Date) {
    return null as any;
  }

  findPhoneVerification(phone: string) {
    return null as any;
  }

  markPhoneVerified(phone: string) {
    return null as any;
  }

  deletePhoneVerification(phone: string) {
    return null as any;
  }

  findDevice(deviceIdentifier: string) {
    return this.prisma.device.findUnique({
      where: { DeviceIdentifier: deviceIdentifier },
    });
  }

  updateDeviceLogin(deviceId: number) {
    return this.prisma.device.update({
      where: { DeviceID: deviceId },
      data: { LastLoginAt: new Date() },
    });
  }

  async hasVerifiedDevice(userId: number) {
    return (await this.prisma.device.count({
      where: { UserID: userId, IsVerified: true, IsBlocked: false },
    })) > 0;
  }

  markDeviceVerified(deviceId: number) {
    return this.prisma.device.update({
      where: { DeviceID: deviceId },
      data: { IsVerified: true },
    });
  }

  createDevice(userId: number, deviceIdentifier: string, userAgent: string) {
    return this.prisma.device.create({
      data: { UserID: userId, DeviceIdentifier: deviceIdentifier, UserAgent: userAgent },
    });
  }

  async createVerificationRequest(deviceId: number, userId: number, ipAddress: string, location: string) {
    // Invalidate any existing pending requests for this device
    await this.prisma.deviceVerificationRequest.updateMany({
       where: { DeviceID: deviceId, Status: 'PENDING' },
       data: { Status: 'REJECTED' }
    });

    return this.prisma.deviceVerificationRequest.create({
      data: { DeviceID: deviceId, UserID: userId, IPAddress: ipAddress, Location: location, Status: 'PENDING' },
    });
  }

  approveVerificationRequest(requestId: number) {
    return this.prisma.deviceVerificationRequest.update({
      where: { RequestID: requestId },
      data: { Status: 'APPROVED' },
    });
  }

  async checkDeviceApproval(deviceIdentifier: string) {
     const device = await this.prisma.device.findUnique({
       where: { DeviceIdentifier: deviceIdentifier },
       include: { Requests: { orderBy: { CreatedAt: 'desc' }, take: 1 } }
     });
     if (!device || device.Requests.length === 0) return { status: 'rejected' };
     const request = device.Requests[0];
     if (request.Status === 'APPROVED' && !device.IsVerified) {
        await this.prisma.device.update({ where: { DeviceID: device.DeviceID }, data: { IsVerified: true } });
     }
     return { status: request.Status, userId: device.UserID };
  }
}
