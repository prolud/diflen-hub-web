import api from '@/lib/axios';
import { Unity, UnityDetail } from '@/types';

export const unitiesApi = {
  /**
   * Lista todas as unidades disponíveis para o usuário autenticado.
   *
   * @returns Array de unidades com nome, descrição e capa.
   */
  list: async () => {
    const { data } = await api.get<Unity[]>('/api/unity');
    return data;
  },

  /**
   * Busca os detalhes de uma unidade específica.
   *
   * @param unityName - Nome da unidade já codificado para uso em URL.
   * @returns Detalhes da unidade, incluindo status do certificado.
   */
  getByName: async (unityName: string) => {
    const { data } = await api.get<UnityDetail>(`/api/unity/${unityName}`);
    return data;
  },

  /**
   * Importa uma playlist do YouTube como uma nova unidade.
   *
   * @param playlistUrl - URL bruta da playlist (será codificada internamente).
   * @returns Resposta da API após a importação.
   */
  importPlaylist: async (playlistUrl: string) => {
    const encoded = encodeURIComponent(playlistUrl);
    const { data } = await api.post(`/api/unity/import/${encoded}`);
    return data;
  },
};
