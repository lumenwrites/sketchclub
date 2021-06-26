import { useQuery, useMutation } from '@apollo/client'
import { useApolloClient } from "@apollo/client"
import { ME, GET_USER, JOIN, LOGIN } from 'apollo/userQueries'
import { setCookie, getCookie, eraseCookie } from "utils/cookies"

export const useMe = () => useQuery(ME)

export function isLoggedIn() {
  const { data, loading, error } = useQuery(ME)
  return data?.me?.username
}
// Not used right now. I wanted to update the cookie in LoginModal, and then manually refetch
// ME query to use the updated token to fetch the user.
// But for some reason, next.js sends the old cookie value, even after the browser cookies are updated.
// So instead, I manually update ME query after JOIN and LOGIN mutations, and set it to an empty object on logout()
export function useRefetchMe() {
  const client = useApolloClient()
  return () => {
    console.log('Auth cookie when I refetch ME query:', getCookie('Authorization'))
    client.query({query: ME})
  }
}

export const useGetUser = (username) => useQuery(GET_USER, {
  variables: { username },
})

export const useJoin = () => useMutation(JOIN, {
  update: (cache, { data: { join } }) => {
    // console.log('JOIN mutation returned user, update ME query', join)
    setCookie('Authorization', join.token)
    cache.writeQuery({
      query: ME,
      data: { me: { username: join.user.username } }
    })
  }
})

export const useLogin = () => useMutation(LOGIN, {
  update: (cache, { data: { login } }) => {
    // console.log('LOGIN mutation returned user, update ME query', login)
    setCookie('Authorization', login.token)
    cache.writeQuery({
      query: ME,
      data: { me: { username: login.user.username } }
    })
  }
})

export function useLogout() {
  const client = useApolloClient()
  return () => {
    // console.log('Logout')
    eraseCookie('Authorization')
    client.writeQuery({
      query: ME,
      data: { me: { username: "" } }
    })
  }
}
