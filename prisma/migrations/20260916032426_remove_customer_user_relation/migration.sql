/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `UserID` on the `customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_UserID_fkey`;

-- DropIndex
DROP INDEX `Customer_UserID_key` ON `customer`;

-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `UserID`;
