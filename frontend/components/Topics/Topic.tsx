import { useEffect } from "react"
import { topics } from "./topics"
import { useRouter } from "next/router"
import Link from "components/Elements/Link"
import slugify from "slugify"
import { useGetTopics } from "apollo/postsActions"

export function scrollTo(element, wrapper, speed=0.2) {
  /* console.log('scrollTo',card,col) */
  var rect = element.getBoundingClientRect()
  var wrapperRect = wrapper.getBoundingClientRect()
  var elementCenter = rect.left + rect.width*0.5
  elementCenter = rect.left - 40 // + wrapperRect.width / 4
  // console.log('center', elementCenter)
  wrapper.scrollLeft = elementCenter // wrapper.scrollLeft + (elementCenter - wrapper.offsetHeight*0.5)
}

export default function Topic() {
  const router = useRouter()
  // console.log('topics',topics.trim().split('\n'))
  const { loading, error, data } = useGetTopics()
  useEffect(() => {
    //Scroll after render
    var activeTopic = document.getElementsByClassName("topic active")[0]
    var topicsDiv = document.getElementsByClassName("topics")[0]
    if (topicsDiv && activeTopic) {
      scrollTo(activeTopic, topicsDiv)
      // console.log('scroll', activeTopic.scrollWidth)
      // topicsDiv.scrollLeft = activeTopic.scrollWidth
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  function renderTopics() {
    return data.topics.map((topic, i) => {
      let isActive = ""
      if (router.query.topicSlug === topic.slug) isActive = "active"
      if (!router.query.topicSlug && i === 0) isActive = "active"
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

//<Link className="topic" href={`/tag/${topic.slug}`}>
//<div className="wrapper">{`Today's Topic: ${topic.name}`}</div>
//</Link>
