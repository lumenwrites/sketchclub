import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "context/ModalContext"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env

export default function PostView({ post }) {
  const { toggleModal } = useModal()
  console.log('post view', post)
  return (
    <div className={"post-page post-view"}>
      <Gallery images={post.images} />
      <div className="description">
        <h1>{post.title}</h1>
        <span className="author">by LilyAldrin</span>
        <div className="btn btn-edit-post" onClick={(e) => toggleModal(`post-edit-${post.slug}`)}>
          <FontAwesomeIcon icon={["fas", "edit"]} /> Edit Post 
        </div>
        <hr />
        {post.body}

      </div>
      <div className="clearfix" />
    </div>
  )
}
