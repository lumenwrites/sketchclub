// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"
import Pagination from "components/Elements/Pagination"

export default function browse({ getPosts }) {
  const { loading, error, data } = useGetPosts()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('skip', process.env.POSTS_PER_PAGE  * (parseInt(router.query.page) - 1 || 0))
  // console.log('browse posts', data)
  //console.log("ssr posts", getPosts)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.getPosts.posts} />
      <Pagination postCount={data.getPosts.postCount}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await fetchQuery({
    query: GET_POSTS,
    variables: {
      published: true,
      searchString: context.query.search,
      skip: parseInt(process.env.POSTS_PER_PAGE) * (parseInt(context.query.page) - 1 || 0),
      take: parseInt(process.env.POSTS_PER_PAGE)
    }
  })
  //console.log('skip', process.env.POSTS_PER_PAGE  * (parseInt(context.query.page) - 1 || 0))
  //console.log('server side props')
  return {
    props: {
      getPosts: data.getPosts,
    }, // will be passed to the page component as props
  }
}
