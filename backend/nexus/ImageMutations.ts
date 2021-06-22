import {
  intArg,
  makeSchema,
  nonNull,
  list,
  extendType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
  booleanArg,
} from 'nexus'
import { Context } from '../apollo/context'


export const ImageMutations = extendType({
  type: 'Mutation',
  definition(t) {
  },
})
