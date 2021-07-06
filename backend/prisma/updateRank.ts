// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
import { users, topics, tags, posts } from './seeddata'

const prisma = new PrismaClient()

function scoreToRank(score, createdAt) {
  // Sort by hot
  // https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d
  // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
  const nowD = new Date()
  // const now = d.getMinutes()
  const createdAtD = new Date(createdAt)
  var age = (nowD.getTime() - createdAtD.getTime()) / 1000 / 60 / 60 // in hours
  const gravity = 1.8
  const rank = (score - 1) / (age + 2) ** gravity
  console.log({age, score, rank})
  return rank
}

async function main() {
  const posts = await prisma.post.findMany({ where: { published: true } },) // orderBy: [{ rank: 'desc' }],
  let topPost = {rank: 0}
  for (let post of posts) { // .slice(0, 10)
    console.log(`Updating rank: ${post.title}`)
    post.rank = scoreToRank(post.score, post.createdAt)
    if (post.rank > topPost.rank) {
      topPost = post
    }
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: post
    })
  }
  console.log(`Updating ranks finished. Top post:`, { title: topPost.title, score: topPost.score, rank: topPost.rank})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


