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

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
        topicId: stringArg(),
        tags: list(arg({ type: 'TagInput' })),
        images: list(arg({ type: 'FileInput' }))
      },
      resolve: async (_, args, context: Context) => {
        console.log('Creating post', args.topicId)
        const connectTopic = args.topicId ? { connect: { id: args.topicId } } : undefined
        return context.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            slug: `${slugify(args.title)}-${cuid()}`,
            images: {
              create: args.images,
            },
            tags: {
              // Existing tags have id, connect them. New tags don't, create them.
              connect: args.tags?.filter(t => ('id' in t)).map(t => ({ id: t.id })),
              create: args.tags?.filter(t => !('id' in t))
            },
            topic: connectTopic,
            author: { connect: { id: getUserId(context) } },
            // authorId: getUserId(context),
            published: true, // make it false once Edit post works.
            // include: {
            //   tags: true
            // }
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
        topicId: stringArg(),
        tags: list(arg({ type: 'TagInput' })),
        images: list(arg({ type: 'FileInput' })),
      },
      resolve: async (_, args, context: Context) => {
        // console.log('updatePost', args)
        // Delete existing images to replace them with new noes
        await context.prisma.image.deleteMany({
          where: { post: { slug: args.slug } },
        })
        console.log('updatePost', args.slug)
        try {
          return context.prisma.post.update({
            where: { slug: args.slug || undefined },
            data: {
              title: args.title || undefined,
              body: args.body || undefined,
              published: args.published || undefined,
              tags: {
                // Existing tags have id, replace them. New tags don't, create them.
                set: args.tags?.filter(t => ('id' in t)).map(t => ({ id: t.id })),
                create: args.tags?.filter(t => !('id' in t))
              },
              topic: { connect: { id: topicId } },
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

    t.field('upvote', {
      type: 'Post',
      args: {
        slug: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        const userId = getUserId(context)
        const post = await context.prisma.post.findUnique({
          where: { slug: args.slug || undefined },
          include: { upvoters: true },
        })
        const hasUpvoted = post?.upvoters?.find(u => u.id === userId)
        // console.log('upvoters', userId, hasUpvoted)
        if (hasUpvoted) { // Unupvote
          return context.prisma.post.update({
            where: { slug: args.slug || undefined },
            data: {
              upvoters: { disconnect: { id: getUserId(context) } },
              score: { decrement: 1 },
            },
          })
        }
        return context.prisma.post.update({
          where: { slug: args.slug || undefined },
          data: {
            upvoters: { connect: { id: getUserId(context) } },
            score: { increment: 1 },
          },
        })
      },
    })


  },
})
