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
exports.PurchaseDetailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PurchaseDetailService = class PurchaseDetailService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.purchaseDetail.findMany({
            orderBy: { purchaseDetailID: 'desc' },
            include: {
                item: true,
                purchase: true,
            },
        });
    }
    GetByPurchase(purchaseId) {
        return this.prisma.purchaseDetail.findMany({
            where: { PurchaseID: purchaseId },
            include: { item: true },
            orderBy: { purchaseDetailID: 'asc' },
        });
    }
    async GetById(id) {
        const detail = await this.prisma.purchaseDetail.findUnique({
            where: { purchaseDetailID: id },
            include: { item: true, purchase: true },
        });
        if (!detail)
            throw new common_1.NotFoundException('Purchase detail not found');
        return detail;
    }
    async Create(data) {
        return this.prisma.purchaseDetail.create({
            data: {
                PurchaseID: data.PurchaseID,
                ItemID: data.ItemID,
                Quantity: data.Quantity,
                UnitPrice: data.UnitPrice,
                DiscountAmt: data.DiscountAmt ?? 0,
                SubTotal: data.SubTotal,
                IsPromotion: data.IsPromotion ?? false,
                Description: data.Description || null,
            },
            include: { item: true, purchase: true },
        });
    }
    async Update(id, data) {
        const detail = await this.prisma.purchaseDetail.findUnique({ where: { purchaseDetailID: id } });
        if (!detail)
            throw new common_1.NotFoundException('Purchase detail not found');
        return this.prisma.purchaseDetail.update({
            where: { purchaseDetailID: id },
            data: {
                ItemID: data.ItemID,
                Quantity: data.Quantity,
                UnitPrice: data.UnitPrice,
                DiscountAmt: data.DiscountAmt,
                SubTotal: data.SubTotal,
                IsPromotion: data.IsPromotion,
                Description: data.Description,
            },
            include: { item: true },
        });
    }
    async Delete(id) {
        const detail = await this.prisma.purchaseDetail.findUnique({ where: { purchaseDetailID: id } });
        if (!detail)
            throw new common_1.NotFoundException('Purchase detail not found');
        return this.prisma.purchaseDetail.delete({ where: { purchaseDetailID: id } });
    }
};
exports.PurchaseDetailService = PurchaseDetailService;
exports.PurchaseDetailService = PurchaseDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseDetailService);
//# sourceMappingURL=purchase-detail.service.js.map