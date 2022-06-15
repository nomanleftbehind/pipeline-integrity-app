import { PrismaClient } from '@prisma/client';
import {
  userData,
  facilityData,
  satelliteData,
  pipelineData,
  pipelineData2,
  pressureTestData,
  riskData,
} from './SeedData';

import { pipelinesOnPipelinesData } from './SeedPipelinesOnPipelinesData';

import { batchProductData } from './SeedBatchProductData';

import {
  pigRunData1,
  pigRunData2,
  pigRunData3,
  pigRunData4,
  pigRunData5,
  pigRunData6,
  pigRunData7,
  pigRunData8,
  pigRunData9,
  pigRunData10,
  pigRunData11,
  pigRunData12,
} from './SeedPigRunData';

import {
  pipelineBatchData1,
  pipelineBatchData2,
} from './SeedPipelineBatchData';

import {
  wellBatchData1,
  wellBatchData2,
  wellBatchData3,
  wellBatchData4,
  wellBatchData5,
  wellBatchData6,
} from './SeedWellBatchData';

import {
  wellData1,
  wellData2,
} from './SeedWellData';

import { salesPointData1 } from './SeedSalesPointData';

import {
  licenseChangeData1,
  licenseChangeData2,
  licenseChangeData3,
} from './SeedLicenseChangeData';

import { chemicalSupplierData } from './SeedChemicalSupplierData';
import {
  chemicalData1,
  chemicalData2,
} from './SeedChemicalData';

const prisma = new PrismaClient(/*{
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
}*/)

// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Duration: ' + e.duration + 'ms')
// })



async function main() {
  console.log(`Start seeding ...`)

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  for (const u of batchProductData) {
    const batchProduct = await prisma.batchProduct.create({
      data: u,
    })
    console.log(`Created user with id: ${batchProduct.id}`)
  }

  for (const u of facilityData) {
    const facility = await prisma.facility.create({
      data: u,
    })
    console.log(`Created facility with id: ${facility.id}`)
  }

  for (const u of satelliteData) {
    const satellite = await prisma.satellite.create({
      data: u,
    })
    console.log(`Created satellite with id: ${satellite.id}`)
  }

  for (const u of pipelineData) {
    const pipeline = await prisma.pipeline.create({
      data: u,
    })
    console.log(`Created pipeline with id: ${pipeline.id}`)
  }

  for (const u of pipelineData2) {
    const pipeline = await prisma.pipeline.create({
      data: u,
    })
    console.log(`Created pipeline in batch 2 with id: ${pipeline.id}`)
  }

  for (const u of pipelinesOnPipelinesData) {
    const pipelineOnPipeline = await prisma.pipelinesOnPipelines.create({
      data: u,
    })
    console.log(`Created pipeline on pipeline with upstreamId: ${pipelineOnPipeline.upstreamId} and downstreamId ${pipelineOnPipeline.downstreamId}`)
  }

  for (const u of licenseChangeData1) {
    const licenseChange = await prisma.licenseChange.create({
      data: u,
    })
    console.log(`Created license change with id: ${licenseChange.id}`)

  }

  for (const u of licenseChangeData2) {
    const licenseChange = await prisma.licenseChange.create({
      data: u,
    })
    console.log(`Created license change with id: ${licenseChange.id}`)
  }

  for (const u of licenseChangeData3) {
    const licenseChange = await prisma.licenseChange.create({
      data: u,
    })
    console.log(`Created license change with id: ${licenseChange.id}`)
  }

  for (const u of wellData1) {
    const well = await prisma.well.create({
      data: u,
    })
    console.log(`Created well with id: ${well.id}`)
  }

  for (const u of wellData2) {
    const well = await prisma.well.create({
      data: u,
    })
    console.log(`Created well with id: ${well.id}`)
  }

  for (const u of salesPointData1) {
    const salesPoint = await prisma.salesPoint.create({
      data: u,
    })
    console.log(`Created sales point with id: ${salesPoint.id}`)
  }

  for (const u of pigRunData1) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData2) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData3) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData4) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData5) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData6) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData7) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData8) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData9) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData10) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData11) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pigRunData12) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
  }

  for (const u of pipelineBatchData1) {
    const pipelineBatch = await prisma.pipelineBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${pipelineBatch.id}`)
  }

  for (const u of pipelineBatchData2) {
    const pipelineBatch = await prisma.pipelineBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${pipelineBatch.id}`)
  }

  for (const u of wellBatchData1) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of wellBatchData2) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of wellBatchData3) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of wellBatchData4) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of wellBatchData5) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of wellBatchData6) {
    const wellBatch = await prisma.wellBatch.create({
      data: u,
    })
    console.log(`Created pipeline batch with id: ${wellBatch.id}`)
  }

  for (const u of pressureTestData) {
    const pressureTest = await prisma.pressureTest.create({
      data: u,
    })
    console.log(`Created pressure test run with id: ${pressureTest.id}`)
  }

  for (const u of riskData) {
    const risk = await prisma.risk.create({
      data: u,
    })
    console.log(`Created risk with id: ${risk.id}`)
  }

  for (const u of chemicalSupplierData) {
    const chemicalSupplier = await prisma.chemicalSupplier.create({
      data: u,
    })
    console.log(`Created chemical supplier with id: ${chemicalSupplier.id}`)
  }

  for (const u of chemicalData1) {
    const chemical = await prisma.chemical.create({
      data: u,
    })
    console.log(`Created chemical with id: ${chemical.id}`)
  }

  for (const u of chemicalData2) {
    const chemical = await prisma.chemical.create({
      data: u,
    })
    console.log(`Created chemical with id: ${chemical.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });