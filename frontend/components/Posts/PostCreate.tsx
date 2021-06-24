import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import useForm from "hooks/useForm"
import { useCreatePost } from "apollo/postsActions"

export default function PostCreate() {
  const emptyInputs = { title: "", body: "" }
  const { inputs, handleChange, setValue, clearForm } = useForm(emptyInputs)
  const [createPost, createPostRes] = useCreatePost()
  const { toggleModal } = useModal()
  async function handleSubmit() {
    const { title, body } = inputs
    console.log("submitting post", { title, body })
    const { data } = await createPost({ variables: { title, body } })
    clearForm()
    // toggleModal(`post-edit-${data.createPost.slug}`)
    console.log("Created Post", data.createPost)
  }
  const images = ["cowboy.jpg", "dinosaur.jpg", "fatso.jpg", "building.jpg"]
  return (
    <Modal name={`post-create`} className={"post-modal edit"}>
      <h1>Create Post</h1>
      <input placeholder="Post Title" name="title" value={inputs.title} onChange={handleChange} />
      <textarea placeholder="Post Description..." name="body" value={inputs.body} onChange={handleChange}></textarea>
      <h4>Upload Images</h4>
      <ListImages images={images} uploadImage={() => {}} uploadingImage={false} removeImage={() => {}} />
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
