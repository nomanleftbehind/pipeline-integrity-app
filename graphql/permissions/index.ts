import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, ctx: Context) => {
    const userId = getUserId(ctx);
    return Boolean(userId)
  }),
  hasMutationPrivileges: rule()(async (_parent, _args, ctx: Context) => {
    const userId = getUserId(ctx);
    const user = await ctx.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
    return user?.role === 'ADMIN'
  }),
}

export const permissions = shield({
  Query: {
    // allUsers: rules.isAuthenticatedUser,
    // pipelines: rules.isAuthenticatedUser,
    // me: rules.isAuthenticatedUser,
    // allPipelines: rules.isAuthenticatedUser,
    // pipelineById: rules.isAuthenticatedUser,
    // pipelinesByUser: rules.isAuthenticatedUser,
    // feed: rules.isAuthenticatedUser,
  },
  Mutation: {
    // createFacility: rules.isAuthenticatedUser,
    // editFacility: rules.isAuthenticatedUser,
    // editSatellite: rules.isAuthenticatedUser
    deletePipeline: rules.isAuthenticatedUser,
    editPipeline: rules.isAuthenticatedUser,
    // incrementPostViewCount: rules.isAuthenticatedUser,
    // togglePublishPost: rules.hasMutationPrivileges,
  },
})
