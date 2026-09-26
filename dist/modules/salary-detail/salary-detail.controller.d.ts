import { SalaryDetailService } from './salary-detail.service';
import { SalaryDetailDto } from './dto/SalaryDetail.dto';
export declare class SalaryDetailController {
    private readonly salaryDetailService;
    constructor(salaryDetailService: SalaryDetailService);
    GetAll(): import("@prisma/client").Prisma.PrismaPromise<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number;
        Bonus: import("@prisma/client-runtime-utils").Decimal;
        Month: number;
        Year: number;
        SalaryOfMonth: import("@prisma/client-runtime-utils").Decimal;
        TotalSalary: import("@prisma/client-runtime-utils").Decimal;
        SalaryDetailID: number;
    }[]>;
    GetById(id: string): import("@prisma/client").Prisma.Prisma__SalaryDetailClient<({
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
        };
    } & {
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number;
        Bonus: import("@prisma/client-runtime-utils").Decimal;
        Month: number;
        Year: number;
        SalaryOfMonth: import("@prisma/client-runtime-utils").Decimal;
        TotalSalary: import("@prisma/client-runtime-utils").Decimal;
        SalaryDetailID: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(data: SalaryDetailDto): import("@prisma/client").Prisma.Prisma__SalaryDetailClient<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number;
        Bonus: import("@prisma/client-runtime-utils").Decimal;
        Month: number;
        Year: number;
        SalaryOfMonth: import("@prisma/client-runtime-utils").Decimal;
        TotalSalary: import("@prisma/client-runtime-utils").Decimal;
        SalaryDetailID: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Update(id: string, data: SalaryDetailDto): import("@prisma/client").Prisma.Prisma__SalaryDetailClient<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number;
        Bonus: import("@prisma/client-runtime-utils").Decimal;
        Month: number;
        Year: number;
        SalaryOfMonth: import("@prisma/client-runtime-utils").Decimal;
        TotalSalary: import("@prisma/client-runtime-utils").Decimal;
        SalaryDetailID: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Delete(id: string): import("@prisma/client").Prisma.Prisma__SalaryDetailClient<{
        Note: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number;
        Bonus: import("@prisma/client-runtime-utils").Decimal;
        Month: number;
        Year: number;
        SalaryOfMonth: import("@prisma/client-runtime-utils").Decimal;
        TotalSalary: import("@prisma/client-runtime-utils").Decimal;
        SalaryDetailID: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
