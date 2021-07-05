import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Pagination() {
  function renderPageNumbers() {
    const pageCount = 5
    const currentPage = 2
    let pageNumbers = []
    for (var i = 1; i < pageCount + 1; i++) {
      pageNumbers.push(
        <div key={i} className={`page-num ${i === currentPage ? "active" : ""}`}>
          {i}
        </div>
      )
    }
    return pageNumbers
  }
  return (
    <div className="pagination">
      <div className="page-num">
        <FontAwesomeIcon icon={["fas", "chevron-left"]} />
      </div>
      {renderPageNumbers()}
      <div className="page-num">
        <FontAwesomeIcon icon={["fas", "chevron-right"]} />
      </div>
    </div>
  )
}
