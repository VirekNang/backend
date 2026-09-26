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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PromotionService = class PromotionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.promotion.findMany({
            orderBy: { PromotionID: 'desc' },
        });
    }
    async GetById(id) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo)
            throw new common_1.NotFoundException('Promotion not found');
        return promo;
    }
    async GetActive() {
        const now = new Date();
        return this.prisma.promotion.findMany({
            where: {
                IsActive: true,
                StartDate: { lte: now },
                EndDate: { gte: now },
            },
            orderBy: { StartDate: 'asc' },
        });
    }
    async GetByPromoCode(promoCode) {
        const now = new Date();
        const promo = await this.prisma.promotion.findFirst({
            where: {
                PromoCode: promoCode,
                IsActive: true,
                StartDate: { lte: now },
                EndDate: { gte: now },
            },
        });
        if (!promo)
            throw new common_1.NotFoundException('Promo code is invalid or expired');
        return promo;
    }
    async Create(data) {
        return this.prisma.promotion.create({
            data: {
                TargetID: data.TargetID,
                PromotionType: data.PromotionType || null,
                PromotionName: data.PromotionName || null,
                Description: data.Description || null,
                DiscountPercents: data.DiscountPercents,
                StartDate: new Date(data.StartDate),
                EndDate: new Date(data.EndDate),
                IsActive: data.IsActive ?? true,
                MinimumPurchaseAmount: data.MinimumPurchaseAmount ?? 0,
                MemberOnly: data.MemberOnly ?? false,
                PromoCode: data.PromoCode || null,
            },
        });
    }
    async Update(id, data) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo)
            throw new common_1.NotFoundException('Promotion not found');
        return this.prisma.promotion.update({
            where: { PromotionID: id },
            data: {
                TargetID: data.TargetID,
                PromotionType: data.PromotionType,
                PromotionName: data.PromotionName,
                Description: data.Description,
                DiscountPercents: data.DiscountPercents,
                StartDate: data.StartDate ? new Date(data.StartDate) : undefined,
                EndDate: data.EndDate ? new Date(data.EndDate) : undefined,
                IsActive: data.IsActive,
                MinimumPurchaseAmount: data.MinimumPurchaseAmount,
                MemberOnly: data.MemberOnly,
                PromoCode: data.PromoCode,
            },
        });
    }
    async Delete(id) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo)
            throw new common_1.NotFoundException('Promotion not found');
        return this.prisma.promotion.delete({ where: { PromotionID: id } });
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map