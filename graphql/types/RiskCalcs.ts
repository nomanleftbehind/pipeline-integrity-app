import { EnvironmentProximityToEnumMembers } from './Risk';
import { totalFluidsCalc } from './InjectionPoint';
import { databaseEnumToServerEnum, TypeEnumMembers, MaterialEnumMembers } from './Pipeline';
import { SubstanceEnumMembers, StatusEnumMembers } from './LicenseChange';
import { Risk as IRisk } from '@prisma/client';
import { NexusGenArgTypes } from '../../node_modules/@types/nexus-typegen/index';

interface ICostPerM3ReleasedCalcArgs {
  currentSubstance: NexusGenArgTypes['Risk']['costPerM3Released']['currentSubstance'];
  oil: NexusGenArgTypes['Risk']['costPerM3Released']['oil'];
  water: NexusGenArgTypes['Risk']['costPerM3Released']['water'];
  gas: NexusGenArgTypes['Risk']['costPerM3Released']['gas'];
}

export const costPerM3ReleasedCalc = ({ currentSubstance, oil, water, gas }: ICostPerM3ReleasedCalcArgs) => {
  currentSubstance = databaseEnumToServerEnum(SubstanceEnumMembers, currentSubstance);
  // Use loose unequality to capture both null and undefined
  if (oil != null && water != null && gas != null) {
    return currentSubstance === 'FreshWater' ? 0 : 25000 * water + 1000 * gas + 15000 * oil;
  }
  return null;
}

interface IEnviroRiskCalcArgs {
  environmentProximityTo: IRisk['environmentProximityTo'];
  currentSubstance: NexusGenArgTypes['Risk']['enviroRisk']['currentSubstance'];
  currentStatus: NexusGenArgTypes['Risk']['enviroRisk']['currentStatus'];
  oil: NexusGenArgTypes['Risk']['enviroRisk']['oil'];
  water: NexusGenArgTypes['Risk']['enviroRisk']['water'];
  gas: NexusGenArgTypes['Risk']['enviroRisk']['gas'];
}

