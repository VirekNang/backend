/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;
