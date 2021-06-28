// @ts-nocheck
import { useGetPosts } from "apollo/postsActions"

import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"


export default function profile() {
  const { loading, error, data } = useGetPosts({published:true})
  if (loading) return <p>Loading...</p>
  // console.log('browse error', error)
  if (error) return <p>Error :(</p>
  // console.log('browse posts', data)
  return (
    <Layout>
      <Browse posts={data.posts}/>
    </Layout>
  )
}


