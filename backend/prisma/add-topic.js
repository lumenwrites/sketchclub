const slugify = require('slugify')
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

function addTopic() {
  const topic = {
    name: process.argv[2],
    slug: slugify(process.argv[2], { lower: true, strict: true }),
  }
  const createTopic = prisma.topic.create({
    data: topic,
  })
  console.log(`Created topic: ${topic.name}`)
  //console.log(topic)
}

addTopic()
