import { env } from '@core/env';
import { useSession } from '@core/auth/session.store';
import { currentLang } from '@core/i18n/i18n';
import type { RefreshResponse } from '@core/auth/auth.models';
import { offlineError, toApiError } from './api-error';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const REFRESH_PATH = '/auth/refresh';

/** Bir vaqtda kelgan 401 lar uchun bitta refresh so'rovi */
let refreshing: Promise<string | null> | null = null;

async function send(method: Method, path: string, body: unknown, token: string | null): Promise<Response> {
  try {
    return await fetch(env.apiUrl + path, {
      method,
      headers: {
        Accept: 'application/json',
        'Accept-Language': currentLang(),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw offlineError(currentLang());
  }
}

function refresh(): Promise<string | null> {
  refreshing ??= doRefresh().finally(() => (refreshing = null));
  return refreshing;
}

async function doRefresh(): Promise<string | null> {
  const { refreshToken, setTokens, clear } = useSession.getState();
  if (!refreshToken) {
    clear();
    return null;
  }
  const res = await send('POST', REFRESH_PATH, { refresh_token: refreshToken }, null).catch(() => null);
  if (!res?.ok) {
    clear();
    return null;
  }
  const data = (await res.json()) as RefreshResponse;
  setTokens(data.access_token, data.refresh_token);
  return data.access_token;
}

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  let res = await send(method, path, body, useSession.getState().token);

  if (res.status === 401 && useSession.getState().token && path !== REFRESH_PATH) {
    const token = await refresh();
    if (token) res = await send(method, path, body, token);
  }

  if (!res.ok) throw await toApiError(res, currentLang());
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

/** API'ga barcha so'rovlar shu orqali: token, til, refresh va xatolar bir joyda */
export const http = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
