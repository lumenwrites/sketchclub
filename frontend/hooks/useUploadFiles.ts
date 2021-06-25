import { useState, useEffect } from 'react'
import { useApolloClient } from "@apollo/client"
import { GET_PRESIGNED_URL } from "apollo/imageQueries"

export function useUploadFiles(initial = []) {
  const [files, setFiles] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const client = useApolloClient()

  const initialValues = Object.values(initial).join('');
  useEffect(() => { setFiles(initial) }, [initialValues]);

  async function uploadFile(file) {
    setUploading(true)
    // TODO: file = await resizeImage(file, 700)
    const [filename, extension] = processFilename(file.name)
    const { data } = await client.query({
      query: GET_PRESIGNED_URL,
      variables: { filename, extension, filetype: file.type },
    })
    const { filepath, url } = data.getPresignedUrl
    // console.log('presigned url', filepath, url)
    // upload the file
    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": file.type },
      body: file
    })
    // console.log('uploaded file', res)
    setUploading(false)
    setFiles((prev) => [...prev, { name: file.name, url: filepath }])
  }
  function removeFile(url) {
    // console.log('removeImage', url, setImages)
    setFiles((prev) => prev.filter((i) => i.url !== url))
  }
  return { files, setFiles, uploadFile, uploading, removeFile }
}

function processFilename(filename) {
  var lines = filename.split(".");   // split all lines into array
  var extension = lines.pop();   // read and remove extension
  var name = lines.join(".");     // re-join the remaining lines
  return [name, extension]
}
