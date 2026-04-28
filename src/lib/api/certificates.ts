import api from '@/lib/axios';
import { CertificateResponse } from '@/types';

export const certificatesApi = {
  list: async () => {
    const { data } = await api.get<CertificateResponse[]>('/api/certificate');
    return data;
  },

  issue: async (unityName: string) => {
    const { data } = await api.post(
      `/api/certificate/issue?unityName=${unityName}`,
    );
    return data;
  },
};
