import { enumType, objectType, stringArg, extendType, nonNull, arg, floatArg, booleanArg, intArg } from 'nexus';
import { RiskObjectMembers } from './Risk';
import { PipelineObjectMembers } from './Pipeline';


type ISearchNavigationObject = { field: string; nullable: boolean; type: string; };


export const SearchNavigationObject = objectType({
  name: 'SearchNavigationObject',
  definition(t) {
    t.nonNull.string('field')
    t.nonNull.boolean('nullable')
    t.nonNull.string('type')
  }
});

export const SearchNavigationObjectArray = objectType({
  name: 'SearchNavigationObjectArray',
  definition(t) {
    t.nonNull.list.nonNull.field('risk', { type: 'SearchNavigationObject' })
    t.nonNull.list.nonNull.field('pipeline', { type: 'SearchNavigationObject' })
  }
});


export const SearchNavigationQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.field('searchOptions', {
      type: 'SearchNavigationObjectArray',
      resolve: () => {
        const risk = RiskObjectMembers as ISearchNavigationObject[];
        const pipeline = PipelineObjectMembers as ISearchNavigationObject[];
        return { risk, pipeline }
      }
    })
  }
})