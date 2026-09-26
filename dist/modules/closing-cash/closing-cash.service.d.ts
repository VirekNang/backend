import { PrismaService } from "../../prisma/prisma.service";
export declare class ClosingCashService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<({
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
    GetById(id: number): Promise<{
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
    Create(data: any): Promise<{
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
    Update(id: number, data: any): Promise<{
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
    Delete(id: number): Promise<{
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
