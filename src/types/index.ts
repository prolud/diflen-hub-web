export enum UserRole {
  User = 0,
  Admin = 1,
}

export interface UserProfile {
  publicId: string;
  username: string;
  experience: number;
  profilePic: string;
  requiredExperienceToNextLevel: number;
  level: number;
  levelPercentage: number;
  role: UserRole;
}

export interface LoginResponse {
  isLogged: boolean;
  accessToken: string;
  expiresIn?: string;
  message: string;
}

export interface Unity {
  name: string;
  description: string | null;
  unityCover?: string | null;
}

export interface UnityDetail extends Unity {
  publicId: string;
  wasUnityCorrectlyAnswered: boolean;
  wasCertificateAlreadyIssued: boolean;
}

export interface Lesson {
  title: string;
  concluded: boolean;
}

export interface LessonDetail extends Lesson {
  publicId: string;
  description: string | null;
  videoUrl: string | null;
}

export interface Alternative {
  publicId: string;
  text: string;
}

export interface Question {
  publicId: string;
  statement: string;
  alternatives: Alternative[];
}

export interface AnswerVerifyRequest {
  publicLessonId?: string;
  unityName: string;
  answers: {
    publicQuestionId: string;
    publicAlternativeId: string;
  }[];
}

export interface AnswerVerifyOut {
  publicQuestionId: string;
  publicAlternativeId: string;
  isCorrect: boolean;
}

export interface VerifyAnswersResponse {
  answers: AnswerVerifyOut[];
  currentPointsWeight: number;
  /**
   * Indica se todas as questões da **unidade inteira** estão corretamente
   * respondidas (não apenas as desta lição). A flag de conclusão da lição
   * é derivada no client a partir de `answers[].isCorrect`.
   */
  wasUnityCorrectlyAnswered: boolean;
  WasLessonCorrectlyAnswered: boolean;
  wasCertificateAlreadyIssued: boolean;
  message: string | null;
}

export interface CertificateResponse {
  unityName: string;
  createdAt: string;
}
