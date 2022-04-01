import { PressureTest as IPressureTest } from '@prisma/client';
import { Context } from '../context';

type IMaxPressureOfLimitingSpecArgs = Pick<IPressureTest, 'limitingSpec'>;


const designFactor = 0.8;
const locationFactor = 0.9;
const jointFactor = 1;
const tempDeratingFactor = 1;
const corrosionAllowance = 0.5;

interface IRequiredWTForMopCalcArgs {
  pipelineId: IPressureTest['pipelineId'];
  ctx: Context;
}

export const requiredWTForMopCalc = async ({ pipelineId, ctx }: IRequiredWTForMopCalcArgs) => {
  const { mop, outsideDiameter, yieldStrength } = await ctx.prisma.pipeline.findUnique({
    where: { id: pipelineId },
    select: { mop: true, outsideDiameter: true, yieldStrength: true, }
  }) || {};
  if (mop != null && outsideDiameter != null && yieldStrength != null) {
    const result = (mop * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

export const mopTestPressureCalc = async ({ pipelineId, ctx }: IRequiredWTForMopCalcArgs) => {
  const requiredWTForMop = await requiredWTForMopCalc({ pipelineId, ctx });
  const { outsideDiameter, yieldStrength } = await ctx.prisma.pipeline.findUnique({
    where: { id: pipelineId },
    select: { outsideDiameter: true, yieldStrength: true, }
  }) || {};
  if (yieldStrength != null && outsideDiameter != null && requiredWTForMop != null) {
    const result = (2 * yieldStrength * (requiredWTForMop + corrosionAllowance) * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor / outsideDiameter) * 1.25;
    return result;
  }
  return null;
}

export const maxPressureOfLimitingSpecCalc = async ({ limitingSpec }: IMaxPressureOfLimitingSpecArgs) => {
  switch (limitingSpec) {
    case 'ANSI150':
      return 1895 * 1.25;
    case 'ANSI300':
      return 4960 * 1.25;
    case 'ANSI600':
      return 9930 * 1.25
    default:
      return null;
  }
}

type IPressureTestPressureArgs = IRequiredWTForMopCalcArgs & IMaxPressureOfLimitingSpecArgs;

export const pressureTestPressureCalc = async ({ pipelineId, ctx, limitingSpec }: IPressureTestPressureArgs) => {
  const mopTestPressure = await mopTestPressureCalc({ pipelineId, ctx });
  const maxPressureOfLimitingSpec = await maxPressureOfLimitingSpecCalc({ limitingSpec });

  if (mopTestPressure != null && maxPressureOfLimitingSpec != null) {
    return Math.min(mopTestPressure, maxPressureOfLimitingSpec);
  }
  if (mopTestPressure != null && maxPressureOfLimitingSpec == null) {
    return mopTestPressure;
  }
  if (mopTestPressure == null && maxPressureOfLimitingSpec != null) {
    return maxPressureOfLimitingSpec;
  }
  return null;
}

export const requiredWTForTestPressureCalc = async ({ pipelineId, ctx, limitingSpec }: IPressureTestPressureArgs) => {
  const pressureTestPressure = await pressureTestPressureCalc({ pipelineId, ctx, limitingSpec });
  const { outsideDiameter, yieldStrength } = await ctx.prisma.pipeline.findUnique({
    where: { id: pipelineId },
    select: { outsideDiameter: true, yieldStrength: true, }
  }) || {};
  if (yieldStrength != null && outsideDiameter != null && pressureTestPressure != null) {
    const result = ((pressureTestPressure / 1.25) * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

export const pressureTestCorrosionAllowanceCalc = async ({ pipelineId, ctx, limitingSpec }: IPressureTestPressureArgs) => {
  const requiredWTForMop = await requiredWTForMopCalc({ pipelineId, ctx });
  const requiredWTForTestPressure = await requiredWTForTestPressureCalc({ pipelineId, ctx, limitingSpec });

  if (requiredWTForMop != null && requiredWTForTestPressure != null) {
    const result = requiredWTForTestPressure - requiredWTForMop;
    return result;
  }
  return null;
}

export const waterForPiggingCalc = async ({ pipelineId, ctx }: IRequiredWTForMopCalcArgs) => {
  const { length, outsideDiameter, wallThickness, } = await ctx.prisma.pipeline.findUnique({
    where: { id: pipelineId },
    select: { outsideDiameter: true, wallThickness: true, length: true }
  }) || {};
  if (length !== undefined && outsideDiameter != null && wallThickness != null) {
    const result = Math.PI * (length * 1000) * (Math.pow(((outsideDiameter - wallThickness) / 2000), 2));
    return result;
  }
  return null;
}