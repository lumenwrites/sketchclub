// @ts-nocheck
import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, UPVOTE_POST } from 'apollo/postsQueries'
import { GET_TOPICS, GET_TAGS } from 'apollo/postsQueries'
import { useRouter } from "next/router"

export const useGetPosts = () => {
  const router = useRouter()
  return useQuery(GET_POSTS, {
    variables: {
      username: router.query.username || undefined,
      published: true,
      tagSlug: router.query.tagSlug || undefined,
      topicSlug: router.query.topicSlug || undefined,
      searchString: router.query.search || undefined,
      skip: parseInt(process.env.POSTS_PER_PAGE) * (parseInt(router.query.page) - 1 || 0),
      take: parseInt(process.env.POSTS_PER_PAGE)
    },
  })
}

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

export const useUpvotePost = (slug, username) => useMutation(UPVOTE_POST, {
  refetchQueries: [
    // { query: GET_POSTS, variables: { published: true } },
    // { query: GET_POST, variables: { slug: slug } }
  ],
  update: (cache, { data: { upvote } }) => {
    // Updating state works, but would be a huge pain in the ass for GET_POSTS
    // console.log('upvote update', upvote.score, slug)
    // const { post } = cache.readQuery({
    //   query: GET_POST,
    //   variables: { slug }
    // })
    // console.log('readPostQuery', post.score, post.upvoters)
    // const hasUpvoted = post.upvoters?.find((u) => u.username === username)
    // const score = hasUpvoted ? (post.score - 1) : (post.score + 1)
    // const upvoters = hasUpvoted ? post.upvoters.filter(u => u.username !== username) : [...post.upvoters, { username }]
    // const updatedPost = {...post, score, upvoters}
    // cache.writeQuery({
    //   query: GET_POST,
    //   variables: { slug },
    //   data: { post: updatedPost }
    // })
  }
})

export const useGetTopics = () => useQuery(GET_TOPICS)
