'use client';

import { useEffect, useState, useCallback } from 'react';
import { deleteSession, getSession, updateTokens } from './session';
import { BACKEND_URL } from './constants';

export default function useAuthFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string) => {
    try {
      const session = await getSession();

      if (!session) {
        await deleteSession();
        return;
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setData(data);
      } else {
        const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: session.refreshToken }),
        });

        if (!refreshRes.ok || refreshRes.status === 401) {
          deleteSession();
          setError('Session expired');
          return;
        }

        const { accessToken, refreshToken } = await refreshRes.json();
        await updateTokens({ accessToken, refreshToken });

        await fetchData(url);
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [url, fetchData]);

  return { data, loading, error };
}
