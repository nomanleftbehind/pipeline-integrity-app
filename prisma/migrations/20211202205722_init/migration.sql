-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "substance" AS ENUM ('Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas');

-- CreateEnum
CREATE TYPE "fromToFeature" AS ENUM ('Blind end', 'Battery', 'Pipeline', 'Satellite', 'Storage tank', 'Injection plant', 'Well', 'Compressor station', 'Meter station', 'Pump station', 'Gas processing plant', 'Underground cap or tie-in', 'Header');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3');

-- CreateEnum
CREATE TYPE "grade" AS ENUM ('A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03');

-- CreateEnum
CREATE TYPE "material" AS ENUM ('Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement');

-- CreateEnum
CREATE TYPE "internalProtection" AS ENUM ('Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film');

-- CreateEnum
CREATE TYPE "pigType" AS ENUM ('GSCR', 'PSCR', 'Foam', 'Scrapper');

-- CreateEnum
CREATE TYPE "limitingSpec" AS ENUM ('ANSI 300', 'ANSI 600');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Satellite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facilityId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Satellite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pipeline" (
    "id" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "satelliteId" TEXT,
    "license" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "substance" "substance" NOT NULL,
    "from" TEXT NOT NULL,
    "fromFeature" "fromToFeature",
    "to" TEXT NOT NULL,
    "toFeature" "fromToFeature",
    "status" "status" NOT NULL,
    "licenseDate" TIMESTAMP(3),
    "length" DECIMAL(6,2) NOT NULL,
    "type" "type",
    "grade" "grade",
    "yieldStrength" INTEGER,
    "outsideDiameter" DECIMAL(6,2),
    "wallThickness" DECIMAL(6,2),
    "material" "material",
    "mop" INTEGER,
    "internalProtection" "internalProtection",
    "piggable" BOOLEAN,
    "piggingFrequency" INTEGER,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PigRun" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "pigType" "pigType",
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "operatorId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PigRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PressureTest" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "limitingSpec" "limitingSpec",
    "infoSentOutDate" TIMESTAMP(3),
    "ddsDate" TIMESTAMP(3),
    "pressureTestDate" TIMESTAMP(3),
    "pressureTestReceivedDate" TIMESTAMP(3),
    "integritySheetUpdated" TIMESTAMP(3),
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PressureTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InjectionPoint" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "oil" DECIMAL(6,2) NOT NULL,
    "water" DECIMAL(6,2) NOT NULL,
    "gas" DECIMAL(6,2) NOT NULL,
    "firstProduction" TIMESTAMP(3),
    "lastProduction" TIMESTAMP(3),
    "firstInjection" TIMESTAMP(3),
    "lastInjection" TIMESTAMP(3),
    "pvUnitId" TEXT,
    "pvNodeId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pipelineId" TEXT,

    CONSTRAINT "InjectionPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PipelineFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Satellite_name_key" ON "Satellite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pipeline_license_segment_key" ON "Pipeline"("license", "segment");

-- CreateIndex
CREATE UNIQUE INDEX "InjectionPoint_source_key" ON "InjectionPoint"("source");

-- CreateIndex
CREATE UNIQUE INDEX "InjectionPoint_pvUnitId_pvNodeId_key" ON "InjectionPoint"("pvUnitId", "pvNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "_PipelineFollows_AB_unique" ON "_PipelineFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_PipelineFollows_B_index" ON "_PipelineFollows"("B");

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_satelliteId_fkey" FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InjectionPoint" ADD CONSTRAINT "InjectionPoint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InjectionPoint" ADD CONSTRAINT "InjectionPoint_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineFollows" ADD FOREIGN KEY ("A") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineFollows" ADD FOREIGN KEY ("B") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
