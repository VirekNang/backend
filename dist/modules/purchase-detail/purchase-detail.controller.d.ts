import { PurchaseDetailService } from './purchase-detail.service';
export declare class PurchaseDetailController {
    private readonly purchaseDetailService;
    constructor(purchaseDetailService: PurchaseDetailService);
    getAll(purchaseId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    getById(id: number): Promise<{
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
        purchase: {
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
    }>;
    create(body: any): Promise<{
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
        purchase: {
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
    }>;
    update(id: number, body: any): Promise<{
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
    }>;
    delete(id: number): Promise<{
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
    }>;
}
