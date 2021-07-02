// @ts-nocheck
import { rule, shield } from 'graphql-shield'
import { verify } from 'jsonwebtoken'
import { Context } from '../apollo/context'
const { APP_SECRET } = process.env

export function getUserId(context: Context) {
  //const authToken = context.req.cookies['Authorization']
  const authToken = context.req.cookies['Authorization'] || context.req.headers['authorization'];
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
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context)
    console.log('check owner', args, userId)
    const author = await context.prisma.post
      .findUnique({
        where: { slug: args.slug }
      })
      .author()
    
    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    getPresignedUrl: rules.isAuthenticatedUser,
  },
  Mutation: {
    // If nexus always sends me the old cookies, then this shouldn't work. And yet it does.
    // createPost: rules.isAuthenticatedUser,
    updatePost: rules.isPostOwner,
    deletePost: rules.isPostOwner,
  },
},{
  allowExternalErrors: true
})
