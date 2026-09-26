-- AlterTable
ALTER TABLE `brand` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cashsession` MODIFY `uuid` VARCHAR(191) NOT NULL,
    MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customer` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `membership` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `openingcash` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paymentmethod` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salarydetail` MODIFY `uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Brand_uuid_key` ON `Brand`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `CashSession_uuid_key` ON `CashSession`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Categories_uuid_key` ON `Categories`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_uuid_key` ON `Customer`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Membership_uuid_key` ON `Membership`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `OpeningCash_uuid_key` ON `OpeningCash`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `PaymentMethod_uuid_key` ON `PaymentMethod`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `SalaryDetail_uuid_key` ON `SalaryDetail`(`uuid`);
