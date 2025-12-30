/*
  # Gilbert Book Comprehensive Enhancement System

  1. New Tables
    - `gilbert_hebrew_expressions` - Complete Hebrew dictionary with transliterations, meanings, categories
    - `gilbert_scripture_enhanced` - Enhanced scripture references with Hebrew context and typology
    - `gilbert_study_questions` - Interactive study questions for each chapter
    - `gilbert_memorable_quotes` - Standout passages from Gilbert's work
    - `gilbert_illustrations` - Diagrams and visual aids
    - `gilbert_timeline_events` - Three-perspective timeline (historical, sanctuary, prophetic)
    - `gilbert_type_antitype_links` - OT type to NT antitype connections
    - `gilbert_user_progress` - Track user reading progress
    - `gilbert_bookmarks` - User bookmarks and notes
    - `gilbert_study_paths` - Curated reading paths

  2. Security
    - Enable RLS on all tables
    - Public read access for educational content
    - Authenticated access for user-specific data (progress, bookmarks)
*/

-- ============================================================================
-- HEBREW EXPRESSIONS DICTIONARY
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_hebrew_expressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expression text NOT NULL,
  transliteration text NOT NULL,
  meaning text NOT NULL,
  category text DEFAULT 'general',
  subcategory text,
  hebrew_text text,
  pronunciation_guide text,
  theological_significance text,
  usage_examples text[],
  related_chapters uuid[],
  related_expressions text[],
  scripture_references text[],
  letter_group text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- ENHANCED SCRIPTURE SYSTEM
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_scripture_enhanced (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL,
  book text NOT NULL,
  chapter_num integer NOT NULL,
  verse_start integer NOT NULL,
  verse_end integer,
  text_kjv text,
  hebrew_context text,
  greek_context text,
  theological_significance text,
  type_antitype_link uuid,
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  theme_tags text[],
  testament text DEFAULT 'OT',
  is_messianic boolean DEFAULT false,
  citation_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- STUDY QUESTIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_study_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'reflection',
  difficulty_level text DEFAULT 'medium',
  answer_hints text[],
  scripture_references text[],
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- MEMORABLE QUOTES
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_memorable_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  quote_text text NOT NULL,
  context text,
  significance text,
  page_number integer,
  theme_tags text[],
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- ILLUSTRATIONS & DIAGRAMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_illustrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text DEFAULT 'diagram',
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  image_url text,
  caption text,
  theological_purpose text,
  related_concepts text[],
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- TIMELINE EVENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  date_or_period text,
  timeline_type text NOT NULL,
  category text NOT NULL,
  ot_type text,
  nt_antitype text,
  description text NOT NULL,
  prophetic_significance text,
  scripture_references text[],
  chapter_references uuid[],
  timeline_position integer,
  is_past boolean DEFAULT false,
  is_present boolean DEFAULT false,
  is_future boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- TYPE/ANTITYPE CONNECTIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_type_antitype_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  ot_type_name text NOT NULL,
  ot_type_description text NOT NULL,
  ot_scripture_refs text[],
  nt_antitype_name text NOT NULL,
  nt_antitype_description text NOT NULL,
  nt_scripture_refs text[],
  connection_explanation text NOT NULL,
  gilbert_commentary text,
  chapter_references uuid[],
  visual_diagram_url text,
  significance_level integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- USER PROGRESS TRACKING
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completion_date timestamptz,
  time_spent_minutes integer DEFAULT 0,
  notes text,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, chapter_id)
);

-- ============================================================================
-- USER BOOKMARKS & NOTES
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  section_text text,
  note text,
  color_tag text DEFAULT 'yellow',
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- STUDY PATHS (Curated Reading Sequences)
-- ============================================================================
CREATE TABLE IF NOT EXISTS gilbert_study_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_name text NOT NULL,
  description text NOT NULL,
  chapter_sequence uuid[],
  estimated_hours integer,
  difficulty_level text DEFAULT 'intermediate',
  focus_areas text[],
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_hebrew_expressions_letter ON gilbert_hebrew_expressions(letter_group);
CREATE INDEX IF NOT EXISTS idx_hebrew_expressions_category ON gilbert_hebrew_expressions(category);
CREATE INDEX IF NOT EXISTS idx_hebrew_expressions_transliteration ON gilbert_hebrew_expressions(transliteration);

CREATE INDEX IF NOT EXISTS idx_scripture_enhanced_reference ON gilbert_scripture_enhanced(reference);
CREATE INDEX IF NOT EXISTS idx_scripture_enhanced_chapter ON gilbert_scripture_enhanced(chapter_id);
CREATE INDEX IF NOT EXISTS idx_scripture_enhanced_testament ON gilbert_scripture_enhanced(testament);

CREATE INDEX IF NOT EXISTS idx_study_questions_chapter ON gilbert_study_questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_memorable_quotes_chapter ON gilbert_memorable_quotes(chapter_id);
CREATE INDEX IF NOT EXISTS idx_illustrations_chapter ON gilbert_illustrations(chapter_id);

CREATE INDEX IF NOT EXISTS idx_timeline_events_type ON gilbert_timeline_events(timeline_type);
CREATE INDEX IF NOT EXISTS idx_timeline_events_position ON gilbert_timeline_events(timeline_position);

CREATE INDEX IF NOT EXISTS idx_type_antitype_category ON gilbert_type_antitype_links(category);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON gilbert_user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_chapter ON gilbert_user_progress(chapter_id);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON gilbert_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_chapter ON gilbert_bookmarks(chapter_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Hebrew Expressions (Public Educational Content)
ALTER TABLE gilbert_hebrew_expressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view Hebrew expressions"
  ON gilbert_hebrew_expressions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Hebrew expressions"
  ON gilbert_hebrew_expressions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Hebrew expressions"
  ON gilbert_hebrew_expressions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Enhanced Scripture (Public Educational Content)
ALTER TABLE gilbert_scripture_enhanced ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view enhanced scriptures"
  ON gilbert_scripture_enhanced FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert enhanced scriptures"
  ON gilbert_scripture_enhanced FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Study Questions (Public Educational Content)
ALTER TABLE gilbert_study_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view study questions"
  ON gilbert_study_questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert study questions"
  ON gilbert_study_questions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Memorable Quotes (Public Educational Content)
ALTER TABLE gilbert_memorable_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view memorable quotes"
  ON gilbert_memorable_quotes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert memorable quotes"
  ON gilbert_memorable_quotes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Illustrations (Public Educational Content)
ALTER TABLE gilbert_illustrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view illustrations"
  ON gilbert_illustrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert illustrations"
  ON gilbert_illustrations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Timeline Events (Public Educational Content)
ALTER TABLE gilbert_timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view timeline events"
  ON gilbert_timeline_events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert timeline events"
  ON gilbert_timeline_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Type/Antitype Links (Public Educational Content)
ALTER TABLE gilbert_type_antitype_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view type/antitype links"
  ON gilbert_type_antitype_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert type/antitype links"
  ON gilbert_type_antitype_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User Progress (User-Specific Private Data)
ALTER TABLE gilbert_user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON gilbert_user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON gilbert_user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON gilbert_user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON gilbert_user_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- User Bookmarks (User-Specific Private Data)
ALTER TABLE gilbert_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON gilbert_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON gilbert_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks"
  ON gilbert_bookmarks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON gilbert_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Study Paths (Public Educational Content)
ALTER TABLE gilbert_study_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view study paths"
  ON gilbert_study_paths FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert study paths"
  ON gilbert_study_paths FOR INSERT
  TO authenticated
  WITH CHECK (true);
