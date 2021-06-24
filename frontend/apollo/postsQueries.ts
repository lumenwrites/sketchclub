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
export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $body: String) {
      createPost(
        title: $title
        body: $body
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
  ){
    updatePost(
      slug: $slug
      title: $title
      body: $body
      published: $published
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
