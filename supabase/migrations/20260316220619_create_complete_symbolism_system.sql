/*
  # Complete Symbolism Explorer System (Phases 1-8)

  ## Overview
  Comprehensive sanctuary symbolism exploration system with:
  - Phase 1-2: Core symbol database and SDA commentary
  - Phase 3: Digital Library Integration
  - Phase 4: Type/Antitype Expansion
  - Phase 5: Linguistic Deep Dive
  - Phase 7: 3D Model Integration
  - Phase 8: Advanced Learning Features

  ## New Tables
  - 14 core tables covering all functionality
  - Full-text search, RLS, and performance indexes
  - Public read access, authenticated user features

  ## Security
  - RLS enabled on all tables
  - Public read for educational content
  - User-specific policies for progress/annotations
*/

-- ============================================================================
-- PHASE 1-2: Core Symbolism Tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_symbols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('furniture', 'materials', 'colors', 'rituals', 'numbers', 'architecture', 'garments', 'sacrifices', 'festivals', 'people')),
  sanctuary_location text CHECK (sanctuary_location IN ('outer_court', 'holy_place', 'most_holy_place', 'general', 'all_areas')),
  short_description text NOT NULL,
  detailed_description text,
  primary_scripture_references text[] DEFAULT '{}',
  symbolic_meaning text,
  christological_type text,
  hebrew_term text,
  hebrew_transliteration text,
  greek_term text,
  greek_transliteration text,
  historical_context text,
  theological_significance text,
  practical_application text,
  related_symbols uuid[] DEFAULT '{}',
  image_url text,
  diagram_url text,
  tags text[] DEFAULT '{}',
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_sda_commentary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  source_type text NOT NULL CHECK (source_type IN ('eg_white', 'bible_commentary', 'modern_scholar', 'historic_pioneer')),
  author text NOT NULL,
  book_title text,
  publication_year integer,
  quote_text text NOT NULL,
  page_reference text,
  context text,
  theological_emphasis text,
  application_notes text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PHASE 3: Library Integration
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_library_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  resource_type text NOT NULL CHECK (resource_type IN ('book', 'article', 'video', 'audio', 'sermon')),
  title text NOT NULL,
  author text,
  publication_year integer,
  publisher text,
  isbn text,
  url text,
  description text,
  relevance_score integer DEFAULT 5 CHECK (relevance_score BETWEEN 1 AND 10),
  preview_text text,
  page_count integer,
  language text DEFAULT 'en',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_book_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  library_resource_id uuid REFERENCES symbolism_library_resources(id) ON DELETE CASCADE,
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  chapter_number integer,
  chapter_title text,
  page_start integer,
  page_end integer,
  quote_text text,
  context_notes text,
  significance text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PHASE 4: Type/Antitype Expansion
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_prophetic_fulfillments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  prophecy_reference text NOT NULL,
  fulfillment_reference text NOT NULL,
  fulfillment_date text,
  fulfillment_description text NOT NULL,
  prophetic_principle text,
  historical_context text,
  theological_significance text,
  adventist_interpretation text,
  fulfillment_certainty text CHECK (fulfillment_certainty IN ('certain', 'probable', 'possible', 'debated')),
  eschatological_implications text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_typology_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  type_category text NOT NULL CHECK (type_category IN ('person', 'event', 'object', 'ritual', 'place', 'time')),
  type_name text NOT NULL,
  type_reference text NOT NULL,
  antitype_name text NOT NULL,
  antitype_reference text NOT NULL,
  correspondence_points jsonb DEFAULT '[]',
  contrasts jsonb DEFAULT '[]',
  progressive_revelation text,
  hermeneutical_notes text,
  related_types text[] DEFAULT '{}',
  visual_diagram_url text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PHASE 5: Linguistic Deep Dive
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_word_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  original_word text NOT NULL,
  language text NOT NULL CHECK (language IN ('hebrew', 'aramaic', 'greek')),
  transliteration text NOT NULL,
  strongs_number text,
  pronunciation_ipa text,
  root_word text,
  morphology text,
  part_of_speech text,
  word_frequency integer,
  first_occurrence text,
  last_occurrence text,
  total_occurrences integer,
  testament text CHECK (testament IN ('OT', 'NT', 'both')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_etymology (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word_study_id uuid REFERENCES symbolism_word_studies(id) ON DELETE CASCADE,
  etymological_origin text,
  cognate_languages jsonb DEFAULT '[]',
  historical_development text,
  cultural_context text,
  ancient_usage_examples text[] DEFAULT '{}',
  meaning_evolution text,
  related_words text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_semantic_ranges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word_study_id uuid REFERENCES symbolism_word_studies(id) ON DELETE CASCADE,
  meaning_category text NOT NULL,
  definition text NOT NULL,
  usage_context text,
  example_verses text[] DEFAULT '{}',
  frequency_in_context integer,
  theological_significance text,
  translation_notes text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PHASE 7: 3D Integration
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_3d_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  model_name text NOT NULL,
  model_url text NOT NULL,
  model_format text DEFAULT 'gltf' CHECK (model_format IN ('gltf', 'glb', 'babylon', 'obj')),
  thumbnail_url text,
  poly_count integer,
  texture_resolution text,
  file_size_mb numeric(8,2),
  scale_factor numeric(10,4) DEFAULT 1.0,
  initial_camera_position jsonb,
  lighting_preset text DEFAULT 'standard',
  pbr_materials boolean DEFAULT true,
  animation_available boolean DEFAULT false,
  vr_compatible boolean DEFAULT false,
  mobile_optimized boolean DEFAULT true,
  load_priority integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_3d_hotspots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES symbolism_3d_models(id) ON DELETE CASCADE,
  hotspot_name text NOT NULL,
  position_x numeric(10,4) NOT NULL,
  position_y numeric(10,4) NOT NULL,
  position_z numeric(10,4) NOT NULL,
  hotspot_type text CHECK (hotspot_type IN ('info', 'scripture', 'symbol', 'measurement', 'material', 'video')),
  title text NOT NULL,
  description text,
  scripture_reference text,
  popup_content text,
  icon_type text,
  interaction_type text DEFAULT 'click',
  related_symbol_id uuid REFERENCES symbolism_symbols(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_3d_animations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES symbolism_3d_models(id) ON DELETE CASCADE,
  animation_name text NOT NULL,
  animation_type text CHECK (animation_type IN ('tour', 'reveal', 'explode', 'timeline', 'ritual', 'construction')),
  duration_seconds integer NOT NULL,
  keyframes jsonb DEFAULT '[]',
  narration_text text,
  narration_audio_url text,
  camera_path jsonb,
  auto_play boolean DEFAULT false,
  loop_animation boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PHASE 8: Advanced Learning Features
-- ============================================================================

CREATE TABLE IF NOT EXISTS symbolism_learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_name text NOT NULL,
  path_description text,
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'scholarly')),
  estimated_duration_minutes integer,
  path_order integer,
  prerequisites text[] DEFAULT '{}',
  learning_objectives text[] DEFAULT '{}',
  symbol_sequence uuid[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  learning_path_id uuid REFERENCES symbolism_learning_paths(id) ON DELETE CASCADE,
  status text DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'bookmarked')),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  time_spent_seconds integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  completion_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering')),
  correct_answer text NOT NULL,
  wrong_answers text[] DEFAULT '{}',
  explanation text,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  scripture_reference text,
  points integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS symbolism_annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  symbol_id uuid REFERENCES symbolism_symbols(id) ON DELETE CASCADE,
  annotation_type text CHECK (annotation_type IN ('note', 'highlight', 'question', 'insight', 'bookmark')),
  content text NOT NULL,
  highlighted_text text,
  color text DEFAULT 'yellow',
  is_private boolean DEFAULT true,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Core symbols indexes
