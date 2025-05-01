import { prisma } from '../../prisma/client';
import type { NewsEmailInput } from '../schemas/newsEmailSchema';

export async function saveNewsEmail(data: NewsEmailInput) {
  return prisma.newsEmail.create({ data });
}
