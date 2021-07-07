// @ts-nocheck
import { useRouter } from "next/router"
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchPosts } from "apollo/fetchQuery"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import ProfileHeader from "components/Users/ProfileHeader"
import Pagination from "components/Elements/Pagination"

export default function profile() {
  const { loading, error, data } = useGetPosts()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('profile posts', data)
  return (
    <Layout subnav={<ProfileHeader/>}>
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
