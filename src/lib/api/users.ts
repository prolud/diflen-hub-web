import api from '@/lib/axios';
import { LoginResponse, UserProfile } from '@/types';

export interface AuthCredentials {
  username: string;
  password: string;
}

export const usersApi = {
  login: async (credentials: AuthCredentials) => {
    const { data } = await api.post<LoginResponse & { username: string }>(
      '/api/user/login',
      credentials,
    );
    return data;
  },

  register: async (credentials: AuthCredentials) => {
    const { data } = await api.post<string>('/api/user/register', credentials);
    return data;
  },

  getProfile: async (username: string) => {
    const { data } = await api.get<UserProfile>(`/api/user/${username}`);
    return data;
  },
};
