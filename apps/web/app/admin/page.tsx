'use client';

import AdminNavBar from '@/components/admin/adminNav';
import UserList from '@/components/admin/user-list';
import { Suspense } from 'react';

export default function AdminPage() {
  return (
    <main>
      <Suspense>
        <UserList />
      </Suspense>
    </main>
  );
}
