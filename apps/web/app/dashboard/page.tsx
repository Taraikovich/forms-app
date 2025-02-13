import { getSession } from '@/lib/session';
import { Role } from '@/lib/type';
import { redirect } from 'next/navigation';
import PageTabs from './page.tabs';

export default async function Dashboard() {
  const session = await getSession();
  // console.log(session);

  if (!session || !session.user) redirect('/auth/signin');
  if (session.user.role !== Role.ADMIN) redirect('/auth/signin');
  return <PageTabs />;
}
