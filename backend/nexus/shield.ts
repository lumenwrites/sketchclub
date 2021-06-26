import { rule, shield } from 'graphql-shield'
import { verify } from 'jsonwebtoken'
import { Context } from '../apollo/context'
const { APP_SECRET } = process.env

export function getUserId(context: Context) {
  const authToken = context.req.cookies['Authorization']
  console.log('authCookie', authToken)
  if (authToken) {
    const verifiedToken = verify(authToken, APP_SECRET) as Token
    // console.log('verifiedToken', verifiedToken)
    return verifiedToken.userId
  }
}

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    return Boolean(getUserId(context))
  })
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser
  },
  Mutation: {
    createPost: rules.isAuthenticatedUser,
  },
},{
  allowExternalErrors: true
})
