import { objectType, stringArg, extendType, nonNull, arg, floatArg, intArg } from 'nexus';
import { Context } from '../context';
import { User as IUser, LicenseChange as ILicenseChange } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import { validateRegex } from './Pipeline';


export const fromToMatchPattern = "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$";
export const wallThicknessMatchPattern = "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$";
export const outsideDiameterMatchPattern = "^4[3-9]$|^4[2-9]\\.[2-9]\\d?$|^([5-9]\\d)(\\.\\d\\d?)?$|^([1-2]\\d{2})(\\.\\d\\d?)?$|^(3[0-2][0-3])(\\.[0-8]\\d?)?$"; // number between 42.2 and 323.89


export const LicenseChangeObjectFields: ITableConstructObject[] = [
  { field: 'id', nullable: false, type: 'String' },
  { field: 'date', nullable: false, type: 'DateTime', },
  { field: 'statusId', nullable: false, type: 'String' },
  { field: 'substanceId', nullable: false, type: 'String' },
  { field: 'from', nullable: false, type: 'String' },
  { field: 'fromFeatureId', nullable: true, type: 'String' },
  { field: 'to', nullable: false, type: 'String' },
  { field: 'toFeatureId', nullable: true, type: 'String' },
  { field: 'pipelineTypeId', nullable: true, type: 'String' },
  { field: 'gradeId', nullable: true, type: 'String' },
  { field: 'materialId', nullable: true, type: 'String' },
  { field: 'internalProtectionId', nullable: true, type: 'String' },
  { field: 'length', nullable: false, type: 'Float' },
  { field: 'yieldStrength', nullable: true, type: 'Int' },
  { field: 'outsideDiameter', nullable: true, type: 'Float' },
  { field: 'wallThickness', nullable: true, type: 'Float' },
  { field: 'mop', nullable: true, type: 'Int' },
  { field: 'comment', nullable: true, type: 'String' },
  { field: 'linkToDocumentation', nullable: true, type: 'String', },
  { field: 'createdById', nullable: false, type: 'String' },
  { field: 'createdAt', nullable: false, type: 'DateTime' },
  { field: 'updatedById', nullable: false, type: 'String' },
  { field: 'updatedAt', nullable: false, type: 'DateTime' },
];

export const LicenseChange = objectType({
  name: 'LicenseChange',
  sourceType: {
    module: '@prisma/client',
    export: 'LicenseChange',
  },
  definition: t => {
    for (const { field, nullable, type } of LicenseChangeObjectFields) {
      const nullability = nullable ? 'nullable' : 'nonNull';

      t[nullability].field(field, { type })
    }
  }
})

export const LicenseChangeExtendObject = extendType({
  type: 'LicenseChange',
  definition(t) {
    t.nonNull.field('pipeline', {
      type: 'Pipeline',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).pipeline();
        return result!
      },
    })
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).createdBy();
        return result!
      },
    })
    t.nonNull.field('updatedBy', {
      type: 'User',
      resolve: async ({ id }, _args, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findUnique({
          where: { id },
        }).updatedBy();
        return result!
      },
    })
    t.nonNull.boolean('authorized', {
      resolve: async ({ createdById }, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveLicenseChangeAuthorized({ user, createdById });
      }
    })
  },
});

interface IresolveLicenseChangeAuthorizedArgs {
  user: IUser;
  createdById: ILicenseChange['createdById'];
}

const resolveLicenseChangeAuthorized = ({ user, createdById }: IresolveLicenseChangeAuthorizedArgs) => {
  const { role, id } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || (role === 'OFFICE' && createdById === id);
}




export const LicenseChangeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('licenseChangesByPipelineId', {
      type: 'LicenseChange',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {
        const result = await ctx.prisma.licenseChange.findMany({
          where: { pipelineId },
          orderBy: { date: 'desc' },
        })
        return result;
      }
    })
  }
});


export const LicenseChangePayload = objectType({
  name: 'LicenseChangePayload',
  definition(t) {
    t.field('licenseChange', { type: 'LicenseChange' })
    t.field('error', { type: 'FieldError' })
  },
});


