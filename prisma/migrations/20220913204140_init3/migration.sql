/*
  Warnings:

  - You are about to drop the column `firstCathodicSurvey` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `firstGeotechnical` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `firstLicenseDate` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `firstPigRun` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `firstPipelineBatch` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `firstPressureTest` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastCathodicSurvey` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastGeotechnical` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastLicenseDate` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastPigRun` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastPipelineBatch` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `lastPressureTest` on the `Pipeline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pipeline" DROP COLUMN "firstCathodicSurvey",
DROP COLUMN "firstGeotechnical",
DROP COLUMN "firstLicenseDate",
DROP COLUMN "firstPigRun",
DROP COLUMN "firstPipelineBatch",
DROP COLUMN "firstPressureTest",
DROP COLUMN "lastCathodicSurvey",
DROP COLUMN "lastGeotechnical",
DROP COLUMN "lastLicenseDate",
DROP COLUMN "lastPigRun",
DROP COLUMN "lastPipelineBatch",
DROP COLUMN "lastPressureTest";
