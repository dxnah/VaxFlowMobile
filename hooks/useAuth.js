import { useRouter } from "expo-router";
import { useState } from "react";
import BASE_URL from "../utils/api";
import { useUser } from "../context/UserContext";

export default function useAuth() {
  const router = useRouter();
  const { saveSession, clearSession } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        await saveSession(data.token, data.refresh_token ?? null, data.user);
        // _layout.tsx auth guard detects token and redirects to /dashboard
        router.replace("/dashboard");
      } else {
        setError(data.detail || data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Cannot connect to server. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearSession();
    // _layout.tsx auth guard detects token=null and redirects to /login automatically
    // But we also navigate explicitly as a fallback
    try {
      router.replace("/login");
    } catch (_) {
      // ignore if navigation isn't ready — auth guard will handle it
    }
  };

  return { login, logout, error, loading };
}