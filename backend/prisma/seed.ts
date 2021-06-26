import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


const userData: Prisma.UserCreateInput[] = [
  {
    username: 'username1',
    email: 'username1@gmail.com',
    password: 'password1',
    posts: {
      create: [
        {
          title: 'My First Post',
          slug: "my-first-post",
          body: 'Hello world! This is my first post!',
          published: true
        },
        {
          title: 'My Second Post',
          slug: "my-second-post",
          body: 'Huzzah! Ima postin!',
          published: true
        },
      ],
    },
  },
]

async function main() {
  console.log(`Seeding the db...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
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
