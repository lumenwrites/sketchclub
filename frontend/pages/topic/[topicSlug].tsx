// @ts-nocheck
import { useRouter } from "next/router"
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"

export default function topic() {
  const router = useRouter()
  const { topicSlug } = router.query
  console.log('topicSlug', topicSlug)
  const { loading, error, data } = useGetPosts({ topicSlug, searchString: router.query.search })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('profile posts', data)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.posts}/>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   //console.log('ssr context', context)
//   const { data } = await fetchQuery({
//     query: GET_POSTS,
//     variables: { topicSlug: context.query.topicSlug, searchString: context.query.search }
//   })
//   return {
//     props: {
//       posts: data.posts,
//     }, // will be passed to the page component as props
//   }
// }
