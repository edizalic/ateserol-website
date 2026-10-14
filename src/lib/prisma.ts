import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof createPrismaClient> }

const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Cache the client globally in all environments (not just dev) to avoid
// exhausting the connection pool when many server-side requests run in parallel.
globalForPrisma.prisma = prisma

export { prisma }
export default prisma
