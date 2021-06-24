import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"
import useForm from "hooks/useForm"


export default function PostCreate() {
  const emptyInputs = { title: "", body: "" }
  const { inputs, handleChange, setValue } = useForm(emptyInputs)
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
          <button type="button" className="btn btn-cta btn-large" onChange={() => {}}>
            Create
          </button>
        </div>
        <div className="clearfix" />
      </div>
    </Modal>
  )
}
