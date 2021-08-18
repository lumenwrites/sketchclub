import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchPosts } from "apollo/fetchQuery"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"
import Pagination from "components/Elements/Pagination"

export default function browse({ posts, postCount }) {
  const { loading, error, data } = useGetPosts()
  if (!posts && loading) return <p>Loading...</p>
  if (!posts && error) return <p>Error :(</p>
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data?.getPosts.posts || posts} />
      <Pagination postCount={data?.getPosts.postCount || postCount}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { posts, postCount } = await fetchPosts(context)
  return {
    props: { posts, postCount }, // will be passed to the page component as props
  }
}
