// For the initial Apollo/Nexus/Prisma setup this was used as an example:
// https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth 
// (the code has changed significantly during the development and is very different now):
// Integrating ApolloServer with Express (so that I can use cookie-parser)
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#applying-middleware
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './apollo/context'
import { schema } from './nexus/nexusSchema'


const { PORT } = process.env

const app = express();
app.use(cookieParser())

// Use the Nexus schema to create a GraphQL API Server
const server = new ApolloServer({
  schema,
  context: createContext,
  playground: true,
  introspection: true,
})

server.applyMiddleware({
  app,
  cors: {
    origin: true,
    credentials: true
  },
})

app.listen({ port: PORT }, () => {
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
})
