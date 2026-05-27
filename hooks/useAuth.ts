import { useRouter } from 'expo-router';
import { useState } from 'react';
import { AppConfig } from '../utils/config';
import { useUser } from '../context/UserContext';

export default function useAuth() {
  const router = useRouter();
  const { saveSession, clearSession } = useUser();
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${AppConfig.API_URL}/login/`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const user  = data.user ?? data;
        const token = data.token ?? null;        // save token if present
        await saveSession(token, user);
        router.replace('/dashboard');
      } else {
        setError(data.detail || data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('Cannot connect to server. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearSession();
    try {
      router.replace('/login');
    } catch (_) {
      // auth guard in _layout.tsx handles redirect if router isn't ready
    }
  };

  return { login, logout, error, loading };
}