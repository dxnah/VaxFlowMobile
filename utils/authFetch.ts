import { useUser } from '../context/UserContext';
import BASE_URL from './api';

export function useAuthFetch() {
  const { token, refreshToken, updateTokens, clearSession } = useUser();

  return async (path: string, options: RequestInit = {}): Promise<any> => {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

    const buildHeaders = (tok: string | null): Record<string, string> => ({
      'Content-Type': 'application/json',
      ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    });

    // First attempt
    let response = await fetch(url, { ...options, headers: buildHeaders(token) });

    // If access token expired, try to refresh once
    if (response.status === 401 && refreshToken) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshRes.ok) {
          const { token: newToken, refresh_token: newRefresh } = await refreshRes.json();
          await updateTokens(newToken, newRefresh);
          // Retry original request with new access token
          response = await fetch(url, { ...options, headers: buildHeaders(newToken) });
        } else {
          // Refresh token itself is expired — force logout
          await clearSession();
          throw new Error('Session expired. Please log in again.');
        }
      } catch (err: any) {
        if (err.message === 'Session expired. Please log in again.') throw err;
        // Network error during refresh — pass through to the original 401
      }
    }

    if (!response.ok) {
      let msg = `HTTP ${response.status}`;
      try {
        const body = await response.json();
        msg = body.detail || body.error || msg;
      } catch (_) {}
      throw new Error(msg);
    }

    return response.json();
  };
}