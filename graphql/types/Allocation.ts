import { objectType, extendType, nonNull, inputObjectType, arg } from 'nexus';
import { ContextSubscription } from '../context';
import { Prisma } from '@prisma/client';
import { NexusGenFieldTypes, NexusGenArgTypes } from 'nexus-typegen';
import { allocateRisk } from './RiskCalcs';
import { withFilter } from 'graphql-subscriptions';
import { resolveRiskAuthorized } from './Risk';
import { allocateLicenseChangeChronologicalEdge } from './LicenseChange';
import { allocatePressureTestChronologicalEdge } from './PressureTest';
import { allocatePigRunChronologicalEdge } from './PigRun';
import { allocateGeotechnicalChronologicalEdge } from './Geotechnical';
import { allocateCathodicSurveyChronologicalEdge } from './CathodicSurvey';
import { allocatePipelineBatchChronologicalEdge } from './PipelineBatch';
import { allocateWellBatchChronologicalEdge } from './WellBatch';
import { resolvePipelineAuthorized } from './Pipeline';
import { allocatePipelineFlow } from './PipelineFlow';
import { resolvePressureTestAuthorized } from './PressureTest';
import { allocatePressureTest } from './PressureTestCalcs';
import {
  resolveWellAuthorized,
  allocateWellFlow,
} from './Well';

