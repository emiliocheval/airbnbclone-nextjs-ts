/*
  Warnings:

  - You are about to alter the column `amenities` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `houseRules` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyFeatures` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `safetyFeatures` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `houseRules` JSON NOT NULL,
    ADD COLUMN `propertyFeatures` JSON NOT NULL,
    ADD COLUMN `safetyFeatures` JSON NOT NULL,
    ADD COLUMN `services` JSON NOT NULL,
    MODIFY `amenities` JSON NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;
