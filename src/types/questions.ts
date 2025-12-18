export type QuestionType = 'multiple-choice' | 'fill-blank' | 'true-false' | 'order-steps' | 'matching';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type StudyMode = 'study' | 'challenge';

export interface ScriptureReference {
  book: string;
  chapter: number;
  verses: string;
  text?: string;
}

export interface TimelineQuestion {
  stepId: number;
  questionId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  scriptureReferences: ScriptureReference[];
  hint?: string;
  orderPosition: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  questionId: string;
  stepId: number;
  isCorrect: boolean;
  attempts: number;
  lastAttemptAt: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  achievementType: string;
  achievementName: string;
  earnedAt: string;
  metadata: Record<string, any>;
}

export interface StudySession {
  id: string;
  userId: string;
  stepId: number;
  mode: StudyMode;
  durationSeconds: number;
  questionsAnswered: number;
  correctAnswers: number;
  sessionDate: string;
  createdAt: string;
}

export interface UserStats {
  id: string;
  userId: string;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  stepsCompleted: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastStudyDate: string | null;
  totalStudyTimeSeconds: number;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementDefinition {
  type: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: (stats: UserStats, progress: UserProgress[], achievements: Achievement[]) => boolean;
}
