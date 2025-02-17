import { useEffect, useState } from 'react';
import { deleteSession, getSession, updateTokens } from './session';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BACKEND_URL } from './constants';

type RequestConfig = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

export default function useAuthApiFetch() {
  const [config, setConfig] = useState<RequestConfig | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getData() {
      if (!config) return;

      const { url, method = 'GET', body } = config;

      try {
        setLoading(true);
        const session = await getSession();

        if (!session) {
          deleteSession();
          return;
        }

        let accessToken = session.accessToken;
        let refreshToken = session.refreshToken;

        if (!accessToken || !refreshToken) {
          deleteSession();
          return;
        }

        const DATE_NOW_MS = Date.now() / 1000;
        const isValidToken =
          jwtDecode<{ exp?: number }>(accessToken).exp! > DATE_NOW_MS;

        if (!isValidToken) {
          const res = await axios.post(`${BACKEND_URL}/auth/refresh`, {
            refresh: session.refreshToken,
          });

          accessToken = res.data.accessToken;
          refreshToken = res.data.refreshToken;
          await updateTokens({ accessToken, refreshToken });
        }

        const config = {
          method,
          url,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: body,
        };

        const res = await axios(config);

        setData(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || error.message);
        } else {
          setError(error as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [config]);

  return { error, data, loading, setConfig };
}
