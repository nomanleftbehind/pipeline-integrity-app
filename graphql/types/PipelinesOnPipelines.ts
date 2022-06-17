import { objectType, stringArg, extendType, nonNull, arg } from 'nexus';
import { Context } from '../context';
import { ITableConstructObject } from './SearchNavigation';
import { resolvePipelineAuthorized } from './Pipeline';

export const PipelinesOnPipelinesObjectFields: ITableConstructObject[] = [
  { field: 'upstreamId', nullable: false, type: 'String' },
  { field: 'downstreamId', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];


export const PipelinesOnPipelines = objectType({
  name: 'PipelinesOnPipelines',
  sourceType: {
    module: '@prisma/client',
    export: 'PipelinesOnPipelines',
  },
  definition: t => {
    for (const { field, nullable, type } of PipelinesOnPipelinesObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
});


export const PipelinesOnPipelinesExtendObject = extendType({
  type: 'PipelinesOnPipelines',
  definition: t => {
    t.nonNull.field('upstream', {
      type: 'Pipeline',
      resolve: async ({ upstreamId }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id: upstreamId },
        });
        return result!
      },
    })
    t.nonNull.field('downstream', {
      type: 'Pipeline',
      resolve: async ({ downstreamId }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipeline.findUnique({
          where: { id: downstreamId },
        });
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ upstreamId, downstreamId }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelinesOnPipelines.findUnique({
          where: { upstreamId_downstreamId: { upstreamId, downstreamId } },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ upstreamId, downstreamId }, _args, ctx: Context) => {
        const result = await ctx.prisma.pipelinesOnPipelines.findUnique({
          where: { upstreamId_downstreamId: { upstreamId, downstreamId } },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolvePipelineAuthorized(user);
      }
    })
  },
});


export const PipelinesOnPipelinesQuery = extendType({
  type: 'Query',
  definition: t => {
    t.list.field('pipelinesOnPipelinesByUpstreamId', {
      type: 'PipelinesOnPipelines',
      args: {
        upstreamId: nonNull(stringArg()),
      },
      resolve: async (_, { upstreamId }, ctx: Context) => {
        return await ctx.prisma.pipelinesOnPipelines.findMany({
          where: { upstreamId },
        });
      },
    })
    t.list.field('pipelinesOnPipelinesByDownstreamId', {
      type: 'PipelinesOnPipelines',
      args: {
        downstreamId: nonNull(stringArg()),
      },
      resolve: async (_, { downstreamId }, ctx: Context) => {
        return await ctx.prisma.pipelinesOnPipelines.findMany({
          where: { downstreamId },
        });
      },
    })
  }
});


export const PipelinesOnPipelinesPayload = objectType({
  name: 'PipelinesOnPipelinesPayload',
  definition(t) {
    t.field('pipelinesOnPipelines', { type: 'PipelinesOnPipelines' })
    t.field('error', { type: 'FieldError' })
  },
});


export const PipelinesOnPipelinesMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('connectPipeline', {
      type: 'PipelinesOnPipelinesPayload',
      args: {
        pipelineId: nonNull(stringArg()),
        connectedPipelineId: stringArg(),
        connectNewPipelineId: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_, { pipelineId, connectedPipelineId, connectNewPipelineId, flowCalculationDirection }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            if (typeof connectedPipelineId === 'string') {
              const pipelinesOnPipelines = await ctx.prisma.pipelinesOnPipelines.update({
                where: {
                  upstreamId_downstreamId: {
                    downstreamId: flowCalculationDirection === 'Downstream' ? connectedPipelineId : pipelineId,
                    upstreamId: flowCalculationDirection === 'Upstream' ? connectedPipelineId : pipelineId,
                  }
                },
                data: {
                  downstreamId: flowCalculationDirection === 'Downstream' ? connectNewPipelineId : undefined,
                  upstreamId: flowCalculationDirection === 'Upstream' ? connectNewPipelineId : undefined,
                  updatedById: userId,
                },
              });
              return { pipelinesOnPipelines }
            }
            const pipelinesOnPipelines = await ctx.prisma.pipelinesOnPipelines.create({
              data: {
                downstreamId: flowCalculationDirection === 'Downstream' ? connectNewPipelineId : pipelineId,
                upstreamId: flowCalculationDirection === 'Upstream' ? connectNewPipelineId : pipelineId,
                createdById: userId,
                updatedById: userId,
              }
            });
            return { pipelinesOnPipelines }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to connect pipelines.`,
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
    // t.field('connectPipeline', {
    //   type: 'PipelinesOnPipelinesPayload',
    //   args: {
    //     pipelineId: nonNull(stringArg()),
    //     connectNewPipelineId: nonNull(stringArg()),
    //     flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
    //   },
    //   resolve: async (_parent, { pipelineId, connectNewPipelineId, flowCalculationDirection }, ctx: Context) => {

    //     const user = ctx.user;
    //     if (user) {
    //       const { id: userId, firstName } = user;
    //       const authorized = resolvePipelineAuthorized(user);
    //       if (authorized) {
    //         const pipelinesOnPipelines = await ctx.prisma.pipelinesOnPipelines.create({
    //           data: {
    //             upstreamId: flowCalculationDirection === 'Upstream' ? connectNewPipelineId : pipelineId,
    //             downstreamId: flowCalculationDirection === 'Downstream' ? connectNewPipelineId : pipelineId,
    //             createdById: userId,
    //             updatedById: userId,
    //           }
    //         });
    //         return { pipelinesOnPipelines }
    //       }
    //       return {
    //         error: {
    //           field: 'User',
    //           message: `Hi ${firstName}, you are not authorized to connect pipelines.`,
    //         }
    //       }
    //     }
    //     return {
    //       error: {
    //         field: 'User',
    //         message: 'Not authorized',
    //       }
    //     }
    //   }
    // })
    t.field('disconnectPipeline', {
      type: 'PipelinesOnPipelinesPayload',
      args: {
        pipelineId: nonNull(stringArg()),
        disconnectPipelineId: nonNull(stringArg()),
        flowCalculationDirection: nonNull(arg({ type: 'FlowCalculationDirectionEnum' })),
      },
      resolve: async (_, { pipelineId, disconnectPipelineId, flowCalculationDirection }, ctx: Context) => {
        const user = ctx.user;
        if (user) {
          const { firstName } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {
            const pipelinesOnPipelines = await ctx.prisma.pipelinesOnPipelines.delete({
              where: {
                upstreamId_downstreamId: {
                  upstreamId: flowCalculationDirection === 'Upstream' ? disconnectPipelineId : pipelineId,
                  downstreamId: flowCalculationDirection === 'Downstream' ? disconnectPipelineId : pipelineId,
                }
              },
            });
            return { pipelinesOnPipelines }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to disconnect pipelines.`,
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
  }
});