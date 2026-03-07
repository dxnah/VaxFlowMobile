// context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState('patient1');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <UserContext.Provider value={{ username, setUsername, darkMode, setDarkMode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}