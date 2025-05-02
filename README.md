# 🗞️ news-inbox-app

A full-stack TypeScript web app. Built with:

- ⚡ [Hono](https://hono.dev) — ultra-fast, lightweight web framework
- ✅ [Zod](https://zod.dev) — schema-based validation for inputs
- 📦 [Prisma](https://www.prisma.io) — type-safe ORM for database access
- ⚛️ [Next.js](https://nextjs.org) — frontend framework for server-rendered React apps

---

## 🚀 Getting Started

(Scripts at root of repo to be created)

### 1. Clone the repo

```bash
git clone https://github.com/aliciademorauk/news-inbox-app.git
cd news-inbox-app
```

### 2. Install dependencies

```bash
cd backend
npm install

cd frontend
npm install
```

### 3. Set up environment variables
```bash
# backend/.env
DATABASE_URL="file:./prisma/dev.db"

# backend/.env.test
DATABASE_URL="file:./prisma/test.db"
```

### 4. Push Prisma schema and generate client
```bash
cd backend
npx prisma db push
npx prisma generate
```

### 5. Seed the database (for now)

```bash
cd backend
npm run seed
```
### 6. Run the app
```bash
cd backend
npm run dev

cd frontend
npm run dev
```

