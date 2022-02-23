import { enumType, objectType, extendType, inputObjectType, stringArg, nonNull, arg, asNexusMethod } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { Context } from '../context';
import { compare, genSalt, hash } from 'bcryptjs';
import { setLoginSession } from '../../lib/auth';
import { removeTokenCookie } from '../../lib/auth-cookies';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';


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
    t.nonNull.field('role', {
      type: 'UserRoleEnum',
      resolve: ({ role }) => {
        const result = serverEnumToDatabaseEnum(UserRoleEnumMembers, role);
        return result;
      }
    })
    t.list.field('pipelinesCreated', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).pipelinesCreatedBy();
      },
    })
    t.list.field('pipelinesUpdated', {
      type: 'Pipeline',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).pipelinesUpdatedBy();
      },
    })
    t.list.field('licenseChangesCreated', {
      type: 'LicenseChange',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).licenseChangesCreatedBy();
      },
    })
    t.list.field('licenseChangesUpdated', {
      type: 'LicenseChange',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).licenseChangesUpdatedBy();
      },
    })
    t.list.field('facilitiesCreated', {
      type: 'Facility',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).facilitiesCreatedBy();
      },
    })
    t.list.field('facilitiesUpdated', {
      type: 'Facility',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).facilitiesUpdatedBy();
      },
    })
    t.list.field('satellitesCreated', {
      type: 'Satellite',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).satellitesCreatedBy();
      },
    })
    t.list.field('satellitesUpdated', {
      type: 'Satellite',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).satellitesUpdatedBy();
      },
    })
    t.list.field('injectionPointsCreated', {
      type: 'InjectionPoint',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).injectionPointsCreatedBy();
      },
    })
    t.list.field('injectionPointsUpdated', {
      type: 'InjectionPoint',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).injectionPointsUpdatedBy();
      },
    })
    t.list.field('risksCreated', {
      type: 'Risk',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).risksCreatedBy();
      }
    })
    t.list.field('risksUpdated', {
      type: 'Risk',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).risksUpdatedBy();
      }
    })
  },
})


export const UserRoleEnumMembers = {
  ADMIN: 'Admin',
  ENGINEER: 'Engineer',
  OFFICE: 'Office',
  OPERATOR: 'Operator',
  CHEMICAL: 'Chemical',
  CATHODIC: 'Cathodic',
  CONTRACTOR: 'Contractor',
}

export const UserRoleEnum = enumType({
  sourceType: {
    module: '@prisma/client',
    export: 'UserRoleEnum',
  },
  name: 'UserRoleEnum',
  members: UserRoleEnumMembers
});


export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    })
    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, ctx: Context) => {
        return ctx.user;
      },
    })
    t.int('userCount', {
      resolve: async (_parent, _args, ctx: Context) => {
        const userCount = await ctx.prisma.user.count();
        return userCount;
      }
    })
  }
})

export const UserPipelines = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('pipelinesByUser', {
      type: 'Pipeline',
      args: {
        userUniqueInput: nonNull(
          arg({
            type: 'UserUniqueInput',
          }),
        ),
      },
      async resolve(_parent, { userUniqueInput }, ctx: Context) {
        const user = ctx.prisma.user.findUnique({
          where: {
            id: userUniqueInput.id || undefined,
            email: userUniqueInput.email || undefined,
          },
        })
        return user.pipelinesCreatedBy();
      },
    })
  },
});


export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.field('role', { type: 'UserRoleEnum' })
  },
});

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.string('id')
    t.string('email')
  },
});

export const FieldError = objectType({
  name: 'FieldError',
  definition(t) {
    t.string('field')
    t.nonNull.string('message')
  }
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', { type: 'User' })
    t.field('error', { type: 'FieldError' })
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        userCreateInput: nonNull(arg({ type: 'UserCreateInput' })),
      },
      resolve: async (_parent, { userCreateInput }, ctx: Context) => {
        const { firstName, lastName, email, password, role } = userCreateInput;

        const userExists = await ctx.prisma.user.findUnique({
          where: { email }
        });

        if (userExists) {
          return {
            error: {
              field: 'email',
              message: 'user with specified email already exists'
            }
          }
        }
        if (password.length < 8) {
          return {
            error: {
              field: 'password',
              message: 'password must be at least 8 characters long'
            }

          }
        }
        const userCount = await ctx.prisma.user.count();

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = await ctx.prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: userCount === 0 ? 'ADMIN' : databaseEnumToServerEnum(UserRoleEnumMembers, role) || undefined,
          },
        });
        return { user };
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, ctx: Context) => {

        const user = await ctx.prisma.user.findUnique({
          where: {
            email,
          },
        });

        const passwordValid = user && await compare(password, user.password);
        if (!passwordValid) {
          return {
            error: {
              field: 'email',
              message: "Provided email and password don't correspond",
            },

          }
        }

        const userNoPassword = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };
        await setLoginSession(ctx.res, userNoPassword);

        return { user };
      },
    })

    t.boolean('logout', {
      resolve: async (_parent, _args, ctx: Context) => {
        removeTokenCookie(ctx.res);
        return true;
      }
    })
  }
})