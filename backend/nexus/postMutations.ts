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
        tags: list(arg({ type: 'TagInput' })),
        images: list(arg({ type: 'FileInput' }))
      },
      resolve: async (_, args, context: Context) => {
        console.log('tags', omit(args.tags[0], "id"))
        // Create tags if they don't exist
        // const tags = await Promise.all(
        //   args.tags.map((tag) =>
        //     context.prisma.tag.upsert({
        //       create: omit(tag, "id"),
        //       update: tag,
        //       where: { id: tag.id || "" },
        //     })
        //   )
        // )
        const existingTags = args.tags?.filter(t => ('id' in t))
        const newTags = args.tags?.filter(t => !('id' in t))
        console.log('Created post', existingTags, newTags) // args, slug,
        return context.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            slug: `${slugify(args.title)}-${cuid()}`,
            images: {
              create: args.images,
            },
            tags: {
              set: existingTags,
              create: newTags
              // create: {
              //       name: "test",
              //       slug: "test"
              // }
              // disconnect: post.issues,
              // set: [{id:"ckqldp05l0003ae9y8v8i6tdk"}]
            },
            authorId: getUserId(context),
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
        // tags: list(arg({ type: 'TagInput' })),
        images: list(arg({ type: 'FileInput' })),
      },
      resolve: async (_, args, context: Context) => {
        // console.log('updatePost', args)
        // Delete existing images to replace them with new noes
        await context.prisma.image.deleteMany({
          where: { post: { slug: args.slug } },
        })
        // Create tags if they don't exist yet
        // const tags = await Promise.all(
        //   args.tags?.map((tag) =>
        //     prisma.tag.upsert({
        //       create: omit(tag, "id"),
        //       update: tag,
        //       where: tag,
        //     })
        //   )
        // )
        // console.log('upserted tags', tags)
        try {
          return context.prisma.post.update({
            where: { slug: args.slug || undefined },
            data: {
              title: args.title || undefined,
              body: args.body || undefined,
              published: args.published || undefined,
              // tags: {
              //   upsert: updatedImages
              // }

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
