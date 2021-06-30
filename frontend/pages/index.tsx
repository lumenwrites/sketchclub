// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POSTS } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import Topic from "components/Topics/Topic"
import Subnav from "components/Layout/Subnav"

export default function browse({ posts }) {
  const { loading, error, data } = useGetPosts({ published: true })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('browse posts', data)
  // console.log("ssr posts", posts)
  const topic = (
    <>
      {/* <Subnav/> */}
      <Topic topic={{ name: "Your favorite cartoon character.", slug: "your-favorite-cartoon-character" }} />
    </>
  )
  return (
    <Layout subnav={topic}>
      <Browse posts={data.posts} />
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const { data } = await fetchQuery({
//     query: GET_POSTS,
//     variables: { published: true }
//   })
//   return {
//     props: {
//       posts: data.posts,
//     }, // will be passed to the page component as props
//   }
// }