export const LicenseChangeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        id: nonNull(stringArg()),
        date: arg({ type: 'DateTime' }),
        statusId: stringArg(),
        substanceId: stringArg(),
        from: stringArg(),
        fromFeatureId: stringArg(),
        to: stringArg(),
        toFeatureId: stringArg(),
        length: floatArg(),
        pipelineTypeId: stringArg(),
        gradeId: stringArg(),
        yieldStrength: intArg(),
        outsideDiameter: floatArg(),
        wallThickness: floatArg(),
        materialId: stringArg(),
        mop: intArg(),
        internalProtectionId: stringArg(),
        comment: stringArg(),
        linkToDocumentation: stringArg(),
      },
      resolve: async (_parent, args, ctx: Context) => {
        console.log('args:', args);
        
        const user = ctx.user;
        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {
            const currentLicenseChange = await ctx.prisma.licenseChange.findUnique({
              where: { id: args.id },
              select: {
                pipelineId: true,
                createdById: true,
                date: true,
              }
            });

            if (currentLicenseChange) {

              const { pipelineId, createdById, date } = currentLicenseChange;

              const pipelineLicenseChanges = await ctx.prisma.licenseChange.findMany({
                where: { pipelineId },
                select: { date: true, }
              });

              const licenseChangeDates = pipelineLicenseChanges.map(licenseChange => licenseChange.date.getTime());

              if (args.date && licenseChangeDates.includes(args.date.getTime()) && args.date.getTime() !== date.getTime()) {
                return {
                  error: {
                    field: 'License change date',
                    message: `License change date ${args.date.toISOString().split('T')[0]} is already entered for this pipeline. One pipeline cannot have multiple license changes on the same date.`,
                  }
                }
              }

              if (role === 'OFFICE' && createdById !== userId) {
                return {
                  error: {
                    field: 'License change',
                    message: `Hi ${firstName}. Your user privilages do not allow you to edit license change entries not authored by you.`,
                  }
                }
              }
            }

            if (args.from || args.to) {
              const error = validateRegex({ field: (args.from || args.to)!, matchPattern: fromToMatchPattern, prettyMatchPattern: '##-##-###-##W# or X-###-X ###-X-##' });
              if (error) {
                return error;
              }
            }
            if (args.wallThickness) {
              const error = validateRegex({ field: String(args.wallThickness), matchPattern: wallThicknessMatchPattern, prettyMatchPattern: 'number between 0 and 25.99 up to two decimal places' });
              if (error) {
                return error;
              }
            }
            if (args.outsideDiameter) {
              const error = validateRegex({ field: String(args.outsideDiameter), matchPattern: outsideDiameterMatchPattern, prettyMatchPattern: 'number between 42.2 and 323.89 up to two decimal places' });
              if (error) {
                return error;
              }
            }

            const licenseChange = await ctx.prisma.licenseChange.update({
              where: { id: args.id },
              data: {
                statusId: args.statusId || undefined,
                substanceId: args.substanceId || undefined,
                date: args.date || undefined,
                from: args.from || undefined,
                fromFeatureId: args.fromFeatureId,
                to: args.to || undefined,
                toFeatureId: args.toFeatureId,
                length: args.length || undefined,
                pipelineTypeId: args.pipelineTypeId,
                gradeId: args.gradeId,
                yieldStrength: args.yieldStrength,
                outsideDiameter: args.outsideDiameter,
                wallThickness: args.wallThickness,
                materialId: args.materialId,
                mop: args.mop,
                internalProtectionId: args.internalProtectionId,
                linkToDocumentation: args.linkToDocumentation,
                comment: args.comment,
                updatedById: userId,
              },
            });
            return { licenseChange }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to make changes to license changes.`,
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
    t.field('addLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        pipelineId: nonNull(stringArg()),
      },
      resolve: async (_parent, { pipelineId }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {
            const pipelineLicenseChanges = await ctx.prisma.licenseChange.findMany({
              where: {
                pipelineId,
              },
              select: {
                date: true,
              },
              orderBy: {
                date: 'asc'
              }
            });
            // When adding new license change entry, date when license was changed is mandatory and has to be unique,
            // so we set it to today and check if it already exists in which case we will keep increasing it by 1 until it's unique.
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            for (const i of pipelineLicenseChanges) {
              if (i.date.getTime() === today.getTime()) {
                today.setDate(today.getDate() + 1);
              }
            }

            const licenseChange = await ctx.prisma.licenseChange.create({
              data: {
                pipeline: { connect: { id: pipelineId } },
                date: today,
                from: '',
                to: '',
                length: 0,
                status: { connect: { status: 'Operating' } },
                substance: { connect: { substance: 'Oil Well Effluent' } },
                createdBy: { connect: { id: userId } },
                updatedBy: { connect: { id: userId } },
              }
            });
            return { licenseChange };
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to add new license changes.`,
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
    t.field('deleteLicenseChange', {
      type: 'LicenseChangePayload',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { id }, ctx: Context) => {

        const user = ctx.user;

        if (user) {
          const { id: userId, role, firstName } = user;
          if (role === 'ADMIN' || role === 'ENGINEER' || role === 'OFFICE') {

            if (role === 'OFFICE') {
              const currentLicenseChange = await ctx.prisma.licenseChange.findUnique({
                where: { id },
                select: {
                  createdById: true,
                }
              });

              if (currentLicenseChange && currentLicenseChange.createdById !== userId) {
                return {
                  error: {
                    field: 'License change created by',
                    message: `Hi ${firstName}. Your user privilages do not allow you to delete license changes not authored by you.`,
                  }
                }
              }
            }
            const licenseChange = await ctx.prisma.licenseChange.delete({
              where: { id }
            });
            return { licenseChange }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to delete license changes.`,
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