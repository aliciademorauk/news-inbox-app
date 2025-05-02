import { PrismaClient } from '../../generated/prisma';

export const testPrisma = new PrismaClient();
export type { User } from '../../generated/prisma';
