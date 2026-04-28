import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize from localStorage if available (simulated persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('lumiStore_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const login = (email, password) => {
    // Simulated login logic
    const mockUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0], // derived mock name
      email,
    };
    setUser(mockUser);
    localStorage.setItem('lumiStore_user', JSON.stringify(mockUser));
    return true;
  };

  const register = (name, email, password) => {
    // Simulated registration logic
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
    };
    setUser(newUser);
    localStorage.setItem('lumiStore_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumiStore_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