export const enviroRiskCalc = ({ environmentProximityTo, currentSubstance, currentStatus, oil, water, gas }: IEnviroRiskCalcArgs) => {
  currentSubstance = databaseEnumToServerEnum(SubstanceEnumMembers, currentSubstance);
  currentStatus = databaseEnumToServerEnum(StatusEnumMembers, currentStatus);
  environmentProximityTo = databaseEnumToServerEnum(EnvironmentProximityToEnumMembers, environmentProximityTo) || null;

  if (oil == null || water == null || gas == null) {
    return null;
  } else {
    const totalFluids = totalFluidsCalc(oil, water, gas);
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
}

interface IAssetRiskCalcArgs {
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  oil: NexusGenArgTypes['Risk']['assetRisk']['oil'];
  water: NexusGenArgTypes['Risk']['assetRisk']['water'];
  gas: NexusGenArgTypes['Risk']['assetRisk']['gas'];
}

export const assetRiskCalc = ({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas }: IAssetRiskCalcArgs) => {
  if (oil == null || water == null || gas == null) {
    return null;
  } else {
    const totalFluids = totalFluidsCalc(oil, water, gas);
    if (totalFluids === 0) {
      return 1;
    } else if (gasReleaseCost != null && oilReleaseCost != null && repairTimeDays != null) {
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
}

interface IProbabilityInteriorCalcArgs {
  currentSubstance: NexusGenArgTypes['Risk']['probabilityInterior']['currentSubstance'];
  currentStatus: NexusGenArgTypes['Risk']['probabilityInterior']['currentStatus'];
  type: NexusGenArgTypes['Risk']['probabilityInterior']['type'];
  material: NexusGenArgTypes['Risk']['probabilityInterior']['material'];
}

export const probabilityInteriorCalc = ({ currentSubstance, currentStatus, type, material }: IProbabilityInteriorCalcArgs) => {

  currentSubstance = databaseEnumToServerEnum(SubstanceEnumMembers, currentSubstance);
  currentStatus = databaseEnumToServerEnum(StatusEnumMembers, currentStatus);
  type = databaseEnumToServerEnum(TypeEnumMembers, type);
  material = databaseEnumToServerEnum(MaterialEnumMembers, material);

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
  currentStatus: NexusGenArgTypes['Risk']['probabilityExterior']['currentStatus'];
  firstLicenseDate: NexusGenArgTypes['Risk']['probabilityExterior']['firstLicenseDate'];
  material: NexusGenArgTypes['Risk']['probabilityExterior']['material'];
}

export const probabilityExteriorCalc = ({ currentStatus, firstLicenseDate, material }: IProbabilityExteriorCalcArgs) => {
  if (currentStatus === 'Discontinued' || currentStatus === 'Abandoned') {
    return 1;
  }
  if (material === 'Steel') {
    let vintage;
    if (firstLicenseDate instanceof Date) {
      vintage = firstLicenseDate.getFullYear();
    }
    if (typeof firstLicenseDate === 'string') {
      vintage = new Date(firstLicenseDate).getFullYear();
    }
    if (typeof vintage === 'number' && vintage > 2000) {
      return 3;
    }
    return 4;
  }
  if (material === 'Fiberglass' || material === 'Composite' || material === 'Polyethylene' || material === 'AsbestosCement' || material === 'PolyvinylChloride' || material === 'Aluminum') {
    return 1;
  }
  return null;
}

interface IGeoRiskPotentialCalcArgs {
  riskPeople: IRisk['riskPeople'];
  probabilityGeo: IRisk['probabilityGeo'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  currentSubstance: NexusGenArgTypes['Risk']['geoRiskPotential']['currentSubstance'];
  currentStatus: NexusGenArgTypes['Risk']['geoRiskPotential']['currentStatus'];
  oil: NexusGenArgTypes['Risk']['geoRiskPotential']['oil'];
  water: NexusGenArgTypes['Risk']['geoRiskPotential']['water'];
  gas: NexusGenArgTypes['Risk']['geoRiskPotential']['gas'];
}

export const geoRiskPotentialCalc = ({ riskPeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, oil, water, gas }: IGeoRiskPotentialCalcArgs) => {
  const enviroRisk = enviroRiskCalc({ environmentProximityTo, currentSubstance, currentStatus, oil, water, gas });
  const assetRisk = assetRiskCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas });
  const result = Math.max(riskPeople || 1, enviroRisk || 1, assetRisk || 1) * (probabilityGeo || 1);
  return result;
}

interface IInternalRiskPotentialCalcArgs {
  riskPeople: IRisk['riskPeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  currentSubstance: NexusGenArgTypes['Risk']['internalRiskPotential']['currentSubstance'];
  currentStatus: NexusGenArgTypes['Risk']['internalRiskPotential']['currentStatus'];
  type: NexusGenArgTypes['Risk']['internalRiskPotential']['type'];
  material: NexusGenArgTypes['Risk']['internalRiskPotential']['material'];
  oil: NexusGenArgTypes['Risk']['internalRiskPotential']['oil'];
  water: NexusGenArgTypes['Risk']['internalRiskPotential']['water'];
  gas: NexusGenArgTypes['Risk']['internalRiskPotential']['gas'];
}

export const internalRiskPotentialCalc = ({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, type, material, oil, water, gas }: IInternalRiskPotentialCalcArgs) => {
  const enviroRisk = enviroRiskCalc({ environmentProximityTo, currentSubstance, currentStatus, oil, water, gas });
  const assetRisk = assetRiskCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas });
  const probabilityInterior = probabilityInteriorCalc({ currentSubstance, currentStatus, type, material });
  const result = Math.max(riskPeople || 1, enviroRisk || 1, assetRisk || 1) * (probabilityInterior || 1);
  return result;
}

interface IExternalRiskPotentialCalcArgs {
  riskPeople: IRisk['riskPeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  currentSubstance: NexusGenArgTypes['Risk']['externalRiskPotential']['currentSubstance'];
  currentStatus: NexusGenArgTypes['Risk']['externalRiskPotential']['currentStatus'];
  firstLicenseDate: NexusGenArgTypes['Risk']['externalRiskPotential']['firstLicenseDate'];
  material: NexusGenArgTypes['Risk']['externalRiskPotential']['material'];
  oil: NexusGenArgTypes['Risk']['externalRiskPotential']['oil'];
  water: NexusGenArgTypes['Risk']['externalRiskPotential']['water'];
  gas: NexusGenArgTypes['Risk']['externalRiskPotential']['gas'];
}

export const externalRiskPotentialCalc = ({ riskPeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, currentSubstance, currentStatus, firstLicenseDate, material, oil, water, gas }: IExternalRiskPotentialCalcArgs) => {
  const enviroRisk = enviroRiskCalc({ environmentProximityTo, currentSubstance, currentStatus, oil, water, gas });
  const assetRisk = assetRiskCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, water, gas });
  const probabilityExterior = probabilityExteriorCalc({ currentStatus, firstLicenseDate, material });
  const result = Math.max(riskPeople || 1, enviroRisk || 1, assetRisk || 1) * (probabilityExterior || 1);
  return result;
}