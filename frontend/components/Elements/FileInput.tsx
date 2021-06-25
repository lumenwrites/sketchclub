import { useRef } from "react"

export default function FileInput({onChange, children, className, accept="*"}) {
  const inputRef = useRef(null)
  // ToDO - run the function every time the file is selected, not just when it changes.
  return (
    <>
      {/* Actual html5 file input, hidden */}
      <input
        type="file"
        className="hidden"
        accept={accept}
        ref={inputRef}
        onChange={(e) => {
          if (!e.target.files[0]) return // don't do anything if it's empty
          onChange(e) // upload the file
          e.target.value = null // clear the input
        }}
      />
      {/* Pretty styled custom input. Just triggers a click on the html5 file input. */}
      <div
        className={className}
        onClick={() => inputRef.current.click()}
      >
        {children}
      </div>
    </>
  )
}
