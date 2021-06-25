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
    t.boolean('published')
    t.list.field('images', {
      type: 'File',
      resolve: (parent, _, context: Context) => {
        console.log('Return post images', parent.id)
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .images()
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
