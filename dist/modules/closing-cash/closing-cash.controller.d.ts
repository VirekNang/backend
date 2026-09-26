import { ClosingCashService } from './closing-cash.service';
export declare class ClosingCashController {
    private readonly closingCashService;
    constructor(closingCashService: ClosingCashService);
    getAll(): import("@prisma/client").Prisma.PrismaPromise<({
        OpeningCash: {
            Employee: {
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
            Note: string;
            uuid: string;
            CreatedDate: Date;
            EmployeeID: number | null;
            OpeningCashID: number;
            OpeningCashDate: Date;
            OpeningCashBy: string;
        };
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        OpeningCashID: number;
        CashSessionID: number;
        ClosedBy: number | null;
        ClosingCashDate: Date;
        TotalOrderCount: number;
        TotalOrderAmount: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    getById(id: number): Promise<{
        OpeningCash: {
            Employee: {
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
            Note: string;
            uuid: string;
            CreatedDate: Date;
            EmployeeID: number | null;
            OpeningCashID: number;
            OpeningCashDate: Date;
            OpeningCashBy: string;
        };
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        OpeningCashID: number;
        CashSessionID: number;
        ClosedBy: number | null;
        ClosingCashDate: Date;
        TotalOrderCount: number;
        TotalOrderAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    create(body: any): Promise<{
        OpeningCash: {
            Employee: {
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
            Note: string;
            uuid: string;
            CreatedDate: Date;
            EmployeeID: number | null;
            OpeningCashID: number;
            OpeningCashDate: Date;
            OpeningCashBy: string;
        };
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        OpeningCashID: number;
        CashSessionID: number;
        ClosedBy: number | null;
        ClosingCashDate: Date;
        TotalOrderCount: number;
        TotalOrderAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    update(id: number, body: any): Promise<{
        OpeningCash: {
            Employee: {
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
            Note: string;
            uuid: string;
            CreatedDate: Date;
            EmployeeID: number | null;
            OpeningCashID: number;
            OpeningCashDate: Date;
            OpeningCashBy: string;
        };
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        OpeningCashID: number;
        CashSessionID: number;
        ClosedBy: number | null;
        ClosingCashDate: Date;
        TotalOrderCount: number;
        TotalOrderAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    delete(id: number): Promise<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        OpeningCashID: number;
        CashSessionID: number;
        ClosedBy: number | null;
        ClosingCashDate: Date;
        TotalOrderCount: number;
        TotalOrderAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
