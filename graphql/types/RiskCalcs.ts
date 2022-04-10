import { Risk as IRisk, LicenseChange as ILicenseChange, Pipeline as IPipeline } from '@prisma/client';



interface IConsequenceEnviroCalcArgs {
  environmentProximityTo: IRisk['environmentProximityTo'];
  currentSubstance: ILicenseChange['substance'];
  currentStatus: ILicenseChange['status'];
  totalFluids: number;
}

export const consequenceEnviroCalc = async ({ environmentProximityTo, currentSubstance, currentStatus, totalFluids }: IConsequenceEnviroCalcArgs) => {

  // environmentProximityTo = databaseEnumToServerEnum(EnvironmentProximityToEnumMembers, environmentProximityTo) || null;

  if (currentStatus === 'Discontinued' || currentStatus === 'Abandoned' || currentSubstance === 'FreshWater') {
    return 1;
  } else if (currentSubstance === 'NaturalGas' || currentSubstance === 'FuelGas' || currentSubstance === 'SourNaturalGas') {

    if (environmentProximityTo === null) {
      // no water body and no crossing.  (eg. middle of field)
      return totalFluids >= 1 ? 2 : 1;
    } else if (['WC1', 'WB3'].includes(environmentProximityTo)) {
      // WC1 = Ephemeral, WB3 = non-permanent seasonal/temporary wetlands; Fens; Bogs;
      return totalFluids >= 1 ? 3 : 2;
    } else if (environmentProximityTo === 'WC4' || environmentProximityTo === 'WC3' || environmentProximityTo === 'WC2' || environmentProximityTo === 'WB5' || environmentProximityTo === 'WB4') {
      return totalFluids >= 1 ? 4 : 3;
    } else {
      return null;
    }
  } else if (currentSubstance === 'OilWellEffluent' || currentSubstance === 'CrudeOil' || currentSubstance === 'SaltWater' /*|| currentSubstance === 'Sour Crude'*/) {
    if (environmentProximityTo === null || environmentProximityTo === 'WB1') {
      return 2;
    } else if (environmentProximityTo === 'WC1' || environmentProximityTo === 'WC2' || environmentProximityTo === 'WB3') {
      return 3;
    } else if (environmentProximityTo === 'WC3' || environmentProximityTo === 'WB4') {
      return 4;
    } else if (environmentProximityTo === 'WC4' || environmentProximityTo === 'WB5') {
      return 5;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

interface IConsequenceAssetCalcArgs {
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  oil: number;
  gas: number;
  totalFluids: number;
}

export const consequenceAssetCalc = async ({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, gas, totalFluids }: IConsequenceAssetCalcArgs) => {

  if (totalFluids === 0) {
    return 1;
  } else if (gasReleaseCost !== null && oilReleaseCost !== null && repairTimeDays !== null) {
    const i = (gas * gasReleaseCost + oil * oilReleaseCost) * repairTimeDays
    if (i >= 1_000_000) {
      return 4;
    } else if (i < 1_000_000 && i >= 500_000) {
      return 3;
    } else if (i < 500_000 && i > 0) {
      return 2;
    } else {
      return 1
    }
  } else {
    return null;
  }
}

interface IProbabilityInteriorCalcArgs {
  type: IPipeline['type'];
  material: IPipeline['material'];
  currentSubstance: ILicenseChange['substance'];
  currentStatus: ILicenseChange['status'];
}

export const probabilityInteriorCalc = async ({ type, material, currentSubstance, currentStatus }: IProbabilityInteriorCalcArgs) => {

  const isTypeZ245 = type && ['TypeZ2451', 'TypeZ2453'].includes(type);

  if ((currentStatus && ['Discontinued', 'Abandoned'].includes(currentStatus)) || (material && ['Fiberglass', 'Composite', 'Polyethylene', 'AsbestosCement', 'PolyvinylChloride', 'Aluminum'].includes(material))) {
    return 1;
  } else if (material === 'Steel') {
    if (currentSubstance && ['OilWellEffluent', 'SaltWater', 'FreshWater'].includes(currentSubstance)) {
      if (isTypeZ245) {
        return 3;
      } else {
        return 4;
      }
    } else if (currentSubstance === 'CrudeOil'/* || currentSubstance === 'Sour Crude'*/) {
      if (isTypeZ245) {
        return 2;
      } else {
        return 3;
      }
    } else if (currentSubstance && ['NaturalGas', 'FuelGas', 'SourNaturalGas'].includes(currentSubstance)) {
      if (isTypeZ245) {
        return 1;
      } else {
        return 2;
      }
    } else {
      // Create Error Message
      // MsgBox === 'SUBSTANCE type doesn't exist in vba code.'
      return null;
    }
  } else {
    return null;
  }
}

interface IProbabilityExteriorCalcArgs {
  firstLicenseDate: ILicenseChange['date'];
  currentStatus: ILicenseChange['status'];
  material: IPipeline['material'];
}

export const probabilityExteriorCalc = async ({ firstLicenseDate, currentStatus, material }: IProbabilityExteriorCalcArgs) => {

  if (currentStatus === 'Discontinued' || currentStatus === 'Abandoned') {
    return 1;
  }
  if (material === 'Steel') {
    const vintage = firstLicenseDate.getFullYear();
    if (vintage > 2000) {
      return 3;
    }
    return 4;
  }
  if (material === 'Fiberglass' || material === 'Composite' || material === 'Polyethylene' || material === 'AsbestosCement' || material === 'PolyvinylChloride' || material === 'Aluminum') {
    return 1;
  }
  return null;
}


interface IConequenceMaxCalcArgs {
  consequencePeople: IRisk['consequencePeople'];
  consequenceEnviro: IRisk['consequenceEnviro'];
  consequenceAsset: IRisk['consequenceAsset'];
}

export const conequenceMaxCalc = async ({ consequencePeople, consequenceEnviro, consequenceAsset }: IConequenceMaxCalcArgs) => {
  const maxConsequence = [consequencePeople, consequenceEnviro, consequenceAsset].reduce((previousValue, currentValue) => {
    if (typeof previousValue === 'number' && typeof currentValue === 'number') {
      return currentValue > previousValue ? currentValue : previousValue;
    }
    if (typeof currentValue === 'number') {
      return currentValue
    }
    return previousValue;
  });
  return maxConsequence;
}


interface IRiskPotentialGeoCalcArgs {
  consequenceMax: IRisk['consequenceMax'];
  probabilityGeo: IRisk['probabilityGeo'];
}

export const riskPotentialGeoCalc = async ({ consequenceMax, probabilityGeo }: IRiskPotentialGeoCalcArgs) => {
  if (typeof consequenceMax === 'number' && typeof probabilityGeo === 'number') {
    return consequenceMax * probabilityGeo;
  }
  return null;
}

interface IRiskPotentialInternalCalcArgs {
  consequenceMax: IRisk['consequenceMax'];
  probabilityInterior: IRisk['probabilityInterior'];

}

export const riskPotentialInternalCalc = async ({ consequenceMax, probabilityInterior }: IRiskPotentialInternalCalcArgs) => {
  if (typeof consequenceMax === 'number' && typeof probabilityInterior === 'number') {
    return consequenceMax * probabilityInterior;
  }
  return null;
}

interface IRiskPotentialExternalCalcArgs {
  consequenceMax: IRisk['consequenceMax'];
  probabilityExterior: IRisk['probabilityExterior'];
}

export const riskPotentialExternalCalc = async ({ consequenceMax, probabilityExterior }: IRiskPotentialExternalCalcArgs) => {
  if (typeof consequenceMax === 'number' && typeof probabilityExterior === 'number') {
    return consequenceMax * probabilityExterior;
  }
  return null;
}

interface ISafeguardPiggingCalcArgs {
  piggable: IPipeline['piggable'];
}

export const safeguardPiggingCalc = async ({ piggable }: ISafeguardPiggingCalcArgs) => {
  if (piggable !== null) {
    if (piggable) {
      return 1;
    }
    return 0;
  }
  return null;
}

export const safeguardChemicalInhibitionCalc = async () => {
  return null;
}


interface IProbabilityInteriorWithSafeguardsArgs {
  probabilityInterior: IRisk['probabilityInterior'];
  safeguardPigging: IRisk['safeguardPigging'];
  safeguardChemicalInhibition: IRisk['safeguardChemicalInhibition'];
  safeguardInternalProtection: IRisk['safeguardInternalProtection'];
}

export const probabilityInteriorWithSafeguardsCalc = async ({ probabilityInterior, safeguardPigging, safeguardChemicalInhibition, safeguardInternalProtection }: IProbabilityInteriorWithSafeguardsArgs) => {
  if (typeof probabilityInterior === 'number') {
    const result = probabilityInterior - (safeguardInternalProtection || 0) - (safeguardPigging || 0) - (safeguardChemicalInhibition || 0);
    return result < 0 ? 0 : result;
  }
  return null;
}


interface IRiskPotentialInternalWithSafeguardsCalcArgs {
  consequenceMax: IRisk['consequenceMax'];
  probabilityInteriorWithSafeguards: IRisk['probabilityInteriorWithSafeguards'];
}

export const riskPotentialInternalWithSafeguardsCalc = async ({ consequenceMax, probabilityInteriorWithSafeguards }: IRiskPotentialInternalWithSafeguardsCalcArgs) => {
  if (typeof consequenceMax === 'number' && typeof probabilityInteriorWithSafeguards === 'number') {
    return consequenceMax * probabilityInteriorWithSafeguards;
  }
  return null;
}