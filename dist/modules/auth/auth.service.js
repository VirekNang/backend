"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    finduserByemail(emailOrUsername) {
        return this.prisma.users.findFirst({
            where: {
                OR: [
                    { Email: emailOrUsername },
                    { Username: emailOrUsername }
                ]
            },
        });
    }
    findAdminUserByEmail(emailOrUsername) {
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
    finduserByid(id) {
        return this.prisma.users.findUnique({
            where: { UserID: id },
        });
    }
    getAdminUser(id) {
        return this.prisma.users.findUnique({
            where: { UserID: id },
            include: { Permissions: true }
        });
    }
    CreateUser(data) {
        return this.prisma.users.create({ data: data });
    }
    findAccount(provider, providerAccountID) {
        return null;
    }
    updateAccount(accId, data) {
        return null;
    }
    createAccount(data) {
        return null;
    }
    CreateCustomer(data) {
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
    findCustomerByPhone(phone) {
        return this.prisma.customer.findFirst({
            where: { Phone: phone },
        });
    }
    async ensureGuestCustomer(data) {
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
            },
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
    async signToken(payload) {
        const SessionID = (0, crypto_1.randomUUID)();
        const expiresInMs = 8 * 60 * 60 * 1000;
        await this.prisma.loginSession.create({
            data: { SessionID, UserID: payload.UserID, UserType: payload.UserType ?? 'app', ExpiresAt: new Date(Date.now() + expiresInMs) },
        });
        return this.jwt.sign({ ...payload, UserType: payload.UserType ?? 'app', SessionID });
    }
    verifyToken(token) {
        return this.jwt.verifyAsync(token);
    }
    async validateSession(payload) {
        const session = await this.prisma.loginSession.findUnique({ where: { SessionID: payload.SessionID } });
        if (!session || session.RevokedAt || session.ExpiresAt <= new Date() || session.UserID !== payload.UserID || session.UserType !== payload.UserType)
            return null;
        if (payload.UserType === 'admin') {
            const user = await this.prisma.users.findUnique({ where: { UserID: payload.UserID } });
            return user && user.IsActive && !user.IsDelete ? { ...user, UserType: 'admin' } : null;
        }
        const user = await this.prisma.users.findUnique({ where: { UserID: payload.UserID } });
        return user ? { ...user, UserType: 'app' } : null;
    }
    upsertPhoneVerification(phone, otp, expiresAt) {
        return null;
    }
    findPhoneVerification(phone) {
        return null;
    }
    markPhoneVerified(phone) {
        return null;
    }
    deletePhoneVerification(phone) {
        return null;
    }
    findDevice(deviceIdentifier) {
        return this.prisma.device.findUnique({
            where: { DeviceIdentifier: deviceIdentifier },
        });
    }
    updateDeviceLogin(deviceId) {
        return this.prisma.device.update({
            where: { DeviceID: deviceId },
            data: { LastLoginAt: new Date() },
        });
    }
    async hasVerifiedDevice(userId) {
        return (await this.prisma.device.count({
            where: { UserID: userId, IsVerified: true, IsBlocked: false },
        })) > 0;
    }
    markDeviceVerified(deviceId) {
        return this.prisma.device.update({
            where: { DeviceID: deviceId },
            data: { IsVerified: true },
        });
    }
    createDevice(userId, deviceIdentifier, userAgent) {
        return this.prisma.device.create({
            data: { UserID: userId, DeviceIdentifier: deviceIdentifier, UserAgent: userAgent },
        });
    }
    async createVerificationRequest(deviceId, userId, ipAddress, location) {
        await this.prisma.deviceVerificationRequest.updateMany({
            where: { DeviceID: deviceId, Status: 'PENDING' },
            data: { Status: 'REJECTED' }
        });
        return this.prisma.deviceVerificationRequest.create({
            data: { DeviceID: deviceId, UserID: userId, IPAddress: ipAddress, Location: location, Status: 'PENDING' },
        });
    }
    approveVerificationRequest(requestId) {
        return this.prisma.deviceVerificationRequest.update({
            where: { RequestID: requestId },
            data: { Status: 'APPROVED' },
        });
    }
    async checkDeviceApproval(deviceIdentifier) {
        const device = await this.prisma.device.findUnique({
            where: { DeviceIdentifier: deviceIdentifier },
            include: { Requests: { orderBy: { CreatedAt: 'desc' }, take: 1 } }
        });
        if (!device || device.Requests.length === 0)
            return { status: 'rejected' };
        const request = device.Requests[0];
        if (request.Status === 'APPROVED' && !device.IsVerified) {
            await this.prisma.device.update({ where: { DeviceID: device.DeviceID }, data: { IsVerified: true } });
        }
        return { status: request.Status, userId: device.UserID };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map