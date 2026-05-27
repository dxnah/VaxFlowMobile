// utils/authFetch.ts
// Attaches Authorization: Bearer <token> when token is available
import { AppConfig } from './config';
import { useUser } from '../context/UserContext';

export function useAuthFetch() {
  const { token } = useUser();

  return async (path: string, options: RequestInit = {}): Promise<any> => {
    const url = path.startsWith('http') ? path : `${AppConfig.API_URL}${path}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    };

    const response = await fetch(url, { ...options, headers });

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