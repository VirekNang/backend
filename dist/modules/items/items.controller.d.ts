import { ItemsService } from './items.service';
import type { FastifyRequest } from 'fastify';
export declare class ItemsController {
    private readonly itemService;
    constructor(itemService: ItemsService);
    GetAll(): import("@prisma/client").Prisma.PrismaPromise<({
        brand: {
            BrandName: string;
        };
        category: {
            CategoryName: string;
        };
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
        CategoryID: number;
        ItemID: number;
        ItemName: string | null;
        StockQuantity: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        SalePrice: import("@prisma/client-runtime-utils").Decimal;
        Barcode: string | null;
        UnitOfMeasure: string | null;
    })[]>;
    GetBestSellers(days?: string, limit?: string): Promise<{
        IsBestSeller: boolean;
        BestSellerRank: number;
        QuantitySold: number;
        brand: {
            BrandName: string;
        };
        category: {
            CategoryName: string;
        };
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
        CategoryID: number;
        ItemID: number;
        ItemName: string | null;
        StockQuantity: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        SalePrice: import("@prisma/client-runtime-utils").Decimal;
        Barcode: string | null;
        UnitOfMeasure: string | null;
    }[]>;
    GetById(id: number): import("@prisma/client").Prisma.Prisma__ItemClient<({
        brand: {
            BrandName: string;
        };
        category: {
            CategoryName: string;
        };
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
        CategoryID: number;
        ItemID: number;
        ItemName: string | null;
        StockQuantity: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        SalePrice: import("@prisma/client-runtime-utils").Decimal;
        Barcode: string | null;
        UnitOfMeasure: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
            CategoryID: number;
            ItemID: number;
            ItemName: string | null;
            StockQuantity: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            SalePrice: import("@prisma/client-runtime-utils").Decimal;
            Barcode: string | null;
            UnitOfMeasure: string | null;
        };
    }>;
    Update(id: number, request: FastifyRequest): Promise<{
        message: string;
        data: {
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
            CategoryID: number;
            ItemID: number;
            ItemName: string | null;
            StockQuantity: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            SalePrice: import("@prisma/client-runtime-utils").Decimal;
            Barcode: string | null;
            UnitOfMeasure: string | null;
        };
    }>;
    Delete(id: number): Promise<{
        message: string;
        data: {
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
            CategoryID: number;
            ItemID: number;
            ItemName: string | null;
            StockQuantity: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            SalePrice: import("@prisma/client-runtime-utils").Decimal;
            Barcode: string | null;
            UnitOfMeasure: string | null;
        };
    }>;
}
