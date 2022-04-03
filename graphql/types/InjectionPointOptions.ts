import { objectType, extendType } from 'nexus';
import { Context } from '../context';


export const SatelliteSideBar = objectType({
  name: 'SatelliteSideBar',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
  }
})

export const SideBar = objectType({
  name: 'SideBar',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('satellites', { type: 'SatelliteSideBar' })
  }
});


export const InjectionPointOptionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('sideBar', {
      type: 'SideBar',
      resolve: async (_parent, args, ctx: Context) => {
        const facility = await ctx.prisma.facility.findMany({
          select: {
            id: true,
            name: true,
            satellites: {
              select: {
                id: true,
                name: true,
              },
              orderBy: {
                name: 'asc'
              }
            }
          },
          orderBy: {
            name: 'asc'
          }
        });

        const satellites = await ctx.prisma.satellite.findMany({
          where: {
            facilityId: null,
          },
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc'
          }
        });

        facility.push({ id: 'no-facility', name: 'No Facility', satellites });
        return facility;
      }
    })
  },
});