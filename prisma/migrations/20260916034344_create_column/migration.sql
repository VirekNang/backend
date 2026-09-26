/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `UpdatedDate` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `PurchaseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedDate` to the `SaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `promotion` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `purchasedetail` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sale` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `saledetail` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedDate` DATETIME(3) NOT NULL;
