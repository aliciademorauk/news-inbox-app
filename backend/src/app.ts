import { Hono } from 'hono';
import { logger } from 'hono/logger';
// import { cors } from 'hono/cors';
import { newsRoutes } from './controllers/news/routes';

export const app = new Hono();

app.use('*', logger());
// app.use('*', cors());

app.get('/', (c) => {
  return c.text('Wooo Health Check!')
});

app.onError((error, c) => {
  console.error('Unhandled error:', error);
  return c.json(
    { ok: false, error: error.message || 'Internal Server Error' }, 500
  )
})

app.route('/api/news', newsRoutes);
