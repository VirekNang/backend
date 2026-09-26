import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.purchase.findMany({
            orderBy: { PurchaseID: 'desc' },
            include: {
                supplier: true,
                purchaseDetails: {
                    include: { item: true },
                },
            },
        });
    }

    async GetById(id: number) {
        const purchase = await this.prisma.purchase.findUnique({
            where: { PurchaseID: id },
            include: {
                supplier: true,
                purchaseDetails: {
                    include: { item: true },
                },
            },
        });
        if (!purchase) throw new NotFoundException('Purchase not found');
        return purchase;
    }

    async Create(data: any) {
        try {
            if (!data.purchaseDetails?.length) {
                throw new BadRequestException('Add at least one item before creating a purchase.');
            }

            const invoiceNo = data.InvoiceNo?.trim()
                ? data.InvoiceNo.trim()
                : 'PO-' + Math.floor(100000 + Math.random() * 900000).toString();

            return await this.prisma.$transaction(async (prisma) => {
                const purchase = await prisma.purchase.create({
                    data: {
                        InvoiceNo: invoiceNo,
                        PurchaseDate: data.PurchaseDate ? new Date(data.PurchaseDate) : new Date(),
                        EmployeeID: data.EmployeeID || null,
                        SupplierID: data.SupplierID || null,
                        PaymentMethodID: data.PaymentMethodID || null,
                        IsPay: data.IsPay ?? false,
                        SubTotal: data.SubTotal ?? 0,
                        TaxAmount: data.TaxAmount ?? 0,
                        TotalAmount: data.TotalAmount ?? 0,
                        Note: data.Note || null,
                        purchaseDetails: {
                            create: (data.purchaseDetails as any[]).map((d: any) => ({
                                ItemID: d.ItemID,
                                Quantity: d.Quantity,
                                UnitPrice: d.UnitPrice,
                                DiscountAmt: d.DiscountAmt ?? 0,
                                SubTotal: d.SubTotal,
                                IsPromotion: d.IsPromotion ?? false,
                                Description: d.Description || null,
                            })),
                        },
                    },
                    include: {
                        supplier: true,
                        purchaseDetails: { include: { item: true } },
                    },
                });

                // Update stock quantities
                for (const detail of data.purchaseDetails) {
                    await prisma.item.update({
                        where: { ItemID: detail.ItemID },
                        data: {
                            StockQuantity: { increment: detail.Quantity }
                        }
                    });
                }

                return purchase;
            });
        } catch (error: any) {
            console.error('CREATE PURCHASE ERROR:', error);
            throw error;
        }
    }

    async Update(id: number, data: any) {
        const purchase = await this.prisma.purchase.findUnique({ 
            where: { PurchaseID: id },
            include: { purchaseDetails: true }
        });
        if (!purchase) throw new NotFoundException('Purchase not found');

        return this.prisma.$transaction(async (prisma) => {
            if (data.purchaseDetails) {
                // Revert old stock quantities
                for (const oldDetail of purchase.purchaseDetails) {
                    await prisma.item.update({
                        where: { ItemID: oldDetail.ItemID },
                        data: { StockQuantity: { decrement: oldDetail.Quantity } }
                    });
                }

                await prisma.purchaseDetail.deleteMany({ where: { PurchaseID: id } });
            }

            const updatedPurchase = await prisma.purchase.update({
                where: { PurchaseID: id },
                data: {
                    EmployeeID: data.EmployeeID,
                    SupplierID: data.SupplierID,
                    PaymentMethodID: data.PaymentMethodID,
                    IsPay: data.IsPay,
                    SubTotal: data.SubTotal,
                    TaxAmount: data.TaxAmount,
                    TotalAmount: data.TotalAmount,
                    Note: data.Note,
                    ...(data.purchaseDetails && {
                        purchaseDetails: {
                            create: (data.purchaseDetails as any[]).map((d: any) => ({
                                ItemID: d.ItemID,
                                Quantity: d.Quantity,
                                UnitPrice: d.UnitPrice,
                                DiscountAmt: d.DiscountAmt ?? 0,
                                SubTotal: d.SubTotal,
                                IsPromotion: d.IsPromotion ?? false,
                                Description: d.Description || null,
                            })),
                        },
                    }),
                },
                include: {
                    supplier: true,
                    purchaseDetails: { include: { item: true } },
                },
            });

            if (data.purchaseDetails) {
                // Apply new stock quantities
                for (const newDetail of data.purchaseDetails) {
                    await prisma.item.update({
                        where: { ItemID: newDetail.ItemID },
                        data: { StockQuantity: { increment: newDetail.Quantity } }
                    });
                }
            }

            return updatedPurchase;
        });
    }

    async Delete(id: number) {
        const purchase = await this.prisma.purchase.findUnique({ 
            where: { PurchaseID: id },
            include: { purchaseDetails: true } 
        });
        if (!purchase) throw new NotFoundException('Purchase not found');

        return this.prisma.$transaction(async (prisma) => {
            // Revert stock quantities
            for (const detail of purchase.purchaseDetails) {
                await prisma.item.update({
                    where: { ItemID: detail.ItemID },
                    data: { StockQuantity: { decrement: detail.Quantity } }
                });
            }

            await prisma.purchaseDetail.deleteMany({ where: { PurchaseID: id } });
            return prisma.purchase.delete({ where: { PurchaseID: id } });
        });
    }
}
