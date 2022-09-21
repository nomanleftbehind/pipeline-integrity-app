import { PressureTest as IPressureTest, LicenseChange as ILicenseChange } from '@prisma/client';
import { Context } from '../context';

type IMaxPressureOfLimitingSpecArgs = Pick<IPressureTest, 'limitingSpec'>;


const designFactor = 0.8;
const locationFactor = 0.9;
const jointFactor = 1;
const tempDeratingFactor = 1;
const corrosionAllowance = 0.5;



type IRequiredWTForMopCalcArgs = Pick<ILicenseChange, 'mop' | 'outsideDiameter' | 'yieldStrength'>;

export const requiredWTForMopCalc = async ({ mop, outsideDiameter, yieldStrength }: IRequiredWTForMopCalcArgs) => {
  if (mop !== null && outsideDiameter !== null && yieldStrength !== null) {
    const result = (mop * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
    return result;
  }
  return null;
}

interface IMopTestPressureCalcArgs {
  outsideDiameter: ILicenseChange['outsideDiameter'];
  yieldStrength: ILicenseChange['yieldStrength'];
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
  testPressure: IPressureTest['testPressure'];
  outsideDiameter: ILicenseChange['outsideDiameter'];
  yieldStrength: ILicenseChange['yieldStrength'];
}

export const requiredWTForTestPressureCalc = async ({ testPressure, outsideDiameter, yieldStrength }: IRequiredWTForTestPressureCalcArgs) => {
  if (yieldStrength !== null && outsideDiameter !== null && testPressure !== null) {
    const result = ((testPressure / 1.25) * outsideDiameter) / (2 * yieldStrength * 1000 * designFactor * locationFactor * jointFactor * tempDeratingFactor);
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


type IWaterForPiggingCalcArgs = Pick<ILicenseChange, 'length' | 'outsideDiameter' | 'wallThickness'>;

export const waterForPiggingCalc = async ({ length, outsideDiameter, wallThickness }: IWaterForPiggingCalcArgs) => {
  if (outsideDiameter !== null && wallThickness !== null) {
    const result = Math.PI * (length * 1000) * (Math.pow(((outsideDiameter - wallThickness) / 2000), 2));
    return result;
  }
  return null;
}



interface IAllocatePressureTestArgs {
  pipelineId: IPressureTest['pipelineId'];
  ctx: Context;
}

export const allocatePressureTest = async ({ pipelineId, ctx }: IAllocatePressureTestArgs) => {

  const pipelinePressureTests = await ctx.prisma.pressureTest.findMany({
    where: { pipelineId },
    select: { id: true, limitingSpec: true }
  });

  if (pipelinePressureTests.length > 0) {
    const latestLicenseChange = await ctx.prisma.licenseChange.findFirst({
      where: { pipelineId },
      orderBy: { date: 'desc' },
      select: { mop: true, outsideDiameter: true, yieldStrength: true, wallThickness: true, length: true }
    });

    if (latestLicenseChange) {
      const { mop, outsideDiameter, yieldStrength, wallThickness, length } = latestLicenseChange;
      const requiredWTForMop = await requiredWTForMopCalc({ mop, outsideDiameter, yieldStrength });
      const mopTestPressure = await mopTestPressureCalc({ outsideDiameter, requiredWTForMop, yieldStrength });
      const waterForPigging = await waterForPiggingCalc({ length, outsideDiameter, wallThickness });

      for (const { id, limitingSpec } of pipelinePressureTests) {
        const maxPressureOfLimitingSpec = await maxPressureOfLimitingSpecCalc({ limitingSpec });

        const testPressure = await pressureTestPressureCalc({ mopTestPressure, maxPressureOfLimitingSpec });

        const requiredWTForTestPressure = await requiredWTForTestPressureCalc({ testPressure, outsideDiameter, yieldStrength });

        const corrosionAllowance = await pressureTestCorrosionAllowanceCalc({ requiredWTForMop, requiredWTForTestPressure });

        await ctx.prisma.pressureTest.update({
          where: { id },
          data: {
            requiredWTForMop,
            mopTestPressure,
            maxPressureOfLimitingSpec,
            testPressure,
            requiredWTForTestPressure,
            corrosionAllowance,
            waterForPigging,
          }
        });
        // do not return here as you are inside the loop;
      }
    }
  }
}