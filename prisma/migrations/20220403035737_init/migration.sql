-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('Admin', 'Engineer', 'Office', 'Operator', 'Chemical', 'Cathodic', 'Contractor');

-- CreateEnum
CREATE TYPE "substance" AS ENUM ('Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas');

-- CreateEnum
CREATE TYPE "solubility" AS ENUM ('Oil', 'Water');

-- CreateEnum
CREATE TYPE "batch_frequency" AS ENUM ('Continuous', 'Quarterly', 'Bimonthly', 'Monthly', 'Annually', 'Weekly', 'Specialized');

-- CreateEnum
CREATE TYPE "from_to_feature" AS ENUM ('Blind end', 'Battery', 'Pipeline', 'Satellite', 'Storage tank', 'Injection plant', 'Well', 'Compressor station', 'Meter station', 'Pump station', 'Gas processing plant', 'Underground cap or tie-in', 'Header');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3');

-- CreateEnum
CREATE TYPE "grade" AS ENUM ('A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03');

-- CreateEnum
CREATE TYPE "material" AS ENUM ('Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement');

-- CreateEnum
CREATE TYPE "internal_protection" AS ENUM ('Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film');

-- CreateEnum
CREATE TYPE "flow_calculation_direction" AS ENUM ('Upstream', 'Downstream');

-- CreateEnum
CREATE TYPE "pig_type" AS ENUM ('Scrapper', '4in Argus', '6in argus', '6in Argus', 'Scraper P400', '3in Purple Scraper', 'Scraper P304', '3inscapper', '3inscrapper', '3in scraper', 'Foam', 'Shut in', 'Red Stubby', '3in red stubby', '3in GSCR', '2in GSCR', 'No Sender', '2ing scr', '2in GSCR/GFP', '4in GSCR', '2in PSCR/FLM', '3in PSCR', 'High line', '2in PSCR', '3:scrapper', 'Scraper P401', 'Scraper P300', 'Scraper P301', 'Scraper P309', 'Scraper P314', 'Scaper P314', 'Scaper PP309', 'Scraper P204', 'Scraper P208', '3in Argus', 'Ball', 'Black 3in Ball', '3in White', '3', 'SI MAY 2018', 'Scraper P206', 'Scraper P200', '3in R scr', '3in Purple Stubby', '3in SCRAPER', 'Red 3in scraper', '3in Green Disc', '4in Green Disc', '4green 2 disc', '4 gree 2 disc', '3in green disc', '3in purple disc', '2in Purple Disc', 'disc', '2 purple 2 disc', '3in purple 2 disc', '2 green 2 disc', 'bullet', '8in Foam', '3in scr', 'Scraper P305', 'Scraper P312', 'Scraper P303', 'Scraper P311', 'Scrapper P307', '4in  purple scraper', 'Torpedo', '4in', '3in Stubby', 'Stubby', '3in', 'red ball', '2in Stubby', '1in Stubby', '#3 Brown Ribbed', '#3 Green Ribbed', '#3 Blue Ribbed', '3in Blue Ribbed', '3in Green Ribbed', 'Blue Ribbed', '#3 Blu Ribbed', 'M.D. Foamy', '6in Green Ribbed', 'Red 3 scraper', 'Red 4in scraper', 'Blue 3in scraper', '4inBlue Disc', '8in Black Disc', '4in Green disc', '6in Green Disc', '6in scrapper', '4inscrapper', '4in Foam', '3in red scrape', 'GSCR', '4: Green Ribbed', '3in purple scraper', '6in green scraper', 'Purple 3in Disc');

-- CreateEnum
CREATE TYPE "pig_inspection" AS ENUM ('Good', 'Failed');

-- CreateEnum
CREATE TYPE "limiting_spec" AS ENUM ('ANSI 150', 'ANSI 300', 'ANSI 600');

-- CreateEnum
CREATE TYPE "environment_proximity_to" AS ENUM ('WB1', 'WB3', 'WB4', 'WB5', 'WC1', 'WC2', 'WC3', 'WC4');

