-- AlterTable
ALTER TABLE "Pipeline" ADD COLUMN     "firstCathodicSurvey" TIMESTAMP(3),
ADD COLUMN     "firstGeotechnical" TIMESTAMP(3),
ADD COLUMN     "firstLicenseDate" TIMESTAMP(3),
ADD COLUMN     "firstPigRun" TIMESTAMP(3),
ADD COLUMN     "firstPipelineBatch" TIMESTAMP(3),
ADD COLUMN     "firstPressureTest" TIMESTAMP(3),
ADD COLUMN     "lastCathodicSurvey" TIMESTAMP(3),
ADD COLUMN     "lastGeotechnical" TIMESTAMP(3),
ADD COLUMN     "lastLicenseDate" TIMESTAMP(3),
ADD COLUMN     "lastPigRun" TIMESTAMP(3),
ADD COLUMN     "lastPipelineBatch" TIMESTAMP(3),
ADD COLUMN     "lastPressureTest" TIMESTAMP(3);
