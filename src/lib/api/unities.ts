import api from '@/lib/axios';
import { GetUnitiesResponse, UnityResponse } from '@/types';

export const unitiesApi = {
  list: async () => {
    const { data } = await api.get<GetUnitiesResponse[]>('/api/unity');
    return data;
  },

  getByName: async (unityName: string) => {
    const { data } = await api.get<UnityResponse>(`/api/unity/${unityName}`);
    return data;
  },

  importPlaylist: async (playlistUrl: string) => {
    const encoded = encodeURIComponent(playlistUrl);
    const { data } = await api.post(`/api/unity/import/${encoded}`);
    return data;
  },
};
