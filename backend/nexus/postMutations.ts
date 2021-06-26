// @ts-nocheck
import {
  nonNull,
  list,
  extendType,
  stringArg,
  arg,
  booleanArg,
} from 'nexus'
import { Context } from '../apollo/context'

import slugify from 'slugify'
import cuid from 'cuid'

import { getUserId } from './shield'

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
        images: list(arg({ type: 'FileInput' }))
      },
      resolve: (_, args, context: Context) => {
        const slug = slugify(args.title) + '-' + cuid()
        console.log('Created post', args, slug)
        return context.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            slug: slug,
            images: {
              create: args.images,
            },
            authorId: getUserId(context),
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
        images: list(arg({ type: 'FileInput' })),
      },
      resolve: async (_, args, context: Context) => {
        // console.log('updatePost', args)
        // Delete existing images to replace them with new noes
        await context.prisma.image.deleteMany({
          where: { post: { slug: args.slug } },
        })
        try {
          return context.prisma.post.update({
            where: { slug: args.slug || undefined },
            data: {
              title: args.title || undefined,
              body: args.body || undefined,
              published: args.published || undefined,
              images: {
                create: args.images,
              },
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
      resolve: async (_, args, context: Context) => {
        // Must delete all the post's images before deleting the post
        await context.prisma.image.deleteMany({
          where: { post: { slug: args.slug } },
        })

        return context.prisma.post.delete({
          where: { slug: args.slug || undefined },
        })
      },
    })


  },
})
