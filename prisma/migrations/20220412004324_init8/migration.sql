/*
  Warnings:

  - You are about to drop the column `probabilityExternalWithSafeguards` on the `Risk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Risk" DROP COLUMN "probabilityExternalWithSafeguards",
ADD COLUMN     "probabilityExteriorWithSafeguards" INTEGER;
