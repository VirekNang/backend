import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SaleDetailService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.saleDetail.findMany({
            include: {
                item: true,
                sale: true,
            },
        });
    }

    async GetById(id: number) {
        const detail = await this.prisma.saleDetail.findUnique({
            where: { saleDetailID: id },
            include: {
                item: true,
                sale: true,
            },
        });
        if (!detail) throw new NotFoundException('Sale detail not found');
        return detail;
    }

    Create(data: any) {
        return this.prisma.saleDetail.create({
            data: {
                SaleID: data.SaleID,
                ItemID: data.ItemID,
                Quantity: data.Quantity,
                UnitPrice: data.UnitPrice,
                DiscountAmt: data.DiscountAmt ?? 0,
                SubTotal: data.SubTotal,
                IsPromotion: data.IsPromotion ?? false,
                Description: data.Description || null,
            },
        });
    }

    async Update(id: number, data: any) {
        const detail = await this.prisma.saleDetail.findUnique({ where: { saleDetailID: id } });
        if (!detail) throw new NotFoundException('Sale detail not found');

        return this.prisma.saleDetail.update({
            where: { saleDetailID: id },
            data: {
                ItemID: data.ItemID,
                Quantity: data.Quantity,
                UnitPrice: data.UnitPrice,
                DiscountAmt: data.DiscountAmt,
                SubTotal: data.SubTotal,
                IsPromotion: data.IsPromotion,
                Description: data.Description,
            },
        });
    }

    async Delete(id: number) {
        const detail = await this.prisma.saleDetail.findUnique({ where: { saleDetailID: id } });
        if (!detail) throw new NotFoundException('Sale detail not found');

        return this.prisma.saleDetail.delete({ where: { saleDetailID: id } });
    }
}
