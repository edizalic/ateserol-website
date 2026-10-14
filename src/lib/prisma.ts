import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createPrismaClient> }

// A long-running dev server keeps this client on globalThis. After `prisma generate`
// that instance can be missing new models, so replace it when the shape is stale.
const cached = globalForPrisma.prisma
const prisma = cached && typeof cached.category?.findUnique === 'function'
  ? cached
  : createPrismaClient()

if (cached && cached !== prisma) {
  void cached.$disconnect().catch(() => {})
}

// Cache the client globally in all environments (not just dev) to avoid
// exhausting the connection pool when many server-side requests run in parallel.
globalForPrisma.prisma = prisma

export { prisma }
export default prisma
