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
        await saveSession(data.token, data.user);
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
    router.replace("/login");
  };

  return { login, logout, error, loading };
}