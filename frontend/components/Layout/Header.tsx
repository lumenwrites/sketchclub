import Link from "components/Elements/Link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useLogout } from "apollo/userActions"
import { useAuth } from "context/AuthContext"
import { useModal } from "context/ModalContext"
import PostCreate from "components/Posts/PostCreate"
import LoginModal from "components/Users/LoginModal"
import Search from "components/Layout/Search"

export default function Header() {
  return (
    <header>
      <div className="wrapper">
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          <span className="bold">sketch</span>club
        </Link>
        <Search />
        <nav>
          <NavButtons/>
        </nav>
        <div className="clearfix" />
      </div>
    </header>
  )
}

function NavButtons() {
  const { username } = useAuth()
  const logout = useLogout()
  const { toggleModal } = useModal()
  console.log("[Header] Fetched logged in user", username)
  if (!username) {
    return (
      <>
        <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`login`)}>
          Login
        </a>
        <LoginModal />
      </>
    )
  }
  if (username) {
    return (
      <>
        <a className="btn btn-nav" onClick={() => toggleModal(`post-create`)}>
          {/* <FontAwesomeIcon icon={["fas", "upload"]} /> */}
          Upload Sketch
        </a>
        <PostCreate />
        <Link href={`/profile/${username}`} className="btn btn-nav">
          {/* <FontAwesomeIcon icon={["fas", "user"]} /> */}
          My Portfolio
        </Link>
        <a className="btn btn-nav" onClick={() => logout()}>
          {/* <FontAwesomeIcon icon={["fas", "sign-out-alt"]} /> */}
          Logout
        </a>
      </>
    )
  }
}
