import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';

export interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  token: null,
  accessToken: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setUser({ email: 'siddhantkanherkar97@gmail.com' });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (email?: string, password?: string) => {
    if (email && password) {
      try {
        const res = await fetch('/api/admin/simple-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (res.ok) {
          const data = await res.json();
          setToken(data.token);
          setUser(data.user);
          setIsAdmin(data.user.isAdmin);
          localStorage.setItem('adminToken', data.token);
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error', error);
      }
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, token, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
