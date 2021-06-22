import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query Posts($published:Boolean) {
    posts(
      published:$published
    ) {
      title
      body
      slug
    }
  }
`
