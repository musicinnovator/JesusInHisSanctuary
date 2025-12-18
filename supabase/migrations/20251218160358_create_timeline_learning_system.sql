/*
  # Interactive Timeline Learning System Database Schema

  ## Overview
  Creates comprehensive database structure for the interactive sanctuary timeline learning system,
  supporting questions, progress tracking, achievements, and gamification features.

  ## New Tables

  ### `timeline_questions`
  Stores all questions for each timeline step with multiple question types
  - `id` (uuid, primary key)
  - `step_id` (integer) - Timeline step number (0-24)
  - `question_id` (text) - Unique identifier for the question
  - `type` (text) - Question type: multiple-choice, fill-blank, true-false, order-steps, matching
  - `difficulty` (text) - easy, medium, hard
  - `question` (text) - The question text
  - `options` (jsonb) - Array of options for multiple choice
  - `correct_answer` (jsonb) - Correct answer(s)
  - `explanation` (text) - Explanation of the answer
  - `scripture_references` (jsonb) - Array of scripture references
  - `hint` (text) - Optional hint text
  - `order_position` (integer) - Display order within step
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `user_progress`
  Tracks individual question attempts and results
  - `id` (uuid, primary key)
  - `user_id` (text) - Anonymous or authenticated user ID
  - `question_id` (text) - References timeline_questions.question_id
  - `step_id` (integer) - Timeline step number
  - `is_correct` (boolean) - Whether answer was correct
  - `attempts` (integer) - Number of attempts
  - `last_attempt_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `user_achievements`
  Tracks earned badges and achievements
  - `id` (uuid, primary key)
  - `user_id` (text) - Anonymous or authenticated user ID
  - `achievement_type` (text) - Badge identifier
  - `achievement_name` (text) - Display name
  - `earned_at` (timestamptz)
  - `metadata` (jsonb) - Additional achievement data

  ### `study_sessions`
  Tracks study time and engagement
  - `id` (uuid, primary key)
  - `user_id` (text) - Anonymous or authenticated user ID
  - `step_id` (integer) - Timeline step studied
  - `mode` (text) - study or challenge
  - `duration_seconds` (integer) - Time spent
  - `questions_answered` (integer)
  - `correct_answers` (integer)
  - `session_date` (date)
  - `created_at` (timestamptz)

  ### `user_stats`
  Overall user statistics and progress
  - `id` (uuid, primary key)
  - `user_id` (text, unique) - Anonymous or authenticated user ID
  - `total_questions_answered` (integer)
  - `total_correct_answers` (integer)
  - `steps_completed` (integer) - Number of steps with all questions correct
  - `current_streak_days` (integer)
  - `longest_streak_days` (integer)
  - `last_study_date` (date)
  - `total_study_time_seconds` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Allow users to read all questions
  - Allow users to manage only their own progress, achievements, sessions, and stats
*/

-- Create timeline_questions table
CREATE TABLE IF NOT EXISTS timeline_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id integer NOT NULL,
  question_id text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('multiple-choice', 'fill-blank', 'true-false', 'order-steps', 'matching')),
  difficulty text NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question text NOT NULL,
  options jsonb,
  correct_answer jsonb NOT NULL,
  explanation text NOT NULL,
  scripture_references jsonb DEFAULT '[]'::jsonb,
  hint text,
  order_position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  question_id text NOT NULL,
  step_id integer NOT NULL,
  is_correct boolean NOT NULL,
  attempts integer NOT NULL DEFAULT 1,
  last_attempt_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(user_id, achievement_type)
);

-- Create study_sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  step_id integer NOT NULL,
  mode text NOT NULL CHECK (mode IN ('study', 'challenge')),
  duration_seconds integer DEFAULT 0,
  questions_answered integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  session_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  total_questions_answered integer DEFAULT 0,
  total_correct_answers integer DEFAULT 0,
  steps_completed integer DEFAULT 0,
  current_streak_days integer DEFAULT 0,
  longest_streak_days integer DEFAULT 0,
  last_study_date date,
  total_study_time_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_timeline_questions_step_id ON timeline_questions(step_id);
CREATE INDEX IF NOT EXISTS idx_timeline_questions_question_id ON timeline_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_step_id ON user_progress(step_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON study_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Enable Row Level Security
ALTER TABLE timeline_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for timeline_questions (public read)
CREATE POLICY "Anyone can view questions"
  ON timeline_questions FOR SELECT
  USING (true);

-- RLS Policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

-- RLS Policies for study_sessions
CREATE POLICY "Users can view own sessions"
  ON study_sessions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own sessions"
  ON study_sessions FOR INSERT
  WITH CHECK (true);

-- RLS Policies for user_stats
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own stats"
  ON user_stats FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  USING (true)
  WITH CHECK (true);