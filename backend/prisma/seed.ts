import 'dotenv/config';
import { prisma } from '../prisma/client';

async function main() {
  const myUser = await prisma.user.upsert({
    where: { email: 'me@example.com' },
    update: { name: 'Alicia' },
    create: { email: 'me@example.com', name: 'Alicia' },
  });

  await prisma.newsEmail.createMany({
    data: [
      {
        senderEmail: 'noreply@dailynews.com',
        subject: 'Your April Rundown',
        title: 'April Highlights',
        summary: 'A quick tour of what has happened in April.',
        receivedAt: new Date(),
        userId: myUser.id
      },
      {
        senderEmail: 'noreply@newsfeed.com',
        subject: 'Breaking: Power Outage',
        title: 'Spain and Portugal Lose Power For A Day',
        summary: 'Details on what happened yesterday in the Iberian Peninsula.',
        receivedAt: new Date(Date.now() - 3_600_000 * 5),
        userId: myUser.id
      }
    ]
  });

  console.log(`Database at ${process.env.DATABASE_URL} has been seeded.`);
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    prisma.$disconnect()
    process.exit(1)
  });
