import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "components/Elements/Link"
import SquareImage from "components/Elements/SquareImage"

import { useContext } from "react"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import PostView from "./PostView"
import PostEdit from "./PostEdit"
const { BUCKET_URL } = process.env

export default function PostCard({ post, onClick }) {
  const { toggleModal } = useModal()
  // console.log('PostCard', post)
  return (
    <div className="post-card">
      <SquareImage url={`${BUCKET_URL}${post.images[0]?.url}`} />
      <a className="overlay" href={`/post/${post.slug}`} onClick={(e) => { e.preventDefault() }}>
        <div
          className="description"
          onClick={() => {
            toggleModal(`post-modal-${post.slug}`)
            window.history.pushState("object or string", post.title, `/post/${post.slug}`)
          }}
        >
          <div className="flex-center">
            <div>
              <div className="title">{post.title}</div>
              <div className="by">by {post.author.username} </div>
            </div>
          </div>
        </div>
        {/* 
                <div
          className="edit"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleModal(`post-edit-${post.slug}`)
          }}
        >
          <FontAwesomeIcon icon={["fas", "edit"]} />
        </div>
         */}
      </a>
      <Modal name={`post-modal-${post.slug}`} className={"post-modal post-view nopadding"}>
        <PostView post={post} />
      </Modal>
      <PostEdit post={post} />
    </div>
  )
}
