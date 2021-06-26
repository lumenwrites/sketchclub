import { useQuery, useMutation } from '@apollo/client'
import { createContext, useState } from "react"
import { useContext } from 'react'
import { useMe } from "apollo/userActions"
  
const AuthContext = createContext({
  username: ""
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
  const { data, loading, error } = useMe()
  const username = data?.me?.username
  const context = { username }
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  )
}
export default AuthContext
