import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.newsEmail.createMany({
    data: [
      {
        sender: 'noreply@dailynews.com',
        subject: 'Your April Rundown',
        title: 'April Highlights',
        summary: 'A quick tour of what has happened in April.',
        receivedAt: new Date()
      },
      {
        sender: 'noreply@newsfeed.com',
        subject: 'Breaking: Power Outage',
        title: 'Spain and Portugal Lose Power For A Day',
        summary: 'Details on what happened yesterday in the Iberian Peninsula.',
        receivedAt: new Date(Date.now() - 3_600_000 * 5)
      }
    ]
  })

  console.log(`Database at ${process.env.DATABASE_URL} has been seeded.`)
  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    prisma.$disconnect()
    process.exit(1)
  })
