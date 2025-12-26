/*
  # Sacred Colors of the Sanctuary System

  ## Overview
  Complete database schema for the Sacred Colors educational module, enabling exploration
  of the eight divine colors used in the biblical sanctuary and their profound spiritual significance.

  ## New Tables Created

  ### 1. `sacred_colors`
  Core table storing the eight sacred colors with their Hebrew origins and primary meanings.
  - `id` (uuid, primary key)
  - `color_name` (text, unique) - English name: 'Blue', 'Purple', 'Scarlet', 'White', 'Gold', 'Brass', 'Silver', 'Dark'
  - `color_hex` (text) - Hex color code for UI display
  - `hebrew_name` (text) - Original Hebrew word
  - `hebrew_transliteration` (text) - Phonetic Hebrew spelling
  - `biblical_significance` (text) - Primary theological meaning
  - `theological_meaning` (text) - Deeper spiritual significance
  - `sanctuary_usage` (text) - How/where used in sanctuary
  - `symbolic_representations` (text[]) - Array of symbolic meanings
  - `scripture_references` (text[]) - Key Bible verses
  - `order_position` (integer) - Display order
  - `slug` (text, unique) - URL-friendly identifier
  - `icon_name` (text) - Lucide icon identifier
  - `view_count` (integer) - Analytics tracking
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `color_symbolism`
  Multi-tradition interpretations of color meanings across Jewish, Christian, and Adventist perspectives.
  - `id` (uuid, primary key)
  - `color_id` (uuid, foreign key) - References sacred_colors
  - `tradition` (text) - 'jewish', 'christian', 'adventist'
  - `interpretation` (text) - Tradition-specific meaning
  - `supporting_verses` (text[]) - Scripture support
  - `scholar_quotes` (jsonb) - Array of {author, quote, source, year}
  - `created_at` (timestamptz)

  ### 3. `color_applications`
  Specific uses of each color in sanctuary elements (veil, curtains, garments, etc.)
  - `id` (uuid, primary key)
  - `color_id` (uuid, foreign key) - References sacred_colors
  - `element_name` (text) - 'veil', 'curtains', 'ephod', 'breastplate', etc.
  - `location` (text) - Where in sanctuary
  - `material` (text) - Fine linen, gold thread, etc.
  - `manufacturing_process` (text) - How color was created
  - `spiritual_lesson` (text) - What it teaches
  - `image_url` (text) - Visual reference
  - `scripture_reference` (text) - Biblical description

  ### 4. `color_combinations`
  Analysis of how colors work together (e.g., blue + purple + scarlet in veil)
  - `id` (uuid, primary key)
  - `combination_name` (text) - Descriptive name
  - `color_ids` (uuid[]) - Array of color IDs
  - `context` (text) - Where this combination appears
  - `combined_meaning` (text) - Theological significance of combination
  - `scripture_reference` (text)
  - `visual_example_url` (text)

  ### 5. `color_quiz_questions`
  Interactive quiz questions for learning reinforcement
  - `id` (uuid, primary key)
  - `color_id` (uuid, foreign key) - References sacred_colors (nullable for general questions)
  - `question_text` (text) - The question
  - `question_type` (text) - 'multiple_choice', 'true_false', 'matching'
  - `correct_answer` (text) - Correct response
  - `wrong_answers` (text[]) - Distractors for multiple choice
  - `explanation` (text) - Why the answer is correct
  - `difficulty` (text) - 'easy', 'medium', 'hard'
  - `points` (integer) - Score value

  ### 6. `user_color_progress`
  Track user learning progress through the color module
  - `user_id` (uuid) - User identifier
  - `color_id` (uuid, foreign key) - References sacred_colors
  - `visited` (boolean) - Has user viewed this color page
  - `quiz_completed` (boolean) - Completed associated quiz
  - `quiz_score` (integer) - Score achieved
  - `bookmarked` (boolean) - User saved for later
  - `last_visited` (timestamptz)
  - `notes` (text) - Personal study notes
  - Primary key: (user_id, color_id)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for educational content (colors, symbolism, applications, combinations, quiz questions)
  - User-specific write access for progress tracking
  - Authenticated users can manage their own progress and notes

  ## Indexes
  - Full-text search on color descriptions and symbolism
  - Optimized queries for color lookup by slug
  - Fast filtering by tradition and element type

  ## Analytics
  - View count tracking with trigger
  - Quiz completion metrics
  - User engagement analytics
*/

-- =====================================================
-- 1. SACRED COLORS (Core Table)
-- =====================================================

CREATE TABLE IF NOT EXISTS sacred_colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color_name TEXT NOT NULL UNIQUE,
  color_hex TEXT NOT NULL,
  hebrew_name TEXT,
  hebrew_transliteration TEXT,
  biblical_significance TEXT NOT NULL,
  theological_meaning TEXT NOT NULL,
  sanctuary_usage TEXT NOT NULL,
  symbolic_representations TEXT[] DEFAULT '{}',
  scripture_references TEXT[] DEFAULT '{}',
  order_position INTEGER NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon_name TEXT DEFAULT 'Sparkles',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE sacred_colors ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view sacred colors"
  ON sacred_colors FOR SELECT
  TO public
  USING (true);