CREATE INDEX IF NOT EXISTS idx_symbols_category ON symbolism_symbols(category);
CREATE INDEX IF NOT EXISTS idx_symbols_location ON symbolism_symbols(sanctuary_location);
CREATE INDEX IF NOT EXISTS idx_symbols_search ON symbolism_symbols USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_symbols_tags ON symbolism_symbols USING gin(tags);

-- Commentary indexes
CREATE INDEX IF NOT EXISTS idx_commentary_symbol ON symbolism_sda_commentary(symbol_id);
CREATE INDEX IF NOT EXISTS idx_commentary_source ON symbolism_sda_commentary(source_type);

-- Library indexes
CREATE INDEX IF NOT EXISTS idx_library_resources_symbol ON symbolism_library_resources(symbol_id);
CREATE INDEX IF NOT EXISTS idx_library_resources_type ON symbolism_library_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_book_references_symbol ON symbolism_book_references(symbol_id);

-- Type/Antitype indexes
CREATE INDEX IF NOT EXISTS idx_prophetic_fulfillments_symbol ON symbolism_prophetic_fulfillments(symbol_id);
CREATE INDEX IF NOT EXISTS idx_typology_connections_symbol ON symbolism_typology_connections(symbol_id);

-- Linguistic indexes
CREATE INDEX IF NOT EXISTS idx_word_studies_symbol ON symbolism_word_studies(symbol_id);
CREATE INDEX IF NOT EXISTS idx_word_studies_language ON symbolism_word_studies(language);
CREATE INDEX IF NOT EXISTS idx_etymology_word_study ON symbolism_etymology(word_study_id);
CREATE INDEX IF NOT EXISTS idx_semantic_ranges_word_study ON symbolism_semantic_ranges(word_study_id);

