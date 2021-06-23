import Link from "components/Elements/Link"
import Image from "next/image"

import { useModal } from "context/ModalContext"
import PostCreate from "components/Posts/PostCreate"

export default function Header() {
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
          <a className="btn btn-nav" onClick={() => toggleModal(`post-create`)}>
            Upload Sketch
          </a>
          <PostCreate/>
          <Link href="/profile/lumen" className="btn btn-nav">
            My Portfolio
          </Link>
          <a onClick={() => console.log("open login modal")} className="btn btn-nav btn-cta">
            Login
          </a>
        </nav>
      </div>
    </header>
  )
}
