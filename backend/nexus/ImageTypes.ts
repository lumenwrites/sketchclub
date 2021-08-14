import {
  objectType,
  inputObjectType
} from 'nexus'
import { Context } from '../apollo/context'


export const ImageType = objectType({
  name: 'Image',
  definition(t) {
  }
})

// Returning upload URL
export const PresignedUrl = objectType({
  name: 'PresignedUrl',
  definition(t) {
    t.string('url')
    t.string('filepath')
  },
})

// Accepting the image to save it into the DB
export const FileInput = inputObjectType({
  name: 'FileInput',
  definition(t) {
    t.string('url')
    t.string('name')
    t.string('id')
  },
})

// Return image information from the post resolver
export const File = objectType({
  name: 'File',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('url')
  },
})
