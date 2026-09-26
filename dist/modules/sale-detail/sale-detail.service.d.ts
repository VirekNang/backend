import { PrismaService } from "../../prisma/prisma.service";
export declare class SaleDetailService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<({
        item: {
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
            CategoryID: number;
            ItemID: number;
            ItemName: string | null;
            StockQuantity: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            SalePrice: import("@prisma/client-runtime-utils").Decimal;
            Barcode: string | null;
            UnitOfMeasure: string | null;
        };
        sale: {
            Note: string | null;
            CustomerID: number | null;
            CreatedDate: Date;
            UpdatedDate: Date;
            EmployeeID: number | null;
            PaymentMethodID: number | null;
            SaleID: number;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            SaleDate: Date;
            InvoiceNo: string | null;
            OpeningCashID: number | null;
            IsPay: boolean;
            TaxAmount: import("@prisma/client-runtime-utils").Decimal;
            TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        ItemID: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        saleDetailID: number;
        SaleID: number;
        Quantity: number;
        DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        IsPromotion: boolean;
    })[]>;
    GetById(id: number): Promise<{
        item: {
            CreatedDate: Date;
            UpdatedDate: Date;
            BrandID: number;
            Description: string | null;
            Image: string | null;
            IsActive: boolean;
            CategoryID: number;
            ItemID: number;
            ItemName: string | null;
            StockQuantity: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            SalePrice: import("@prisma/client-runtime-utils").Decimal;
            Barcode: string | null;
            UnitOfMeasure: string | null;
        };
        sale: {
            Note: string | null;
            CustomerID: number | null;
            CreatedDate: Date;
            UpdatedDate: Date;
            EmployeeID: number | null;
            PaymentMethodID: number | null;
            SaleID: number;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            SaleDate: Date;
            InvoiceNo: string | null;
            OpeningCashID: number | null;
            IsPay: boolean;
            TaxAmount: import("@prisma/client-runtime-utils").Decimal;
            TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        ItemID: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        saleDetailID: number;
        SaleID: number;
        Quantity: number;
        DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        IsPromotion: boolean;
    }>;
    Create(data: any): import("@prisma/client").Prisma.Prisma__SaleDetailClient<{
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        ItemID: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        saleDetailID: number;
        SaleID: number;
        Quantity: number;
        DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        IsPromotion: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Update(id: number, data: any): Promise<{
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        ItemID: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        saleDetailID: number;
        SaleID: number;
        Quantity: number;
        DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        IsPromotion: boolean;
    }>;
    Delete(id: number): Promise<{
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        ItemID: number;
        UnitPrice: import("@prisma/client-runtime-utils").Decimal;
        saleDetailID: number;
        SaleID: number;
        Quantity: number;
        DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        IsPromotion: boolean;
    }>;
}
