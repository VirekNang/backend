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
exports.OpeningCashService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OpeningCashService = class OpeningCashService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.openingCash.findMany({
            orderBy: { OpeningCashID: 'desc' },
            include: {
                Employee: true,
                CashSession: true,
            },
        });
    }
    async GetById(id) {
        const record = await this.prisma.openingCash.findUnique({
            where: { OpeningCashID: id },
            include: { Employee: true, CashSession: true },
        });
        if (!record)
            throw new common_1.NotFoundException('Opening cash record not found');
        return record;
    }
    async GetActiveByEmployee(employeeId) {
        return this.prisma.openingCash.findFirst({
            where: {
                EmployeeID: employeeId,
                CashSession: { none: {} },
            },
            orderBy: { OpeningCashDate: 'desc' },
            include: { Employee: true, CashSession: true },
        });
    }
    async Create(data) {
        return this.prisma.openingCash.create({
            data: {
                EmployeeID: data.EmployeeID || null,
                OpeningCashDate: data.OpeningCashDate ? new Date(data.OpeningCashDate) : new Date(),
                OpeningCashBy: data.OpeningCashBy,
                Note: data.Note || '',
            },
            include: { Employee: true },
        });
    }
    async Update(id, data) {
        const record = await this.prisma.openingCash.findUnique({ where: { OpeningCashID: id } });
        if (!record)
            throw new common_1.NotFoundException('Opening cash record not found');
        return this.prisma.openingCash.update({
            where: { OpeningCashID: id },
            data: {
                EmployeeID: data.EmployeeID,
                OpeningCashBy: data.OpeningCashBy,
                Note: data.Note,
            },
            include: { Employee: true },
        });
    }
    async Delete(id) {
        const record = await this.prisma.openingCash.findUnique({ where: { OpeningCashID: id } });
        if (!record)
            throw new common_1.NotFoundException('Opening cash record not found');
        return this.prisma.openingCash.delete({ where: { OpeningCashID: id } });
    }
};
exports.OpeningCashService = OpeningCashService;
exports.OpeningCashService = OpeningCashService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpeningCashService);
//# sourceMappingURL=opening-cash.service.js.map