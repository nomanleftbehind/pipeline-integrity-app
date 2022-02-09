import { rule, shield } from 'graphql-shield';
import { Context } from '../context';

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, ctx: Context) => {
    return Boolean(ctx.user);
  }),
  hasMutationPrivileges: rule()(async (_parent, _args, ctx: Context) => {
    return ctx.user?.role === 'ADMIN';
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
    // deletePipeline: rules.isAuthenticatedUser,
    // editPipeline: rules.isAuthenticatedUser,
    // incrementPostViewCount: rules.isAuthenticatedUser,
    // togglePublishPost: rules.hasMutationPrivileges,
  },
})
