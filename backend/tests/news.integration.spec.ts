import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '../generated/prisma';
import { app } from '../src/app';

const testPrisma = new PrismaClient();

describe('News Email API', {}, () => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let todayNewsId: number;
  let yesterdayNewsId: number;

  beforeAll(async () => {
    const yesterdayNews = await testPrisma.newsEmail.create({
      data: {
        sender: 'test@example.com',
        subject: 'Test Subject',
        title: 'Test Title',
        summary: 'Test Summary',
        receivedAt: yesterday
      },
    });

    yesterdayNewsId = yesterdayNews.id;

    const todayNews = await testPrisma.newsEmail.create({
      data: {
        sender: 'test@example.com',
        subject: 'Today Test Subject',
        title: 'Today Test Title',
        summary: 'Today Test Summary',
        receivedAt: today
      },
    });

    todayNewsId = todayNews.id;
  });

  afterAll(async () => {
    await testPrisma.newsEmail.deleteMany();
    await testPrisma.$disconnect();
  });

  test('GET api/news/today should return all news in array', async () => {
    const res = await app.request('/api/news');
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(2);
  });

  test('GET api/news/today should return today\'s news in array', async () => {
    const res = await app.request('api/news/today');
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(1);
    expect(body.data[0].title).toBe('Today Test Title');
    expect(body.data[0].receivedAt).toBe(today.toISOString());
  });

  test('GET api/news/:id should return one item', async () => {
    const res = await app.request(`api/news/${todayNewsId}`, { method: 'GET' });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data).toHaveProperty('id', todayNewsId);
  });

  test('GET api/news/invalid-type should return 404', async () => {
    const res = await app.request('api/news/invalid');
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  test('GET /api/news/999 should return 404', async () => {
    const res = await app.request('/api/news/999');
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  test('DELETE api/news/:id should remove and return deleted item', async () => {
    const deleteMe = await testPrisma.newsEmail.create({
      data: {
        sender: 'test@example.com',
        subject: 'To Delete',
        title: 'Delete Me',
        summary: 'I Will Be Gone',
        receivedAt: new Date()
      },
    });

    const res = await app.request(`api/news/${deleteMe.id}`, { method: 'DELETE' });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data).toHaveProperty('id', deleteMe.id);

    const deletedItem = await testPrisma.newsEmail.findUnique({ where: { id: deleteMe.id } });
    expect(deletedItem).toBeNull();
  });

  test('DELETE api/news/invalid-type should return 404', async () => {
    const res = await app.request('api/news/invalid', { method: 'DELETE' });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  test('DELETE /api/news/999 should return 404 if record not found', async () => {
    const res = await app.request('/api/news/999', { method: 'DELETE' });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });
});
