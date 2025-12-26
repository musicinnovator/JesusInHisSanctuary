export interface SacredColor {
  id: string;
  color_name: string;
  color_hex: string;
  hebrew_name: string | null;
  hebrew_transliteration: string | null;
  biblical_significance: string;
  theological_meaning: string;
  sanctuary_usage: string;
  symbolic_representations: string[];
  scripture_references: string[];
  order_position: number;
  slug: string;
  icon_name: string;
  view_count: number;
  created_at: string;
  search_vector?: unknown;
}

export interface ColorSymbolism {
  id: string;
  color_id: string;
  tradition: 'jewish' | 'christian' | 'adventist';
  interpretation: string;
  supporting_verses: string[];
  scholar_quotes: ScholarQuote[];
  created_at: string;
}

export interface ScholarQuote {
  author: string;
  quote: string;
  source: string;
  year?: number;
}

export interface ColorApplication {
  id: string;
  color_id: string;
  element_name: string;
  location: string | null;
  material: string | null;
  manufacturing_process: string | null;
  spiritual_lesson: string | null;
  image_url: string | null;
  scripture_reference: string | null;
}

export interface ColorCombination {
  id: string;
  combination_name: string;
  color_ids: string[];
  context: string;
  combined_meaning: string;
  scripture_reference: string | null;
  visual_example_url: string | null;
  created_at: string;
}

export interface ColorQuizQuestion {
  id: string;
  color_id: string | null;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'matching';
  correct_answer: string;
  wrong_answers: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface UserColorProgress {
  user_id: string;
  color_id: string;
  visited: boolean;
  quiz_completed: boolean;
  quiz_score: number;
  bookmarked: boolean;
  last_visited: string;
  notes: string | null;
}

export interface ColorDetailData {
  color: SacredColor;
  symbolism: ColorSymbolism[];
  applications: ColorApplication[];
  quizQuestions: ColorQuizQuestion[];
}

export interface ColorStats {
  total_colors: number;
  most_viewed: SacredColor | null;
  user_progress?: {
    visited_count: number;
    bookmarked_count: number;
    quizzes_completed: number;
    average_score: number;
  };
}
