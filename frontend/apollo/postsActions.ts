import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, UPVOTE_POST } from 'apollo/postsQueries'
import { GET_TAGS } from 'apollo/postsQueries'

export const useGetPosts = ({ username, published, searchString, tagSlug }) => useQuery(GET_POSTS, {
  variables: {username, published, tagSlug, searchString},
})

export const useGetPost = (slug) => useQuery(GET_POST, {
  variables: { slug },
})

export const useCreatePost = () => useMutation(CREATE_POST, {
// context: { headers: { cookies: typeof window === 'undefined' ? '' : document.cookie } },
  refetchQueries: [{ query: GET_POSTS, variables: { published: true } }]
})

export const useUpdatePost = (slug) => useMutation(UPDATE_POST, {
  refetchQueries: [
    { query: GET_POSTS, variables: { published: true } },
    { query: GET_POST, variables: { slug: slug } }
  ]
})

export const useDeletePost = () => useMutation(DELETE_POST, {
  refetchQueries: [{ query: GET_POSTS, variables: { published: true } }]
})

export const useUpvotePost = (slug) => useMutation(UPVOTE_POST, {
  refetchQueries: [
    { query: GET_POST, variables: { slug: slug } }
  ]
})

export const useGetTags = () => useQuery(GET_TAGS)
