// context/UserContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const USER_KEY = "vaxflow_user";

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore session on app start
  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUsername(user.username);
          setUserId(user.id);
          setUserRole(user.role);
        }
      } catch (_) {
        // ignore restore errors
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const saveSession = async (user) => {
    setUsername(user.username);
    setUserId(user.id ?? null);
    setUserRole(user.role ?? null);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const clearSession = async () => {
    setUsername(null);
    setUserId(null);
    setUserRole(null);
    await AsyncStorage.removeItem(USER_KEY);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        userRole,
        setUserRole,
        saveSession,
        clearSession,
        darkMode,
        setDarkMode,
        avatarUri,
        setAvatarUri,
        hydrated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
