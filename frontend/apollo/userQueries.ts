import { gql } from '@apollo/client'

export const ME = gql`
  query Me {
    me {
      username
    }
  }
`

export const GET_USER = gql`
  query User($username: String) {
    user(username: $username) {
      username
      email
    }
}
`

export const JOIN = gql`
  mutation Join($username: String!, $email: String!, $password: String!) {
    join(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`