-- Index for fast slug lookup
CREATE INDEX IF NOT EXISTS idx_sacred_colors_slug ON sacred_colors(slug);
CREATE INDEX IF NOT EXISTS idx_sacred_colors_order ON sacred_colors(order_position);

-- =====================================================
-- 2. COLOR SYMBOLISM (Multi-tradition Interpretations)
-- =====================================================

CREATE TABLE IF NOT EXISTS color_symbolism (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color_id UUID NOT NULL REFERENCES sacred_colors(id) ON DELETE CASCADE,
  tradition TEXT NOT NULL CHECK (tradition IN ('jewish', 'christian', 'adventist')),
  interpretation TEXT NOT NULL,
  supporting_verses TEXT[] DEFAULT '{}',
  scholar_quotes JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE color_symbolism ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view color symbolism"
  ON color_symbolism FOR SELECT
  TO public
  USING (true);

-- Index for filtering by tradition
CREATE INDEX IF NOT EXISTS idx_color_symbolism_color ON color_symbolism(color_id);
CREATE INDEX IF NOT EXISTS idx_color_symbolism_tradition ON color_symbolism(tradition);

-- =====================================================
-- 3. COLOR APPLICATIONS (Sanctuary Element Usage)
-- =====================================================

CREATE TABLE IF NOT EXISTS color_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color_id UUID NOT NULL REFERENCES sacred_colors(id) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  location TEXT,
  material TEXT,
  manufacturing_process TEXT,
  spiritual_lesson TEXT,
  image_url TEXT,
  scripture_reference TEXT
);

-- Enable RLS
ALTER TABLE color_applications ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view color applications"
  ON color_applications FOR SELECT
  TO public
  USING (true);

-- Index for filtering by element
CREATE INDEX IF NOT EXISTS idx_color_applications_color ON color_applications(color_id);
CREATE INDEX IF NOT EXISTS idx_color_applications_element ON color_applications(element_name);

-- =====================================================
-- 4. COLOR COMBINATIONS (Multi-color Analysis)
-- =====================================================

CREATE TABLE IF NOT EXISTS color_combinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  combination_name TEXT NOT NULL,
  color_ids UUID[] NOT NULL,
  context TEXT NOT NULL,
  combined_meaning TEXT NOT NULL,
  scripture_reference TEXT,
  visual_example_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE color_combinations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view color combinations"
  ON color_combinations FOR SELECT
  TO public
  USING (true);

-- =====================================================
-- 5. COLOR QUIZ QUESTIONS (Learning Assessment)
-- =====================================================

CREATE TABLE IF NOT EXISTS color_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color_id UUID REFERENCES sacred_colors(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'matching')),
  correct_answer TEXT NOT NULL,
  wrong_answers TEXT[] DEFAULT '{}',
  explanation TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER DEFAULT 10
);

-- Enable RLS
ALTER TABLE color_quiz_questions ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view color quiz questions"
  ON color_quiz_questions FOR SELECT
  TO public
  USING (true);

-- Index for filtering by color and difficulty
CREATE INDEX IF NOT EXISTS idx_color_quiz_color ON color_quiz_questions(color_id);
CREATE INDEX IF NOT EXISTS idx_color_quiz_difficulty ON color_quiz_questions(difficulty);

-- =====================================================
-- 6. USER COLOR PROGRESS (Personal Learning Tracking)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_color_progress (
  user_id UUID NOT NULL,
  color_id UUID NOT NULL REFERENCES sacred_colors(id) ON DELETE CASCADE,
  visited BOOLEAN DEFAULT false,
  quiz_completed BOOLEAN DEFAULT false,
  quiz_score INTEGER DEFAULT 0,
  bookmarked BOOLEAN DEFAULT false,
  last_visited TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  PRIMARY KEY (user_id, color_id)
);

-- Enable RLS
ALTER TABLE user_color_progress ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own progress
CREATE POLICY "Users can view own color progress"
  ON user_color_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own color progress"
  ON user_color_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own color progress"
  ON user_color_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index for user progress queries
CREATE INDEX IF NOT EXISTS idx_user_color_progress_user ON user_color_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_color_progress_bookmarked ON user_color_progress(user_id, bookmarked) WHERE bookmarked = true;

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_color_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE sacred_colors
  SET view_count = view_count + 1
  WHERE id = NEW.color_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on user progress visits
CREATE TRIGGER trigger_increment_color_views
  AFTER INSERT OR UPDATE OF visited ON user_color_progress
  FOR EACH ROW
  WHEN (NEW.visited = true)
  EXECUTE FUNCTION increment_color_view_count();

-- =====================================================
-- FULL-TEXT SEARCH
-- =====================================================

-- Add search vector column
ALTER TABLE sacred_colors ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create search index
CREATE INDEX IF NOT EXISTS idx_sacred_colors_search ON sacred_colors USING gin(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION sacred_colors_search_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.color_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.biblical_significance, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.theological_meaning, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.sanctuary_usage, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain search vector
CREATE TRIGGER trigger_sacred_colors_search_update
  BEFORE INSERT OR UPDATE ON sacred_colors
  FOR EACH ROW
  EXECUTE FUNCTION sacred_colors_search_update();