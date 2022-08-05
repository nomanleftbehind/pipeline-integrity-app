import { enumType, objectType, extendType, inputObjectType, stringArg, nonNull, arg, asNexusMethod } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { Context } from '../context';
import { compare, genSalt, hash } from 'bcryptjs';
import { setLoginSession } from '../../lib/auth';
import { removeTokenCookie } from '../../lib/auth-cookies';
import { serverEnumToDatabaseEnum, databaseEnumToServerEnum } from './Pipeline';
import nodemailer from 'nodemailer';
import { v4 } from 'uuid';
import Redis from 'ioredis';
import { forgotPasswordPrefix, confirmUserPrefix } from '../constants';


const redis = new Redis();


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
    t.list.field('wellsCreated', {
      type: 'Well',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).wellsCreatedBy();
      },
    })
    t.list.field('wellsUpdated', {
      type: 'Well',
      resolve: ({ id }, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        }).wellsUpdatedBy();
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
    t.nonNull.string('field')
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
      resolve: async (_parent, { userCreateInput: { firstName, lastName, email, password, role } }, ctx: Context) => {

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
              message: "Email and password don't match",
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

    t.nonNull.boolean('forgotPassword', {
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_, { email }, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email
          },
          select: {
            id: true,
          }
        });

        if (!user) {
          return true;
        }

        const token = v4();
        await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration
        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

        return true;
      }
    })

    t.field('changePassword', {
      type: 'AuthPayload',
      args: {
        token: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { token, password }, ctx: Context) => {
        const userId = await redis.get(forgotPasswordPrefix + token);
        await redis.del(forgotPasswordPrefix + token);

        if (!userId) {
          return null;
        }

        if (password.length < 8) {
          return {
            error: {
              field: 'password',
              message: 'password must be at least 8 characters long'
            }

          }
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
          }
        });

        if (!user) {
          return null;
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const updatedUser = await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            password: hashedPassword,
          }
        });
        // Log in upon successfully changing password
        await setLoginSession(ctx.res, { id: updatedUser.id, email: updatedUser.email, firstName: updatedUser.firstName, lastName: updatedUser.lastName, role: updatedUser.role });

        return { user: updatedUser };
      }
    })
  }
})

const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24);

  return `http://localhost:3000/user/confirm/${token}`;
}



export async function sendEmail(email: string, url: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const account = await nodemailer.createTestAccount();

  console.log('account', account);


  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  const mailOptions = {
    from: '"Doma" <dsucic@bonterraenergy.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}