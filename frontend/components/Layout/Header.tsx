import Link from "components/Elements/Link"
import Image from "next/image"

import { isLoggedIn, useLogout } from "apollo/userActions"

import { useModal } from "context/ModalContext"
import PostCreate from "components/Posts/PostCreate"
import LoginModal from "components/Users/LoginModal"

export default function Header() {
  const username = isLoggedIn()
  const logout = useLogout()
  const { toggleModal } = useModal()
  return (
    <header>
      <div className="wrapper">
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          <span className="bold">sketch</span>daily
        </Link>
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
                Upload Sketch
              </a>
              <PostCreate />
              <Link href="/profile/username" className="btn btn-nav">
                My Portfolio
              </Link>
              <a className="btn btn-nav" onClick={() => logout()}>
                Logout
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
