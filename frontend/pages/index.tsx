// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"

export default function browse({ posts }) {
  const { loading, error, data } = useGetPosts({ published: true })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('browse posts', data)
  // console.log("ssr posts", posts)
  return (
    <Layout>
      <Topic topic="Today's Topic: Your favorite cartoon character."/>
      <Browse posts={data.posts} />
      <Topic topic="A fantasy dwelling."/>
      <Browse posts={data.posts} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await fetchQuery({
    query: GET_POSTS,
    variables: { published: true }
  })
  return {
    props: {
      posts: data.posts,
    }, // will be passed to the page component as props
  }
}
