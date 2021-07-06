// @ts-nocheck
import { hash } from 'bcryptjs'
import { PrismaClient, Prisma } from '@prisma/client'
import slugify from 'slugify'
import { users, topics, tags, posts } from './seeddata'

const prisma = new PrismaClient()

async function main() {
  console.log(`Seeding the db...`)
  await prisma.image.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.topic.deleteMany()

  let userIds = []
  for (let user of users) {
    user.password = await hash(user.password, 10)
    const createdUser = await prisma.user.create({ data: user })
    userIds.push(createdUser.id)
    console.log(`Created user with id: ${createdUser.id}`)
  }
  for (let tag of tags) {
    tag.id = tag.slug
    const createdTag = await prisma.tag.create({ data: tag })
    console.log(`Created tag: ${createdTag.slug}`)
  }
  for (let topic of topics) {
    topic.slug = slugify(topic.name, { lower: true, strict: true })
    topic.id = topic.slug
    const createdTopic = await prisma.topic.create({ data: topic })
    console.log(`Created topic: ${createdTopic.slug}`)
  }
  for (let post of posts) {
    post.slug = slugify(post.title, { lower: true, strict: true })
    post.author = { connect: { id: userIds[Math.floor(Math.random() * userIds.length)] } }
    post.published = true
    post.score = Math.floor(Math.random() * 150)
    const createdPost = await prisma.post.create({ data: post })
    console.log(`Created post: ${createdPost.slug}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
