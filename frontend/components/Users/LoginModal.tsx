import Error from "components/Elements/Error"
import Modal from "components/Elements/Modal"
import useForm from "hooks/useForm"

const emptyJoinInputs = { username: "", email: "", password: "" }
const emptyLoginInputs = { email: "user2", password: "user2" }

export default function PostCreate() {
  const { inputs: joinInputs, handleChange: joinHandleChange } = useForm(emptyJoinInputs)
  const { inputs: loginInputs, handleChange: loginHandleChange } = useForm(emptyLoginInputs)
  async function handleJoin() {
    const { username, email, password } = joinInputs
    console.log("hadnleJoin", { username, email, password })
  }
  async function handleLogin() {
    const { email, password } = loginInputs
    console.log("handleLogin", { email, password })
  }
  return (
    <Modal name={`login`} className={"post-modal narrow"}>
      <h2>Join</h2>
      <input placeholder="Your username (no spaces)..." name="username" value={joinInputs.username} onChange={joinHandleChange} />
      <input placeholder="Your email..." name="email" value={joinInputs.email} onChange={joinHandleChange} />
      <input placeholder="Your password (5+ characters)..." name="password" value={joinInputs.password} onChange={joinHandleChange} />
      <div className="btn btn-cta btn-large" onClick={handleJoin}>
        Join
      </div>
      <hr />
      <h2>Login</h2>
      <input placeholder="Your email..." name="email" value={loginInputs.email} onChange={loginHandleChange} />
      <input placeholder="Your password..." name="password" value={loginInputs.password} onChange={loginHandleChange} />
      <div className="btn btn-cta btn-large" onClick={handleLogin}>
        Login
      </div>
    </Modal>
  )
}
