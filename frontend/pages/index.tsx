// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"
import { useRouter } from "next/router"

export default function browse({ posts }) {
  const router = useRouter()
  const { loading, error, data } = useGetPosts({ published: true, searchString: router.query.search })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('browse posts', data)
  //console.log("ssr posts", posts)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.posts} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await fetchQuery({
    query: GET_POSTS,
    variables: { published: true, searchString: context.query.search }
  })
  //console.log('server side props')
  return {
    props: {
      posts: data.posts,
    }, // will be passed to the page component as props
  }
}
