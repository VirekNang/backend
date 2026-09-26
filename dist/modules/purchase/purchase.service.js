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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PurchaseService = class PurchaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async GetById(id) {
        const purchase = await this.prisma.purchase.findUnique({
            where: { PurchaseID: id },
            include: {
                supplier: true,
                purchaseDetails: {
                    include: { item: true },
                },
            },
        });
        if (!purchase)
            throw new common_1.NotFoundException('Purchase not found');
        return purchase;
    }
    async Create(data) {
        try {
            if (!data.purchaseDetails?.length) {
                throw new common_1.BadRequestException('Add at least one item before creating a purchase.');
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
                            create: data.purchaseDetails.map((d) => ({
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
        }
        catch (error) {
            console.error('CREATE PURCHASE ERROR:', error);
            throw error;
        }
    }
    async Update(id, data) {
        const purchase = await this.prisma.purchase.findUnique({
            where: { PurchaseID: id },
            include: { purchaseDetails: true }
        });
        if (!purchase)
            throw new common_1.NotFoundException('Purchase not found');
        return this.prisma.$transaction(async (prisma) => {
            if (data.purchaseDetails) {
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
                            create: data.purchaseDetails.map((d) => ({
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
    async Delete(id) {
        const purchase = await this.prisma.purchase.findUnique({
            where: { PurchaseID: id },
            include: { purchaseDetails: true }
        });
        if (!purchase)
            throw new common_1.NotFoundException('Purchase not found');
        return this.prisma.$transaction(async (prisma) => {
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
};
exports.PurchaseService = PurchaseService;
exports.PurchaseService = PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map