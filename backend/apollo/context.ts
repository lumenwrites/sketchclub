import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// That's what allows you to access Prisma from inside of nexus
export interface Context {
  prisma: PrismaClient
  req: any // HTTP request
}

export function createContext(req: any) {
  return {
    ...req,
    prisma,
  }
}
