import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import slugify from "slugify"

export default function TagsInput({tags,setTags}) {
  const [val, setVal] = useState("")

  function handleChange(e) {
    const lastChar = e.target.value.slice(-1)
    if (lastChar === ",") return
    setVal(e.target.value)
  }
  function handleKeyDown(e) {
    // Remove previous tag
    if (e.key === 'Backspace' && val.length ===0) {
      setTags((prev) => [...prev].splice(0, prev.length-1))
    }
    // Add tag
    if (e.key === "," || e.key === "Enter") {
      const tag = {
        name: val.trim(),
        slug: slugify(val, { lower: true, strict: true })
      }
      setTags((prev) => {
        const alreadyInArray = prev.find(elm => elm.slug === tag.slug)
        const isBlank = !tag.name || !tag.slug
        if (alreadyInArray || isBlank) return prev
        return [...prev, tag]
      })
      setVal("")
    }
  }
  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t.slug !== tag.slug))
  }
  return (
    <div className="tags-input">
      {tags.map((tag, i) => (
        <div className="tag" key={tag.slug} onClick={() => removeTag(tag)}>
          {tag.name}
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
      ))}
      {tags.length < 5 && <input placeholder="Add up to 5 tags..." value={val} onChange={handleChange} onKeyDown={handleKeyDown} />}

      {/*  value={val} onChange={handleChange}  */}
    </div>
  )
}
