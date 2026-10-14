import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? 'ateserol@vitriolacademy.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Ates1988@'

  const existing = await prisma.adminUser.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash: await hash(adminPassword, 12),
      },
    })
    console.log(`Created admin user: ${adminEmail}`)
  } else {
    console.log(`Admin user already exists: ${adminEmail}`)
  }

  // Seed a sample course category
  const category = await prisma.category.upsert({
    where: { slug: 'business-strategy' },
    update: {},
    create: {
      slug: 'business-strategy',
      name: { en: 'Business Strategy', tr: 'İş Stratejisi', fr: 'Stratégie d’entreprise' },
    },
  })
  console.log(`Course category: ${category.slug}`)

  console.log('Seeding complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
