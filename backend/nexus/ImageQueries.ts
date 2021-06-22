import {
  intArg,
  makeSchema,
  nonNull,
  list,
  objectType,
  stringArg,
  queryField,
  extendType,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
  booleanArg,
} from 'nexus'
import { Context } from '../apollo/context'

export const ImageQueries = extendType({
  type: 'Query',
  definition(t) {
  }
})
