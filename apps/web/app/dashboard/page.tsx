import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import UserTemplates from '@/components/template/userTemplate';
import DashboardNav from '@/components/dashboard-nav';

export default async function Dashboard() {
  const session = await getSession();

  if (!session || !session.user) redirect('/auth/signin');

  return (
    <main>
      <DashboardNav />
      <UserTemplates />
    </main>
  );
}
