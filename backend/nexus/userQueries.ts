import {
  objectType,
  extendType
} from 'nexus'
import { Context } from '../apollo/context'

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })
  }
})
