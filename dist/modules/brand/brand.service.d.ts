import '@fastify/multipart';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
export declare class BrandService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    GetAll(): import("@prisma/client").Prisma.PrismaPromise<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        BrandName: string;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
    }[]>;
    GetById(id: string): import("@prisma/client").Prisma.Prisma__BrandClient<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        BrandID: number;
        BrandName: string;
        Description: string | null;
        Image: string | null;
        IsActive: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(request: FastifyRequest): Promise<{
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
    Update(id: string, request: FastifyRequest): Promise<{
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
    Delete(id: string): Promise<{
        message: string;
    }>;
    private readRequest;
    private toBoolean;
    private removeImage;
}