export const AllocationMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('allocatePipelineFlow', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {

            const allPipelines = await ctx.prisma.pipeline.findMany({
              select: { id: true, flowCalculationDirection: true }
            });

            const numberOfItems = allPipelines.length;
            let progress = 0;
            try {
              for (const { id, flowCalculationDirection } of allPipelines) {
                await allocatePipelineFlow({ id, flowCalculationDirection, ctx });
                progress += 1;
                ctx.pubsub.publish('pipelineFlowAllocationProgress', { userId, progress, numberOfItems });
              }

            } catch (e) {
              // If allocation fails, publish initial progress to close the progress modal
              ctx.pubsub.publish('pipelineFlowAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
              if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2010') {
                  return {
                    error: {
                      field: 'Risk',
                      message: `Pipeline flow calculation function does not exit on a database.`,
                    }
                  }
                }
              }
              throw e;
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('pipelineFlowAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Pipeline flow',
                message: `Allocated ${numberOfItems} pipeline flows`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate pipeline flows.`,
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
    t.field('allocateRisk', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolveRiskAuthorized(user);
          if (authorized) {
            const allRisks = await ctx.prisma.risk.findMany({
              select: {
                id: true,
              }
            });
            const numberOfItems = allRisks.length;
            let progress = 0;
            try {
              for (const { id } of allRisks) {
                await allocateRisk({ id, ctx });
                progress += 1;
                ctx.pubsub.publish('riskAllocationProgress', { userId, progress, numberOfItems });
              }
            } catch (e) {
              // If allocation fails, publish initial progress to close the progress modal
              ctx.pubsub.publish('riskAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
              if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2010') {
                  return {
                    error: {
                      field: 'Risk',
                      message: `Pipeline flow calculation function does not exit on a database.`,
                    }
                  }
                }
              }
              throw e;
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('riskAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Risk',
                message: `Allocated ${numberOfItems} risks`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate risks.`,
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
    t.field('allocatePressureTest', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolvePressureTestAuthorized(user);
          if (authorized) {

            const allPressureTests = await ctx.prisma.pressureTest.groupBy({
              by: ['pipelineId'],
              _count: {
                _all: true
              }
            });

            const numberOfItems = allPressureTests.map(({ _count: { _all } }) => _all).reduce((previousValue, currentValue) => previousValue + currentValue);
            let progress = 0;
            for (const { pipelineId, _count: { _all } } of allPressureTests) {
              await allocatePressureTest({ pipelineId, ctx });
              progress += _all;
              ctx.pubsub.publish('pressureTestAllocationProgress', { userId, progress, numberOfItems });
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('pressureTestAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Pressure Test',
                message: `Allocated ${numberOfItems} pressure tests`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate pressure tests.`,
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
    t.field('allocateWellFlow', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolveWellAuthorized(user);
          if (authorized) {

            const allWells = await ctx.prisma.well.findMany({
              select: { id: true, oil: true, water: true, gas: true }
            });

            const numberOfItems = allWells.length;
            let progress = 0;
            try {
              for (const { id, oil, water, gas } of allWells) {
                await allocateWellFlow({ id, oil, water, gas, ctx });
                progress += 1;
                ctx.pubsub.publish('wellFlowAllocationProgress', { userId, progress, numberOfItems });
              }

            } catch (e) {
              // If allocation fails, publish initial progress to close the progress modal
              ctx.pubsub.publish('wellFlowAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
              throw e;
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('wellFlowAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Well flow',
                message: `Allocated ${numberOfItems} well flows`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate well flows.`,
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
    t.field('allocateChronologicalEdge', {
      type: 'AllocationPayload',
      resolve: async (_, _args, ctx) => {
        const user = ctx.user;
        if (user) {
          const { firstName, id: userId } = user;
          const authorized = resolvePipelineAuthorized(user);
          if (authorized) {

            const allLicenseChanges = await ctx.prisma.licenseChange.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allPressureTests = await ctx.prisma.pressureTest.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allPigRuns = await ctx.prisma.pigRun.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allCathodicSurveys = await ctx.prisma.cathodicSurvey.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allGeotechnicals = await ctx.prisma.geotechnical.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allPipelineBatches = await ctx.prisma.pipelineBatch.groupBy({ by: ['pipelineId'], _count: { _all: true } });
            const allWellBatches = await ctx.prisma.wellBatch.groupBy({ by: ['wellId'], _count: { _all: true } })
            const allWellBatchesWellIdToPipelineId = allWellBatches.map(({ wellId, _count }) => { return { pipelineId: wellId, _count } });

            const numberOfItems = allLicenseChanges
              .concat(allPressureTests, allPigRuns, allCathodicSurveys, allGeotechnicals, allPipelineBatches, allWellBatchesWellIdToPipelineId)
              .map(({ _count: { _all } }) => _all)
              .reduce((previousValue, currentValue) => previousValue + currentValue);

            let progress = 0;
            try {
              for (const { pipelineId, _count: { _all } } of allLicenseChanges) {
                await allocateLicenseChangeChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { pipelineId, _count: { _all } } of allPressureTests) {
                await allocatePressureTestChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { pipelineId, _count: { _all } } of allPigRuns) {
                await allocatePigRunChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { pipelineId, _count: { _all } } of allCathodicSurveys) {
                await allocateCathodicSurveyChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { pipelineId, _count: { _all } } of allGeotechnicals) {
                await allocateGeotechnicalChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { pipelineId, _count: { _all } } of allPipelineBatches) {
                await allocatePipelineBatchChronologicalEdge({ pipelineId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
              for (const { wellId, _count: { _all } } of allWellBatches) {
                await allocateWellBatchChronologicalEdge({ wellId, ctx });
                progress += _all;
                ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress, numberOfItems });
              }
            } catch (e) {
              // If allocation fails, publish initial progress to close the progress modal
              ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
              throw e;
            }
            // If allocation succeeds, publish initial progress after the loop to close the progress modal
            ctx.pubsub.publish('chronologicalEdgeAllocationProgress', { userId, progress: 0, numberOfItems: 0 });
            return {
              success: {
                field: 'Chronological edge',
                message: `Allocated ${numberOfItems} chronological edges`,
              }
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to allocate chronological edges.`,
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
})





export const AllocationPayload = objectType({
  name: 'AllocationPayload',
  definition: t => {
    t.field('success', { type: 'FieldError' })
    t.field('error', { type: 'FieldError' })
  },
});


export const AllocationProgressObject = objectType({
  name: 'AllocationProgressObject',
  definition: t => {
    t.nonNull.string('userId')
    t.nonNull.int('progress')
    t.nonNull.int('numberOfItems')
  },
});

export const AllocationInput = inputObjectType({
  name: 'AllocationInput',
  definition(t) {
    t.nonNull.string('userId')
  },
});

export const RiskAllocationProgressSubscription = extendType({
  type: 'Subscription',
  definition: t => {
    t.nonNull.field('pipelineFlowAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['pipelineFlowAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('pipelineFlowAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['pipelineFlowAllocationProgress'], args: NexusGenArgTypes['Subscription']['pipelineFlowAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['pipelineFlowAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
    t.nonNull.field('wellFlowAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['wellFlowAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('wellFlowAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['wellFlowAllocationProgress'], args: NexusGenArgTypes['Subscription']['wellFlowAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['wellFlowAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
    t.nonNull.field('riskAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['riskAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('riskAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['riskAllocationProgress'], args: NexusGenArgTypes['Subscription']['riskAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['riskAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
    t.nonNull.field('pressureTestAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['pressureTestAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('pressureTestAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['pressureTestAllocationProgress'], args: NexusGenArgTypes['Subscription']['pressureTestAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['pressureTestAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
    t.nonNull.field('chronologicalEdgeAllocationProgress', {
      type: 'AllocationProgressObject',
      args: { data: nonNull(arg({ type: 'AllocationInput' })) },
      subscribe: withFilter(
        (_root/* This is still undefined at this point */, _args: NexusGenArgTypes['Subscription']['chronologicalEdgeAllocationProgress'], ctx: ContextSubscription) => {
          return ctx.pubsub.asyncIterator('chronologicalEdgeAllocationProgress')
        },
        (root: NexusGenFieldTypes['Subscription']['chronologicalEdgeAllocationProgress'], args: NexusGenArgTypes['Subscription']['chronologicalEdgeAllocationProgress'], _ctx: ContextSubscription) => {
          // Only push an update for user who pressed the allocate button
          return (root.userId === args.data.userId);
        },
      ),
      resolve: (root: NexusGenFieldTypes['Subscription']['chronologicalEdgeAllocationProgress'], _args, _ctx: ContextSubscription) => {
        return root
      },
    })
  }
});