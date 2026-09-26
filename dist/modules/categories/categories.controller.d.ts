import { CategoriesService } from './categories.service';
import type { FastifyRequest } from 'fastify';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    Getall(): import("@prisma/client").Prisma.PrismaPromise<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        IsActive: boolean;
        CategoryID: number;
        CategoryName: string;
        Thumnail: string;
    }[]>;
    Getbyid(id: string): import("@prisma/client").Prisma.Prisma__CategoriesClient<{
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
