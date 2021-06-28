// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"

import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

export default function browse({ posts }) {
  const { loading, error, data } = useGetPosts({ published: true })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('browse posts', data)
  console.log("ssr posts", posts)
  return (
    <Layout>
      <Browse posts={data.posts} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await fetchQuery(GET_POSTS)
  return {
    props: {
      posts: data.posts,
    }, // will be passed to the page component as props
  }
}
