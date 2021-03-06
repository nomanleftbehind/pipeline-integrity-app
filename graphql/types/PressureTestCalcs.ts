import { PressureTest as IPressureTest, Pipeline as IPipeline } from '@prisma/client';

type IMaxPressureOfLimitingSpecArgs = Pick<IPressureTest, 'limitingSpec'>;


const designFactor = 0.8;
const locationFactor = 0.9;
const jointFactor = 1;
const tempDeratingFactor = 1;
const corrosionAllowance = 0.5;



type IRequiredWTForMopCalcArgs = Pick<IPipeline, 'mop' | 'outsideDiameter' | 'yieldStrength'>;

export const requiredWTForMopCalc = async ({ mop, outsideDiameter, yieldStrength }: IRequiredWTForMopCalcArgs) => {
  if (mop !== null && outsideDiameter !== null && yieldStrength !== null) {
    const result = (mop * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

interface IMopTestPressureCalcArgs {
  outsideDiameter: IPipeline['outsideDiameter'];
  yieldStrength: IPipeline['yieldStrength'];
  requiredWTForMop: IPressureTest['requiredWTForMop'];
}

export const mopTestPressureCalc = async ({ yieldStrength, outsideDiameter, requiredWTForMop }: IMopTestPressureCalcArgs) => {
  if (yieldStrength !== null && outsideDiameter !== null && requiredWTForMop !== null) {
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

type IPressureTestPressureArgs = Pick<IPressureTest, 'mopTestPressure' | 'maxPressureOfLimitingSpec'>;


export const pressureTestPressureCalc = async ({ maxPressureOfLimitingSpec, mopTestPressure }: IPressureTestPressureArgs) => {

  if (mopTestPressure !== null && maxPressureOfLimitingSpec !== null) {
    return Math.min(mopTestPressure, maxPressureOfLimitingSpec);
  }
  if (mopTestPressure !== null && maxPressureOfLimitingSpec === null) {
    return mopTestPressure;
  }
  if (mopTestPressure === null && maxPressureOfLimitingSpec !== null) {
    return maxPressureOfLimitingSpec;
  }
  return null;
}


interface IRequiredWTForTestPressureCalcArgs {
  pressureTestPressure: IPressureTest['pressureTestPressure'];
  outsideDiameter: IPipeline['outsideDiameter'];
  yieldStrength: IPipeline['yieldStrength'];
}

export const requiredWTForTestPressureCalc = async ({ pressureTestPressure, outsideDiameter, yieldStrength }: IRequiredWTForTestPressureCalcArgs) => {
  if (yieldStrength !== null && outsideDiameter !== null && pressureTestPressure !== null) {
    const result = ((pressureTestPressure / 1.25) * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}


type IPressureTestCorrosionAllowanceCalcArgs = Pick<IPressureTest, 'requiredWTForMop' | 'requiredWTForTestPressure'>;

export const pressureTestCorrosionAllowanceCalc = async ({ requiredWTForMop, requiredWTForTestPressure }: IPressureTestCorrosionAllowanceCalcArgs) => {
  if (requiredWTForMop !== null && requiredWTForTestPressure !== null) {
    const result = requiredWTForTestPressure - requiredWTForMop;
    return result;
  }
  return null;
}


type IWaterForPiggingCalcArgs = Pick<IPipeline, 'length' | 'outsideDiameter' | 'wallThickness'>;

export const waterForPiggingCalc = async ({ length, outsideDiameter, wallThickness }: IWaterForPiggingCalcArgs) => {
  if (outsideDiameter !== null && wallThickness !== null) {
    const result = Math.PI * (length * 1000) * (Math.pow(((outsideDiameter - wallThickness) / 2000), 2));
    return result;
  }
  return null;
}