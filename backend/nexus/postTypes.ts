// @ts-nocheck
import {
  objectType,
  inputObjectType
} from 'nexus'
import { Context } from '../apollo/context'


export const PostType = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.string('slug')
    t.string('body')
    t.int('score')
    t.boolean('published')
    t.list.field('images', {
      type: 'File',
      resolve: (parent, _, context: Context) => {
        // console.log('Return post images', parent.id)
        return context.prisma.post
          .findUnique({ where: { id: parent.id || undefined },})
          .images()
      },
    })

    t.list.field('tags', {
      type: 'TagType',
      resolve: (parent, _, context: Context) => {
        // console.log('Return post images', parent.id)
        return context.prisma.post
          .findUnique({ where: { id: parent.id || undefined }})
          .tags()
      },
    })

    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        // console.log('Return post author', parent.id)
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })

    t.list.field('upvoters', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        // console.log('Return post images', parent.id)
        return context.prisma.post
          .findUnique({ where: { id: parent.id || undefined }})
          .upvoters()
      },
    })



  }
})

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})

export const TagInput = inputObjectType({
  name: 'TagInput',
  definition(t) {
    t.string('name')
    t.string('slug')
    t.string('id')
  },
})

// Return image information from the post resolver
export const TagType = objectType({
  name: 'TagType',
  definition(t) {
    t.string('name')
    t.string('slug')
    t.string('id')
  },
})
