// @ts-nocheck
import {
  extendType,
  stringArg
} from 'nexus'
import { Context } from '../apollo/context'
import { getUserId } from './shield'

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: async (parent, args, context: Context) => {
        const userId = getUserId(context)
        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        })
        console.log('nexus ME query return user', user.username)
        return user
      },
    })

    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })

    t.nullable.field('user', {
      type: 'User',
      args: {
        username: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        console.log('user query', args.username)
        return context.prisma.user.findUnique({
          where: { username: args.username || undefined },
        })
      },
    })

    
  }
})
