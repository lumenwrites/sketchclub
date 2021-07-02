import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client'

import { onError } from '@apollo/link-error'
import { getDataFromTree } from '@apollo/client/react/ssr'

import withApollo from 'next-with-apollo'
import { getCookie } from 'utils/cookies'
import https from 'https'
// import paginationField from './paginationField'
const { BACKEND_URL } = process.env



// https://www.apollographql.com/docs/react/networking/authentication/
function createClient({ headers, initialState }) {
  console.log('[ApolloClient] Connecting to backend:\n', BACKEND_URL)
  return new ApolloClient({
    ssrMode: true, //https://www.apollographql.com/docs/react/performance/server-side-rendering/
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
          // Vercel deploy kept giving me CORS errors.
          // Setting NODE_TLS_REJECT_UNAUTHORIZED=0, but vercel rejected it because it was insecure for them.
          // Setting this parameter is some kind of narrower equivalent that makes it work for me.
          agent: new https.Agent({ rejectUnauthorized: false })
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers: {
          ...headers,
          // Pass the cookie as a header because when I'm making mutations (as opposed to queries), 
          // normal cookies don't work somehow for some reason (CORS?) when trying to connect from Vercel to DO, and this is a workaround.
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
