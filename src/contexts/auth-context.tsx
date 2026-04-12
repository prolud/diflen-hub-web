'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (token: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/user');
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // If unauthorized, logout
      if ((error as any).response?.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('diflen-hub-token');
    const username = localStorage.getItem('diflen-hub-username');
    
    if (token && username) {
      // Set a minimal user object initially to allow UI to show username
      setUser({ username } as UserProfile);
      fetchUserProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string, username: string) => {
    localStorage.setItem('diflen-hub-token', token);
    localStorage.setItem('diflen-hub-username', username);
    
    // Set minimal user object immediately
    setUser({ username } as UserProfile);
    
    // Fetch full profile in background (not blocking)
    fetchUserProfile();
    
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
