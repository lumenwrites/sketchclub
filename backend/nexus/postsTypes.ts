import {
  objectType,
} from 'nexus'
import { Context } from '../apollo/context'

// Test Type
export const PostType = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.string('slug')
    t.string('body')
  }
})
