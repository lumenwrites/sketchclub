import {topics} from './topics'


export default function Topics({ topic }) {
  console.log('topics',topics.trim().split('\n'))
  return (
    <div className="wrapper">
      <div className="topic">{topic}</div>
    </div>
  )
}
