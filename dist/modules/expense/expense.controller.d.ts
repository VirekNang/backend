import type { FastifyRequest } from 'fastify';
import { ExpenseService } from './expense.service';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    getAll(category?: string): import("@prisma/client").Prisma.PrismaPromise<({
        employee: {
            Phone: string;
            Gender: string;
            Address: string;
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            IsActive: boolean;
            EmployeeID: number;
            EmployeeNo: string;
            EmployeeName: string;
            DateOfBirth: Date;
            Indentity: number | null;
            EducationStatus: string;
            Department: string;
            Position: string;
            HiredDate: Date;
            BaseSalary: import("@prisma/client-runtime-utils").Decimal;
            PhotoURL: string;
            IsDelete: Date | null;
        } | null;
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        Image: string | null;
        EmployeeID: number | null;
        ExpenseID: number;
        ExpenseDate: Date;
        Title: string;
        Amount: import("@prisma/client-runtime-utils").Decimal;
        Category: string | null;
    })[]>;
    getById(id: number): Promise<{
        employee: {
            Phone: string;
            Gender: string;
            Address: string;
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            IsActive: boolean;
            EmployeeID: number;
            EmployeeNo: string;
            EmployeeName: string;
            DateOfBirth: Date;
            Indentity: number | null;
            EducationStatus: string;
            Department: string;
            Position: string;
            HiredDate: Date;
            BaseSalary: import("@prisma/client-runtime-utils").Decimal;
            PhotoURL: string;
            IsDelete: Date | null;
        } | null;
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        Image: string | null;
        EmployeeID: number | null;
        ExpenseID: number;
        ExpenseDate: Date;
        Title: string;
        Amount: import("@prisma/client-runtime-utils").Decimal;
        Category: string | null;
    }>;
    create(request: FastifyRequest): Promise<{
        message: string;
        data: {
            employee: {
                Phone: string;
                Gender: string;
                Address: string;
                uuid: string;
                CreatedDate: Date;
                UpdatedDate: Date;
                IsActive: boolean;
                EmployeeID: number;
                EmployeeNo: string;
                EmployeeName: string;
                DateOfBirth: Date;
                Indentity: number | null;
                EducationStatus: string;
                Department: string;
                Position: string;
                HiredDate: Date;
                BaseSalary: import("@prisma/client-runtime-utils").Decimal;
                PhotoURL: string;
                IsDelete: Date | null;
            } | null;
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            Image: string | null;
            EmployeeID: number | null;
            ExpenseID: number;
            ExpenseDate: Date;
            Title: string;
            Amount: import("@prisma/client-runtime-utils").Decimal;
            Category: string | null;
        };
    }>;
    update(id: number, request: FastifyRequest): Promise<{
        message: string;
        data: {
            employee: {
                Phone: string;
                Gender: string;
                Address: string;
                uuid: string;
                CreatedDate: Date;
                UpdatedDate: Date;
                IsActive: boolean;
                EmployeeID: number;
                EmployeeNo: string;
                EmployeeName: string;
                DateOfBirth: Date;
                Indentity: number | null;
                EducationStatus: string;
                Department: string;
                Position: string;
                HiredDate: Date;
                BaseSalary: import("@prisma/client-runtime-utils").Decimal;
                PhotoURL: string;
                IsDelete: Date | null;
            } | null;
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            Image: string | null;
            EmployeeID: number | null;
            ExpenseID: number;
            ExpenseDate: Date;
            Title: string;
            Amount: import("@prisma/client-runtime-utils").Decimal;
            Category: string | null;
        };
    }>;
    delete(id: number): Promise<{
        message: string;
        data: {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            Image: string | null;
            EmployeeID: number | null;
            ExpenseID: number;
            ExpenseDate: Date;
            Title: string;
            Amount: import("@prisma/client-runtime-utils").Decimal;
            Category: string | null;
        };
    }>;
}
