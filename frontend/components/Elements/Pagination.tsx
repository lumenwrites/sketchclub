import { useQuery } from "@apollo/client"
import { gql } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"

export default function Pagination() {
  const router = useRouter()
  const { loading, error, data } = useQuery(gql`{postsCount}`)
  const currentPage = parseInt(router.query.page) || 1
  const postsCount = data?.postsCount[0]
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE)
  const pageCount = Math.ceil(postsCount / postsPerPage)
  console.log({pageCount})
  function goToPage(pageNumber) {
    if (pageNumber === 0 || pageNumber > pageCount) return
    let { page, ...originalQuery } = router.query
    if (pageNumber === 1) {
      router.push({ query: originalQuery })
      return
    }
    router.push({ query: { ...router.query, page:pageNumber } })
  }
  function renderPageNumbers() {

    let pageNumbers = [...Array(pageCount).keys()].map(i => (
      <div key={i} className={`page-num ${i+1 === currentPage ? "active" : ""}`} onClick={()=> goToPage(i+1)}>
        {i+1}
      </div>
    ))
    return pageNumbers
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div className="pagination">

      <div className={`page-num ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>
        <FontAwesomeIcon icon={["fas", "chevron-left"]} />
      </div>
      {renderPageNumbers()}
      <div className={`page-num ${currentPage === pageCount ? "disabled" : ""}`} onClick={() => goToPage(currentPage + 1)}>
        <FontAwesomeIcon icon={["fas", "chevron-right"]} />
      </div>
    </div>
  )
}
