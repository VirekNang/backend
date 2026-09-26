import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseDetailService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.purchaseDetail.findMany({
            orderBy: { purchaseDetailID: 'desc' },
            include: {
                item: true,
                purchase: true,
            },
        });
    }

    GetByPurchase(purchaseId: number) {
        return this.prisma.purchaseDetail.findMany({
            where: { PurchaseID: purchaseId },
            include: { item: true },
            orderBy: { purchaseDetailID: 'asc' },
        });
    }

    async GetById(id: number) {
        const detail = await this.prisma.purchaseDetail.findUnique({
            where: { purchaseDetailID: id },
            include: { item: true, purchase: true },
        });
        if (!detail) throw new NotFoundException('Purchase detail not found');
        return detail;
    }

    async Create(data: any) {
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

    async Update(id: number, data: any) {
        const detail = await this.prisma.purchaseDetail.findUnique({ where: { purchaseDetailID: id } });
        if (!detail) throw new NotFoundException('Purchase detail not found');

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

    async Delete(id: number) {
        const detail = await this.prisma.purchaseDetail.findUnique({ where: { purchaseDetailID: id } });
        if (!detail) throw new NotFoundException('Purchase detail not found');
        return this.prisma.purchaseDetail.delete({ where: { purchaseDetailID: id } });
    }
}
