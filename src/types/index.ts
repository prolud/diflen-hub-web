export interface UserProfile {
  publicId: string;
  username: string;
  experience: number;
  profilePic: string;
  requiredExperienceToNextLevel: number;
  level: number;
  levelPercentage: number;
}

export interface LoginResponse {
  isLogged: boolean;
  accessToken: string;
  expiresIn?: string;
  message: string;
}

export interface UnityResponse {
  publicId: string;
  name: string;
  description: string | null;
  wasAllQuestionsCorrectlyAnswered: boolean;
  wasCertificateAlreadyIssued: boolean;
}

export interface GetUnitiesResponse {
  name: string;
  description: string | null;
  unityCover: string | null;
}

export interface LessonResponse {
  publicId: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  concluded: boolean;
}

export interface GetLessonsResponse {
  title: string;
  concluded: boolean;
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
  wasAllQuestionsCorrectlyAnswered: boolean;
  wasCertificateAlreadyIssued: boolean;
  message: string | null;
}

export interface CertificateResponse {
  unityName: string;
  createdAt: string;
}
