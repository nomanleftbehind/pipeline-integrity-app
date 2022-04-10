-- AlterTable
ALTER TABLE "Risk" ADD COLUMN     "conequenceMax" INTEGER,
ADD COLUMN     "consequenceAsset" INTEGER,
ADD COLUMN     "probabilityExterior" INTEGER,
ADD COLUMN     "probabilityInterior" INTEGER,
ADD COLUMN     "riskPotentialExternal" INTEGER,
ADD COLUMN     "riskPotentialGeo" INTEGER,
ADD COLUMN     "riskPotentialInternal" INTEGER;
