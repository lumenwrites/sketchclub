import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchPosts } from "apollo/fetchQuery"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"
import Pagination from "components/Elements/Pagination"

export default function browse({ posts }) {
  const { loading, error, data } = useGetPosts()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('skip', process.env.POSTS_PER_PAGE  * (parseInt(router.query.page) - 1 || 0))
  // console.log('browse posts', data)
  // console.log("ssr posts", posts)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.getPosts.posts} />
      <Pagination postCount={data.getPosts.postCount}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { posts, postCount } = await fetchPosts(context)
  return {
    props: { posts, postCount }, // will be passed to the page component as props
  }
}
