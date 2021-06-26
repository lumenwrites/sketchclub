import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST } from 'apollo/postsQueries'

export const useGetPosts = ({username, published}) => useQuery(GET_POSTS, {
  variables: {username, published},
})

export const useGetPost = (slug) => useQuery(GET_POST, {
  variables: { slug },
})

export const useCreatePost = () => useMutation(CREATE_POST, {
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
