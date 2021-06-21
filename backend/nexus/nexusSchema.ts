import {
  makeSchema,
} from 'nexus'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './shield'

import { PostType } from './postsTypes'
import { PostQuery } from './postsQueries'
import { PostMutation } from './postsMutations'



const schemaWithoutPermissions = makeSchema({
  types: [
    PostType,
    PostQuery,
    PostMutation,
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
