import {
  makeSchema,
  objectType,
  asNexusMethod
} from 'nexus'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './shield'

import { UserType, UserCreateInput, AuthPayload } from './userTypes'
import { UserQueries } from './userQueries'
import { UserMutations } from './userMutations'
import { PostType, PostCreateInput } from './postTypes'
import { PostQueries } from './postQueries'
import { PostMutations } from './postMutations'
import { PresignedUrl, File, FileInput } from './ImageTypes'
import { ImageQueries } from './ImageQueries'

import { DateTimeResolver } from 'graphql-scalars'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const schemaWithoutPermissions = makeSchema({
  types: [
    UserType,
    UserCreateInput,
    AuthPayload,
    UserQueries,
    UserMutations,
    PostType,
    PostCreateInput,
    PostQueries,
    PostMutations,
    DateTime,
    ImageQueries,
    PresignedUrl,
    File,
    FileInput
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('../apollo/context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
