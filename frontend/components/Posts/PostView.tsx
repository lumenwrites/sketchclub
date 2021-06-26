import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "context/ModalContext"
import { useAuth } from "context/AuthContext"
import Link from "components/Elements/Link"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env

export default function PostView({ post }) {
  const { toggleModal } = useModal()
  const { username } = useAuth()
  const isPostAuthor = post.author.username == username
  return (
    <div className={"post-page post-view"}>
      <Gallery images={post.images} />
      <div className="description">
        <h1>{post.title}</h1>
        <Link className="author" href={`/profile/${post.author.username}`} onClick={(e) => toggleModal("")}>
          by {post.author.username}
        </Link>
        {isPostAuthor && (
          <div className="btn btn-edit-post" onClick={(e) => toggleModal(`post-edit-${post.slug}`)}>
            <FontAwesomeIcon icon={["fas", "edit"]} /> Edit Post
          </div>
        )}
        <hr />
        {post.body}
      </div>
      <div className="clearfix" />
    </div>
  )
}
