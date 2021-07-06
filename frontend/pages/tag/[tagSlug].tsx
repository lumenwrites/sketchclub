// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"

export default function tag() {
  const { loading, error, data } = useGetPosts()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('tag posts', data)
  return (
    <Layout subnav={<Topic/>}>
      <Browse posts={data.getPosts.posts}/>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   //console.log('ssr context', context)
//   const { data } = await fetchQuery({
//     query: GET_POSTS,
//     variables: { tagSlug: context.query.tagSlug, searchString: context.query.search }
//   })
//   return {
//     props: {
//       posts: data.getPosts,
//     }, // will be passed to the page component as props
//   }
// }
