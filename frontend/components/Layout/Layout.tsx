import Head from "next/head"

import Header from "./Header"

/* FontAwesome */
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fas, far, fab)

export default function Layout({ children, subnav }) {
  return (
    <div>
      <Header />
      {subnav}
      <div className="wrapper">{children}</div>

      <Head>
        <title>Sketch Daily</title>
      </Head>
    </div>
  )
}
