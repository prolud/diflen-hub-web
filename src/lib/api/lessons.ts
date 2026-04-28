import api from '@/lib/axios';
import { GetLessonsResponse, LessonResponse } from '@/types';

export const lessonsApi = {
  listByUnity: async (unityName: string) => {
    const { data } = await api.get<GetLessonsResponse[]>(
      `/api/lesson/list/${unityName}`,
    );
    return data;
  },

  getByName: async (unityName: string, lessonName: string) => {
    const { data } = await api.get<LessonResponse>(
      `/api/lesson/${unityName}/${lessonName}`,
    );
    return data;
  },
};
