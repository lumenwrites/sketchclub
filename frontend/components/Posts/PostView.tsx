import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "context/ModalContext"
import { useAuth } from "context/AuthContext"
import Link from "components/Elements/Link"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env
import { useUpvotePost } from "apollo/postsActions"
import { useState } from "react"

export default function PostView({ post }) {
  const { toggleModal } = useModal()
  console.log('post', post)
  return (
    <div className={"post-view"}>
      <Gallery images={post.images} />
      <div className="description">
        <Header post={post} />
        <div className="scrollable">
          <div className="scrollable-contents">
            <h1>{post.title}</h1>
            {post.body}
            <hr />
            <Tags topic={post.topic} tags={post.tags} />
            {/* <Comments /> */}
          </div>
        </div>
      </div>
      {/* <PostComment /> */}
      <div className="clearfix" />
    </div>
  )
}

function Header({ post }) {
  //console.log('post.slug', post.slug)
  const { toggleModal } = useModal()
  const { username } = useAuth()
  const [upvotePost] = useUpvotePost(post.slug, username)
  const isPostAuthor = post.author.username == username
  const [hasUpvoted, setHasUpvoted] = useState(post.upvoters?.find((u) => u.username === username))
  const [score, setScore] = useState(post.score)
  async function handleUpvote(e) {
    if (!username) return toggleModal(`login`)
    // console.log('upvoting', post.slug)
    setHasUpvoted(upvoted => {
      if (upvoted) setScore(score - 1)
      if (!upvoted) setScore(score + 1)
      return !upvoted
    })
    const { data } = await upvotePost({ variables: { slug: post.slug } })
  }
  return (
    <div className="header">
      <Link
        className="btn btn-user-profile"
        href={`/profile/${post.author.username}`}
        onClick={() => toggleModal(`post-view`)}
      >
        <FontAwesomeIcon icon={["fas", "user"]} /> <b>{post.author.username}</b>
      </Link>
      <div className="buttons">
        <div className={`btn btn-upvote ${hasUpvoted ? "upvoted" : ""}`} onClick={handleUpvote}>
          <FontAwesomeIcon icon={["fas", "arrow-up"]} />
          <span className="btn-label">{hasUpvoted ? "Unupvote" : "Upvote"}</span>
        </div>
        {isPostAuthor && (
          <div className="btn btn-edit-post" onClick={(e) => toggleModal(`post-edit-${post.slug}`)}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
            <span className="btn-label">Edit</span>
          </div>
        )}
      </div>
      <div className="stats">
        <div className="stat">
          <FontAwesomeIcon icon={["fas", "arrow-up"]} />
          {score}
          <span className="stat-label">Upvotes</span>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={["fas", "eye"]} />
          {post.views}
          <span className="stat-label">Views</span>
        </div>
        {/* <div className="stat">
          <FontAwesomeIcon icon={["fas", "comments"]} />
          {` 4 `}
          <span className="stat-label">Comments</span>
        </div> */}
      </div>
    </div>
  )
}

function Tags({ topic, tags }) {
  const { toggleModal } = useModal()
  return (
    <div className="tags">
      {topic && (
        <Link href={`/topic/${topic.slug}`} className="tag topic" onClick={() => toggleModal(`post-view`)}>
          {topic.name}
        </Link>
      )}
      {tags.map((tag) => (
        <Link href={`/tag/${tag.slug}`} key={tag.slug} className="tag" onClick={() => toggleModal(`post-view`)}>
          {tag.name}
        </Link>
      ))}
    </div>
  )
}

function Comments() {
  return (
    <div className="comments">
      <h2>Comments:</h2>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a
        wacom tablet.
      </div>
      <div className="comment">
        <div className="author">Jessy</div>
        Great work!
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a
        wacom tablet.
      </div>
      <div className="comment">
        <div className="author">Kyle</div>
        Beautiful!
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a
        wacom tablet.
      </div>
      <div className="comment">
        <div className="author">CrazyPanda</div>
        Cool hat.
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a
        wacom tablet.
      </div>
      <div className="comment">
        <div className="author">CrazyPanda</div>
        Cool hat.
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a
        wacom tablet.
      </div>
      <div className="comment">
        <div className="author">CrazyPanda</div>
        Cool hat.
      </div>
    </div>
  )
}

function PostComment() {
  return (
    <div className="post-comment">
      <textarea placeholder="Leave a comment..." name="comment" value={""} onChange={() => {}}></textarea>
      <div className="btn right btn-cta" onClick={() => {}}>
        Post Comment
      </div>
    </div>
  )
}
