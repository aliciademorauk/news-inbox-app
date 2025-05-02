import { Hono } from 'hono';
import {
  getNewsHandler,
  getTodaysNewsHandler,
  getNewsByIdHandler,
  deleteNewsHandler
} from '../controllers/news';

export const newsRoutes = new Hono();

newsRoutes.get('/', getNewsHandler);
newsRoutes.get('/today', getTodaysNewsHandler);
newsRoutes.get('/:id', getNewsByIdHandler);
newsRoutes.delete('/:id', deleteNewsHandler);
