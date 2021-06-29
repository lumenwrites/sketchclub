import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client'

import { onError } from '@apollo/link-error'
import { getDataFromTree } from '@apollo/client/react/ssr'

import withApollo from 'next-with-apollo'
import https from 'https'
// import paginationField from './paginationField'
const { BACKEND_URL } = process.env
import { getCookie } from 'utils/cookies'

// https://www.apollographql.com/docs/react/networking/authentication/
function createClient({ headers, initialState }) {
  console.log('[ApolloClient] Connecting to backend:\n', BACKEND_URL)
  return new ApolloClient({
    // ssrMode: true, //https://www.apollographql.com/docs/react/performance/server-side-rendering/
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[Apollo Client] GraphQL error: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        }
        if (networkError) {
          console.log(
            `[Apollo Client] Network Error when connecting to GraphQL: ${networkError}.`
          )
        }
      }),
      new HttpLink({
        uri: BACKEND_URL, //process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
          agent: new https.Agent({ rejectUnauthorized: false })
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers: {
          ...headers,
          Authorization: typeof window === 'undefined' ? '' : getCookie("Authorization")
        },
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO
            // allPosts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
