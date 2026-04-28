export const queryKeys = {
  user: {
    profile: (username: string) => ['user', 'profile', username] as const,
  },
  unities: {
    all: ['unities'] as const,
    detail: (name: string) => ['unity', name] as const,
  },
  lessons: {
    list: (unityName: string) => ['lessons', unityName] as const,
    detail: (unityName: string, lessonName: string) =>
      ['lesson', unityName, lessonName] as const,
  },
  questionnaire: {
    byLesson: (unityName: string, lessonName: string) =>
      ['questions', unityName, lessonName] as const,
  },
  certificates: {
    all: ['certificates'] as const,
  },
};
