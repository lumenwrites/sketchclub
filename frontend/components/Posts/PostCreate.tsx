import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import { useState } from "react"
import useForm from "hooks/useForm"
import { useCreatePost } from "apollo/postsActions"
import { useUploadFiles } from "hooks/useUploadFiles"
import TagsInput from "components/Elements/TagsInput"

export default function PostCreate() {
  const emptyInputs = { title: "", body: "" }
  const { inputs, handleChange, setValue, clearForm } = useForm(emptyInputs)
  const { files: images, removeFile, uploadFile, uploading } = useUploadFiles()
  const [tags, setTags] = useState([])
  const [createPost, createPostRes] = useCreatePost()
  const { toggleModal } = useModal()
  async function handleSubmit() {
    const { title, body } = inputs
    console.log("submitting post", { title, body, images, tags })
    const { data } = await createPost({ variables: { title, body, images, tags } })
    clearForm()
    toggleModal("post-create") // hide the modal
    // toggleModal(`post-edit-${data.createPost.slug}`)
    console.log("Created Post", data.createPost)
  }
  return (
    <Modal name={`post-create`} className={"post-modal edit"}>
      <h1>Create Post</h1>
      <input placeholder="Post Title" name="title" value={inputs.title} onChange={handleChange} />
      <textarea placeholder="Post Description..." name="body" value={inputs.body} onChange={handleChange}></textarea>
      <TagsInput tags={tags} setTags={setTags} />
      <div className="clearfix"/>
      <h4>Upload Images</h4>
      <ListImages images={images} uploadImage={uploadFile} uploadingImage={uploading} removeImage={removeFile} />
      <div className="buttons">
        <div className="right">
          <button type="button" className="btn btn-cta btn-large" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="clearfix" />
      </div>
    </Modal>
  )
}
