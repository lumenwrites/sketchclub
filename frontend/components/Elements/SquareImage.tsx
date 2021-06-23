export default function SquareImage({url}) {
  return (
    <div className="square-image-wrapper">
      <div className="thumbnail" style={{ background: `url(${url})` }}></div>
    </div>
  )
}
