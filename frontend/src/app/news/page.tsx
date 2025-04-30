import Link from 'next/link';

type News = {
  id: number;
  sender: string;
  subject: string;
  title: string;
  summary: string;
  receivedAt: string;
};

export default async function NewsListPage() {
  const res = await fetch(
    'http://localhost:3001/news', { next: { revalidate: 0 } }
  );

  const { data: news }: { data: News[] } = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>All News</h1>

      {news.length === 0 ? (
        <p>No news yet.</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {news.map((news) => (
            <li key={news.id} style={{ margin: '1em 0' }}>
              <Link href={`/news/${news.id}`}>
                <strong>{news.title}</strong>
              </Link>
              <div>{news.summary}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
