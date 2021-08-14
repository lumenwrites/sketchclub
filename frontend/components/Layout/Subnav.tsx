import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TagsInput from "components/Elements/TagsInput"
import allTags from "components/Elements/tags"

export default function Subnav() {
  const [tags, setTags] = useState([])
  function renderTags() {
    return allTags.map((tag) => (
      <div className="item btn" key={tag.slug} onClick={() => {}} >
      {tag.name}
    </div>
    ))
  }
  return (
    <div className="subnav">
      <div className="wrapper">
        <input className="search" placeholder="Search..."></input>
        {/* <FontAwesomeIcon icon={["fas", "file"]} /> */}
        {/* <TagsInput tags={tags} setTags={setTags} customTags={true} placeholder="Search..." /> */}
        
        <div className="dropdown">
            <div className="menu-handle btn">
		          Category
		        </div>
            <div className="menu">{renderTags()}</div>
        </div>
        
        <div className="clearfix" />
      </div>
    </div>
  )
}
