import { gql } from '@apollo/client'

export const GET_PRESIGNED_URL = gql`
  query GetPresignedUrl($filename: String, $extension: String,, $filetype: String) {
    getPresignedUrl(filename: $filename, extension:$extension, filetype: $filetype) {
      url
      filepath
    }
  }
`
