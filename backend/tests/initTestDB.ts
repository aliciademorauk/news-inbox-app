import { execSync } from 'child_process';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test') });

try {
  execSync('npx prisma db push', { stdio: 'inherit'});

  console.log(`Prisma schema synced to test DB at ${process.env.DATABASE_URL}.`);
} catch (err) {
  console.error('Failed to push Prisma schema to test DB:', err);
  process.exit(1);
}
