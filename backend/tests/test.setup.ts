import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test') });

console.log(`Correctly testing against ${process.env.DATABASE_URL}.`);
