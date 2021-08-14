import { gql } from '@apollo/client'

export const GET_PRESIGNED_URL = gql`
  query GetPresignedUrl($filename: String, $filetype: String) {
    getPresignedUrl(filename: $filename, filetype: $filetype) {
      url
      filepath
    }
  }
`
