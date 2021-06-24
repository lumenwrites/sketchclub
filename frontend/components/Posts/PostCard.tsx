import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "components/Elements/Link"
import SquareImage from "components/Elements/SquareImage"

import { useContext } from "react"
import { useModal } from "context/ModalContext"
import PostView from "./PostView"
import PostEdit from "./PostEdit"
const { BUCKET_URL } = process.env

export default function PostCard({ post, onClick }) {
  const { toggleModal } = useModal()
  return (
    <div className="post-card">
      <Link href={`/post/${post.slug}`}>
        <SquareImage url={`${BUCKET_URL}cowboy.jpg`} />
      </Link>
      <section className="overlay">
        <div className="description" onClick={() => toggleModal(`post-modal-${post.slug}`)}>
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
      <PostView post={post} />
      <PostEdit post={post} />
    </div>
  )
}
