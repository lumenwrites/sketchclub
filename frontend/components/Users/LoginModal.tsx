import Error from "components/Elements/Error"
import Modal from "components/Elements/Modal"
import { useModal } from "context/ModalContext"
import { useJoin, useLogin } from "apollo/userActions"
import useForm from "hooks/useForm"
import { useState } from "react"

const emptyJoinInputs = { username: "", email: "", password: "" }
const emptyLoginInputs = { email: "user2@gmail.com", password: "pass2" }

export default function LoginModal() {
  const [join, joinRes] = useJoin()
  const [login, loginRes] = useLogin()
  const { inputs: joinInputs, handleChange: joinHandleChange, clearForm: clearJoin } = useForm(emptyJoinInputs)
  const { inputs: loginInputs, handleChange: loginHandleChange, clearForm: clearLogin } = useForm(emptyLoginInputs)
  const { toggleModal } = useModal()
  const [error, setError] = useState("")

  async function handleJoin() {
    try {
      const { username, email, password } = joinInputs
      const { data } = await join({ variables: { username, email, password } })
      console.log("Joined", data)
      toggleModal("login")
      clearJoin()
    } catch (e) {
      console.log('Failed to join', e)
      setError("User already exists.")
    }

  }
  async function handleLogin() {
    try {
      const { email, password } = loginInputs
      // console.log('logging in', email, password)
      const { data } = await login({ variables: { email, password } })
      console.log("Logged in", data)
      toggleModal("login")
      clearLogin()
    } catch (e) {
      console.log('Failed to log in', e)
      setError("Wrong Username/Password.")
    }

  }

  return (
    <Modal name={`login`} className={"login-modal narrow"}>
      <Error error={error}/>
      <h2>Join</h2>
      <input placeholder="Your username (no spaces)..." name="username" autoComplete="on" value={joinInputs.username} onChange={joinHandleChange} />
      <input placeholder="Your email..." name="email" autoComplete="on" value={joinInputs.email} onChange={joinHandleChange} />
      <input placeholder="Your password (5+ characters)..." name="password" type="password" autoComplete="on" value={joinInputs.password} onChange={joinHandleChange} />
      <div className="btn btn-cta btn-large" onClick={handleJoin}>
        Join
      </div>
      <hr />
      <h2>Login</h2>
      <input placeholder="Your email..." name="email" autoComplete="on" value={loginInputs.email} onChange={loginHandleChange} />
      <input placeholder="Your password..." name="password" type="password"  autoComplete="on" value={loginInputs.password} onChange={loginHandleChange} />
      <div className="btn btn-cta btn-large" onClick={handleLogin}>
        Login
      </div>
    </Modal>
  )
}
