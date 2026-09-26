import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PromotionService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.promotion.findMany({
            orderBy: { PromotionID: 'desc' },
        });
    }

    async GetById(id: number) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo) throw new NotFoundException('Promotion not found');
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

    async GetByPromoCode(promoCode: string) {
        const now = new Date();
        const promo = await this.prisma.promotion.findFirst({
            where: {
                PromoCode: promoCode,
                IsActive: true,
                StartDate: { lte: now },
                EndDate: { gte: now },
            },
        });
        if (!promo) throw new NotFoundException('Promo code is invalid or expired');
        return promo;
    }

    async Create(data: any) {
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

    async Update(id: number, data: any) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo) throw new NotFoundException('Promotion not found');

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

    async Delete(id: number) {
        const promo = await this.prisma.promotion.findUnique({ where: { PromotionID: id } });
        if (!promo) throw new NotFoundException('Promotion not found');
        return this.prisma.promotion.delete({ where: { PromotionID: id } });
    }
}
