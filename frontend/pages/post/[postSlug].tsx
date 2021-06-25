import { useRouter } from "next/router"
import { useGetPost } from "apollo/postsActions"

import Layout from "components/Layout/Layout"
import PostView from "components/Posts/PostView"
import PostEdit from "components/Posts/PostEdit"

export default function post() {
  const router = useRouter()
  const { loading, error, data } = useGetPost(router.query.postSlug)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log("view post", data)
  return (
    <Layout>
      <PostView post={data.post} />
      <PostEdit post={data.post} />
    </Layout>
  )
}
