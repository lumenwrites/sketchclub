import Link from "components/Elements/Link"
import Image from "next/image"

export default function Header() {
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
          <Link href="/post/create" className="btn btn-nav">
            Upload Sketch
          </Link>
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
