import {
  makeSchema,
  objectType,
  asNexusMethod
} from 'nexus'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './shield'

import { UserType, AuthPayload } from './userTypes'
import { UserQueries } from './userQueries'
import { PostType } from './postTypes'
import { PostQueries } from './postQueries'
import { PostMutations } from './postMutations'

import { DateTimeResolver } from 'graphql-scalars'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const schemaWithoutPermissions = makeSchema({
  types: [
    UserType,
    AuthPayload,
    UserQueries,
    PostType,
    PostQueries,
    PostMutations,
    DateTime,
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
