/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `CashSession_uuid_key` ON `cashsession`;

-- DropIndex
DROP INDEX `Categories_uuid_key` ON `categories`;

-- DropIndex
DROP INDEX `Customer_uuid_key` ON `customer`;

-- DropIndex
DROP INDEX `Membership_uuid_key` ON `membership`;

-- DropIndex
DROP INDEX `OpeningCash_uuid_key` ON `openingcash`;

-- DropIndex
DROP INDEX `PaymentMethod_uuid_key` ON `paymentmethod`;

-- DropIndex
DROP INDEX `SalaryDetail_uuid_key` ON `salarydetail`;

-- AlterTable
ALTER TABLE `brand` ADD COLUMN `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cashsession` MODIFY `uuid` VARCHAR(191) NULL,
    MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customer` MODIFY `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `membership` MODIFY `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `openingcash` MODIFY `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `paymentmethod` MODIFY `uuid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `salarydetail` MODIFY `uuid` VARCHAR(191) NULL;
