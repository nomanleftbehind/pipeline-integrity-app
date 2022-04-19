-- AlterTable
ALTER TABLE "PressureTest" ADD COLUMN     "maxPressureOfLimitingSpec" DOUBLE PRECISION,
ADD COLUMN     "mopTestPressure" DOUBLE PRECISION,
ADD COLUMN     "pressureTestCorrosionAllowance" DOUBLE PRECISION,
ADD COLUMN     "pressureTestPressure" DOUBLE PRECISION,
ADD COLUMN     "requiredWTForMop" DOUBLE PRECISION,
ADD COLUMN     "requiredWTForTestPressure" DOUBLE PRECISION,
ADD COLUMN     "waterForPigging" DOUBLE PRECISION;
