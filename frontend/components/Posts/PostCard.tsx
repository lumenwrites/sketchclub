import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "components/Elements/Link"
import SquareImage from "components/Elements/SquareImage"

import { useContext } from "react"
import { useModal } from "context/ModalContext"
import PostViewModal from "./PostViewModal"
import PostEdit from "./PostEdit"
const { BUCKET_URL } = process.env

export default function PostCard({ post, onClick }) {
  const { toggleModal } = useModal()
  // console.log('PostCard', post)
  return (
    <div className="post-card">
      <Link href={`/post/${post.slug}`}>
        <SquareImage url={`${BUCKET_URL}${post.images[0]?.url}`} />
      </Link>
      <section className="overlay">
        <div className="description" onClick={() => {
            toggleModal(`post-modal-${post.slug}`)
            window.history.pushState("object or string", post.title, `/post/${post.slug}`);
          }
        }>
          <div className="flex-center">
            <div>
              <div className="title">{post.title}</div>
              <div className="by">by LilyAldrin</div>
            </div>
          </div>
        </div>
        <a
          className="edit"
          onClick={(e) => {
            e.stopPropagation()
            toggleModal(`post-edit-${post.slug}`)
          }}
        >
          <FontAwesomeIcon icon={["fas", "edit"]} />
        </a>
      </section>
      <PostViewModal post={post} />
      <PostEdit post={post} />
    </div>
  )
}
