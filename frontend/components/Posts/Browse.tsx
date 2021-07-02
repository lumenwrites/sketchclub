// @ts-nocheck
import PostCard from "./PostCard"

const Browse = ({ posts }) => {
  // console.log('Browse fetched posts', data)
  if (posts.length === 0) {
    return (
      <div className="no-results">
        <div className="flex-center">No posts here yet. Be the first one to create one!</div>
      </div>
    )
  }
  return (
    <div className="post-grid">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Browse
