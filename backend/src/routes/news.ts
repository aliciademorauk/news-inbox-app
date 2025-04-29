import { PrismaClient } from '../../generated/prisma'
import { Hono } from 'hono';

const prisma = new PrismaClient();
export const newsRoutes = new Hono();

newsRoutes.get('/news', async (c) => {
  const allNews = await prisma.newsEmail.findMany({
    orderBy: { receivedAt: 'desc' }
  })

  return c.json( { ok: true, data: allNews })
})


newsRoutes.get('/todays-news', async (c) => {
  const start = new Date(new Date().setHours(0, 0, 0, 0))
  const end = new Date(new Date(start).setHours(23,59,59,999))

  const todaysNews = await prisma.newsEmail.findMany({
    where: { receivedAt: { gte: start, lt: end } },
    orderBy: { receivedAt: 'desc' },
  })

  return c.json( { ok: true, data: todaysNews })
})

newsRoutes.get('/news/:id', async (c) => {
  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({ ok: false, error: 'Invalid ID' }, 400)
  }

  const newsPiece = await prisma.newsEmail.findUnique({ where: { id } })

  if (!newsPiece) {
    return c.json( { ok: false, error: 'Not Found' }, 404 )
  } else {
    return c.json( { ok: true, data: newsPiece } )
  }
})
