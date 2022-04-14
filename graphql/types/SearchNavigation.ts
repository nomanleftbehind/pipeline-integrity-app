import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { RiskObjectMembers } from './Risk';
import { PipelineObjectMembers } from './Pipeline';


type ISearchNavigationObject = { table: string; field: string; nullable: boolean; type: string; };


export const SearchNavigationObject = objectType({
  name: 'SearchNavigationObject',
  definition(t) {
    t.nonNull.string('table')
    t.nonNull.string('field')
    t.nonNull.boolean('nullable')
    t.nonNull.string('type')
  }
});

const searchNavigationObject = RiskObjectMembers
  .map((obj) => {
    const newObj = { table: 'risk', ...obj };
    return newObj;
  })
  .concat(
    PipelineObjectMembers
      .map((obj) => {
        const newObj = { table: 'pipeline', ...obj };
        return newObj;
      })
  );


export const SearchNavigationQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.nonNull.field('searchNavigationOptions', {
      type: 'SearchNavigationObject',
      resolve: () => {
        return searchNavigationObject as ISearchNavigationObject[];
      }
    })
  }
})