import api from '@/lib/axios';
import { Lesson, LessonDetail } from '@/types';

export const lessonsApi = {
  /**
   * Lista as aulas de uma unidade.
   *
   * @param unityName - Nome da unidade já codificado para uso em URL.
   * @returns Array de aulas com título e flag de conclusão.
   */
  listByUnity: async (unityName: string) => {
    const { data } = await api.get<Lesson[]>(
      `/api/lesson/list/${unityName}`,
    );
    return data;
  },

  /**
   * Busca os detalhes de uma aula específica.
   *
   * @param unityName - Nome da unidade já codificado para uso em URL.
   * @param lessonName - Nome da aula já codificado para uso em URL.
   * @returns Detalhes da aula (título, descrição, vídeo e status).
   */
  getByName: async (unityName: string, lessonName: string) => {
    const { data } = await api.get<LessonDetail>(
      `/api/lesson/${unityName}/${lessonName}`,
    );
    return data;
  },
};
