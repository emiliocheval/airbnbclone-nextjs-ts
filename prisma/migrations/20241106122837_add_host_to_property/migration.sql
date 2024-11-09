/*
  Warnings:

  - Added the required column `host` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `host` VARCHAR(191) NOT NULL;
