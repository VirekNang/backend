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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SaleService = class SaleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    GetById(id) {
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
    async Create(data) {
        try {
            if (!data.saleDetails?.length) {
                throw new common_1.BadRequestException('Add at least one item before placing a sale.');
            }
            const invoiceNo = '#' + Math.floor(100000 + Math.random() * 900000).toString();
            let paymentMethodID = data.PaymentMethodID || null;
            if (paymentMethodID) {
                const exists = await this.prisma.paymentMethod.findUnique({
                    where: { PaymentMethodID: paymentMethodID },
                });
                if (!exists)
                    paymentMethodID = null;
            }
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
                    throw new common_1.BadRequestException('Open a cash session before completing a sale.');
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
                        create: data.saleDetails.map((d) => ({
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
        }
        catch (error) {
            console.error('CREATE SALE ERROR:', error);
            throw error;
        }
    }
    async Update(id, data) {
        const sale = await this.prisma.sale.findUnique({ where: { SaleID: id } });
        if (!sale)
            throw new common_1.NotFoundException('Sale not found');
        let paymentMethodID = data.PaymentMethodID;
        if (paymentMethodID !== undefined && paymentMethodID !== null) {
            const exists = await this.prisma.paymentMethod.findUnique({
                where: { PaymentMethodID: paymentMethodID },
            });
            if (!exists)
                paymentMethodID = null;
        }
        let openingCashID = data.OpeningCashID;
        if (data.IsPay === true && data.EmployeeID) {
            const activeOpeningCash = await this.prisma.openingCash.findFirst({
                where: { EmployeeID: data.EmployeeID, CashSession: { none: {} } },
                orderBy: { OpeningCashDate: 'desc' },
            });
            if (!activeOpeningCash) {
                throw new common_1.BadRequestException('Open a cash session before completing a sale.');
            }
            openingCashID = activeOpeningCash.OpeningCashID;
        }
        return this.prisma.$transaction(async (prisma) => {
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
                            create: data.saleDetails.map((d) => ({
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
    async Delete(id) {
        const sale = await this.prisma.sale.findUnique({ where: { SaleID: id } });
        if (!sale)
            throw new common_1.NotFoundException('Sale not found');
        return this.prisma.$transaction(async (prisma) => {
            await prisma.saleDetail.deleteMany({ where: { SaleID: id } });
            return prisma.sale.delete({ where: { SaleID: id } });
        });
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleService);
//# sourceMappingURL=sale.service.js.map