'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usersApi } from '@/lib/api/users';
import { UserProfile } from '@/types';

export interface AuthUser {
  username: string;
  profile: UserProfile | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (token: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserProfile = async (username: string) => {
    const profile = await usersApi.getProfile(username);
    setUser({ username, profile });
  };

  useEffect(() => {
    const token = localStorage.getItem('diflen-hub-token');
    const username = localStorage.getItem('diflen-hub-username');

    if (token && username) {
      setUser({ username, profile: null });
      fetchUserProfile(username).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string, username: string) => {
    localStorage.setItem('diflen-hub-token', token);
    localStorage.setItem('diflen-hub-username', username);

    setUser({ username, profile: null });
    fetchUserProfile(username);

    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('diflen-hub-token');
    localStorage.removeItem('diflen-hub-username');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
