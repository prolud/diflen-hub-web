import api from '@/lib/axios';
import { AnswerVerifyRequest, Question, VerifyAnswersResponse } from '@/types';

export const questionnaireApi = {
  getByLesson: async (unityName: string, lessonName: string) => {
    const { data } = await api.get<Question[]>(
      `/api/questionnaire/${unityName}/${lessonName}`,
    );
    return data;
  },

  verifyAnswers: async (payload: AnswerVerifyRequest) => {
    const { data } = await api.post<VerifyAnswersResponse>(
      '/api/questionnaire/verify-answers',
      payload,
    );
    return data;
  },
};
