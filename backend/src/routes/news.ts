import { Hono } from 'hono';
import {
  getNewsRoute,
  getNewsHandler,
  getTodaysNewsRoute,
  getTodaysNewsHandler,
  getNewsByIdRoute,
  getNewsByIdHandler,
  deleteNewsRoute,
  deleteNewsHandler,
} from '../controllers/news';

export const newsRoutes = new Hono();

newsRoutes.get(getNewsRoute, getNewsHandler);
newsRoutes.get(getTodaysNewsRoute, getTodaysNewsHandler);
newsRoutes.get(getNewsByIdRoute, getNewsByIdHandler);
newsRoutes.get(deleteNewsRoute, deleteNewsHandler);
