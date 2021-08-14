import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SquareImage from "components/Elements/SquareImage"
const { BUCKET_URL } = process.env

import FileInput from "components/Elements/FileInput"

export default function ImageList({ images, uploadImage, uploadingImage, removeImage }) {
  // Scroll to the right after I add an image
  useEffect(() => {
    var imagesDiv = document.getElementById("images")
    imagesDiv.scrollLeft = imagesDiv.scrollWidth
  }, [uploadingImage, images])
  return (
    <div className="images" id="images">
      {images.map((i, idx) => (
        <PreviewImage key={idx} url={`${BUCKET_URL}${i.url}`} onClick={() => removeImage(i.url)} />
      ))}
      {uploadingImage ? (
        <UploadingImage />
      ) : (
        <FileInput className={"preview-image upload"} onChange={(e) => {uploadImage(e.target.files[0])}}>
          <div className="flex-center">
            <FontAwesomeIcon icon={["fas", "upload"]} />
          </div>
        </FileInput>
      )}
      <div className="clearfix" />
    </div>
  )
}

function PreviewImage({ url, onClick }) {
  return (
    <div className="preview-image" onClick={onClick}>
      <SquareImage url={url} />
      <div className="flex-center">
        <FontAwesomeIcon icon={["fas", "image"]} />
      </div>
      <div className="flex-center delete">
        <FontAwesomeIcon icon={["fas", "trash-alt"]} />
      </div>
    </div>
  )
}

function UploadingImage() {
  return (
    <div className="preview-image uploading">
      <div className="flex-center">
        <div className="spinner" />
      </div>
    </div>
  )
}
