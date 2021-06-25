import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Gallery from "./Gallery"
const { BUCKET_URL } = process.env

import Layout from "components/Layout/Layout"

export default function PostView({ post }) {
  return (
    <Layout>
      <div className={"post-page post-view"}>
        <Gallery images={post.images} />
        <div className="description">
          <h1>{post.title}</h1>
          <span className="author">by LilyAldrin</span>
          <hr />
          {post.body}
        </div>
        <div className="clearfix"/>
      </div>
    </Layout>
  )
}
