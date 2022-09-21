import { objectType, stringArg, extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../context';
import { User as IUser, Prisma, LicenseChange as ILicenseChange } from '@prisma/client';
import { ITableConstructObject } from './SearchNavigation';
import { validateRegex } from './Pipeline';


export const fromToMatchPattern = "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$";
export const wallThicknessMatchPattern = "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$";
export const outsideDiameterMatchPattern = "^4[3-9]$|^4[2-9]\\.[2-9]\\d?$|^([5-9]\\d)(\\.\\d\\d?)?$|^([1-2]\\d{2})(\\.\\d\\d?)?$|^(3[0-2][0-3])(\\.[0-8]\\d?)?$"; // number between 42.2 and 323.89
export const lengthMatchPattern = "^\\d*\\.?\\d*$";
export const yieldStrengthMatchPattern = "^(240|206|359|290|0|289|57|24|200|205|380|2875|241|358|360)$";
export const mopMatchPattern = "^\\d{1,5}$"; // number between 0 and 99999


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
      resolve: async (_, _args, ctx: Context) => {
        const user = ctx.user;
        return !!user && resolveLicenseChangeAuthorized(user);
      }
    })
  },
});


const resolveLicenseChangeAuthorized = (user: IUser) => {
  const { role } = user;
  return role === 'ADMIN' || role === 'ENGINEER' || role === 'REGULATORY';
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


export const EditLicenseChangeInput = inputObjectType({
  name: 'EditLicenseChangeInput',
  definition(t) {
    t.nonNull.string('id')
    t.field('date', { type: 'DateTime' })
    t.string('statusId')
    t.string('substanceId')
    t.string('from')
    t.string('fromFeatureId')
    t.string('to')
    t.string('toFeatureId')
    t.float('length')
    t.string('pipelineTypeId')
    t.string('gradeId')
    t.int('yieldStrength')
    t.float('outsideDiameter')
    t.float('wallThickness')
    t.string('materialId')
    t.int('mop')
    t.string('internalProtectionId')
    t.string('comment')
    t.string('linkToDocumentation')
  },
});


export const LicenseChangeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editLicenseChange', {
      type: 'LicenseChangePayload',
      args: { data: nonNull(arg({ type: 'EditLicenseChangeInput' })) },
      resolve: async (_parent, { data: { id, date, from, fromFeatureId, to, toFeatureId, statusId, substanceId, length, pipelineTypeId, gradeId, yieldStrength, outsideDiameter, wallThickness, materialId, mop, internalProtectionId, linkToDocumentation, comment } }, ctx: Context) => {

        const user = ctx.user;
        if (user) {
          const { id: userId, firstName } = user;
          const authorized = resolveLicenseChangeAuthorized(user);
          if (authorized) {
            if (from || to) {
              const error = validateRegex({ field: (from || to)!, matchPattern: fromToMatchPattern, prettyMatchPattern: '##-##-###-##W# or X-###-X ###-X-##' });
              if (error) {
                return error;
              }
            }
            if (wallThickness) {
              const error = validateRegex({ field: String(wallThickness), matchPattern: wallThicknessMatchPattern, prettyMatchPattern: 'number between 0 and 25.99 up to two decimal places' });
              if (error) {
                return error;
              }
            }
            if (outsideDiameter) {
              const error = validateRegex({ field: String(outsideDiameter), matchPattern: outsideDiameterMatchPattern, prettyMatchPattern: 'number between 42.2 and 323.89 up to two decimal places' });
              if (error) {
                return error;
              }
            }
            if (length) {
              const error = validateRegex({ field: String(length), matchPattern: lengthMatchPattern, prettyMatchPattern: 'any number' });
              if (error) {
                return error;
              }
            }
            if (yieldStrength) {
              const error = validateRegex({ field: String(yieldStrength), matchPattern: yieldStrengthMatchPattern, prettyMatchPattern: 'valid yield strength' });
              if (error) {
                return error;
              }
            }
            if (mop) {
              const error = validateRegex({ field: String(mop), matchPattern: mopMatchPattern, prettyMatchPattern: 'whole number between 0 and 99999' });
              if (error) {
                return error;
              }
            }
            try {
              const licenseChange = await ctx.prisma.licenseChange.update({
                where: { id },
                data: {
                  statusId: statusId || undefined,
                  substanceId: substanceId || undefined,
                  date: date || undefined,
                  from: from || undefined,
                  fromFeatureId,
                  to: to || undefined,
                  toFeatureId,
                  length: length || undefined,
                  pipelineTypeId,
                  gradeId,
                  yieldStrength,
                  outsideDiameter,
                  wallThickness,
                  materialId,
                  mop,
                  internalProtectionId,
                  linkToDocumentation,
                  comment,
                  updatedById: userId,
                },
              });
              await allocateLicenseChangeChronologicalEdge({ pipelineId: licenseChange.pipelineId, ctx });
              return { licenseChange }
            } catch (e) {
              if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                  return {
                    error: {
                      field: 'date',
                      message: `License change dated ${date?.toISOString().split('T')[0]} already exists for this pipeline. One pipeline cannot have multiple license changes on the same date.`,
                    }
                  }
                }
              }
              throw e;
            }
          }
          return {
            error: {
              field: 'User',
              message: `Hi ${firstName}, you are not authorized to modify license changes.`,
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
          const { id: userId, firstName } = user;
          const authorized = resolveLicenseChangeAuthorized(user);
          if (authorized) {
            // Find the latest license change and if it exists create new license change as a copy of it
            const latestLicenseChange = await ctx.prisma.licenseChange.findFirst({
              where: { pipelineId },
              orderBy: { date: 'desc' },
              select: {
                pipelineId: true,
                date: true,
                from: true,
                fromFeatureId: true,
                to: true,
                toFeatureId: true,
                pipelineTypeId: true,
                gradeId: true,
                internalProtectionId: true,
                length: true,
                materialId: true,
                mop: true,
                outsideDiameter: true,
                statusId: true,
                substanceId: true,
                wallThickness: true,
                yieldStrength: true,
                comment: true,
                linkToDocumentation: true,
                createdById: true,
                updatedById: true,
              }
            });

            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);

            if (latestLicenseChange) {
              // License change date is mandatory and has to be unique. The following procedure makes sure it is.
              const yesterday = new Date(today)
              yesterday.setDate(yesterday.getDate() - 1)
              const newDate = new Date(Math.max(yesterday.getTime(), latestLicenseChange.date.getTime()));
              newDate.setDate(newDate.getDate() + 1);

              latestLicenseChange.date = newDate;
              latestLicenseChange.createdById = userId;
              latestLicenseChange.updatedById = userId;

              const licenseChange = await ctx.prisma.licenseChange.create({
                data: latestLicenseChange
              })
              await allocateLicenseChangeChronologicalEdge({ pipelineId, ctx });
              return { licenseChange };
            }

            // If pipeline has no license changes, continue with the following execution
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
            await allocateLicenseChangeChronologicalEdge({ pipelineId, ctx });
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
          const { firstName } = user;
          const authorized = resolveLicenseChangeAuthorized(user);
          if (authorized) {
            const licenseChange = await ctx.prisma.licenseChange.delete({
              where: { id }
            });
            await allocateLicenseChangeChronologicalEdge({ pipelineId: licenseChange.pipelineId, ctx });
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


interface IAllocateLicenseChangeChronologicalEdge {
  pipelineId: ILicenseChange['pipelineId'];
  ctx: Context;
}

export const allocateLicenseChangeChronologicalEdge = async ({ pipelineId, ctx }: IAllocateLicenseChangeChronologicalEdge) => {

  const { _min, _max } = await ctx.prisma.licenseChange.aggregate({
    where: { pipelineId },
    _max: { date: true },
    _min: { date: true },
  });

  const pipelineLicenseChanges = await ctx.prisma.licenseChange.findMany({
    where: { pipelineId },
    select: { id: true, date: true }
  });

  for (const { id, date } of pipelineLicenseChanges) {
    const first = date.getTime() === _min.date?.getTime() ? true : null;
    const last = date.getTime() === _max.date?.getTime() ? true : null;
    await ctx.prisma.licenseChange.update({
      where: { id },
      data: {
        first,
        last,
      }
    });
  }
}