import Error from "components/Elements/Error"
import ListImages from "./ListImages"
import Modal from "components/Elements/Modal"

export default function PostCreate() {
  const images = ["cowboy.jpg", "dinosaur.jpg", "fatso.jpg", "building.jpg"]
  return (
    <Modal name={`post-create`} className={"post-modal edit"}>
      <h1>Create Post</h1>
      <input placeholder="Post Title" name="title" value={""} onChange={() => {}} />
      <textarea placeholder="Post Description..." name="body" value={""} onChange={() => { }}></textarea>
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
