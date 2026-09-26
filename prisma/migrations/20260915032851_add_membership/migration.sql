/*
  Warnings:

  - You are about to alter the column `ClosingCashDate` on the `cashsession` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cashsession` MODIFY `ClosingCashDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Membership` (
    `MembershipID` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `MembershipName` VARCHAR(100) NOT NULL,
    `DiscountRate` DECIMAL(5, 2) NOT NULL DEFAULT 0.0,
    `MinPoints` INTEGER NOT NULL DEFAULT 0,
    `Description` VARCHAR(250) NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Membership_uuid_key`(`uuid`),
    PRIMARY KEY (`MembershipID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_MembershipID_fkey` FOREIGN KEY (`MembershipID`) REFERENCES `Membership`(`MembershipID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_CustomerID_fkey` FOREIGN KEY (`CustomerID`) REFERENCES `Customer`(`CustomerID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_EmployeeID_fkey` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`) ON DELETE SET NULL ON UPDATE CASCADE;
