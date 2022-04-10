-- AlterTable
ALTER TABLE "Risk" ADD COLUMN     "probabilityInteriorWithSafeguards" INTEGER,
ADD COLUMN     "riskPotentialInternalWithSafeguards" INTEGER,
ADD COLUMN     "safeguardChemicalInhibition" INTEGER,
ADD COLUMN     "safeguardPigging" INTEGER;
