"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ItemsService = class ItemsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.item.findMany({
            include: {
                category: {
                    select: { CategoryName: true },
                },
                brand: {
                    select: { BrandName: true },
                },
            },
        });
    }
    GetByid(id) {
        return this.prisma.item.findUnique({
            where: { ItemID: id },
            include: {
                category: {
                    select: { CategoryName: true },
                },
                brand: {
                    select: { BrandName: true },
                },
            },
        });
    }
    async GetBestSellers(days = 30, limit = 5) {
        const safeDays = Number.isFinite(days) ? Math.min(Math.max(Math.floor(days), 1), 365) : 30;
        const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(Math.floor(limit), 1), 20) : 5;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - safeDays);
        const rankedItems = await this.prisma.saleDetail.groupBy({
            by: ['ItemID'],
            where: {
                sale: {
                    CreatedDate: { gte: fromDate },
                },
            },
            _sum: { Quantity: true },
            orderBy: { _sum: { Quantity: 'desc' } },
            take: safeLimit,
        });
        const itemIds = rankedItems.map((item) => item.ItemID);
        const items = await this.prisma.item.findMany({
            where: { ItemID: { in: itemIds }, IsActive: true },
            include: {
                category: { select: { CategoryName: true } },
                brand: { select: { BrandName: true } },
            },
        });
        const itemsById = new Map(items.map((item) => [item.ItemID, item]));
        return rankedItems
            .map((ranked, index) => {
            const item = itemsById.get(ranked.ItemID);
            if (!item)
                return null;
            return {
                ...item,
                IsBestSeller: true,
                BestSellerRank: index + 1,
                QuantitySold: ranked._sum.Quantity ?? 0,
            };
        })
            .filter((item) => item !== null);
    }
    async savefile(part) {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }
    async Create(request) {
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.savefile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const createdItem = await this.prisma.item.create({
            data: {
                ItemName: data.ItemName,
                UnitPrice: parseFloat(data.UnitPrice || '0'),
                SalePrice: parseFloat(data.SalePrice || '0'),
                CategoryID: parseInt(data.CategoryID, 10),
                BrandID: parseInt(data.BrandID, 10),
                Description: data.Description || '',
                Image: filename || data.Image || 'default.png',
                IsActive: data.IsActive === 'true' || data.IsActive === true,
                StockQuantity: parseInt(data.StockQuantity || '0', 10),
                Barcode: data.Barcode || null,
                UnitOfMeasure: data.UnitOfMeasure || 'PCS',
            },
        });
        return { message: 'Item created successfully', data: createdItem };
    }
    async Update(id, request) {
        const item = await this.prisma.item.findUnique({ where: { ItemID: id } });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.savefile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const updateData = {};
        if (data.ItemName !== undefined)
            updateData.ItemName = data.ItemName;
        if (data.UnitPrice !== undefined && !isNaN(parseFloat(data.UnitPrice)))
            updateData.UnitPrice = parseFloat(data.UnitPrice);
        if (data.SalePrice !== undefined && !isNaN(parseFloat(data.SalePrice)))
            updateData.SalePrice = parseFloat(data.SalePrice);
        if (data.CategoryID !== undefined && !isNaN(parseInt(data.CategoryID, 10)))
            updateData.CategoryID = parseInt(data.CategoryID, 10);
        if (data.BrandID !== undefined && !isNaN(parseInt(data.BrandID, 10)))
            updateData.BrandID = parseInt(data.BrandID, 10);
        if (data.Description !== undefined)
            updateData.Description = data.Description;
        if (data.IsActive !== undefined)
            updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;
        if (data.StockQuantity !== undefined && !isNaN(parseInt(data.StockQuantity, 10)))
            updateData.StockQuantity = parseInt(data.StockQuantity, 10);
        if (data.Barcode !== undefined)
            updateData.Barcode = data.Barcode;
        if (data.UnitOfMeasure !== undefined)
            updateData.UnitOfMeasure = data.UnitOfMeasure;
        if (filename) {
            updateData.Image = filename;
        }
        else if (data.Image !== undefined) {
            updateData.Image = data.Image;
        }
        const updatedItem = await this.prisma.item.update({
            where: { ItemID: id },
            data: updateData,
        });
        if (filename && item.Image && item.Image.trim().toLowerCase() !== 'default.png') {
            const oldFilePath = path.join(process.cwd(), 'uploads', item.Image);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        return { message: 'Item updated successfully', data: updatedItem };
    }
    async Delete(id) {
        const item = await this.prisma.item.findUnique({ where: { ItemID: id } });
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        const deletedItem = await this.prisma.item.delete({
            where: { ItemID: id },
        });
        if (item.Image && item.Image.trim().toLowerCase() !== 'default.png') {
            const filepath = path.join(process.cwd(), 'uploads', item.Image);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        return { message: 'Item deleted successfully', data: deletedItem };
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map