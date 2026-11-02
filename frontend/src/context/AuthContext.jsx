import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hc_auth_user');
      return stored ? JSON.parse(stored) : mockUsers[0]; // Defaults to Patient Eleanor Vance for instant preview
    } catch {
      return mockUsers[0];
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('hc_auth_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Quick switch role helper for demonstration & portfolio reviewers
  const switchDemoRole = (roleKey) => {
    const targetUser = mockUsers.find((u) => u.role === roleKey) || mockUsers[0];
    setUser(targetUser);
    localStorage.setItem('hc_auth_user', JSON.stringify(targetUser));
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('hc_auth_token', response.token);
      localStorage.setItem('hc_auth_user', JSON.stringify(response.user));
      return response.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(formData);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('hc_auth_token', response.token);
      localStorage.setItem('hc_auth_user', JSON.stringify(response.user));
      return response.user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  const updateUserProfile = (updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    localStorage.setItem('hc_auth_user', JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        role: user?.role || null,
        loading,
        error,
        login,
        register,
        logout,
        switchDemoRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

