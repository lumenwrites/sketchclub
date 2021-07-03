// @ts-nocheck
import {
  stringArg,
  extendType,
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
        //console.log('getPost', args)
        return context.prisma.post.findUnique({
          where: { slug: args.slug || undefined },
        })
      },
    })
    // TODO: protect the unpublished posts?
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      args: {
        username: stringArg(),
        published: booleanArg(),
        searchString: stringArg(),
        tagSlug: stringArg(),
        // TODO: Pagination
      },
      resolve: async (_parent, args, context: Context) => {
        console.log('Get posts', args)
        // Filter posts by user
        let authorId
        if (args.username) {
          const author = await context.prisma.user.findUnique({
            where: { username: args.username },
          })
          authorId = author.id
        }
        // Filter by tag
        const tagFilter = args.tagSlug ? {
          tags: { some: { slug: args.tagSlug } }
        } : {}
        // Search through posts
        const search = args.searchString ? {
          OR: [
            { title: { contains: args.searchString, mode: "insensitive", } },
            { body: { contains: args.searchString, mode: "insensitive", } },
            { tags: { some: { name: { contains: args.searchString, mode: "insensitive", } } } }
            // TODO: search in username too
          ],
        } : {}
        // console.log('Posts resolver', context.prisma.post.findMany())
        return context.prisma.post.findMany({
          where: {
            authorId: authorId,
            published: args.published || undefined,
            ...search,
            ...tagFilter,
          }
        })
      },
    })

    t.nonNull.list.nonNull.field('tags', {
      type: 'TagType',
      args: {
      },
      resolve: async (_parent, args, context: Context) => {
        // console.log('Posts resolver', context.prisma.post.findMany())
        return context.prisma.tag.findMany()
      },
    })





  }
})
