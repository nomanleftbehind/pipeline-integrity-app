import { PrismaClient } from '@prisma/client';
import {
  userData,
  facilityData,
  satelliteData,
  pipelineData,
  pipelineData2,
  pipelineUpstreamData,
  licenseChangeData,
  injectionPointData,
  pigRunData,
  pressureTestData,
  riskData,
} from './SeedData';

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

  for (const u of licenseChangeData) {
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

  for (const u of pigRunData) {
    const pigRun = await prisma.pigRun.create({
      data: u,
    })
    console.log(`Created pig run with id: ${pigRun.id}`)
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