/*
  Warnings:

  - You are about to drop the column `dob` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `employees` table. All the data in the column will be lost.
  - Added the required column `number` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `dob`,
    DROP COLUMN `salary`,
    ADD COLUMN `number` BIGINT NOT NULL;
