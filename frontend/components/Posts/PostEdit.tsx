import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import useForm from "hooks/useForm"
import { useUpdatePost, useDeletePost } from "apollo/postsActions"

export default function PostEdit({ post }) {
  const initialInputs = { title: post.title, body: post.body }
  const { inputs, handleChange, setValue } = useForm(initialInputs)
  const [updatePost, updatePostRes] = useUpdatePost()
  const [deletePost, deletePostRes] = useDeletePost()
  const images = ["cowboy.jpg", "dinosaur.jpg", "fatso.jpg", "building.jpg"]
  const { toggleModal } = useModal()

  async function handleSubmit() {
    const { title, body, published } = inputs
    const { data } = await updatePost({
      variables: { slug:post.slug, title, body, published }
    })
    console.log("Updated Post", data.updatePost)
    toggleModal(`post-edit-${post.slug}`)
  }

  async function handleDelete() {
    const { data } = await deletePost({ variables: { slug: post.slug } })
    toggleModal(`post-edit-${post.slug}`)
  }

  return (
    <Modal name={`post-edit-${post.slug}`} className={"post-modal edit"}>
      <h1>Edit Post</h1>
      <input placeholder="Post Title" name="title" value={inputs.title} onChange={handleChange} />
      <textarea placeholder="Post Description..." name="body" value={inputs.body} onChange={handleChange}></textarea>
      <h4>Upload Images</h4>
      <ListImages images={images} uploadImage={() => {}} uploadingImage={false} removeImage={() => {}} />
      <div className="buttons">
        <div className="btn btn-large delete" onClick={handleDelete}>
          Delete
        </div>
        <div className="right">
          <div className="btn btn-large btn-cta" onClick={handleSubmit}>
            Save
          </div>
        </div>
      </div>
    </Modal>
  )
}
