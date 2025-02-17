'use client';

import useAuthApiFetch from '@/lib/authApiFetch';
import { BACKEND_URL } from '@/lib/constants';
import { useEffect } from 'react';

export default function UserProfile() {
  const { data, loading, setConfig } = useAuthApiFetch();

  useEffect(() => {
    setConfig({ url: `${BACKEND_URL}/auth/protected/` });
  }, []);

  return <>{loading ? <h1>Loading</h1> : <h1>{JSON.stringify(data)}</h1>}</>;
}
