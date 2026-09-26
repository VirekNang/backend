-- CreateTable
CREATE TABLE `Customer` (
    `CustomerID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `UserID` INTEGER NOT NULL,
    `CustomerNo` VARCHAR(50) NOT NULL,
    `CustomerName` VARCHAR(50) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `Address` VARCHAR(50) NOT NULL,
    `Phone` VARCHAR(50) NOT NULL,
    `MembershipID` INTEGER NULL,
    `rewardPoints` INTEGER NOT NULL DEFAULT 0,
    `Note` VARCHAR(250) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_uuid_key`(`uuid`),
    UNIQUE INDEX `Customer_UserID_key`(`UserID`),
    PRIMARY KEY (`CustomerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `EmployeeID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `EmployeeNo` VARCHAR(50) NOT NULL,
    `EmployeeName` VARCHAR(50) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `DateOfBirth` DATE NOT NULL,
    `Indentity` INTEGER NULL,
    `Phone` VARCHAR(18) NOT NULL,
    `EducationStatus` VARCHAR(100) NOT NULL,
    `Address` VARCHAR(250) NOT NULL,
    `Department` VARCHAR(200) NOT NULL,
    `Position` VARCHAR(200) NOT NULL,
    `HiredDate` DATE NOT NULL,
    `BaseSalary` DECIMAL(18, 2) NOT NULL,
    `PhotoURL` VARCHAR(250) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsDelete` DATE NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_uuid_key`(`uuid`),
    PRIMARY KEY (`EmployeeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalaryDetail` (
    `SalaryDetailID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `EmployeeID` INTEGER NOT NULL,
    `Bonus` DECIMAL(18, 2) NOT NULL,
    `Month` INTEGER NOT NULL,
    `Year` INTEGER NOT NULL,
    `SalaryOfMonth` DECIMAL(18, 2) NOT NULL,
    `TotalSalary` DECIMAL(18, 2) NOT NULL,
    `Note` VARCHAR(250) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SalaryDetail_uuid_key`(`uuid`),
    PRIMARY KEY (`SalaryDetailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `CategoryID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `CategoryName` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(250) NOT NULL,
    `Thumnail` VARCHAR(150) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categories_uuid_key`(`uuid`),
    PRIMARY KEY (`CategoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `BrandID` INTEGER NOT NULL AUTO_INCREMENT,
    `BrandName` VARCHAR(100) NOT NULL,
    `Description` VARCHAR(500) NULL,
    `Image` VARCHAR(100) NULL,

    PRIMARY KEY (`BrandID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `ItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `BrandID` INTEGER NOT NULL,
    `CategoryID` INTEGER NOT NULL,
    `ItemName` VARCHAR(100) NULL,
    `StockQuantity` INTEGER NOT NULL DEFAULT 0,
    `UnitPrice` DECIMAL(18, 2) NOT NULL,
    `SalePrice` DECIMAL(18, 2) NOT NULL,
    `Description` VARCHAR(1000) NULL,
    `Image` VARCHAR(100) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `Barcode` VARCHAR(100) NULL,
    `UnitOfMeasure` VARCHAR(50) NULL DEFAULT 'PCS',

    UNIQUE INDEX `Item_Barcode_key`(`Barcode`),
    PRIMARY KEY (`ItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpeningCash` (
    `OpeningCashID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `EmployeeID` INTEGER NULL,
    `OpeningCashDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `OpeningCashBy` VARCHAR(100) NOT NULL,
    `Note` VARCHAR(250) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `OpeningCash_uuid_key`(`uuid`),
    PRIMARY KEY (`OpeningCashID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CashSession` (
    `CashSessionID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `OpeningCashID` INTEGER NOT NULL,
    `ClosedBy` INTEGER NULL,
    `ClosingCashDate` DATETIME NOT NULL,
    `TotalOrderCount` INTEGER NOT NULL DEFAULT 0,
    `TotalOrderAmount` DECIMAL(18, 2) NOT NULL,
    `Note` VARCHAR(250) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CashSession_uuid_key`(`uuid`),
    PRIMARY KEY (`CashSessionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `SaleID` INTEGER NOT NULL AUTO_INCREMENT,
    `SaleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `InvoiceNo` VARCHAR(200) NULL,
    `EmployeeID` INTEGER NULL,
    `CustomerID` INTEGER NULL,
    `OpeningCashID` INTEGER NULL,
    `PaymentMethodID` VARCHAR(100) NULL,
    `IsPay` BOOLEAN NOT NULL DEFAULT false,
    `SubTotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `TaxAmount` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `TotalAmount` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `Note` VARCHAR(300) NULL,

    UNIQUE INDEX `Sale_InvoiceNo_key`(`InvoiceNo`),
    PRIMARY KEY (`SaleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleDetail` (
    `saleDetailID` INTEGER NOT NULL AUTO_INCREMENT,
    `SaleID` INTEGER NOT NULL,
    `ItemID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DECIMAL(18, 2) NOT NULL,
    `DiscountAmt` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `SubTotal` DECIMAL(18, 2) NOT NULL,
    `IsPromotion` BOOLEAN NOT NULL DEFAULT false,
    `Description` VARCHAR(300) NULL,

    PRIMARY KEY (`saleDetailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `PurchaseID` INTEGER NOT NULL AUTO_INCREMENT,
    `PurchaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `InvoiceNo` VARCHAR(200) NULL,
    `EmployeeID` INTEGER NULL,
    `SupplierID` INTEGER NULL,
    `PaymentMethodID` VARCHAR(100) NULL,
    `IsPay` BOOLEAN NOT NULL DEFAULT false,
    `SubTotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `TaxAmount` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `TotalAmount` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `Note` VARCHAR(300) NULL,

    UNIQUE INDEX `Purchase_InvoiceNo_key`(`InvoiceNo`),
    PRIMARY KEY (`PurchaseID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseDetail` (
    `purchaseDetailID` INTEGER NOT NULL AUTO_INCREMENT,
    `PurchaseID` INTEGER NOT NULL,
    `ItemID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DECIMAL(18, 2) NOT NULL,
    `DiscountAmt` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `SubTotal` DECIMAL(18, 2) NOT NULL,
    `IsPromotion` BOOLEAN NOT NULL DEFAULT false,
    `Description` VARCHAR(300) NULL,

    PRIMARY KEY (`purchaseDetailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `SupplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `SupplierName` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(250) NOT NULL,
    `Thumnail` VARCHAR(150) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Supplier_uuid_key`(`uuid`),
    PRIMARY KEY (`SupplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `PromotionID` INTEGER NOT NULL AUTO_INCREMENT,
    `TargetID` INTEGER NOT NULL,
    `PromotionType` VARCHAR(100) NULL,
    `PromotionName` VARCHAR(200) NULL,
    `Description` VARCHAR(500) NULL,
    `DiscountPercents` DECIMAL(5, 2) NOT NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `MinimumPurchaseAmount` DECIMAL(18, 2) NOT NULL DEFAULT 0.0,
    `MemberOnly` BOOLEAN NOT NULL DEFAULT false,
    `PromoCode` VARCHAR(50) NULL,

    UNIQUE INDEX `Promotion_PromoCode_key`(`PromoCode`),
    PRIMARY KEY (`PromotionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `PaymentMethodID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `PaymentMethodName` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(250) NOT NULL,
    `Image` VARCHAR(250) NOT NULL DEFAULT 'default.png',
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PaymentMethod_uuid_key`(`uuid`),
    PRIMARY KEY (`PaymentMethodID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `UserID` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(200) NOT NULL,
    `Password` VARCHAR(200) NOT NULL,
    `Email` VARCHAR(200) NOT NULL,
    `Phone` VARCHAR(200) NOT NULL,
    `Image` VARCHAR(200) NOT NULL,
    `IsAdmin` BOOLEAN NOT NULL DEFAULT false,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsDuDate` DATETIME(3) NOT NULL,
    `IsDelete` BOOLEAN NOT NULL DEFAULT false,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_uuid_key`(`uuid`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPermission` (
    `UserPermissionID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `PermissionName` VARCHAR(200) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`UserPermissionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginSession` (
    `SessionID` VARCHAR(64) NOT NULL,
    `UserID` INTEGER NOT NULL,
    `UserType` VARCHAR(20) NOT NULL,
    `ExpiresAt` DATETIME(3) NOT NULL,
    `RevokedAt` DATETIME(3) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LoginSession_UserID_UserType_idx`(`UserID`, `UserType`),
    INDEX `LoginSession_ExpiresAt_idx`(`ExpiresAt`),
    PRIMARY KEY (`SessionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginActivity` (
    `LoginActivityID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NULL,
    `UserType` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(200) NOT NULL,
    `Success` BOOLEAN NOT NULL,
    `IPAddress` VARCHAR(64) NULL,
    `UserAgent` VARCHAR(500) NULL,
    `Location` VARCHAR(250) NULL,
    `FailureReason` VARCHAR(100) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LoginActivity_Email_CreatedAt_idx`(`Email`, `CreatedAt`),
    INDEX `LoginActivity_UserID_CreatedAt_idx`(`UserID`, `CreatedAt`),
    PRIMARY KEY (`LoginActivityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalaryDetail` ADD CONSTRAINT `SalaryDetail_EmployeeID_fkey` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_BrandID_fkey` FOREIGN KEY (`BrandID`) REFERENCES `Brand`(`BrandID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_CategoryID_fkey` FOREIGN KEY (`CategoryID`) REFERENCES `Categories`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpeningCash` ADD CONSTRAINT `OpeningCash_EmployeeID_fkey` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashSession` ADD CONSTRAINT `CashSession_OpeningCashID_fkey` FOREIGN KEY (`OpeningCashID`) REFERENCES `OpeningCash`(`OpeningCashID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_OpeningCashID_fkey` FOREIGN KEY (`OpeningCashID`) REFERENCES `OpeningCash`(`OpeningCashID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetail` ADD CONSTRAINT `SaleDetail_SaleID_fkey` FOREIGN KEY (`SaleID`) REFERENCES `Sale`(`SaleID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetail` ADD CONSTRAINT `SaleDetail_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Item`(`ItemID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `Supplier`(`SupplierID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseDetail` ADD CONSTRAINT `PurchaseDetail_PurchaseID_fkey` FOREIGN KEY (`PurchaseID`) REFERENCES `Purchase`(`PurchaseID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseDetail` ADD CONSTRAINT `PurchaseDetail_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Item`(`ItemID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Employee`(`EmployeeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
