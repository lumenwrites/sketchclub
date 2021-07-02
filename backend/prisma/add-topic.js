const slugify = require('slugify')
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

async function addTopic() {
  const topic = {
    name: process.argv[2],
    slug: slugify(process.argv[2], { lower: true, strict: true })
  }
  const createTag = await prisma.tag.create({
    data: topic,
  })
  console.log(`Created topic: ${createTag.slug}`)
  //console.log(topic)
}

addTopic()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     username: 'username1',
//     email: 'username1@gmail.com',
//     password: 'password1',
//     posts: {
//       create: [
//         {
//           title: 'My First Post',
//           slug: "my-first-post",
//           body: 'Hello world! This is my first post!',
//           published: true
//         },
//         {
//           title: 'My Second Post',
//           slug: "my-second-post",
//           body: 'Huzzah! Ima postin!',
//           published: true
//         },
//       ],
//     },
//   },
// ]



// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
