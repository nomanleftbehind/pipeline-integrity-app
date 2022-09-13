-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('Admin', 'Engineer', 'Regulatory', 'Office', 'Operator', 'Chemical', 'Cathodic', 'Contractor');

-- CreateEnum
CREATE TYPE "solubility" AS ENUM ('Oil', 'Water');

-- CreateEnum
CREATE TYPE "flow_calculation_direction" AS ENUM ('Upstream', 'Downstream');

-- CreateEnum
CREATE TYPE "pig_inspection" AS ENUM ('Good', 'Failed');

-- CreateEnum
CREATE TYPE "limiting_spec" AS ENUM ('ANSI 150', 'ANSI 300', 'ANSI 600');

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
    "flowCalculationDirection" "flow_calculation_direction" NOT NULL,
    "piggable" BOOLEAN,
    "piggingFrequency" INTEGER,
    "comment" TEXT,
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
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FromToFeature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FromToFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternalProtection" (
    "id" TEXT NOT NULL,
    "internalProtection" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternalProtection_pkey" PRIMARY KEY ("id")
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
    "date" TIMESTAMP(3) NOT NULL,
    "statusId" TEXT NOT NULL,
    "substanceId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromFeatureId" TEXT,
    "to" TEXT NOT NULL,
    "toFeatureId" TEXT,
    "length" DOUBLE PRECISION NOT NULL,
    "pipelineTypeId" TEXT,
    "gradeId" TEXT,
    "yieldStrength" INTEGER,
    "outsideDiameter" DOUBLE PRECISION,
    "wallThickness" DOUBLE PRECISION,
    "materialId" TEXT,
    "mop" INTEGER,
    "internalProtectionId" TEXT,
    "comment" TEXT,
    "linkToDocumentation" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicenseChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Substance" (
    "id" TEXT NOT NULL,
    "substance" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Substance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CathodicSurvey" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,
    "deficiencies" BOOLEAN,
    "correctionDate" TIMESTAMP(3),
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CathodicSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
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
    "date" TIMESTAMP(3) NOT NULL,
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
    "testPressure" DOUBLE PRECISION,
    "requiredWTForTestPressure" DOUBLE PRECISION,
    "corrosionAllowance" DOUBLE PRECISION,
    "waterForPigging" DOUBLE PRECISION,

    CONSTRAINT "PressureTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL,
    "aerialReview" BOOLEAN,
    "environmentId" TEXT,
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
CREATE TABLE "Geotechnical" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "slopeAngleS1" INTEGER,
    "facingS1" "geotechnical_facing",
    "heightS1" INTEGER,
    "slopeAngleS2" INTEGER,
    "facingS2" "geotechnical_facing",
    "heightS2" INTEGER,
    "dateSlopeChecked" TIMESTAMP(3),
    "comment" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Geotechnical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskEnvironment" (
    "id" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskEnvironment_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Grade_grade_key" ON "Grade"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "FromToFeature_feature_key" ON "FromToFeature"("feature");

-- CreateIndex
CREATE UNIQUE INDEX "Material_material_key" ON "Material"("material");

-- CreateIndex
CREATE UNIQUE INDEX "InternalProtection_internalProtection_key" ON "InternalProtection"("internalProtection");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseChange_pipelineId_date_key" ON "LicenseChange"("pipelineId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Substance_substance_key" ON "Substance"("substance");

-- CreateIndex
CREATE UNIQUE INDEX "CathodicSurvey_pipelineId_date_key" ON "CathodicSurvey"("pipelineId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PigType_type_key" ON "PigType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "RiskEnvironment_environment_key" ON "RiskEnvironment"("environment");

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
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineType" ADD CONSTRAINT "PipelineType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineType" ADD CONSTRAINT "PipelineType_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FromToFeature" ADD CONSTRAINT "FromToFeature_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FromToFeature" ADD CONSTRAINT "FromToFeature_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalProtection" ADD CONSTRAINT "InternalProtection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalProtection" ADD CONSTRAINT "InternalProtection_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_substanceId_fkey" FOREIGN KEY ("substanceId") REFERENCES "Substance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_fromFeatureId_fkey" FOREIGN KEY ("fromFeatureId") REFERENCES "FromToFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_toFeatureId_fkey" FOREIGN KEY ("toFeatureId") REFERENCES "FromToFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_pipelineTypeId_fkey" FOREIGN KEY ("pipelineTypeId") REFERENCES "PipelineType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_internalProtectionId_fkey" FOREIGN KEY ("internalProtectionId") REFERENCES "InternalProtection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseChange" ADD CONSTRAINT "LicenseChange_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substance" ADD CONSTRAINT "Substance_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substance" ADD CONSTRAINT "Substance_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CathodicSurvey" ADD CONSTRAINT "CathodicSurvey_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CathodicSurvey" ADD CONSTRAINT "CathodicSurvey_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CathodicSurvey" ADD CONSTRAINT "CathodicSurvey_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CathodicSurvey" ADD CONSTRAINT "CathodicSurvey_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "RiskEnvironment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geotechnical" ADD CONSTRAINT "Geotechnical_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geotechnical" ADD CONSTRAINT "Geotechnical_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geotechnical" ADD CONSTRAINT "Geotechnical_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskEnvironment" ADD CONSTRAINT "RiskEnvironment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskEnvironment" ADD CONSTRAINT "RiskEnvironment_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
