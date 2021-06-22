import { useQuery } from "@apollo/client"

import { GET_POSTS } from "apollo/queries"

import Layout from "components/Layout/Layout"

const Browse = () => {
  const { loading, error, data } = useQuery(GET_POSTS, { variables: { published: true } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log('data', data)
  return (
    <Layout>
      <div className="post-grid">
        {data.posts.map((post, i) => (
          <p key={post.slug}>{post.body}</p>
        ))}
      </div>
    </Layout>
  )
}

export default Browse
