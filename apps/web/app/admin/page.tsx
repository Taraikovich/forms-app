'use client';

import UserList from '@/components/admin/user-list';
import { useRouter } from 'next/navigation';
import { Tab, Tabs } from 'react-bootstrap';

export default function AdminPage() {
  const router = useRouter();

  return (
    <main>
      <Tabs
        defaultActiveKey="users"
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
