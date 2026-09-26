import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SaleService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.sale.findMany({
            orderBy: { SaleID: 'desc' },
            include: {
                customer: true,
                employee: true,
                opencash: true,
                paymentmethod: true,
                saleDetails: {
                    include: {
                        item: true,
                    },
                },
            },
        });
    }

    GetById(id: number) {
        return this.prisma.sale.findUnique({
            where: { SaleID: id },
            include: {
                customer: true,
                employee: true,
                opencash: true,
                paymentmethod: true,
                saleDetails: {
                    include: {
                        item: true,
                    },
                },
            },
        });
    }

    async Create(data: any) {
        try {
            if (!data.saleDetails?.length) {
                throw new BadRequestException('Add at least one item before placing a sale.');
            }

            // Generate Invoice No (# + 6 random digits)
            const invoiceNo = '#' + Math.floor(100000 + Math.random() * 900000).toString();


            let paymentMethodID = data.PaymentMethodID || null;
            if (paymentMethodID) {
                const exists = await this.prisma.paymentMethod.findUnique({
                    where: { PaymentMethodID: paymentMethodID },
                });
                if (!exists) paymentMethodID = null;
            }

            // Validate OpeningCashID if provided
            let openingCashID = data.OpeningCashID || null;
            if (data.IsPay && data.EmployeeID) {
                const activeOpeningCash = await this.prisma.openingCash.findFirst({
                    where: {
                        EmployeeID: data.EmployeeID,
                        CashSession: { none: {} },
                    },
                    orderBy: { OpeningCashDate: 'desc' },
                });
                if (!activeOpeningCash) {
                    throw new BadRequestException('Open a cash session before completing a sale.');
                }
                openingCashID = activeOpeningCash.OpeningCashID;
            }

            return await this.prisma.sale.create({
                data: {
                    InvoiceNo: invoiceNo,
                    SaleDate: data.SaleDate ? new Date(data.SaleDate) : new Date(),
                    OpeningCashID: openingCashID,
                    EmployeeID: data.EmployeeID || null,
                    CustomerID: data.CustomerID || null,
                    PaymentMethodID: paymentMethodID,
                    IsPay: data.IsPay ?? false,
                    SubTotal: data.SubTotal ?? 0,
                    TaxAmount: data.TaxAmount ?? 0,
                    TotalAmount: data.TotalAmount ?? 0,
                    Note: data.Note || null,
                    saleDetails: {
                        create: (data.saleDetails as any[]).map((d: any) => ({
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
                    customer: true,
                    employee: true,
                    opencash: true,
                    paymentmethod: true,
                    saleDetails: {
                        include: { item: true },
                    },
                },
            });
        } catch (error: any) {
            console.error('CREATE SALE ERROR:', error);
            throw error;
        }
    }

    async Update(id: number, data: any) {
        const sale = await this.prisma.sale.findUnique({ where: { SaleID: id } });
        if (!sale) throw new NotFoundException('Sale not found');

        let paymentMethodID = data.PaymentMethodID;
        if (paymentMethodID !== undefined && paymentMethodID !== null) {
            const exists = await this.prisma.paymentMethod.findUnique({
                where: { PaymentMethodID: paymentMethodID },
            });
            if (!exists) paymentMethodID = null;
        }

        let openingCashID = data.OpeningCashID;
        if (data.IsPay === true && data.EmployeeID) {
            const activeOpeningCash = await this.prisma.openingCash.findFirst({
                where: { EmployeeID: data.EmployeeID, CashSession: { none: {} } },
                orderBy: { OpeningCashDate: 'desc' },
            });
            if (!activeOpeningCash) {
                throw new BadRequestException('Open a cash session before completing a sale.');
            }
            openingCashID = activeOpeningCash.OpeningCashID;
        }

        return this.prisma.$transaction(async (prisma) => {
            // Replace sale details if provided
            if (data.saleDetails) {
                await prisma.saleDetail.deleteMany({ where: { SaleID: id } });
            }

            return prisma.sale.update({
                where: { SaleID: id },
                data: {
                    OpeningCashID: openingCashID,
                    EmployeeID: data.EmployeeID,
                    CustomerID: data.CustomerID,
                    PaymentMethodID: paymentMethodID,
                    IsPay: data.IsPay,
                    SubTotal: data.SubTotal,
                    TaxAmount: data.TaxAmount,
                    TotalAmount: data.TotalAmount,
                    Note: data.Note,
                    ...(data.saleDetails && {
                        saleDetails: {
                            create: (data.saleDetails as any[]).map((d: any) => ({
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
                    customer: true,
                    employee: true,
                    opencash: true,
                    paymentmethod: true,
                    saleDetails: { include: { item: true } },
                },
            });
        });
    }

    async Delete(id: number) {
        const sale = await this.prisma.sale.findUnique({ where: { SaleID: id } });
        if (!sale) throw new NotFoundException('Sale not found');

        return this.prisma.$transaction(async (prisma) => {
            await prisma.saleDetail.deleteMany({ where: { SaleID: id } });
            return prisma.sale.delete({ where: { SaleID: id } });
        });
    }
}
