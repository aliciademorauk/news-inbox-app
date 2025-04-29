import { Hono } from 'hono';
import { logger } from 'hono/logger';
// import { cors } from 'hono/cors';
import { newsRoutes } from './routes/news';

export const app = new Hono();

app.use('*', logger());
// app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Newsletter')
});

app.route('/api', newsRoutes);
