import { Hono } from 'hono';
import {
  getAllNews,
  getTodaysNews,
  getNewsById,
  deleteNews
} from './fetchNews';

export const newsRoutes = new Hono();

// newRoutes.get(getNewsRoute, getNewsHandler)
// newRoutes.get(getTodaysNewsRoute, getTodaysNewsHandler)
// newRoutes.get(getNewsByIdRoute, getNewsByIdHandler)
// newRoutes.get(updateUserRoute, updateUserRouteHandler)

newsRoutes.get('/', async (c) => {
  const allNews = await getAllNews();
  return c.json({ ok: true, data: allNews });
});

newsRoutes.get('/today', async (c) => {
  const todayNews = await getTodaysNews();
  return c.json({ ok: true, data: todayNews });
});

newsRoutes.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) return c.json({ ok: false, error: 'Invalid News ID' }, 404);

  const newsPiece = await getNewsById(id);
  if (!newsPiece) return c.json({ ok: false, error: 'Not Found' }, 404);

  return c.json({ ok: true, data: newsPiece });
});

newsRoutes.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    if (isNaN(id)) return c.json({ ok: false, error: 'Invalid News ID' }, 404);

  try {
    const toDelete = await deleteNews(id);

    return c.json({ ok: true, data: toDelete });
  } catch(e: any) {
    if (e.code == 'P2025') {
      return c.json({ ok: false, error: 'Not Found' }, 404);
    } else {
      throw e;
    }
  }
});
