-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('Admin', 'Engineer', 'Office', 'Operator', 'Chemical', 'Cathodic', 'Contractor');

-- CreateEnum
CREATE TYPE "substance" AS ENUM ('Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas');

-- CreateEnum
CREATE TYPE "solubility" AS ENUM ('Oil', 'Water');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed');

-- CreateEnum
CREATE TYPE "material" AS ENUM ('Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement');

-- CreateEnum
CREATE TYPE "internal_protection" AS ENUM ('Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film');

-- CreateEnum
CREATE TYPE "flow_calculation_direction" AS ENUM ('Upstream', 'Downstream');

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
    "role" "user_role" NOT NULL DEFAULT 'Operator',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangePassword" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangePassword_pkey" PRIMARY KEY ("key","value")
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
    "fromFeatureId" TEXT,
    "to" TEXT NOT NULL,
    "toFeatureId" TEXT,
    "length" DOUBLE PRECISION NOT NULL,
    "pipelineTypeId" TEXT,
    "pipelineGradeId" TEXT,
    "yieldStrength" INTEGER,
    "outsideDiameter" DOUBLE PRECISION,
    "wallThickness" DOUBLE PRECISION,
    "material" "material",
    "mop" INTEGER,
    "internalProtection" "internal_protection",
    "piggable" BOOLEAN,
    "piggingFrequency" INTEGER,
    "flowCalculationDirection" "flow_calculation_direction" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineGrade" (
    "id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineFromToFeature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineFromToFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelinesOnPipelines" (
    "upstreamId" TEXT NOT NULL,
    "downstreamId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelinesOnPipelines_pkey" PRIMARY KEY ("upstreamId","downstreamId")
);

-- CreateTable
CREATE TABLE "LicenseChange" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Operating',
    "substance" "substance" NOT NULL DEFAULT 'Oil Well Effluent',
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
    "pigTypeId" TEXT,
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
CREATE TABLE "PigType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PigType_pkey" PRIMARY KEY ("id")
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
    "requiredWTForMop" DOUBLE PRECISION,
    "mopTestPressure" DOUBLE PRECISION,
    "maxPressureOfLimitingSpec" DOUBLE PRECISION,
    "pressureTestPressure" DOUBLE PRECISION,
    "requiredWTForTestPressure" DOUBLE PRECISION,
    "pressureTestCorrosionAllowance" DOUBLE PRECISION,
    "waterForPigging" DOUBLE PRECISION,

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
    "probabilityGeo" INTEGER,
    "safeguardInternalProtection" INTEGER,
    "safeguardExternalCoating" INTEGER,
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "costPerM3Released" DOUBLE PRECISION,
    "consequenceEnviro" INTEGER,
    "consequenceAsset" INTEGER,
    "consequenceMax" INTEGER,
    "probabilityInterior" INTEGER,
    "probabilityExterior" INTEGER,
    "riskPotentialGeo" INTEGER,
    "riskPotentialInternal" INTEGER,
    "riskPotentialExternal" INTEGER,
    "safeguardPigging" INTEGER,
    "safeguardChemicalInhibition" INTEGER,
    "probabilityInteriorWithSafeguards" INTEGER,
    "riskPotentialInternalWithSafeguards" INTEGER,
    "safeguardCathodic" INTEGER,
    "probabilityExteriorWithSafeguards" INTEGER,
    "riskPotentialExternalWithSafeguards" INTEGER,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chemical" (
    "id" TEXT NOT NULL,
    "chemicalSupplierId" TEXT,
    "baselineFluidAnalysisDate" TIMESTAMP(3),
    "scaling" BOOLEAN,
    "bacteria" BOOLEAN,
    "co2" BOOLEAN,
    "o2" BOOLEAN,
    "h2s" BOOLEAN,
    "continuousInjection" BOOLEAN,
    "injectionRate" DOUBLE PRECISION,
    "downholeBatch" BOOLEAN,
    "inhibitorPipelineBatch" BOOLEAN,
    "bacteriaTreatment" BOOLEAN,
    "scaleTreatment" BOOLEAN,
    "batchFrequency" INTEGER,
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chemical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChemicalSupplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChemicalSupplier_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Satellite_name_key" ON "Satellite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pipeline_license_segment_key" ON "Pipeline"("license", "segment");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineType_type_key" ON "PipelineType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineGrade_grade_key" ON "PipelineGrade"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineFromToFeature_feature_key" ON "PipelineFromToFeature"("feature");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseChange_pipelineId_date_key" ON "LicenseChange"("pipelineId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "PigType_type_key" ON "PigType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ChemicalSupplier_name_key" ON "ChemicalSupplier"("name");

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

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_satelliteId_fkey" FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_fromFeatureId_fkey" FOREIGN KEY ("fromFeatureId") REFERENCES "PipelineFromToFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_toFeatureId_fkey" FOREIGN KEY ("toFeatureId") REFERENCES "PipelineFromToFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_pipelineTypeId_fkey" FOREIGN KEY ("pipelineTypeId") REFERENCES "PipelineType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_pipelineGradeId_fkey" FOREIGN KEY ("pipelineGradeId") REFERENCES "PipelineGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineType" ADD CONSTRAINT "PipelineType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineType" ADD CONSTRAINT "PipelineType_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineGrade" ADD CONSTRAINT "PipelineGrade_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineGrade" ADD CONSTRAINT "PipelineGrade_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineFromToFeature" ADD CONSTRAINT "PipelineFromToFeature_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineFromToFeature" ADD CONSTRAINT "PipelineFromToFeature_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelinesOnPipelines" ADD CONSTRAINT "PipelinesOnPipelines_upstreamId_fkey" FOREIGN KEY ("upstreamId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelinesOnPipelines" ADD CONSTRAINT "PipelinesOnPipelines_downstreamId_fkey" FOREIGN KEY ("downstreamId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelinesOnPipelines" ADD CONSTRAINT "PipelinesOnPipelines_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelinesOnPipelines" ADD CONSTRAINT "PipelinesOnPipelines_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_pigTypeId_fkey" FOREIGN KEY ("pigTypeId") REFERENCES "PigType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigRun" ADD CONSTRAINT "PigRun_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigType" ADD CONSTRAINT "PigType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PigType" ADD CONSTRAINT "PigType_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressureTest" ADD CONSTRAINT "PressureTest_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_id_fkey" FOREIGN KEY ("id") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chemical" ADD CONSTRAINT "Chemical_id_fkey" FOREIGN KEY ("id") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chemical" ADD CONSTRAINT "Chemical_chemicalSupplierId_fkey" FOREIGN KEY ("chemicalSupplierId") REFERENCES "ChemicalSupplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chemical" ADD CONSTRAINT "Chemical_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chemical" ADD CONSTRAINT "Chemical_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalSupplier" ADD CONSTRAINT "ChemicalSupplier_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalSupplier" ADD CONSTRAINT "ChemicalSupplier_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPoint" ADD CONSTRAINT "SalesPoint_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BatchProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBatch" ADD CONSTRAINT "PipelineBatch_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "Well"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BatchProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WellBatch" ADD CONSTRAINT "WellBatch_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchProduct" ADD CONSTRAINT "BatchProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchProduct" ADD CONSTRAINT "BatchProduct_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