-- 3D indexes
CREATE INDEX IF NOT EXISTS idx_3d_models_symbol ON symbolism_3d_models(symbol_id);
CREATE INDEX IF NOT EXISTS idx_3d_hotspots_model ON symbolism_3d_hotspots(model_id);
CREATE INDEX IF NOT EXISTS idx_3d_animations_model ON symbolism_3d_animations(model_id);

-- Learning indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON symbolism_user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_symbol ON symbolism_user_progress(symbol_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_symbol ON symbolism_quizzes(symbol_id);
CREATE INDEX IF NOT EXISTS idx_annotations_user ON symbolism_annotations(user_id);
CREATE INDEX IF NOT EXISTS idx_annotations_symbol ON symbolism_annotations(symbol_id);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE symbolism_symbols ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_sda_commentary ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_library_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_book_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_prophetic_fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_typology_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_word_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_etymology ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_semantic_ranges ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_3d_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_3d_hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_3d_animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbolism_annotations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC READ POLICIES
-- ============================================================================

CREATE POLICY "Public can read symbols"
  ON symbolism_symbols FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read commentary"
  ON symbolism_sda_commentary FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read library resources"
  ON symbolism_library_resources FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read book references"
  ON symbolism_book_references FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read prophetic fulfillments"
  ON symbolism_prophetic_fulfillments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read typology connections"
  ON symbolism_typology_connections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read word studies"
  ON symbolism_word_studies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read etymology"
  ON symbolism_etymology FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read semantic ranges"
  ON symbolism_semantic_ranges FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read 3d models"
  ON symbolism_3d_models FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read 3d hotspots"
  ON symbolism_3d_hotspots FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read 3d animations"
  ON symbolism_3d_animations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read published learning paths"
  ON symbolism_learning_paths FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Public can read quizzes"
  ON symbolism_quizzes FOR SELECT
  TO public
  USING (true);

-- ============================================================================
-- USER-SPECIFIC POLICIES
-- ============================================================================

CREATE POLICY "Users can read own progress"
  ON symbolism_user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON symbolism_user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON symbolism_user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own annotations"
  ON symbolism_annotations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR is_private = false);

CREATE POLICY "Users can insert own annotations"
  ON symbolism_annotations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own annotations"
  ON symbolism_annotations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own annotations"
  ON symbolism_annotations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- SEED INSERT POLICIES (for development)
-- ============================================================================

CREATE POLICY "Allow anon inserts for symbols"
  ON symbolism_symbols FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for commentary"
  ON symbolism_sda_commentary FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for library resources"
  ON symbolism_library_resources FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for book references"
  ON symbolism_book_references FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for prophetic fulfillments"
  ON symbolism_prophetic_fulfillments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for typology connections"
  ON symbolism_typology_connections FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for word studies"
  ON symbolism_word_studies FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for etymology"
  ON symbolism_etymology FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for semantic ranges"
  ON symbolism_semantic_ranges FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for 3d models"
  ON symbolism_3d_models FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for 3d hotspots"
  ON symbolism_3d_hotspots FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for 3d animations"
  ON symbolism_3d_animations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for learning paths"
  ON symbolism_learning_paths FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon inserts for quizzes"
  ON symbolism_quizzes FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Update search vector on symbol changes
CREATE OR REPLACE FUNCTION update_symbolism_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.short_description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.detailed_description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.symbolic_meaning, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER symbolism_search_vector_update
  BEFORE INSERT OR UPDATE ON symbolism_symbols
  FOR EACH ROW
  EXECUTE FUNCTION update_symbolism_search_vector();
