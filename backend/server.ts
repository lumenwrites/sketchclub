import { ApolloServer } from 'apollo-server'
import { createContext } from './apollo/context'
import { schema } from './nexus/nexusSchema'
import 'dotenv/config'
const { DATABASE_URL } = process.env

const server = new ApolloServer({
  cors: {
		origin: 'http://localhost:3020',	// client url	
		credentials: true
  },	
  schema,
  context: createContext,
})

const PORT = 4020;
server.listen(PORT).then(({ url }) => {
  console.log('.env test', DATABASE_URL)
  console.log(`Server started at ${url}`)
})
