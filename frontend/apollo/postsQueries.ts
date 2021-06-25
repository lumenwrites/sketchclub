import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query Posts($published:Boolean) {
    posts(
      published:$published
    ) {
      title
      body
      slug
      images {
        name
        url
        id
      }
    }
  }
`
export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $body: String, $images: [FileInput]) {
      createPost(
        title: $title
        body: $body
        images: $images
      ) {
        title
        body
        slug
      }
    }
`

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $slug: String!,
    $title: String!,
    $body: String,
    $published: Boolean
    $images: [FileInput]
  ){
    updatePost(
      slug: $slug
      title: $title
      body: $body
      published: $published
      images: $images
    ) {
      slug
      title
      body
      published
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($slug: String!) {
    deletePost(slug: $slug) {
      slug
    }
  }
`