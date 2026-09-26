import { PrismaService } from "../../prisma/prisma.service";
export declare class OpeningCashService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<({
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
        CashSession: {
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
        }[];
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        EmployeeID: number | null;
        OpeningCashID: number;
        OpeningCashDate: Date;
        OpeningCashBy: string;
    })[]>;
    GetById(id: number): Promise<{
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
        CashSession: {
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
        }[];
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        EmployeeID: number | null;
        OpeningCashID: number;
        OpeningCashDate: Date;
        OpeningCashBy: string;
    }>;
    GetActiveByEmployee(employeeId: number): Promise<({
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
        CashSession: {
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
        }[];
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        EmployeeID: number | null;
        OpeningCashID: number;
        OpeningCashDate: Date;
        OpeningCashBy: string;
    }) | null>;
    Create(data: any): Promise<{
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
    }>;
    Update(id: number, data: any): Promise<{
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
    }>;
    Delete(id: number): Promise<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        EmployeeID: number | null;
        OpeningCashID: number;
        OpeningCashDate: Date;
        OpeningCashBy: string;
    }>;
}
