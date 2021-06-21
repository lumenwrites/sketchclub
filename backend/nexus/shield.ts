import { rule, shield } from 'graphql-shield'

import { Context } from '../apollo/context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    return true
  })
}

export const permissions = shield({
  Query: {
  },
  Mutation: {
    createPost: rules.isAuthenticatedUser,
  },
},{
  allowExternalErrors: true
})
