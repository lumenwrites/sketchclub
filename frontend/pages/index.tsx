// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchPosts } from "apollo/fetchQuery"
import { fetchQuery } from "apollo/fetchQuery"
import { GET_TOPICS } from 'apollo/postsQueries'

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"
import Pagination from "components/Elements/Pagination"

export default function browse({ posts, postCount, topics }) {
  const { loading, error, data } = useGetPosts()
  if (!posts && loading) return <p>Loading...</p>
  if (!posts && error) return <p>Error :(</p>
  return (
    <Layout subnav={<Topic topics={topics}/>}>
      <Browse posts={data?.getPosts.posts || posts} />
      <Pagination postCount={data?.getPosts.postCount || postCount}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { posts, postCount } = await fetchPosts(context)
  const res = await fetchQuery({ query: GET_TOPICS })
  return {
    props: { posts, postCount, topics: res.data.topics}, // will be passed to the page component as props
  }
}
