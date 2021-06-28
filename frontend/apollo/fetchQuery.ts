import { ApolloClient, InMemoryCache } from "@apollo/client";
const { BACKEND_URL } = process.env
// https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
export const client = new ApolloClient({
    uri: BACKEND_URL,
    cache: new InMemoryCache(),
});

export async function fetchQuery(query) {
  const { data } = await client.query({ query })
  return { data }
}
