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
exports.SaleDetailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SaleDetailService = class SaleDetailService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.saleDetail.findMany({
            include: {
                item: true,
                sale: true,
            },
        });
    }
    async GetById(id) {
        const detail = await this.prisma.saleDetail.findUnique({
            where: { saleDetailID: id },
            include: {
                item: true,
                sale: true,
            },
        });
        if (!detail)
            throw new common_1.NotFoundException('Sale detail not found');
        return detail;
    }
    Create(data) {
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
    async Update(id, data) {
        const detail = await this.prisma.saleDetail.findUnique({ where: { saleDetailID: id } });
        if (!detail)
            throw new common_1.NotFoundException('Sale detail not found');
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
    async Delete(id) {
        const detail = await this.prisma.saleDetail.findUnique({ where: { saleDetailID: id } });
        if (!detail)
            throw new common_1.NotFoundException('Sale detail not found');
        return this.prisma.saleDetail.delete({ where: { saleDetailID: id } });
    }
};
exports.SaleDetailService = SaleDetailService;
exports.SaleDetailService = SaleDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleDetailService);
//# sourceMappingURL=sale-detail.service.js.map