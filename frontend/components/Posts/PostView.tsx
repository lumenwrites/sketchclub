import Modal from "components/Elements/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Gallery from "./Gallery"

export default function PostModal({ post }) {
  const images = ["cowboy.jpg", "dinosaur.jpg", "fatso.jpg", "building.jpg"]
  return (
    <Modal name={`post-modal-${post.slug}`} className={"post-modal nopadding"}>
      <Gallery images={images} />
      <div className="description">
        <h1>{post.title}</h1>
        <span className="author">by LilyAldrin</span>
        <hr/>
        {post.body}
      </div>
      
    </Modal>
  )
}
