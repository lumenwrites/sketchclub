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

// Test Query
export const PostQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('post', {
      type: 'Post',
      args: {
        slug: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.post.findUnique({
          where: { slug: args.slug || undefined },
        })
      },
    })
    // TODO: protect the unpublished posts?
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      args: {
        published: booleanArg(),
      },
      resolve: (_parent, args, context: Context) => {
        // console.log('Posts resolver', context.prisma.post.findMany())
        return context.prisma.post.findMany()
      },
    })
  }
})
