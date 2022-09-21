import {
  Risk as IRisk,
  LicenseChange as ILicenseChange,
  Status as IStatus,
  Substance as ISubstance,
  Pipeline as IPipeline,
  Chemical as IChemical,
  CathodicSurvey as ICathodicSurvey,
} from '@prisma/client';
import { Context } from '../context';
import { totalFluidsCalc } from './Well';
import { pipelineFlow } from './PipelineFlow';



interface IConsequenceEnviroCalcArgs {
  environment: IRisk['environmentId'];
  currentSubstance?: ILicenseChange['substanceId'];
  currentStatus?: ILicenseChange['statusId'];
  totalFluids: number;
}

export const consequenceEnviroCalc = async ({ environment, currentSubstance, currentStatus, totalFluids }: IConsequenceEnviroCalcArgs) => {

  if (currentStatus === 'Discontinued' || currentStatus === 'Abandoned' || currentSubstance === 'Fresh Water') {
    return 1;
  } else if (currentSubstance === 'Natural Gas' || currentSubstance === 'Fuel Gas' || currentSubstance === 'Sour Natural Gas') {

    if (environment === null) {
      // no water body and no crossing.  (eg. middle of field)
      return totalFluids >= 1 ? 2 : 1;
    } else if (['WC1', 'WB3'].includes(environment)) {
      // WC1 = Ephemeral, WB3 = non-permanent seasonal/temporary wetlands; Fens; Bogs;
      return totalFluids >= 1 ? 3 : 2;
    } else if (environment === 'WC4' || environment === 'WC3' || environment === 'WC2' || environment === 'WB5' || environment === 'WB4') {
      return totalFluids >= 1 ? 4 : 3;
    } else {
      return null;
    }
  } else if (currentSubstance === 'Oil Well Effluent' || currentSubstance === 'Crude Oil' || currentSubstance === 'Salt Water' /*|| currentSubstance === 'Sour Crude'*/) {
    if (environment === null || environment === 'WB1') {
      return 2;
    } else if (environment === 'WC1' || environment === 'WC2' || environment === 'WB3') {
      return 3;
    } else if (environment === 'WC3' || environment === 'WB4') {
      return 4;
    } else if (environment === 'WC4' || environment === 'WB5') {
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
  currentType?: ILicenseChange['pipelineTypeId'];
  currentMaterial?: ILicenseChange['materialId'];
  currentSubstance?: ISubstance['substance'];
  currentStatus?: IStatus['status'];
}

export const probabilityInteriorCalc = async ({ currentType, currentMaterial, currentSubstance, currentStatus }: IProbabilityInteriorCalcArgs) => {

  const isTypeZ245 = currentType && ['Z245.1', 'Z245.3'].includes(currentType);

  if ((currentStatus && ['Discontinued', 'Abandoned'].includes(currentStatus)) || (currentMaterial && ['Fiberglass', 'Composite', 'Polyethylene', 'Asbestos Cement', 'Polyvinyl Chloride', 'Aluminum'].includes(currentMaterial))) {
    return 1;
  } else if (currentMaterial === 'Steel') {
    if (currentSubstance && ['Oil Well Effluent', 'Salt Water', 'Fresh Water'].includes(currentSubstance)) {
      if (isTypeZ245) {
        return 3;
      } else {
        return 4;
      }
    } else if (currentSubstance === 'Crude Oil' || currentSubstance === 'Sour Crude') {
      if (isTypeZ245) {
        return 2;
      } else {
        return 3;
      }
    } else if (currentSubstance && ['Natural Gas', 'Fuel Gas', 'Sour Natural Gas'].includes(currentSubstance)) {
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
  firstLicenseDate?: ILicenseChange['date'];
  currentStatus?: ILicenseChange['statusId'];
  currentMaterial?: ILicenseChange['materialId'];
}

export const probabilityExteriorCalc = async ({ firstLicenseDate, currentStatus, currentMaterial }: IProbabilityExteriorCalcArgs) => {

  if (currentStatus === 'Discontinued' || currentStatus === 'Abandoned') {
    return 1;
  }
  if (currentMaterial === 'Steel') {
    if (firstLicenseDate) {
      const vintage = firstLicenseDate.getUTCFullYear();
      if (vintage > 2000) {
        return 3;
      }
    }
    return 4;
  }
  if (currentMaterial === 'Fiberglass' || currentMaterial === 'Composite' || currentMaterial === 'Polyethylene' || currentMaterial === 'Asbestos Cement' || currentMaterial === 'Polyvinyl Chloride' || currentMaterial === 'Aluminum') {
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
  piggable?: IPipeline['piggable'];
}

export const safeguardPiggingCalc = async ({ piggable }: ISafeguardPiggingCalcArgs) => {
  if (piggable != null) {
    if (piggable) {
      return 1;
    }
    return 0;
  }
  return null;
}

interface ISafeguardChemicalInhibitionCalcArgs {
  downholeBatch?: IChemical['downholeBatch'];
  inhibitorPipelineBatch?: IChemical['inhibitorPipelineBatch'];
  bacteriaTreatment?: IChemical['bacteriaTreatment'];
  scaleTreatment?: IChemical['scaleTreatment'];
}

export const safeguardChemicalInhibitionCalc = async ({ downholeBatch, inhibitorPipelineBatch, bacteriaTreatment, scaleTreatment }: ISafeguardChemicalInhibitionCalcArgs) => {
  if (typeof downholeBatch === 'boolean' || typeof inhibitorPipelineBatch === 'boolean' || typeof bacteriaTreatment === 'boolean' || typeof scaleTreatment === 'boolean') {
    if (downholeBatch === true || inhibitorPipelineBatch === true || bacteriaTreatment === true || scaleTreatment === true) {
      return 1;
    }
    return 0;
  }
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

interface ISafeguardCathodicCalc {
  lastCathodicSurveyDate?: ICathodicSurvey['date'];
}

export const safeguardCathodicCalc = async ({ lastCathodicSurveyDate }: ISafeguardCathodicCalc) => {
  if (lastCathodicSurveyDate) {
    const yearAgo = new Date(new Date(new Date().setUTCFullYear(new Date().getUTCFullYear() - 1)).setUTCHours(0, 0, 0, 0));
    if (lastCathodicSurveyDate > yearAgo) {
      return 1;
    }
    return 0;
  }
  return null;
}

interface IProbabilityExteriorWithSafeguardsArgs {
  probabilityExterior: IRisk['probabilityExterior'];
  safeguardCathodic: IRisk['safeguardCathodic'];
  safeguardExternalCoating: IRisk['safeguardExternalCoating'];
}

export const probabilityExteriorWithSafeguardsCalc = async ({ probabilityExterior, safeguardCathodic, safeguardExternalCoating }: IProbabilityExteriorWithSafeguardsArgs) => {
  if (typeof probabilityExterior === 'number') {
    const result = probabilityExterior - (safeguardCathodic || 0) - (safeguardExternalCoating || 0);
    return result < 0 ? 0 : result;
  }
  return null;
}

interface IRiskPotentialExternalWithSafeguardsCalcArgs {
  consequenceMax: IRisk['consequenceMax'];
  probabilityExteriorWithSafeguards: IRisk['probabilityExteriorWithSafeguards'];
}

export const riskPotentialExternalWithSafeguardsCalc = async ({ consequenceMax, probabilityExteriorWithSafeguards }: IRiskPotentialExternalWithSafeguardsCalcArgs) => {
  if (typeof consequenceMax === 'number' && typeof probabilityExteriorWithSafeguards === 'number') {
    return consequenceMax * probabilityExteriorWithSafeguards;
  }
  return null;
}


interface IAllocateRiskArgs {
  id: IRisk['id'];
  ctx: Context;
}

export const allocateRisk = async ({ id, ctx }: IAllocateRiskArgs) => {

  const risk = await ctx.prisma.risk.findUnique({
    where: { id },
    select: {
      environment: { select: { environment: true } },
      repairTimeDays: true,
      oilReleaseCost: true,
      gasReleaseCost: true,
      consequencePeople: true,
      probabilityGeo: true,
      safeguardInternalProtection: true,
      safeguardExternalCoating: true,
    }
  });

  if (risk) {

    const pipeline = await ctx.prisma.pipeline.findUnique({
      where: { id },
      select: {
        flowCalculationDirection: true,
        piggable: true,
      }
    });

    const firstLicenseChange = await ctx.prisma.licenseChange.findFirst({ where: { pipelineId: id }, orderBy: { date: 'asc' }, select: { date: true }, });

    const lastLicenseChange = await ctx.prisma.licenseChange.findFirst({
      where: { pipelineId: id },
      orderBy: { date: 'desc' },
      select: {
        substance: { select: { substance: true } },
        status: { select: { status: true } },
        pipelineType: { select: { type: true } },
        material: { select: { material: true } },
      },
    });

    const chemical = await ctx.prisma.chemical.findUnique({
      where: { id },
      select: {
        downholeBatch: true,
        inhibitorPipelineBatch: true,
        bacteriaTreatment: true,
        scaleTreatment: true,
      }
    });

    const { environment: environmentObject, oilReleaseCost, gasReleaseCost, repairTimeDays, consequencePeople, probabilityGeo, safeguardInternalProtection, safeguardExternalCoating } = risk;
    const { substance, status, pipelineType, material } = lastLicenseChange || {};
    const { date: firstLicenseDate } = firstLicenseChange || {};
    const { flowCalculationDirection, piggable } = pipeline || {};

    const currentSubstance = substance?.substance;
    const currentStatus = status?.status;
    const currentType = pipelineType?.type;
    const currentMaterial = material?.material;
    const environment = environmentObject?.environment || null;
    const { downholeBatch, inhibitorPipelineBatch, bacteriaTreatment, scaleTreatment } = chemical || {};

    const { oil, water, gas } = flowCalculationDirection && (await pipelineFlow({ id, flowCalculationDirection, ctx })) || { oil: 0, water: 0, gas: 0 };

    const totalFluids = await totalFluidsCalc({ oil, water, gas });

    const costPerM3Released = currentSubstance === 'Fresh Water' ? 0 : 25000 * water + 1000 * gas + 15000 * oil;

    const consequenceEnviro = await consequenceEnviroCalc({ environment, currentSubstance, currentStatus, totalFluids });

    const consequenceAsset = await consequenceAssetCalc({ repairTimeDays, oilReleaseCost, gasReleaseCost, oil, gas, totalFluids });

    const consequenceMax = await conequenceMaxCalc({ consequencePeople, consequenceEnviro, consequenceAsset });

    const probabilityInterior = await probabilityInteriorCalc({ currentType, currentMaterial, currentStatus, currentSubstance });

    const probabilityExterior = await probabilityExteriorCalc({ firstLicenseDate, currentStatus, currentMaterial });

    const riskPotentialGeo = await riskPotentialGeoCalc({ consequenceMax, probabilityGeo });

    const riskPotentialInternal = await riskPotentialInternalCalc({ consequenceMax, probabilityInterior });

    const riskPotentialExternal = await riskPotentialExternalCalc({ consequenceMax, probabilityExterior });

    const safeguardPigging = await safeguardPiggingCalc({ piggable });

    const safeguardChemicalInhibition = await safeguardChemicalInhibitionCalc({ downholeBatch, inhibitorPipelineBatch, bacteriaTreatment, scaleTreatment });

    const probabilityInteriorWithSafeguards = await probabilityInteriorWithSafeguardsCalc({ probabilityInterior, safeguardPigging, safeguardChemicalInhibition, safeguardInternalProtection });

    const riskPotentialInternalWithSafeguards = await riskPotentialInternalWithSafeguardsCalc({ consequenceMax, probabilityInteriorWithSafeguards });

    const lastCathodicSurvey = await ctx.prisma.cathodicSurvey.findFirst({ where: { pipelineId: id }, orderBy: { date: 'desc' }, select: { date: true }, });
    const safeguardCathodic = await safeguardCathodicCalc({ lastCathodicSurveyDate: lastCathodicSurvey?.date });

    const probabilityExteriorWithSafeguards = await probabilityExteriorWithSafeguardsCalc({ probabilityExterior, safeguardCathodic, safeguardExternalCoating });

    const riskPotentialExternalWithSafeguards = await riskPotentialExternalWithSafeguardsCalc({ consequenceMax, probabilityExteriorWithSafeguards });

    const result = await ctx.prisma.risk.update({
      where: { id },
      data: {
        costPerM3Released,
        consequenceEnviro,
        consequenceAsset,
        consequenceMax,
        probabilityInterior,
        probabilityExterior,
        riskPotentialGeo,
        riskPotentialInternal,
        riskPotentialExternal,
        safeguardPigging,
        safeguardChemicalInhibition,
        probabilityInteriorWithSafeguards,
        riskPotentialInternalWithSafeguards,
        safeguardCathodic,
        probabilityExteriorWithSafeguards,
        riskPotentialExternalWithSafeguards,
      }
    });

    return result;
  }
  const result = await ctx.prisma.risk.findUnique({
    where: { id },
  });
  return result;
}