import { execSync } from 'child_process';
import { config } from 'dotenv';
import path from 'path';
import { PrismaClient } from '../generated/prisma';

config({ path: path.resolve(__dirname, '../.env.test') });

const testPrisma = new PrismaClient();

async function syncPrismaSchema() {
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log(`Prisma schema synced to test DB at ${process.env.DATABASE_URL}`);
  } catch (err) {
    console.error('Failed to push Prisma schema to test DB:', err);
    process.exit(1);
  }
}

async function clearTestData() {
  try {
    await testPrisma.newsEmail.deleteMany();
    await testPrisma.allowedSender.deleteMany();
    await testPrisma.user.deleteMany();
    console.log('Test DB cleared');
  } catch (err) {
    console.error('Failed to clear test DB:', err);
    process.exit(1);
  } finally {
    await testPrisma.$disconnect();
  }
}

async function main() {
  await syncPrismaSchema();
  await clearTestData();
}

main();
