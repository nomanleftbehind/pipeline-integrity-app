/*
  Warnings:

  - You are about to drop the column `chronologicalEdge` on the `CathodicSurvey` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `Geotechnical` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `LicenseChange` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `PigRun` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `PipelineBatch` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `PressureTest` table. All the data in the column will be lost.
  - You are about to drop the column `chronologicalEdge` on the `WellBatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CathodicSurvey" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "Geotechnical" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "LicenseChange" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "PigRun" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "PipelineBatch" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "PressureTest" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- AlterTable
ALTER TABLE "WellBatch" DROP COLUMN "chronologicalEdge",
ADD COLUMN     "first" BOOLEAN,
ADD COLUMN     "last" BOOLEAN;

-- DropEnum
DROP TYPE "chronological_edge";
