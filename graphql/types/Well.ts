import { objectType, stringArg, inputObjectType, extendType, nonNull, arg, floatArg } from 'nexus';
import { Context } from '../context';
import { User as IUser } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';



export const WellObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'name', nullable: false, type: 'String' },
  { field: 'oil', nullable: false, type: 'Float' },
  { field: 'water', nullable: false, type: 'Float' },
  { field: 'gas', nullable: false, type: 'Float' },
  { field: 'firstProduction', nullable: true, type: 'DateTime' },
  { field: 'lastProduction', nullable: true, type: 'DateTime' },
  { field: 'firstInjection', nullable: true, type: 'DateTime' },
  { field: 'lastInjection', nullable: true, type: 'DateTime' },
  { field: 'fdcRecId', nullable: true, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const Well = objectType({
  name: 'Well',
  sourceType: {
    module: '@prisma/client',
    export: 'Well',
  },
  definition: t => {
    for (const { field, nullable, type } of WellObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});



export const gasAssociatedLiquidsCalc = async (gas: number) => {
  return gas * 35.49 * 0.00355238191999475 / 6.3;
}

interface ItotalFluidsCalcArgs {
  oil: number;
  water: number;
  gas: number;
}

export const totalFluidsCalc = async ({ oil, water, gas }: ItotalFluidsCalcArgs) => {
  return oil + water + await gasAssociatedLiquidsCalc(gas);
}

export const WellExtendObject = extendType({
  type: 'Well',
  definition(t) {
    t.nonNull.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => await gasAssociatedLiquidsCalc(gas)
    })
    t.nonNull.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => await totalFluidsCalc({ oil, water, gas })
    })
    t.list.field('wellBatches', {
      type: 'WellBatch',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id }
        }).wellBatches();
        return result;
      }
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.well.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.field('pipeline', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.well.findUnique({
          where: { id },
        }).pipeline();
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveWellAuthorized(user);
      }
    })
  },
});

const resolveWellAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER';
}

export const SourceOptions = objectType({
  name: 'SourceOptions',
  definition(t) {
    t.string('facility')
    t.string('satellite')
    t.nonNull.string('id')
    t.nonNull.string('source')
    t.nonNull.boolean('disabled')
  }
});

export const SourceGroupBy = objectType({
  name: 'SourceGroupBy',
  definition(t) {
    t.float('oil')
    t.float('water')
    t.float('gas')
    t.float('gasAssociatedLiquids', {
      resolve: async ({ gas }) => {
        if (typeof gas === 'number') {
          return await gasAssociatedLiquidsCalc(gas);
        }
        return null
      }
    })
    t.float('totalFluids', {
      resolve: async ({ oil, water, gas }) => {
        if (typeof oil === 'number' && typeof water === 'number' && typeof gas === 'number') {
          return await totalFluidsCalc({ oil, water, gas });
        }
        return null
      }
    })
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
  }
});


export const WellQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('wellsByPipelineId', {
      type: 'Well',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.well.findMany({
          where: { pipelineId },
          orderBy: { name: 'asc' },
        });
        return result;
      },
    })
    t.list.field('wellOptions', {
      type: 'SourceOptions',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const connectedWells = await ctx.prisma.well.findMany({
          where: { pipelineId },
          select: {
            id: true,
          },
        });
        const ids = connectedWells.map(({ id }) => id);
        const options = await ctx.prisma.well.findMany({
          select: {
            id: true,
            name: true,
            pipeline: {
              select: {
                satellite: {
                  select: {
                    name: true,
                    facility: {
                      select: {
                        name: true,
                      }
                    }
                  }
                }
              }
            }
          },
          orderBy: [{ pipeline: { satellite: { facility: { name: 'asc' } } } }, { pipeline: { satellite: { name: 'asc' } } }, { name: 'asc' }]
        });

        const result = options.map(({ id, pipeline, name }) => {
          const { satellite } = pipeline || {};
          const { name: satelliteName, facility } = satellite || {};
          const { name: facilityName } = facility || {};
          const result = { source: name, facility: facilityName, satellite: satelliteName, id, disabled: ids.includes(id) }
          return result;
        });

        return result;
      }
    })
    t.field('wellsGroupByPipelineId', {
      type: 'SourceGroupBy',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { pipelineId }, ctx: Context) => {

        const total = await ctx.prisma.well.groupBy({
          by: ['pipelineId'],
          _sum: { oil: true, water: true, gas: true },
          _max: { lastProduction: true, lastInjection: true },
          _min: { firstProduction: true, firstInjection: true },
          where: { pipelineId }
        });

        if (total.length > 0) {
          const { _sum: { oil, water, gas }, _max: { lastProduction, lastInjection }, _min: { firstProduction, firstInjection } } = total[0];
          const result = { oil, water, gas, lastProduction, lastInjection, firstProduction, firstInjection }
          return result;
        }
        return null;
      },
    })
  }
})


export const WellCreateInput = inputObjectType({
  name: 'WellCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.float('oil')
    t.nonNull.float('water')
    t.nonNull.float('gas')
    t.field('firstProduction', { type: 'DateTime' })
    t.field('lastProduction', { type: 'DateTime' })
    t.field('firstInjection', { type: 'DateTime' })
    t.field('lastInjection', { type: 'DateTime' })
    t.string('fdcRecId')
  },
});

export const WellPayload = objectType({
  name: 'WellPayload',
  definition(t) {
    t.field('well', { type: 'Well' })
    t.field('error', { type: 'FieldError' })
  },
});


export const WellMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editWell', {
      type: 'WellPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: stringArg(),
        name: stringArg(),
        oil: floatArg(),
        water: floatArg(),
        gas: floatArg(),
        firstProduction: arg({ type: 'DateTime' }),
        lastProduction: arg({ type: 'DateTime' }),
        firstInjection: arg({ type: 'DateTime' }),
        lastInjection: arg({ type: 'DateTime' }),
        fdcRecId: stringArg(),
      },
      resolve: async (_, args, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {
            const well = await ctx.prisma.well.update({
              where: { id: args.id },
              data: {
                pipelineId: args.pipelineId || undefined,
                name: args.name || undefined,
                oil: args.oil || undefined,
                water: args.water || undefined,
                gas: args.gas || undefined,
                firstProduction: args.firstProduction,
                lastProduction: args.lastProduction,
                firstInjection: args.firstInjection,
                lastInjection: args.lastInjection,
                fdcRecId: args.fdcRecId,
                updatedById: userId,
              },
            });
            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to wells.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      },
    })
    t.field('connectWell', {
      type: 'WellPayload',
      args: {
        id: nonNull(stringArg()),
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_, { id, pipelineId }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {
            const well = await ctx.prisma.well.update({
              where: { id },
              data: {
                pipeline: {
                  connect: {
                    id: pipelineId,
                  }
                },
                updatedBy: {
                  connect: {
                    id: userId,
                  }
                }
              }
            });
            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to connect wells to pipelines.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
    t.field('disconnectWell', {
      type: 'WellPayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user
          const authorized = resolveWellAuthorized(user);
          if (authorized) {
            const well = await ctx.prisma.well.update({
              where: { id },
              data: {
                pipeline: {
                  disconnect: true,
                },
                updatedBy: {
                  connect: {
                    id: userId,
                  }
                }
              }
            });
            return { well }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to disconnect wells from pipelines.`,
            }
          }
        }
        return {
          error: {
            field: 'User',
            message: 'Not authorized',
          }
        }
      }
    })
  }
});