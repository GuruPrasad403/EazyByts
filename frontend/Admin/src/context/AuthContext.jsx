import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const login = (email) => {
    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