-- CreateEnum
CREATE TYPE "geotechnical_facing" AS ENUM ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT E'Operator',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
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
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Satellite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pipeline" (
    "id" TEXT NOT NULL,
    "satelliteId" TEXT,
    "license" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromFeature" "from_to_feature",
    "to" TEXT NOT NULL,
    "toFeature" "from_to_feature",
    "length" DOUBLE PRECISION NOT NULL,
    "type" "type",
    "grade" "grade",
    "yieldStrength" INTEGER,
    "outsideDiameter" DOUBLE PRECISION,
    "wallThickness" DOUBLE PRECISION,
    "material" "material",
    "mop" INTEGER,
    "internalProtection" "internal_protection",
    "piggable" BOOLEAN,
    "piggingFrequency" INTEGER,
    "batchFrequency" "batch_frequency",
    "flowCalculationDirection" "flow_calculation_direction" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseChange" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT E'Operating',
    "substance" "substance" NOT NULL DEFAULT E'Oil Well Effluent',
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "linkToDocumentation" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicenseChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PigRun" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "pigType" "pig_type",
    "dateIn" TIMESTAMP(3) NOT NULL,
    "dateOut" TIMESTAMP(3),
    "isolationValveFunctionTest" "pig_inspection",
    "pigSenderReceiverInspection" "pig_inspection",
    "comment" TEXT,
    "operatorId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PigRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PressureTest" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "pressureTestDate" TIMESTAMP(3) NOT NULL,
    "limitingSpec" "limiting_spec",
    "infoSentOutDate" TIMESTAMP(3),
    "ddsDate" TIMESTAMP(3),
    "pressureTestReceivedDate" TIMESTAMP(3),
    "integritySheetUpdated" TIMESTAMP(3),
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PressureTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL,
    "aerialReview" BOOLEAN,
    "environmentProximityTo" "environment_proximity_to",
    "geotechnicalSlopeAngleS1" INTEGER,
    "geotechnicalFacingS1" "geotechnical_facing",
    "geotechnicalHeightS1" INTEGER,
    "geotechnicalSlopeAngleS2" INTEGER,
    "geotechnicalFacingS2" "geotechnical_facing",
    "geotechnicalHeightS2" INTEGER,
    "dateSlopeChecked" TIMESTAMP(3),
    "repairTimeDays" INTEGER,
    "releaseTimeDays" INTEGER,
    "oilReleaseCost" DOUBLE PRECISION,
    "gasReleaseCost" DOUBLE PRECISION,
    "consequencePeople" INTEGER,
    "probabilityGeo" DOUBLE PRECISION,
    "safeguardInternalProtection" INTEGER,
    "safeguardExternalCoating" INTEGER,
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Well" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oil" DOUBLE PRECISION NOT NULL,
    "water" DOUBLE PRECISION NOT NULL,
    "gas" DOUBLE PRECISION NOT NULL,
    "firstProduction" TIMESTAMP(3),
    "lastProduction" TIMESTAMP(3),
    "firstInjection" TIMESTAMP(3),
    "lastInjection" TIMESTAMP(3),
    "fdcRecId" TEXT,
    "pipelineId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Well_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oil" DOUBLE PRECISION NOT NULL,
    "water" DOUBLE PRECISION NOT NULL,
    "gas" DOUBLE PRECISION NOT NULL,
    "firstProduction" TIMESTAMP(3),
    "lastProduction" TIMESTAMP(3),
    "firstInjection" TIMESTAMP(3),
    "lastInjection" TIMESTAMP(3),
    "fdcRecId" TEXT,
    "pipelineId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineBatch" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "chemicalVolume" DOUBLE PRECISION,
    "diluentVolume" DOUBLE PRECISION,
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WellBatch" (
    "id" TEXT NOT NULL,
    "wellId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "chemicalVolume" DOUBLE PRECISION,
    "diluentVolume" DOUBLE PRECISION,
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WellBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchProduct" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "productType" TEXT,
    "cost" DOUBLE PRECISION,
    "solubility" "solubility" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BatchProduct_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "LicenseChange_pipelineId_date_key" ON "LicenseChange"("pipelineId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Well_name_key" ON "Well"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Well_fdcRecId_key" ON "Well"("fdcRecId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesPoint_name_key" ON "SalesPoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SalesPoint_fdcRecId_key" ON "SalesPoint"("fdcRecId");

-- CreateIndex
CREATE UNIQUE INDEX "BatchProduct_product_key" ON "BatchProduct"("product");

-- CreateIndex
CREATE UNIQUE INDEX "_PipelineFollows_AB_unique" ON "_PipelineFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_PipelineFollows_B_index" ON "_PipelineFollows"("B");

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_satelliteId_fkey" FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_id_fkey" FOREIGN KEY ("id") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BatchProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "Well"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BatchProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchProduct" ADD CONSTRAINT "BatchProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchProduct" ADD CONSTRAINT "BatchProduct_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineFollows" ADD FOREIGN KEY ("A") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineFollows" ADD FOREIGN KEY ("B") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
