import Modal from "components/Elements/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env

export default function PostViewModal({ post }) {
  return (
    <Modal name={`post-modal-${post.slug}`} className={"post-modal post-view nopadding"}>
      <Gallery images={post.images} />
      <div className="description">
        <h1>{post.title}</h1>
        <span className="author">by LilyAldrin</span>
        <hr/>
        {post.body}
      </div> 
    </Modal>
  )
}
