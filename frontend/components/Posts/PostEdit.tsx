import Link from "components/Elements/Link"
import { useRouter } from "next/router"
import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import useForm from "hooks/useForm"
import { useUpdatePost, useDeletePost } from "apollo/postsActions"
import { useUploadFiles } from "hooks/useUploadFiles"

export default function PostEdit({ post }) {
  const router = useRouter()
  const initialInputs = { title: post.title, body: post.body }
  const { inputs, handleChange, setValue } = useForm(initialInputs)
  const [updatePost, updatePostRes] = useUpdatePost(post.slug)
  const [deletePost, deletePostRes] = useDeletePost()
  const { files: images, removeFile, uploadFile, uploading } = useUploadFiles(post.images)
  const { toggleModal } = useModal()

  async function handleSubmit() {
    const { title, body, published } = inputs
    // Remove extra fields on from images (like __typename) added by graphql query
    // I can't just put them back into update because the types allow only specific fields
    const img = images.map((f) => ({ url: f.url, name: f.name, id: f.id }))
    const { data } = await updatePost({
      variables: { slug: post.slug, title, body, published, images: img },
    })
    console.log("Updated Post", data.updatePost)
    toggleModal(`post-edit-${post.slug}`)
    router.push(`/post/${post.slug}`)
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
      <ListImages images={images} uploadImage={uploadFile} uploadingImage={uploading} removeImage={removeFile} />
      <div className="buttons">
        <div className="btn btn-large delete" onClick={handleDelete}>
          Delete
        </div>
        <div className="right">
          {/* <Link href={`/post/${post.slug}`} className="btn btn-large">
            View
          </Link> */}
          <div className="btn btn-large btn-cta" onClick={handleSubmit}>
            Save
          </div>
        </div>
      </div>
    </Modal>
  )
}
