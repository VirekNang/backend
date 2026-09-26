import type { FastifyRequest } from 'fastify';
import { BrandService } from './brand.service';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    getAll(): import("@prisma/client").Prisma.PrismaPromise<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        BrandName: string;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
    }[]>;
    getById(id: string): import("@prisma/client").Prisma.Prisma__BrandClient<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        BrandName: string;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            BrandName: string;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
        };
    }>;
    update(id: string, request: FastifyRequest): Promise<{
        message: string;
        data: {
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            BrandName: string;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
