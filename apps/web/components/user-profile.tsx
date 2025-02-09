'use client';

import { BACKEND_URL } from '@/lib/constants';
import useAuthFetch from '@/lib/useAuthFetch';

export default function UserProfile() {
  const { data, loading, error } = useAuthFetch(
    `${BACKEND_URL}/auth/protected/`
  );

  return <>{loading ? <h1>Looding</h1> : <h1>{JSON.stringify(data)}</h1>}</>;
}
