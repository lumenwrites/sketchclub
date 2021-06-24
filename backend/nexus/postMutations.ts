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

import slugify from 'slugify'
import cuid from 'cuid'


export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
      },
      resolve: (_, args, context: Context) => {
        const userId = 'ckq7w90oq00005j9yfr6g7sje' // my userId for now
        const slug = slugify(args.title) + '-' + cuid()
        console.log('Created post', args, slug)
        return context.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            slug: slug,
            authorId: userId,
            published: true, // make it false once Edit post works.
          },
        })
      },
    })

    t.field('updatePost', {
      type: 'Post',
      args: {
        slug: nonNull(stringArg()),
        title: nonNull(stringArg()),
        body: stringArg(),
        published: booleanArg(),
      },
      resolve: async (_, args, context: Context) => {
        console.log('updatePost', args)
        try {
          return context.prisma.post.update({
            where: { slug: args.slug || undefined },
            data: {
              title: args.title || undefined,
              body: args.body || undefined,
              published: args.published || undefined,
            },
          })
        } catch (e) {
          throw new Error(
            `${e} Post with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })

    t.field('deletePost', {
      type: 'Post',
      args: {
        slug: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.delete({
          where: { slug: args.slug || undefined },
        })
      },
    })



  },
})
