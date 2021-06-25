import { useRouter } from "next/router"
import { useGetPost } from "apollo/postsActions"

import PostView from "components/Posts/PostView"

export default function post() {
  const router = useRouter()
  const { loading, error, data } = useGetPost(router.query.postSlug)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log("view post", data)
  return <PostView post={data.post} />
}
