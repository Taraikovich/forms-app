import { getSession } from '@/lib/session';

export default async function Home() {
  const session = await getSession();

  console.log(session);

  return (
    <main>
      <h1>Home page</h1>
    </main>
  );
}
