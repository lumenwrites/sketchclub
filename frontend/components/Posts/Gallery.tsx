import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SquareImage from "components/Elements/SquareImage"

export default function Gallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0)

  function prevImage() {
    setCurrentImage((prev) => {
      if (prev < 1) return images.length - 1
      return prev - 1
    })
  }
  function nextImage() {
    setCurrentImage((prev) => {
      if (prev == images.length - 1) return 0
      return prev + 1
    })
  }
  return (
    <div className="gallery">
      <div className="current-image">
        <SquareImage url={`/sketches/${images[currentImage]}`} />
        <div className="prev-image" onClick={prevImage}>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </div>
        <div className="next-image" onClick={nextImage}>
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </div>

        <div className="dots">
          {images.map((img, idx) => (
            <div className={`dot ${idx == currentImage ? "active" : ""}`} key={idx} onClick={() => setCurrentImage(idx)} />
          ))}
        </div>
      </div>
    </div>
  )
}
