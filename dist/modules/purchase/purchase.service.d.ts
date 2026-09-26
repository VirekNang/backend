import { PrismaService } from "../../prisma/prisma.service";
export declare class PurchaseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    Get(): import("@prisma/client").Prisma.PrismaPromise<({
        supplier: {
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
        } | null;
        purchaseDetails: ({
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
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            ItemID: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            Quantity: number;
            DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            IsPromotion: boolean;
            PurchaseID: number;
            purchaseDetailID: number;
        })[];
    } & {
        Note: string | null;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number | null;
        PaymentMethodID: string | null;
        SupplierID: number | null;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        InvoiceNo: string | null;
        IsPay: boolean;
        TaxAmount: import("@prisma/client-runtime-utils").Decimal;
        TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        PurchaseID: number;
        PurchaseDate: Date;
    })[]>;
    GetById(id: number): Promise<{
        supplier: {
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
        } | null;
        purchaseDetails: ({
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
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            ItemID: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            Quantity: number;
            DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            IsPromotion: boolean;
            PurchaseID: number;
            purchaseDetailID: number;
        })[];
    } & {
        Note: string | null;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number | null;
        PaymentMethodID: string | null;
        SupplierID: number | null;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        InvoiceNo: string | null;
        IsPay: boolean;
        TaxAmount: import("@prisma/client-runtime-utils").Decimal;
        TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        PurchaseID: number;
        PurchaseDate: Date;
    }>;
    Create(data: any): Promise<{
        supplier: {
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
        } | null;
        purchaseDetails: ({
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
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            ItemID: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            Quantity: number;
            DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            IsPromotion: boolean;
            PurchaseID: number;
            purchaseDetailID: number;
        })[];
    } & {
        Note: string | null;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number | null;
        PaymentMethodID: string | null;
        SupplierID: number | null;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        InvoiceNo: string | null;
        IsPay: boolean;
        TaxAmount: import("@prisma/client-runtime-utils").Decimal;
        TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        PurchaseID: number;
        PurchaseDate: Date;
    }>;
    Update(id: number, data: any): Promise<{
        supplier: {
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
        } | null;
        purchaseDetails: ({
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
        } & {
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            ItemID: number;
            UnitPrice: import("@prisma/client-runtime-utils").Decimal;
            Quantity: number;
            DiscountAmt: import("@prisma/client-runtime-utils").Decimal;
            SubTotal: import("@prisma/client-runtime-utils").Decimal;
            IsPromotion: boolean;
            PurchaseID: number;
            purchaseDetailID: number;
        })[];
    } & {
        Note: string | null;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number | null;
        PaymentMethodID: string | null;
        SupplierID: number | null;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        InvoiceNo: string | null;
        IsPay: boolean;
        TaxAmount: import("@prisma/client-runtime-utils").Decimal;
        TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        PurchaseID: number;
        PurchaseDate: Date;
    }>;
    Delete(id: number): Promise<{
        Note: string | null;
        CreatedDate: Date;
        UpdatedDate: Date;
        EmployeeID: number | null;
        PaymentMethodID: string | null;
        SupplierID: number | null;
        SubTotal: import("@prisma/client-runtime-utils").Decimal;
        InvoiceNo: string | null;
        IsPay: boolean;
        TaxAmount: import("@prisma/client-runtime-utils").Decimal;
        TotalAmount: import("@prisma/client-runtime-utils").Decimal;
        PurchaseID: number;
        PurchaseDate: Date;
    }>;
}
