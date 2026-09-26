import { PaymentMethodService } from './payment-method.service';
import type { FastifyRequest } from 'fastify';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        Image: string;
        IsActive: boolean;
        PaymentMethodID: number;
        PaymentMethodName: string;
    }[]>;
    GetById(id: string): import("@prisma/client").Prisma.Prisma__PaymentMethodClient<{
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string;
        Image: string;
        IsActive: boolean;
        PaymentMethodID: number;
        PaymentMethodName: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string;
            Image: string;
            IsActive: boolean;
            PaymentMethodID: number;
            PaymentMethodName: string;
        };
    }>;
    Update(id: string, request: FastifyRequest): Promise<{
        message: string;
        data: {
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string;
            Image: string;
            IsActive: boolean;
            PaymentMethodID: number;
            PaymentMethodName: string;
        };
    }>;
    Delete(id: string): Promise<{
        message: string;
    }>;
}
