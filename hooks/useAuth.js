import { useRouter } from "expo-router";
import { useState } from "react";

const API_URL = 'http://192.168.1.245:8000/api'; 

export default function useAuth() {
  const router = useRouter();
  const [error, setError] = useState("");

  const login = async (username, password) => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setError('');
        router.push('/dashboard');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    }
  };

  const logout = () => {
    router.push('/login');
  };

  return { login, logout, error };
}