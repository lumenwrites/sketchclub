import { useRouter } from "next/router"

export default function ProfileHeader() {
  const router = useRouter()
  return (
    <div className="subheader">
      <div className="wrapper"><b>{ router.query.username }</b>'s sketches.</div>
    </div>
  )
}
