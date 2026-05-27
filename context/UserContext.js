// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const TOKEN_KEY         = 'vaxflow_token';
const REFRESH_TOKEN_KEY = 'vaxflow_refresh_token';
const USER_KEY          = 'vaxflow_user';

export function UserProvider({ children }) {
  const [username,  setUsername]  = useState('');
  const [userId,    setUserId]    = useState(null);
  const [userRole,  setUserRole]  = useState(null);
  const [token,     setToken]     = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [darkMode,  setDarkMode]  = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [hydrated,  setHydrated]  = useState(false);

  // Restore session on app start
  useEffect(() => {
    (async () => {
      try {
        const storedToken        = await AsyncStorage.getItem(TOKEN_KEY);
        const storedRefreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
        const storedUser         = await AsyncStorage.getItem(USER_KEY);
        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser);
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
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

  const saveSession = async (tok, refTok, user) => {
    setToken(tok);
    setRefreshToken(refTok);
    setUsername(user.username);
    setUserId(user.id ?? null);
    setUserRole(user.role ?? null);
    await AsyncStorage.setItem(TOKEN_KEY, tok);
    if (refTok) await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refTok);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const updateTokens = async (tok, refTok) => {
    setToken(tok);
    if (refTok) setRefreshToken(refTok);
    await AsyncStorage.setItem(TOKEN_KEY, tok);
    if (refTok) await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refTok);
  };

  const clearSession = async () => {
    setToken(null);
    setRefreshToken(null);
    setUsername(null);
    setUserId(null);
    setUserRole(null);
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  };

  return (
    <UserContext.Provider value={{
      username, setUsername,
      userId,   setUserId,
      userRole, setUserRole,
      token,
      refreshToken,
      saveSession,
      updateTokens,
      clearSession,
      darkMode,  setDarkMode,
      avatarUri, setAvatarUri,
      hydrated,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}