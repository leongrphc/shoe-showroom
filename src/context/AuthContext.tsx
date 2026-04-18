import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const simpleHash = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
const AUTH_SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = sessionStorage.getItem('admin-auth');
    const timestamp = sessionStorage.getItem('admin-auth-time');

    if (auth === 'true' && timestamp) {
      const elapsed = Date.now() - parseInt(timestamp, 10);
      if (elapsed < AUTH_SESSION_DURATION_MS) {
        return true;
      }
      sessionStorage.removeItem('admin-auth');
      sessionStorage.removeItem('admin-auth-time');
    }
    return false;
  });

  useEffect(() => {
    if (!ADMIN_PASSWORD_HASH) {
      console.error('VITE_ADMIN_PASSWORD_HASH tanımlı değil. Admin girişi devre dışı.');
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (!ADMIN_PASSWORD_HASH) {
      return false;
    }

    try {
      const hash = await simpleHash(password);
      if (hash === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem('admin-auth', 'true');
        sessionStorage.setItem('admin-auth-time', Date.now().toString());
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin-auth');
    sessionStorage.removeItem('admin-auth-time');
    setIsAuthenticated(false);
  };

  // Otomatik logout - 24 saat sonra
  useEffect(() => {
    if (isAuthenticated) {
      const checkAuth = setInterval(() => {
        const timestamp = sessionStorage.getItem('admin-auth-time');
        if (timestamp) {
          const elapsed = Date.now() - parseInt(timestamp, 10);
          if (elapsed >= AUTH_SESSION_DURATION_MS) {
            logout();
          }
        }
      }, 60000); // Her dakika kontrol et

      return () => clearInterval(checkAuth);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
