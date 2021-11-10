import { permissions } from './permissions';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';
// import {FromToFeatureEnumObject, SubstanceEnumObject, Validator, ValidatorQuery} from './types/Validatorss';


const printTypes = (type: typeof types) => {
  console.log(type);
  return type
}

const a = printTypes(types)

export const schemaWithoutPermissions = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
    debug: true
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
