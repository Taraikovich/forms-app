import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import DashboardTabs from '../../components/dashboardTabs';

export default async function Dashboard() {
  const session = await getSession();

  if (!session || !session.user) redirect('/auth/signin');

  return <DashboardTabs />;
}
