import { config } from 'dotenv';
import path from 'path';

// Load test environment
config({ path: path.resolve(__dirname, '../.env.test') });

console.log(`[Test Setup] Correctly testing against ${process.env.DATABASE_URL}.`);
