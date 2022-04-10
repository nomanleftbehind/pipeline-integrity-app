/*
  Warnings:

  - You are about to drop the column `conequenceMax` on the `Risk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Risk" DROP COLUMN "conequenceMax",
ADD COLUMN     "consequenceMax" INTEGER;
