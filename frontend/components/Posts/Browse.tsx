// @ts-nocheck
import PostCard from "./PostCard"

const Browse = ({posts}) => {
  // console.log('Browse fetched posts', data)
  return (
      <div className="post-grid">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post}/>
        ))}
      </div>
  )
}

export default Browse
