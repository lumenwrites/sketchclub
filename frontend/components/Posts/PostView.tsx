import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "context/ModalContext"
import { useAuth } from "context/AuthContext"
import Link from "components/Elements/Link"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env

export default function PostView({ post }) {
  const { toggleModal } = useModal()
  return (
    <div className={"post-view"}>
      <Gallery images={post.images} />
      <div className="description">
        <Header post={post} />
        <div className="scrollable">
          <div className="scrollable-contents">
            <h1>{post.title}</h1>
            {post.body}
            <hr/>
            <div className="tags">
              {post.tags.map(tag => (<Link href={`/tag/${tag.slug}`} key={tag.slug} className="tag" onClick={()=>toggleModal(`post-view`)}>{tag.name}</Link>))}
            </div>
            {/* <Comments /> */}
          </div>
        </div>
      </div>
      {/* <PostComment /> */}
      <div className="clearfix"/>
    </div>
  )
}

function Header({ post }) {
  const { toggleModal } = useModal()
  const { username } = useAuth()
  const isPostAuthor = post.author.username == username
  function handleUpvote(e) {
    if (!username) return toggleModal(`login`)
    // TODO: upvote here
  }
  return (
    <div className="header">
      <Link className="btn btn-user-profile" href={`/profile/${post.author.username}`}>
        <FontAwesomeIcon icon={["fas", "user"]} /> <b>{post.author.username}</b>
      </Link>
      <div className="buttons">
        <div className="btn btn-upvote" onClick={handleUpvote}>
          <FontAwesomeIcon icon={["fas", "arrow-up"]} />
          <span className="btn-label">Upvote</span>
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
          {` 12 `}
          <span className="stat-label">Upvotes</span>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={["fas", "eye"]} />
          {` 508 `}
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

function Comments() {
  return (
    <div className="comments">
      <h2>Comments:</h2>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a wacom tablet.
      </div>
      <div className="comment">
        <div className="author">Jessy</div>
        Great work!
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a wacom tablet.
      </div>
      <div className="comment">
        <div className="author">Kyle</div>
        Beautiful!
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a wacom tablet.
      </div>
      <div className="comment">
        <div className="author">CrazyPanda</div>
        Cool hat.
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a wacom tablet.
      </div>
      <div className="comment">
        <div className="author">CrazyPanda</div>
        Cool hat.
      </div>
      <div className="comment">
        <div className="author">Cindy</div>
        What software did you use? Is it Photoshop? Or Procreate? I'm trying to decide between getting an ipad and or a wacom tablet.
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
