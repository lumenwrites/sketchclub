import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Search() {
  const router = useRouter()
  const [searchString, setSearchString] = useState(router?.query?.search || "")
  //useEffect(search, [searchString])
  function search(e) {
    if (e.key !== "Enter") return
    let { search, ...originalQuery } = router.query
    if (searchString.length === 0) {
      router.push({ query: originalQuery })
      return
    }
    router.push({ query: { ...router.query, search: searchString } })
  }

  return (
    <div>
      <input
        className="search"
        placeholder="Search..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={search}
      ></input>
    </div>
  )
}
