import { topics } from "./topics"
import Link from "components/Elements/Link"
import slugify from "slugify"

export default function Topic() {
  // console.log('topics',topics.trim().split('\n'))
  function renderTopics() {
    return topics.map((topic, i) => (
      <Link key={i} className={`topic ${i === 0 && "active"}`} href={`/tag/${slugify(topic)}`}>
        <div className="flex-center">
          <div>
            {i === 0 && <p className="today">This Week's Topic:</p>}
            <p>{topic}</p>
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
