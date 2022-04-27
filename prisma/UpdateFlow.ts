import { Prisma, PrismaClient } from '@prisma/client';
import { loadWellPV, IWellPV } from './LoadWellPV';
import { loadWellGDC } from './LoadWellGDC';
import * as dotenv from 'dotenv';
dotenv.config();



const prisma = new PrismaClient();



async function main() {
  const wellNameArray = await prisma.well.findMany({
    select: {
      name: true,
    }
  });

  const wellName = wellNameArray.map(e => e.name);
  const wellNameArg = wellName.join("', '");
  const wellNameArg1 = wellName.slice(0, 1000).join("', '");
  const wellNameArg2 = wellName.slice(1000).join("', '");

  const wellsPV = await loadWellPV(wellNameArg);
  const wellsGDC = await loadWellGDC(wellNameArg1, wellNameArg2);


  const finalWells: IWellPV[] = [];

  if (wellsPV) {
    for (const wellPV of wellsPV) {
      const { name, lastProduction: lastProductionPV, lastInjection: lastInjectionPV, firstProduction: firstProductionPV, firstInjection: firstInjectionPV, oil, water, gas } = wellPV;
      const { lastProduction: lastProductionGDC, lastInjection: lastInjectionGDC, firstProduction: firstProductionGDC, firstInjection: firstInjectionGDC, name: nameGDC } = wellsGDC?.find(({ name: nameGDC }) => nameGDC === name) || {};

      const row: IWellPV = {
        name,
        oil,
        water,
        gas,
        lastProduction: lastProductionPV && lastProductionGDC ? lastProductionGDC > lastProductionPV ? lastProductionGDC : lastProductionPV : lastProductionGDC ? lastProductionGDC : lastProductionPV,
        lastInjection: lastInjectionPV && lastInjectionGDC ? lastInjectionGDC > lastInjectionPV ? lastInjectionGDC : lastInjectionPV : lastInjectionGDC ? lastInjectionGDC : lastInjectionPV,
        firstProduction: firstProductionPV && firstProductionGDC ? firstProductionGDC < firstProductionPV ? firstProductionGDC : firstProductionPV : firstProductionGDC ? firstProductionGDC : firstProductionPV,
        firstInjection: firstInjectionPV && firstInjectionGDC ? firstInjectionGDC < firstInjectionPV ? firstInjectionGDC : firstInjectionPV : firstInjectionGDC ? firstInjectionGDC : firstInjectionPV,
      }
      finalWells.push(row);
    }
  }

  if (wellsGDC) {
    for (const { name, lastProduction, lastInjection, firstProduction, firstInjection } of wellsGDC) {
      if (!finalWells.map(({ name }) => name).includes(name)) {
        const row: IWellPV = {
          name,
          oil: 0,
          water: 0,
          gas: 0,
          lastProduction,
          lastInjection,
          firstProduction,
          firstInjection,
        }
        finalWells.push(row);
      }
    }
  }


  for (const { name, oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection } of finalWells) {
    const data: Prisma.WellUpdateArgs = {
      where: {
        name,
      },
      data: {
        oil,
        water,
        gas,
        firstProduction,
        lastProduction,
        firstInjection,
        lastInjection,
      }
    }

    const well = await prisma.well.update(data);
    console.log(well);
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });