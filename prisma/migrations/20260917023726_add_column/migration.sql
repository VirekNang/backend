/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `Address` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `Address` VARCHAR(250) NOT NULL,
    ADD COLUMN `Phone` VARCHAR(50) NOT NULL;
