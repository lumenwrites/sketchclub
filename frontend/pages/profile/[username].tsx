// @ts-nocheck
import { useRouter } from "next/router"
import { useGetPosts } from "apollo/postsActions"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"


export default function profile() {
  const router = useRouter()
  const { username } = router.query
  const { loading, error, data } = useGetPosts({ username })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.log('profile posts', data)
  return (
    <Layout>
      <Browse posts={data.posts}/>
    </Layout>
  )
}
