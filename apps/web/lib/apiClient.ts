import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession, updateTokens, deleteSession } from './session';
import { BACKEND_URL } from './constants';
import { jwtDecode } from 'jwt-decode';

class ApiClient {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async refreshToken(refreshToken: string) {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/refresh`, {
        refresh: refreshToken,
      });
      return response.data;
    } catch {
      deleteSession();
      throw new Error('Token refresh failed');
    }
  }

  private async request(method: string, url: string, data?: any) {
    const session = await getSession();
    if (!session || !session.accessToken || !session.refreshToken) {
      deleteSession();
      throw new Error('No valid session');
    }

    let accessToken = session.accessToken;
    const isValidToken =
      jwtDecode<{ exp: number }>(accessToken).exp > Date.now() / 1000;

    if (!isValidToken) {
      const tokens = await this.refreshToken(session.refreshToken);
      accessToken = tokens.accessToken;
      await updateTokens(tokens);
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      headers: { Authorization: `Bearer ${accessToken}` },
      data,
    };

    const response = await this.axiosInstance(config);
    return response.data;
  }

  public get(url: string) {
    return this.request('GET', url);
  }

  public post(url: string, data: any) {
    return this.request('POST', url, data);
  }

  public put(url: string, data: any) {
    return this.request('PUT', url, data);
  }

  public delete(url: string, data: any) {
    return this.request('DELETE', url, data);
  }
}

export default new ApiClient();
