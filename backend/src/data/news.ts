import { prisma, type NewsEmail } from '../../prisma/client';

export async function getAllNews(): Promise<NewsEmail[]> {
  return prisma.newsEmail.findMany({ orderBy: { receivedAt: 'desc' }});
};

export async function getTodaysNews(): Promise<NewsEmail[]> {
  const start = new Date(new Date().setHours(0, 0, 0, 0));
  const end = new Date(new Date(start).setHours(23, 59, 59, 999));

  return prisma.newsEmail.findMany({
    where: { receivedAt: { gte: start, lt: end } },
    orderBy: { receivedAt: 'desc' }
  });
};

export async function getNewsById(id: number): Promise<NewsEmail | null> {
  return prisma.newsEmail.findUnique({ where: { id }});
};

export async function deleteNews(id: number): Promise<NewsEmail> {
  return prisma.newsEmail.delete({ where: { id }});
};
