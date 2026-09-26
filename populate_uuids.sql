UPDATE `Customer` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `Membership` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `SalaryDetail` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `Categories` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `Brand` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `OpeningCash` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `CashSession` SET `uuid` = UUID() WHERE `uuid` IS NULL;
UPDATE `PaymentMethod` SET `uuid` = UUID() WHERE `uuid` IS NULL;
