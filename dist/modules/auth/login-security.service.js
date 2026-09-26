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
var LoginSecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSecurityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LoginSecurityService = LoginSecurityService_1 = class LoginSecurityService {
    prisma;
    logger = new common_1.Logger(LoginSecurityService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recordLogin(result, request) {
        const ipAddress = this.getIpAddress(request);
        const location = this.getBrowserLocation(request) ?? await this.getLocation(ipAddress);
        const userAgent = String(request.headers['user-agent'] ?? '').slice(0, 500);
        await this.prisma.loginActivity.create({
            data: { UserID: result.userId, UserType: result.userType, Email: result.email.toLowerCase(), Success: result.success, IPAddress: ipAddress, UserAgent: userAgent || null, Location: location, FailureReason: result.failureReason },
        });
        if (result.success)
            void this.sendTelegramAlert({ ...result, ipAddress, location, userAgent });
    }
    async summary() {
        const [total, successful, failed, recent] = await Promise.all([
            this.prisma.loginActivity.count(),
            this.prisma.loginActivity.count({ where: { Success: true } }),
            this.prisma.loginActivity.count({ where: { Success: false } }),
            this.prisma.loginActivity.findMany({ orderBy: { CreatedAt: 'desc' }, take: 50 }),
        ]);
        return { total, successful, failed, recent };
    }
    getIpAddress(request) {
        const forwarded = request.headers['x-forwarded-for'];
        const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
        return (value?.split(',')[0].trim() || request.ip || null)?.slice(0, 64) ?? null;
    }
    async getLocation(ip) {
        if (!ip || process.env.LOGIN_GEOLOCATION_ENABLED !== 'true')
            return null;
        let resolvedIp = ip;
        if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2500) });
                const ipData = await ipRes.json();
                if (ipData.ip)
                    resolvedIp = ipData.ip;
            }
            catch {
                return null;
            }
        }
        try {
            const response = await fetch(`https://ipwho.is/${encodeURIComponent(resolvedIp)}`, { signal: AbortSignal.timeout(2500) });
            const data = await response.json();
            return data.success === false ? null : [data.city, data.region, data.country].filter(Boolean).join(', ').slice(0, 250) || null;
        }
        catch {
            return null;
        }
    }
    getBrowserLocation(request) {
        const value = request.headers['x-login-location'];
        const location = Array.isArray(value) ? value[0] : value;
        if (!location || !/^-?\d{1,2}(?:\.\d+)?,-?\d{1,3}(?:\.\d+)?$/.test(location))
            return null;
        const [latitude, longitude] = location.split(',').map(Number);
        if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180)
            return null;
        return `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }
    async sendTelegramAlert(data) {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (!token || !chatId)
            return;
        const message = [
            '🔐 Successful login',
            `User: ${data.email} (${data.userType})`,
            `Time: ${new Date().toISOString()}`,
            `IP: ${data.ipAddress ?? 'unknown'}`,
            `Location: ${data.location ?? 'unavailable'}`,
            ...(data.location?.startsWith('GPS: ') ? [`Map: https://maps.google.com/?q=${data.location.slice(5).replace(', ', ',')}`] : []),
            `Device: ${data.userAgent || 'unknown'}`,
        ].join('\n');
        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }) });
        }
        catch (error) {
            this.logger.warn(`Telegram login alert could not be delivered: ${String(error)}`);
        }
    }
    async sendNewDeviceAlert(user, ipAddress, location, userAgent) {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID || '-1004338421177';
        if (!token || !chatId)
            return;
        const message = [
            '⚠️ New Device Login Attempt',
            `User: ${user.Email} (admin)`,
            `Time: ${new Date().toISOString()}`,
            `IP: ${ipAddress ?? 'unknown'}`,
            `Location: ${location ?? 'unavailable'}`,
            ...(location?.startsWith('GPS: ') ? [`Map: https://maps.google.com/?q=${location.slice(5).replace(', ', ',')}`] : []),
            `Device: ${userAgent || 'unknown'}`,
            '',
            'Please check the Admin Panel to Confirm or Cancel this request.'
        ].join('\n');
        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }) });
        }
        catch (error) {
            this.logger.warn(`Telegram new device alert could not be delivered: ${String(error)}`);
        }
    }
};
exports.LoginSecurityService = LoginSecurityService;
exports.LoginSecurityService = LoginSecurityService = LoginSecurityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoginSecurityService);
//# sourceMappingURL=login-security.service.js.map