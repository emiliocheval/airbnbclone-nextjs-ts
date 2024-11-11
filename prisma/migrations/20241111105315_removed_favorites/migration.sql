/*
  Warnings:

  - You are about to drop the `_UserFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserFavorites` DROP FOREIGN KEY `_UserFavorites_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserFavorites` DROP FOREIGN KEY `_UserFavorites_B_fkey`;

-- DropTable
DROP TABLE `_UserFavorites`;
