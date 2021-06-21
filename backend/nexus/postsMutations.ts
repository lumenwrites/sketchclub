import {
  intArg,
  makeSchema,
  nonNull,
  list,
  objectType,
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


// Test mutation
export const PostMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
      },
      resolve: (_, args, context: Context) => {
        const slug = slugify(args.title) + '-' + cuid()
        console.log('Created post', args, slug)
        return context.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            slug: slug
          },
        })
      },
    })
  },
})
