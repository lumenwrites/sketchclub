import Link from "components/Elements/Link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useLogout } from "apollo/userActions"
import { useAuth } from "context/AuthContext"
import { useModal } from "context/ModalContext"
import PostCreate from "components/Posts/PostCreate"
import LoginModal from "components/Users/LoginModal"

export default function Header() {
  const { username } = useAuth()
  const logout = useLogout()
  const { toggleModal } = useModal()
  console.log("[Header] Fetched logged in user", username)
  return (
    <header>
      <div className="wrapper">
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          <span className="bold">sketch</span>club
        </Link>
        <input className="search" placeholder="Search..."></input>
        <nav>
          
          {!username && (
            <>
              <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`login`)}>
                Login
              </a>
              <LoginModal />
            </>
          )}
          {username && (
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
          )}
        </nav>
        <div className="clearfix" />
      </div>
    </header>
  )
}
