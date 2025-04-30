import { prisma, type NewsEmail } from '../../prisma/client';
import { Context } from 'hono';

export const newsController = {
  getAllNews: async (c: Context) => {
    try {
      const allNews: NewsEmail[] = await prisma.newsEmail.findMany({
        orderBy: { receivedAt: 'desc' },
      });

      return c.json({ ok: true, data: allNews });
    } catch (e: any) {
      return c.json({ ok: false, error: e.message }, 500);
    }
  },

  getTodaysNews: async (c: Context) => {
    try {
      const start = new Date(new Date().setHours(0, 0, 0, 0));
      const end = new Date(new Date(start).setHours(23, 59, 59, 999));

      const todaysNews: NewsEmail[] = await prisma.newsEmail.findMany({
        where: { receivedAt: { gte: start, lt: end } },
        orderBy: { receivedAt: 'desc' },
      });

      return c.json({ ok: true, data: todaysNews });
    } catch(e: any) {
      return c.json({ ok: false, error: e.message }, 500);
    }
  },

  getNewsById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ ok: false, error: 'Invalid ID' }, 404);
      }

      const newsPiece: NewsEmail | null = await prisma.newsEmail.findUnique({
        where: { id }
      });

      if (!newsPiece) {
        return c.json({ ok: false, error: 'Not Found' }, 404);
      }

      return c.json({ ok: true, data: newsPiece });
    } catch (e: any) {
      return c.json({ ok: false, error: e.message }, 500);
    }
  },

  deleteNews: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ ok: false, error: 'Invalid ID' }, 404);
      }

      const deletedNews: NewsEmail | null = await prisma.newsEmail.delete({
        where: { id },
      });

      return c.json({ ok: true, data: deletedNews });
    } catch (e: any) {
      if (e.code === 'P2025') {
        return c.json({ ok: false, error: 'Not Found' }, 404);
      }
      return c.json({ ok: false, error: e.message }, 500);
    }
  },
};
