import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {}

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

    GetByid(id: number) {
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
                if (!item) return null;
                return {
                    ...item,
                    IsBestSeller: true,
                    BestSellerRank: index + 1,
                    QuantitySold: ranked._sum.Quantity ?? 0,
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
    }

    private async savefile(part: any): Promise<string> {
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }

    async Create(request: FastifyRequest) {
        let data: any = {};
        let filename: string = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                } else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.savefile(part);
                }
            }
        } else {
            data = request.body || {};
        }

        const createdItem = await this.prisma.item.create({
            data: {
                ItemName: data.ItemName,
                UnitPrice: parseFloat(data.UnitPrice || '0'),
                SalePrice: parseFloat(data.SalePrice || '0'),
                CategoryID: data.CategoryID && parseInt(data.CategoryID, 10) !== 0 ? parseInt(data.CategoryID, 10) : null,
                BrandID: data.BrandID && parseInt(data.BrandID, 10) !== 0 ? parseInt(data.BrandID, 10) : null,
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

    async Update(id: number, request: FastifyRequest) {
        const item = await this.prisma.item.findUnique({ where: { ItemID: id } });
        if (!item) throw new NotFoundException('Item not found');

        let data: any = {};
        let filename: string = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                } else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.savefile(part);
                }
            }
        } else {
            data = request.body || {};
        }

        const updateData: any = {};
        if (data.ItemName !== undefined) updateData.ItemName = data.ItemName;
        if (data.UnitPrice !== undefined && !isNaN(parseFloat(data.UnitPrice))) updateData.UnitPrice = parseFloat(data.UnitPrice);
        if (data.SalePrice !== undefined && !isNaN(parseFloat(data.SalePrice))) updateData.SalePrice = parseFloat(data.SalePrice);
        if (data.CategoryID !== undefined) {
            updateData.CategoryID = data.CategoryID && parseInt(data.CategoryID, 10) !== 0 ? parseInt(data.CategoryID, 10) : null;
        }
        if (data.BrandID !== undefined) {
            updateData.BrandID = data.BrandID && parseInt(data.BrandID, 10) !== 0 ? parseInt(data.BrandID, 10) : null;
        }
        if (data.Description !== undefined) updateData.Description = data.Description;
        if (data.IsActive !== undefined) updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;
        if (data.StockQuantity !== undefined && !isNaN(parseInt(data.StockQuantity, 10))) updateData.StockQuantity = parseInt(data.StockQuantity, 10);
        if (data.Barcode !== undefined) updateData.Barcode = data.Barcode;
        if (data.UnitOfMeasure !== undefined) updateData.UnitOfMeasure = data.UnitOfMeasure;

        if (filename) {
            updateData.Image = filename;
        } else if (data.Image !== undefined) {
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

    async Delete(id: number) {
        const item = await this.prisma.item.findUnique({ where: { ItemID: id } });
        if (!item) {
            throw new NotFoundException('Item not found');
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
}
