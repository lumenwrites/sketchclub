import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GET_POSTS } from "./postsQueries"
const { BACKEND_URL, POSTS_PER_PAGE } = process.env

// https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
export const client = new ApolloClient({
    uri: BACKEND_URL,
    cache: new InMemoryCache(),
});

export async function fetchQuery(query) {
  const { data } = await client.query(query)
  return { data }
}

export async function fetchPosts(ctx) {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: {
      username: ctx.query.username || undefined,
      tagSlug: ctx.query.tagSlug || undefined,
      topicSlug: ctx.query.topicSlug || undefined,
      searchString: ctx.query.search || undefined,
      skip: parseInt(POSTS_PER_PAGE) * (parseInt(ctx.query.page) - 1 || 0),
      take: parseInt(POSTS_PER_PAGE),
      published: true
    },
  })
  console.log('fetchPosts', data)
  return { posts: data.getPosts.posts, postCount: data.getPosts.postCount }
}

