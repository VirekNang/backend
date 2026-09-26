ALTER TABLE `Brand` ADD COLUMN `uuid` VARCHAR(191) NULL;
UPDATE `Brand` SET `uuid` = UUID() WHERE `uuid` IS NULL;
ALTER TABLE `Brand` ADD UNIQUE INDEX `Brand_uuid_key`(`uuid`);
