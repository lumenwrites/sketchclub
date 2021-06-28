import { useRouter } from "next/router"
import { useGetPost } from "apollo/postsActions"
// For SSR
import { fetchQuery } from "apollo/fetchQuery"
import { GET_POST } from "apollo/postsQueries"

import Layout from "components/Layout/Layout"
import PostView from "components/Posts/PostView"
import PostEdit from "components/Posts/PostEdit"

export default function post() {
  const router = useRouter()
  const { loading, error, data } = useGetPost(router.query.postSlug)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <Layout>
      <PostView post={data.post} />
      <PostEdit post={data.post} />
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  // console.log('params', params.postSlug)
  const { data } = await fetchQuery({
    query: GET_POST,
    variables: { slug: params.postSlug }
  })
  return {
    props: {
      post: data.post,
    }, // will be passed to the page component as props
  }
}
