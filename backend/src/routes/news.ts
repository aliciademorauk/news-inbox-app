import { Hono } from 'hono';
import {
  getAllNews,
  getTodaysNews,
  getNewsById,
  deleteNews
} from '../services/news';

export const news = new Hono();

news.get('/', async (c) => {
  try {
    const allNews = await getAllNews();
    return c.json({ ok: true, data: allNews });
  } catch(e: any) {
    return c.json({ ok: false, error: e.message }, 500);
  }
});

news.get('/today', async (c) => {
  try {
    const todayNews = await getTodaysNews();
    return c.json({ ok: true, data: todayNews });
  } catch(e: any) {
    return c.json({ ok: false, error: e.message }, 500);
  }
});

news.get('/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'));
    if (isNaN(id)) return c.json({ ok: false, error: 'Invalid News ID' }, 404);

    const newsPiece = await getNewsById(id);
    if (!newsPiece) return c.json({ ok: false, error: 'Not Found' }, 404);

    return c.json({ ok: true, data: newsPiece });
  } catch(e: any) {
    return c.json({ ok: false, error: e.message }, 500);
  }
});

news.delete('/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'));
    if (isNaN(id)) return c.json({ ok: false, error: 'Invalid News ID' }, 404);

    const toDelete = await deleteNews(id);

    return c.json({ ok: true, data: toDelete });
  } catch(e: any) {
    if (e.code == 'P2025') {
      return c.json({ ok: false, error: 'Not Found' }, 404);
    } else {
      return c.json({ ok: false, error: e.message }, 500);
    }
  }
});
