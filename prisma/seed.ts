import { PrismaClient } from '@prisma/client';
import {
  userData,
  facilityData,
  satelliteData,
  pipelineData,
  pipelineData2,
  pipelineUpstreamData,
  injectionPointData,
  pressureTestData,
  riskData,
} from './SeedData';

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
  licenseChangeData1,
  licenseChangeData2,
  licenseChangeData3,
} from './SeedLicenseChangeData';

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

  for (const u of pipelineUpstreamData) {
    const pipeline = await prisma.pipeline.update(u)
    console.log(`Updated pipeline with id: ${pipeline.id}`)
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

  for (const u of injectionPointData) {
    const injectionPoint = await prisma.injectionPoint.create({
      data: u,
    })
    console.log(`Created injection point with id: ${injectionPoint.id}`)
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