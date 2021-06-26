// @ts-nocheck
import {
  nonNull,
  extendType,
  stringArg,
} from 'nexus'
import { Context } from '../apollo/context'

import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
const { APP_SECRET } = process.env

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('join', {
      type: 'AuthPayload',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        console.log('Join', args)
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            username: args.username,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        console.log('login', args.email, args.password)
        const user = await context.prisma.user.findUnique({
          where: { email: args.email }
        })
        if (!user) throw new Error(`No user found for email: ${args.email}`)

        const passwordValid = await compare(args.password, user.password)
        if (!passwordValid) throw new Error('Invalid password')
        const token = sign({ userId: user.id }, APP_SECRET)
        console.log('[login mutation] Password valid, sending token for', user.username)
        // context.req.set('Authorization', token)
        return {
          token,
          user,
        }
      },
    })





  },
})
