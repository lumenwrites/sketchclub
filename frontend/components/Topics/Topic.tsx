import { topics } from "./topics"
import Link from "components/Elements/Link"
import slugify from "slugify"
import { useGetTags } from "apollo/postsActions"

export default function Topic() {
  // console.log('topics',topics.trim().split('\n'))
  const { loading, error, data } = useGetTags()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  function renderTopics() {
    return data.tags.map((topic, i) => (
      <Link key={i} className={`topic ${i === 0 && "active"}`} href={`/tag/${topic.slug}`}>
        <div className="flex-center">
          <div>
            {i === 0 && <p className="today">This Week's Topic:</p>}
            <p>{topic.name}</p>
          </div>
        </div>
      </Link>
    ))
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
