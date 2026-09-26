import { SupplierService } from './supplier.service';
import type { FastifyRequest } from 'fastify';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    GetAll(): import("@prisma/client").Prisma.PrismaPromise<{
        Phone: string;
        Address: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        IsActive: boolean;
        Thumnail: string;
        SupplierID: number;
        SupplierName: string;
    }[]>;
    GetById(id: string): import("@prisma/client").Prisma.Prisma__SupplierClient<{
        Phone: string;
        Address: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        IsActive: boolean;
        Thumnail: string;
        SupplierID: number;
        SupplierName: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            Phone: string;
            Address: string;
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string;
            IsActive: boolean;
            Thumnail: string;
            SupplierID: number;
            SupplierName: string;
        };
    }>;
    Update(id: string, request: FastifyRequest): Promise<{
        message: string;
    }>;
    Delete(id: string): Promise<{
        message: string;
    }>;
}
