import type { FastifyRequest } from 'fastify';
import '@fastify/multipart';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        IsActive: boolean;
        CategoryID: number;
        CategoryName: string;
        Thumnail: string;
    }[]>;
    GetbyId(id: string): import("@prisma/client").Prisma.Prisma__CategoriesClient<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        IsActive: boolean;
        CategoryID: number;
        CategoryName: string;
        Thumnail: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string;
            IsActive: boolean;
            CategoryID: number;
            CategoryName: string;
            Thumnail: string;
        };
    }>;
    Update(id: string, request: FastifyRequest): Promise<{
        message: string;
    }>;
    Delete(id: string): Promise<{
        message: string;
    }>;
}
