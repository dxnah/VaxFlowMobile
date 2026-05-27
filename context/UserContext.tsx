// context/UserContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  username:     string;
  setUsername:  (v: string) => void;
  userId:       number | null;
  setUserId:    (v: number | null) => void;
  userRole:     string | null;
  setUserRole:  (v: string | null) => void;
  token:        string | null;
  darkMode:     boolean;
  setDarkMode:  (v: boolean) => void;
  avatarUri:    string | null;
  setAvatarUri: (v: string | null) => void;
  hydrated:     boolean;
  saveSession:  (tok: string | null, user: any) => Promise<void>;
  clearSession: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

const TOKEN_KEY = 'vaxflow_token';
const USER_KEY  = 'vaxflow_user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username,  setUsername]  = useState('');
  const [userId,    setUserId]    = useState<number | null>(null);
  const [userRole,  setUserRole]  = useState<string | null>(null);
  const [token,     setToken]     = useState<string | null>(null);
  const [darkMode,  setDarkMode]  = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [hydrated,  setHydrated]  = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUsername(user.username ?? '');
          setUserId(user.id ?? null);
          setUserRole(user.role ?? null);
        }
        if (storedToken) setToken(storedToken);
      } catch (_) {
        // ignore restore errors
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const saveSession = async (tok: string | null, user: any) => {
    setUsername(user.username ?? '');
    setUserId(user.id ?? null);
    setUserRole(user.role ?? null);
    setToken(tok ?? null);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    if (tok) await AsyncStorage.setItem(TOKEN_KEY, tok);
    else      await AsyncStorage.removeItem(TOKEN_KEY);
  };

  const clearSession = async () => {
    setUsername('');
    setUserId(null);
    setUserRole(null);
    setToken(null);
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
  };

  return (
    <UserContext.Provider value={{
      username,  setUsername,
      userId,    setUserId,
      userRole,  setUserRole,
      token,
      saveSession,
      clearSession,
      darkMode,  setDarkMode,
      avatarUri, setAvatarUri,
      hydrated,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}