import { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import slugify from "slugify"
import allTags from "./tags"
import { useGetTopics } from "apollo/postsActions"

export default function TopicsInput({ topic, setTopic }) {
  const { loading, error, data } = useGetTopics()

  function renderAllTopics() {
    return data.topics.slice(0, 5).map((t, i) => (
      <div className="item" key={t.slug} onClick={() => setTopic(t)}>
        {i === 0 ? `Today's Topic: ${t.name}` : t.name}
      </div>
    ))
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div className="dropdown topics-input">
      <div className="menu-handle btn">{topic ? topic.name : "Choose the Topic"}</div>
      <div className="menu">
        <div className="item" onClick={() => setTopic(null)}>
          None (draw what you want)
        </div>
        {renderAllTopics()}
      </div>
    </div>
  )
}
