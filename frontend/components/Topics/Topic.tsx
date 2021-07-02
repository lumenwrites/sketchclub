import { topics } from "./topics"
import { useRouter } from "next/router"
import Link from "components/Elements/Link"
import slugify from "slugify"
import { useGetTags } from "apollo/postsActions"

export default function Topic() {
  const router = useRouter()
  // console.log('topics',topics.trim().split('\n'))
  const { loading, error, data } = useGetTags()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  function renderTopics() {
    return data.tags.map((topic, i) => {
      let isActive = ""
      if (router.query.tagSlug === topic.slug) isActive = "active"
      if (!router.query.tagSlug && i === 0) isActive = "active"
      return (
        <Link key={i} className={`topic ${isActive}`} href={`/tag/${topic.slug}`}>
          <div className="flex-center">
            <div>
              {i === 0 && <p className="today">This Week's Topic:</p>}
              <p>{topic.name}</p>
            </div>
          </div>
        </Link>
      )
    })
  }
  return (
    <div className="wrapper">
      <div className="topics">{renderTopics()}</div>
    </div>
  )
}

//<Link className="topic" href={`/tag/${topic.slug}`}>
//<div className="wrapper">{`Today's Topic: ${topic.name}`}</div>
//</Link>
