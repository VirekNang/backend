/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PaymentMethodID` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `PaymentMethodID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_PaymentMethodID_fkey` FOREIGN KEY (`PaymentMethodID`) REFERENCES `PaymentMethod`(`PaymentMethodID`) ON DELETE SET NULL ON UPDATE CASCADE;
