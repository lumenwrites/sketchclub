// Integrating ApolloServer with Express (so that I can use cookie-parser)
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#applying-middleware
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './apollo/context'
import { schema } from './nexus/nexusSchema'

import 'dotenv/config'
const { PORT } = process.env

const app = express();
app.use(cookieParser())

// Error handler
// https://github.com/apollographql/apollo-feature-requests/issues/153
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  const { status } = err
  res.status(status).json(err)
};
app.use(errorHandler)

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
