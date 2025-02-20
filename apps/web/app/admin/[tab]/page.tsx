'use client';

import UserList from '@/components/admin/user-list';
import { useParams, useRouter } from 'next/navigation';
import { Tab, Tabs } from 'react-bootstrap';

export default function TabPage() {
  const params = useParams<{ tab: string }>();
  const router = useRouter();

  return (
    <main>
      <Tabs
        defaultActiveKey={params.tab || 'users'}
        className="mb-3"
        onSelect={(key) => key && router.push(`/admin/${key}`)}
      >
        <Tab eventKey="users" title="Users">
          <UserList />
        </Tab>
        <Tab eventKey="templates" title="Templates">
          Tab content for Profile
        </Tab>
      </Tabs>
    </main>
  );
}
