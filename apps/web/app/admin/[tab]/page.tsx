'use client';

import TemplateList from '@/components/admin/template-list';
import UserList from '@/components/admin/user-list';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

export default function TabPage() {
  const params = useParams<{ tab: string }>();

  return (
    <main>
      {params.tab === 'users' && (
        <Suspense>
          <UserList />
        </Suspense>
      )}
      {params.tab === 'templates' && (
        <Suspense>
          <TemplateList />
        </Suspense>
      )}
    </main>
  );
}
