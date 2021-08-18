// @ts-nocheck
import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "components/Elements/Link"
import slugify from "slugify"
import { useGetTopics } from "apollo/postsActions"

export default function Topic(props) {
  const topics = props.topics
  const router = useRouter()
  // console.log('topics',topics.trim().split('\n'))
  const { loading, error, data } = useGetTopics()
  useEffect(() => {
    //Scroll after render
    var activeTopic = document.getElementsByClassName("topic active")[0] as HTMLElement
    var topicsDiv = document.getElementsByClassName("topics")[0]
    if (topicsDiv && activeTopic) {
      topicsDiv.scrollLeft = activeTopic.offsetLeft - 40
    }
  })

  if (!topics && loading) return <p>Loading...</p>
  if (!topics && error) return <p>Error :(</p>
  function renderTopics() {
    const ts = data?.topics || topics
    return ts.map((topic, i) => {
      let isActive = ""
      if (router.query.topicSlug === topic.slug) isActive = "active"
      //if (!router.query.topicSlug && i === 0) isActive = "active"
      return (
        <Link key={i} className={`topic ${isActive}`} href={`/topic/${topic.slug}`}>
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
