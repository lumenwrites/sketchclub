// @ts-nocheck
import { useRouter } from "next/router"
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"

export default function tag() {
  const router = useRouter()
  const { tagSlug } = router.query
  console.log('tag', tagSlug)
  const { loading, error, data } = useGetPosts({ tagSlug, searchString: router.query.search })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('profile posts', data)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.posts}/>
    </Layout>
  )
}

// export async function getServerSideProps({params}) {
//   // console.log('params', params.username)
//   const { data } = await fetchQuery({
//     query: GET_POSTS,
//     variables: { profile: params.username }
//   })
//   return {
//     props: {
//       posts: data.posts,
//     }, // will be passed to the page component as props
//   }
// }
