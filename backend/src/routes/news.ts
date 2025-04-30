import { Hono } from 'hono';
import { newsController } from '../controllers/news';

export const newsRoutes = new Hono();

newsRoutes.get('/', newsController.getAllNews);
newsRoutes.get('/today', newsController.getTodaysNews);
newsRoutes.get('/:id', newsController.getNewsById);
newsRoutes.delete('/:id', newsController.deleteNews);
