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
exports.ClosingCashService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ClosingCashService = class ClosingCashService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.cashSession.findMany({
            orderBy: { CashSessionID: 'desc' },
            include: {
                OpeningCash: {
                    include: { Employee: true },
                },
            },
        });
    }
    async GetById(id) {
        const session = await this.prisma.cashSession.findUnique({
            where: { CashSessionID: id },
            include: { OpeningCash: { include: { Employee: true } } },
        });
        if (!session)
            throw new common_1.NotFoundException('Cash session not found');
        return session;
    }
    async Create(data) {
        const openingCash = await this.prisma.openingCash.findUnique({
            where: { OpeningCashID: data.OpeningCashID },
            include: { CashSession: true },
        });
        if (!openingCash)
            throw new common_1.NotFoundException('Opening cash record not found');
        return this.prisma.cashSession.create({
            data: {
                OpeningCashID: data.OpeningCashID,
                ClosedBy: data.ClosedBy || null,
                ClosingCashDate: data.ClosingCashDate ? new Date(data.ClosingCashDate) : new Date(),
                TotalOrderCount: data.TotalOrderCount ?? 0,
                TotalOrderAmount: data.TotalOrderAmount ?? 0,
                Note: data.Note || '',
            },
            include: { OpeningCash: { include: { Employee: true } } },
        });
    }
    async Update(id, data) {
        const session = await this.prisma.cashSession.findUnique({ where: { CashSessionID: id } });
        if (!session)
            throw new common_1.NotFoundException('Cash session not found');
        return this.prisma.cashSession.update({
            where: { CashSessionID: id },
            data: {
                ClosedBy: data.ClosedBy,
                ClosingCashDate: data.ClosingCashDate ? new Date(data.ClosingCashDate) : undefined,
                TotalOrderCount: data.TotalOrderCount,
                TotalOrderAmount: data.TotalOrderAmount,
                Note: data.Note,
            },
            include: { OpeningCash: { include: { Employee: true } } },
        });
    }
    async Delete(id) {
        const session = await this.prisma.cashSession.findUnique({ where: { CashSessionID: id } });
        if (!session)
            throw new common_1.NotFoundException('Cash session not found');
        return this.prisma.cashSession.delete({ where: { CashSessionID: id } });
    }
};
exports.ClosingCashService = ClosingCashService;
exports.ClosingCashService = ClosingCashService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClosingCashService);
//# sourceMappingURL=closing-cash.service.js.map