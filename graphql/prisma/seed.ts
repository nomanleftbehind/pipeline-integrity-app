import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  { email: 'dsucic@bonterraenergy.com', firstName: 'Domagoj', lastName: 'Sucic' }
]

const facilityData: Prisma.FacilityCreateInput[] = [
  { name: '10-15-047-07W5 GP', createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
]

const satelliteData: Prisma.SatelliteCreateInput[] = [
  { name: 'WEST QUAD', facility: { connect: { name: '10-15-047-07W5 GP' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { name: 'EAST QUAD', facility: { connect: { name: '10-15-047-07W5 GP' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
]

const pipelineData: Prisma.PipelineCreateInput[] = [
  { license: 'AB00035', segment: '3', substance: 'NaturalGas', from: '14-27-047-07W5', fromFeature: 'BlindEnd', to: '04-27-047-07W5', toFeature: 'BlindEnd', status: 'Abandoned', length: 1.43, type: 'Type5L', grade: 'GradeA', outsideDiameter: 114.3, wallThickness: 3.4, material: 'Steel', internalProtection: 'Uncoated', satellite: { connect: { name: 'WEST QUAD' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { license: 'AB00035', segment: '109', substance: 'NaturalGas', from: '10-13-047-07W5', fromFeature: 'Pipeline', to: '07-13-047-07W5', toFeature: 'Battery', status: 'ToBeConstructed', length: 0.16, type: 'TypeZ2451', grade: 'Grade3592', outsideDiameter: 219.1, wallThickness: 4.8, material: 'Steel', mop: 410, internalProtection: 'Uncoated', satellite: { connect: { name: 'EAST QUAD' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, upstream: { connect: { license_segment: { license: 'AB00035', segment: '3' } } } },
  { license: 'Fuck', segment: 'me', substance: 'NaturalGas', from: '10-13-047-07W5', fromFeature: 'Pipeline', to: '07-13-047-07W5', toFeature: 'Battery', status: 'ToBeConstructed', length: 0.16, type: 'TypeZ2451', grade: 'Grade3592', outsideDiameter: 219.1, wallThickness: 4.8, material: 'Steel', mop: 410, internalProtection: 'Uncoated', satellite: { connect: { name: 'EAST QUAD' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, upstream: { connect: { license_segment: { license: 'AB00035', segment: '3' } } } }
]

const InjectionPointData: Prisma.InjectionPointCreateInput[] = [
  { source: '104/14-22-046-07W5/00', oil: 7.16, water: 4.44, gas: 7.95, firstProduction: new Date('2021-02-06'), lastProduction: new Date('2021-07-31'), firstInjection: undefined, lastInjection: undefined, pvUnitId: '64A359BD5FF9418994F67698EFAAE802', pvNodeId: '4D842E68A17A4966AA64FF8C3BECF7E0', satellite: { connect: { name: 'EAST QUAD' } }, pipeline: { connect: { license_segment: { license: 'AB00035', segment: '109' } } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { source: '102/04-30-046-07W5/00', oil: 10.83, water: 0.81, gas: 7, firstProduction: new Date('2021-01-29'), lastProduction: new Date('2021-07-31'), firstInjection: undefined, lastInjection: undefined, pvUnitId: '2DD00BB6FC75459D8942799CC0B66E5F', pvNodeId: '9C901F5717364B0A8DCB7F9B33FD5F21', satellite: { connect: { name: 'WEST QUAD' } }, pipeline: { connect: { license_segment: { license: 'AB00035', segment: '109' } } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
]

// const pipelineStreamData: Prisma.PipelineStreamCreateInput[] = [
//   { upstream: { connect: { license_segment: { license: 'AB00035', segment: '3' } } }, downstream: { connect: { license_segment: { license: 'AB00035', segment: '109' } } }/*, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } }*/ }
// ]



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

  for (const u of InjectionPointData) {
    const injectionPoint = await prisma.injectionPoint.create({
      data: u,
    })
    console.log(`Created injection point with id: ${injectionPoint.id}`)
  }

  // for (const u of pipelineStreamData) {
  //   const pipelineStream = await prisma.pipelineStream.create({
  //     data: u,
  //   })
  //   console.log(`Created pipeline stream with ids: ${pipelineStream.upstreamId} and ${pipelineStream.downstreamId}`)
  // }

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