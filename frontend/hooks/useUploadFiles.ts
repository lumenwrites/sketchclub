import { useState, useEffect } from 'react'
import { useApolloClient } from "@apollo/client"
import { GET_PRESIGNED_URL } from "apollo/imageQueries"
import resizeImage from 'utils/resizeImage'

export function useUploadFiles(initial = []) {
  const [files, setFiles] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const client = useApolloClient()

  const initialValues = Object.values(initial).join('');
  useEffect(() => { setFiles(initial) }, [initialValues]);



  async function uploadToS3(file) {
    // request presigned url
    const { data } = await client.query({
      query: GET_PRESIGNED_URL,
      variables: { filename: file.name, filetype: file.type},
    })
    // Filepath is "/username/images/filename.jpg", that will be the actual url stored in the database
    // url is just a presigned url used for file upload to S3
    const { filepath, url } = data.getPresignedUrl
    // upload the file
    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": file.type},
      body: file
    })
    return filepath 
  }

  async function uploadFile(file) {
    setUploading(true)
    const isAnImage = file.type.match(/image.*/)
    if (isAnImage) file = await resizeImage(file, 620, 620)
    const url = await uploadToS3(file)
    // console.log('uploaded file', res)
    setUploading(false)
    setFiles((prev) => [...prev, { name: file.name, url }])
  }
  function removeFile(url) {
    // console.log('removeImage', url, setImages)
    setFiles((prev) => prev.filter((i) => i.url !== url))
  }
  return { files, setFiles, uploadFile, uploading, removeFile }
}
