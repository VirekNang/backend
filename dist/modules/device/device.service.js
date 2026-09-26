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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DeviceService = class DeviceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPendingRequests() {
        return this.prisma.deviceVerificationRequest.findMany({
            where: { Status: 'PENDING' },
            include: {
                Device: true,
                User: { select: { Username: true, Email: true, Phone: true, Image: true } },
            },
            orderBy: { CreatedAt: 'desc' },
        });
    }
    async approveRequest(requestId) {
        const request = await this.prisma.deviceVerificationRequest.findUnique({ where: { RequestID: requestId } });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        await this.prisma.deviceVerificationRequest.update({
            where: { RequestID: requestId },
            data: { Status: 'APPROVED' },
        });
        await this.prisma.device.update({
            where: { DeviceID: request.DeviceID },
            data: { IsVerified: true },
        });
        return { success: true };
    }
    async rejectRequest(requestId) {
        const request = await this.prisma.deviceVerificationRequest.findUnique({ where: { RequestID: requestId } });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        const newRejectionCount = request.RejectionCount + 1;
        await this.prisma.deviceVerificationRequest.update({
            where: { RequestID: requestId },
            data: { Status: 'REJECTED', RejectionCount: newRejectionCount },
        });
        if (newRejectionCount >= 3) {
            await this.prisma.device.update({
                where: { DeviceID: request.DeviceID },
                data: { IsBlocked: true },
            });
        }
        return { success: true };
    }
    async getBlockedDevices() {
        return this.prisma.device.findMany({
            where: { IsBlocked: true },
            include: { User: { select: { Username: true, Email: true } } },
        });
    }
    async unblockDevice(deviceId) {
        await this.prisma.device.update({
            where: { DeviceID: deviceId },
            data: { IsBlocked: false, IsVerified: false },
        });
        return { success: true };
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeviceService);
//# sourceMappingURL=device.service.js.map