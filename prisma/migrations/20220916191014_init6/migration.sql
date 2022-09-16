/*
  Warnings:

  - You are about to drop the column `first` on the `CathodicSurvey` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `CathodicSurvey` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `Geotechnical` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `Geotechnical` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `LicenseChange` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `LicenseChange` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `PigRun` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `PigRun` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `PipelineBatch` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `PipelineBatch` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `PressureTest` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `PressureTest` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `WellBatch` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `WellBatch` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "chronological_edge" AS ENUM ('First', 'Last');

-- AlterTable
ALTER TABLE "CathodicSurvey" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "Geotechnical" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "LicenseChange" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "PigRun" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "PipelineBatch" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "PressureTest" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";

-- AlterTable
ALTER TABLE "WellBatch" DROP COLUMN "first",
DROP COLUMN "last",
ADD COLUMN     "chronologicalEdge" "chronological_edge";
