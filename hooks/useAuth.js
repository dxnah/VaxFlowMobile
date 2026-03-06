import { useRouter } from "expo-router";
import { useState } from "react";
import { users } from "../data/mockData";

export default function useAuth() {
  const router = useRouter();
  const [error, setError] = useState("");

  const login = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (found) {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  const logout = () => {
    router.push('/login');
  };

  return { login, logout, error };
}
