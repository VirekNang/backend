/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Expense` (
    `ExpenseID` INTEGER NOT NULL AUTO_INCREMENT,
    `ExpenseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Title` VARCHAR(200) NOT NULL,
    `Amount` DECIMAL(18, 2) NOT NULL,
    `Category` VARCHAR(100) NULL,
    `Description` VARCHAR(500) NULL,
    `Image` VARCHAR(250) NULL,
    `EmployeeID` INTEGER NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ExpenseID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_EmployeeID_fkey` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`) ON DELETE SET NULL ON UPDATE CASCADE;
