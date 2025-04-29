import { prisma, type NewsEmail } from '../../prisma/client';
import { Context } from 'hono';

export const newsController = {
  getAllNews: async (c: Context) => {
    const allNews: NewsEmail[] = await prisma.newsEmail.findMany({
      orderBy: { receivedAt: 'desc' }
    });

    return c.json( { ok: true, data: allNews });
  },

  getTodaysNews: async (c: Context) => {
    const start = new Date(new Date().setHours(0, 0, 0, 0))
    const end = new Date(new Date(start).setHours(23,59,59,999))

    const todaysNews: NewsEmail[] = await prisma.newsEmail.findMany({
      where: { receivedAt: { gte: start, lt: end } },
      orderBy: { receivedAt: 'desc' },
    });

    return c.json({ ok: true, data: todaysNews });
  },

  getNewsById: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const newsPiece: NewsEmail | null = await prisma.newsEmail.findUnique(
      {where: { id }}
    )

    try {
      return c.json( { ok: true, data: newsPiece } );

    } catch (e: any) {
      if (e.message.includes('RecordNotFound')) {
        return c.json({ ok: false, error: 'Not Found' }, 404);
      }
      return c.json({ ok: false, error: 'Deletion failed' }, 500);
    }
  },

  deleteNews: async (c: Context) => {
    const id = Number(c.req.param('id'));

    try {
      const deletedNews: NewsEmail | null = await prisma.newsEmail.delete(
        {where: { id }}
      );
      return c.json({ ok: true, data: deletedNews });

    } catch (e: any) {
      if (e.message.includes('RecordNotFound')) {
        return c.json({ ok: false, error: 'Not Found' }, 404);
      }
      return c.json({ ok: false, error: 'Deletion failed' }, 500);
    }
  }
};
