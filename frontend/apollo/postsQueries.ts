import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query Posts(
      $username: String,
      $published:Boolean,
      $searchString:String,
      $tagSlug:String,
      $topicSlug:String
    ) {
    posts(
      published:$published
      username:$username
      searchString:$searchString
      tagSlug:$tagSlug
      topicSlug:$topicSlug
    ) {
      title
      body
      slug
      images {
        name
        url
        id
      }
      tags {
        name
        slug
        id
      }
      topic {
        id
        name
        slug
        createdAt
      }
      score
      upvoters {
        username
      }
      author {
        username
      }
    }
  }
`

export const GET_POST = gql`
  query Post($slug: String) {
    post(slug: $slug) {
      title
      body
      published
      slug
      images {
        name
        url
        id
      }
      tags {
        name
        slug
        id
      }
      topic {
        id
        name
        slug
        createdAt
      }
      score
      upvoters {
        username
      }
      author {
        username
      }
    }
  }
`

export const CREATE_POST = gql`
    mutation CreatePost(
      $title: String!,
      $body: String,
      $tags: [TagInput],
      $topicId: String,
      $images: [FileInput]
    ) {
      createPost(
        title: $title
        body: $body
        tags: $tags
        topicId: $topicId
        images: $images
      ) {
        title
        body
        slug
        tags {
          name
          slug
          id
        }
        topic {
          id
          name
          slug
          createdAt
        }
      }
    }
`

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $slug: String!,
    $title: String!,
    $body: String,
    $published: Boolean,
    $tags: [TagInput],
    $topicId:String,
    $images: [FileInput]
  ){
    updatePost(
      slug: $slug
      title: $title
      body: $body
      published: $published
      tags: $tags
      topicId: $topicId
      images: $images
    ) {
      slug
      title
      body
      published
      tags {
        name
        slug
        id
      }
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
export const UPVOTE_POST = gql`
  mutation Upvote($slug: String!) {
    upvote(slug: $slug) {
      score
      upvoters {
        username
      }
    }
  }
`

export const GET_TAGS = gql`
  query Tags {
    tags {
      name
      slug
      id
    }
  }
`

export const GET_TOPICS = gql`
  query Tags {
    topics {
      id
      name
      slug
      createdAt
    }
  }
`
