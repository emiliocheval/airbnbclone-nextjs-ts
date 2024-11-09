/*
  Warnings:

  - Added the required column `bathrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `bathrooms` INTEGER NOT NULL,
    ADD COLUMN `bedrooms` INTEGER NOT NULL,
    ADD COLUMN `beds` INTEGER NOT NULL,
    ADD COLUMN `guests` INTEGER NOT NULL;
