import type { Context } from 'hono';
import {
  getAllNews,
  getTodaysNews,
  getNewsById,
  deleteNews,
} from '../data/news';

export const getNewsHandler = async (c: Context) => {
  const allNews = await getAllNews();
  return c.json({ ok: true, data: allNews });
};

export const getTodaysNewsHandler = async (c: Context) => {
  const todaysNews = await getTodaysNews();
  return c.json({ ok: true, data: todaysNews });
};

export const getNewsByIdHandler = async (c: Context) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) return c.json({ ok: false, error: 'Invalid ID' }, 400);

  const newsPiece = await getNewsById(id);
  if (!newsPiece) {
    return c.json({ ok: false, error: 'Not Found' }, 404);
  }
  return c.json({ ok: true, data: newsPiece });
};

export const deleteNewsHandler = async (c: Context) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) return c.json({ ok: false, error: 'Invalid ID' }, 400);

  try {
    const toDelete = await deleteNews(id);
    return c.json({ ok: true, data: toDelete });
  } catch (e: any) {
    if (e.code == 'P2025') {
      return c.json({ ok: false, error: 'Not Found' }, 404);
    }

    throw e;
  }
};
