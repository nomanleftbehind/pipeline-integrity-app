import { EnvironmentProximityToEnumMembers } from './Risk';
import { totalFluidsCalc } from './Well';
import { totalPipelineFlowRawQuery } from './PipelineFlow';
import { databaseEnumToServerEnum } from './Pipeline';
import { Context } from '../context';
import { Risk as IRisk } from '@prisma/client';

interface ICostPerM3ReleasedCalcArgs {
  id: IRisk['id'];
  ctx: Context;
}

export const costPerM3ReleasedCalc = async ({ id, ctx }: ICostPerM3ReleasedCalcArgs) => {

  const { substance: currentSubstance } = await ctx.prisma.licenseChange.findFirst({
    where: { pipelineId: id },
    orderBy: { date: 'desc' },
    select: { substance: true },
  }) || {};

  const { oil, water, gas } = (await totalPipelineFlowRawQuery({ idList: [id], ctx }))?.[0] || {};
  if (typeof oil === 'number' && typeof water === 'number' && typeof gas === 'number') {
    return currentSubstance === 'FreshWater' ? 0 : 25000 * water + 1000 * gas + 15000 * oil;
  }
  return null;
}

interface IConsequenceEnviroCalcArgs {
  id: IRisk['id'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  ctx: Context;
}

export const consequenceEnviroCalc = async ({ id, environmentProximityTo, ctx }: IConsequenceEnviroCalcArgs) => {

  const { status: currentStatus, substance: currentSubstance } = await ctx.prisma.licenseChange.findFirst({
    where: { pipelineId: id },
    orderBy: { date: 'desc' },
    select: {
      status: true,
      substance: true
    },
  }) || {};

  environmentProximityTo = databaseEnumToServerEnum(EnvironmentProximityToEnumMembers, environmentProximityTo) || null;

  const { oil, water, gas } = (await totalPipelineFlowRawQuery({ idList: [id], ctx }))?.[0] || {};

  if (oil == null || water == null || gas == null) {
    return null;
  } else {
    const totalFluids = totalFluidsCalc({ oil, water, gas });
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

interface IConsequenceAssetCalcArgs {
  id: IRisk['id'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  ctx: Context;
}

export const consequenceAssetCalc = async ({ id, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx }: IConsequenceAssetCalcArgs) => {
  const { flowCalculationDirection } = await ctx.prisma.pipeline.findUnique({
    where: { id },
    select: { flowCalculationDirection: true }
  }) || {};
  if (flowCalculationDirection) {
    const { oil, water, gas } = (await totalPipelineFlowRawQuery({ idList: [id], ctx }))?.[0] || {};
    if (typeof oil === 'number' && typeof water === 'number' && typeof gas === 'number') {
      const totalFluids = totalFluidsCalc({ oil, water, gas });
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
  return null;
}

interface IProbabilityInteriorCalcArgs {
  id: IRisk['id'];
  ctx: Context;
}

export const probabilityInteriorCalc = async ({ id, ctx }: IProbabilityInteriorCalcArgs) => {
  const { type, material } = await ctx.prisma.pipeline.findUnique({
    where: { id },
    select: {
      type: true,
      material: true,
    }
  }) || {};
  const { status: currentStatus, substance: currentSubstance } = await ctx.prisma.licenseChange.findFirst({
    where: { pipelineId: id },
    orderBy: { date: 'desc' },
    select: {
      status: true,
      substance: true
    },
  }) || {};

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
  id: IRisk['id'];
  ctx: Context;
}

export const probabilityExteriorCalc = async ({ id, ctx }: IProbabilityExteriorCalcArgs) => {
  const { status: currentStatus } = await ctx.prisma.licenseChange.findFirst({
    where: { pipelineId: id },
    orderBy: { date: 'desc' },
    select: { status: true },
  }) || {};

  const { date: firstLicenseDate } = await ctx.prisma.licenseChange.findFirst({
    where: { pipelineId: id },
    orderBy: { date: 'asc' },
    select: { date: true },
  }) || {};

  const { material } = await ctx.prisma.pipeline.findUnique({
    where: { id },
    select: { material: true }
  }) || {};

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


interface IConequenceMaxCalcArgs {
  id: IRisk['id'];
  consequencePeople: IRisk['consequencePeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  ctx: Context;
}

export const conequenceMaxCalc = async ({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx }: IConequenceMaxCalcArgs) => {
  const consequenceEnviro = await consequenceEnviroCalc({ id, environmentProximityTo, ctx });
  const consequenceAsset = await consequenceAssetCalc({ id, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx });

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
  id: IRisk['id'];
  consequencePeople: IRisk['consequencePeople'];
  probabilityGeo: IRisk['probabilityGeo'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  ctx: Context;
}

export const riskPotentialGeoCalc = async ({ id, consequencePeople, probabilityGeo, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx }: IRiskPotentialGeoCalcArgs) => {
  const maxConsequence = await conequenceMaxCalc({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx });
  if (typeof maxConsequence === 'number' && typeof probabilityGeo === 'number') {
    return maxConsequence * probabilityGeo;
  }
  return null;
}

interface IRiskPotentialInternalCalcArgs {
  id: IRisk['id'];
  consequencePeople: IRisk['consequencePeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  ctx: Context;
}

export const riskPotentialInternalCalc = async ({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx }: IRiskPotentialInternalCalcArgs) => {
  const maxConsequence = await conequenceMaxCalc({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx });
  const probabilityInterior = await probabilityInteriorCalc({ id, ctx });
  if (typeof maxConsequence === 'number' && typeof probabilityInterior === 'number') {
    return maxConsequence * probabilityInterior;
  }
  return null;
}

interface IRiskPotentialExternalCalcArgs {
  id: IRisk['id'];
  consequencePeople: IRisk['consequencePeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  ctx: Context;
}

export const riskPotentialExternalCalc = async ({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx }: IRiskPotentialExternalCalcArgs) => {
  const maxConsequence = await conequenceMaxCalc({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx });
  const probabilityExterior = await probabilityExteriorCalc({ id, ctx });
  if (typeof maxConsequence === 'number' && typeof probabilityExterior === 'number') {
    return maxConsequence * probabilityExterior;
  }
  return null;
}

interface ISafeguardPiggingCalcArgs {
  id: IRisk['id'];
  ctx: Context;
}

export const safeguardPiggingCalc = async ({ id, ctx }: ISafeguardPiggingCalcArgs) => {
  const { piggable } = await ctx.prisma.pipeline.findUnique({
    where: { id },
    select: { piggable: true }
  }) || {};
  if (piggable != null) {
    if (piggable) {
      return 1;
    }
    return 0;
  }
  return null;
}

export const safeguardChemicalInhibitionCalc = async () => {
  return 0;
}


interface IProbabilityInteriorWithSafeguardsArgs {
  id: IRisk['id'];
  safeguardInternalProtection: IRisk['safeguardInternalProtection'];
  ctx: Context;
}

export const probabilityInteriorWithSafeguardsCalc = async ({ id, safeguardInternalProtection, ctx }: IProbabilityInteriorWithSafeguardsArgs) => {
  const probabilityInterior = await probabilityInteriorCalc({ id, ctx });
  const safeguardPigging = await safeguardPiggingCalc({ id, ctx });
  const safeguardChemicalInhibition = await safeguardChemicalInhibitionCalc();
  if (typeof probabilityInterior === 'number') {
    const result = probabilityInterior - (safeguardInternalProtection || 0) - (safeguardPigging || 0) - safeguardChemicalInhibition;
    return result < 0 ? 0 : result;
  }
  return null;
}


interface IRiskPotentialInternalWithSafeguardsCalcArgs {
  id: IRisk['id'];
  consequencePeople: IRisk['consequencePeople'];
  environmentProximityTo: IRisk['environmentProximityTo'];
  repairTimeDays: IRisk['repairTimeDays'];
  oilReleaseCost: IRisk['oilReleaseCost'];
  gasReleaseCost: IRisk['gasReleaseCost'];
  safeguardInternalProtection: IRisk['safeguardInternalProtection'];
  ctx: Context;
}

export const riskPotentialInternalWithSafeguardsCalc = async ({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, safeguardInternalProtection, ctx }: IRiskPotentialInternalWithSafeguardsCalcArgs) => {
  const maxConsequence = await conequenceMaxCalc({ id, consequencePeople, environmentProximityTo, repairTimeDays, oilReleaseCost, gasReleaseCost, ctx });
  const probabilityInteriorWithSafeguards = await probabilityInteriorWithSafeguardsCalc({ id, safeguardInternalProtection, ctx });
  if (typeof maxConsequence === 'number' && typeof probabilityInteriorWithSafeguards === 'number') {
    return maxConsequence * probabilityInteriorWithSafeguards;
  }
  return null;
}