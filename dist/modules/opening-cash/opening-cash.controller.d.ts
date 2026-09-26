import { OpeningCashService } from './opening-cash.service';
export declare class OpeningCashController {
    private readonly openingCashService;
    constructor(openingCashService: OpeningCashService);
    getAll(): import("@prisma/client").Prisma.PrismaPromise<({
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
    getActive(employeeId: string): Promise<({
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
    getById(id: number): Promise<{
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
    create(body: any): Promise<{
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
    update(id: number, body: any): Promise<{
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
    delete(id: number): Promise<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        EmployeeID: number | null;
        OpeningCashID: number;
        OpeningCashDate: Date;
        OpeningCashBy: string;
    }>;
}
