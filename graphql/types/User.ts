import { enumType, objectType, inputObjectType, stringArg, nonNull, arg, asNexusMethod } from 'nexus';
import { extendType } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { Facility, FacilityCreateInput } from './Facility';
import { Satellite, SatelliteCreateInput } from './Satellite';
import { Pipeline, PipelineCreateInput } from './Pipeline';
import { InjectionPoint, InjectionPointCreateInput } from './InjectionPoint';
import { Context } from '../context';
import { APP_SECRET, getUserId } from '../utils';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


export const DateTime = asNexusMethod(DateTimeResolver, 'date');

export const User = objectType({
  name: 'User',
  sourceType: {
    module: '@prisma/client',
    export: 'User',
  },
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.field('role', { type: Role })
    t.list.field('pipelines', {
      type: Pipeline,
      resolve: (parent, _args, ctx: Context) => {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .pipelines()
      },
    })
    t.list.field('facilities', {
      type: Facility,
      resolve: (parent, _args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .facilities()
      },
    })
    t.list.field('satellites', {
      type: Satellite,
      resolve: (parent, _args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .satellites()
      },
    })
    t.list.field('injectionPoints', {
      type: InjectionPoint,
      resolve: (parent, _args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .injectionPoints()
      },
    })
  },
})

export const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allUsers', {
      type: User,
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })
    t.field('me', {
      type: User,
      resolve: (_parent, _args, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findUnique({
          where: {
            id: String(userId),
          },
        })
      },
    })
  }
})

export const UserPipelines = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelinesByUser', {
      type: Pipeline,
      args: {
        userUniqueInput: nonNull(
          arg({
            type: UserUniqueInput,
          }),
        ),
      },
      async resolve(_parent, args, ctx: Context) {
        const user = ctx.prisma.user
          .findUnique({
            where: {
              id: args.userUniqueInput.id || undefined,
              email: args.userUniqueInput.email || undefined,
            },
          })
        return user.pipelines();
      },
    })
  },
});


export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.list.field('facilities', { type: FacilityCreateInput })
    t.list.field('satellites', { type: SatelliteCreateInput })
    t.list.field('pipelines', { type: PipelineCreateInput })
    t.list.field('injectionPoints', { type: InjectionPointCreateInput })
  },
})

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.string('id')
    t.string('email')
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: User })
  },
})

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: AuthPayload,
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: AuthPayload,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
  }
})