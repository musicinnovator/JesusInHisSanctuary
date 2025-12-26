/*
  # Four Critical Learning Modules - Complete Database Schema

  ## Overview
  This migration creates the complete database infrastructure for four enhanced learning modules:
  1. Scripture Navigator (44+ passages with cross-references)
  2. Symbolism Mode (250+ symbols with SDA sources)
  3. Investigative Judgment (timeline events and resources)
  4. Myth vs. Fact (50+ myth/fact pairs)

  ## New Tables

  ### Scripture Navigator Module
  - `scripture_passages` - Biblical passages linked to sanctuary elements
  - `scripture_cross_references` - Cross-reference relationships
  - `hebrew_greek_words` - Original language word studies

  ### Symbolism Mode Module
  - `sanctuary_symbols` - Comprehensive symbol database
  - `symbol_scholarly_sources` - SDA scholar quotes and citations
  - `symbol_categories` - Organization and filtering

  ### Investigative Judgment Module
  - `judgment_timeline_events` - Prophetic timeline from 457 BC to present
  - `judgment_resources` - Educational materials and sources
  - `judgment_quiz_questions` - Knowledge assessment

  ### Myth vs. Fact Module
  - `myths_and_facts` - Myth/fact pairs with explanations
  - `myth_categories` - Topical organization
  - `related_content_links` - Cross-module navigation

  ## Security
  - RLS enabled on all tables
  - Public read access for educational content
  - Authenticated write access for admin functions
*/

-- =====================================================
-- SCRIPTURE NAVIGATOR MODULE
-- =====================================================

-- Scripture Passages Table
CREATE TABLE IF NOT EXISTS scripture_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE,
  book TEXT NOT NULL,
  chapter_start INTEGER NOT NULL,
  verse_start INTEGER NOT NULL,
  chapter_end INTEGER,
  verse_end INTEGER,
  translation TEXT NOT NULL DEFAULT 'KJV',

  -- Content
  title TEXT NOT NULL,
  full_text TEXT NOT NULL,
  summary TEXT,

  -- Sanctuary Connections
  sanctuary_element TEXT,
  model_id TEXT,
  element_component_id TEXT,

  -- Metadata
  passage_type TEXT CHECK (passage_type IN ('direct', 'typological', 'prophetic', 'historical')),
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scripture_passages_reference ON scripture_passages(reference);
CREATE INDEX IF NOT EXISTS idx_scripture_passages_book ON scripture_passages(book);
CREATE INDEX IF NOT EXISTS idx_scripture_passages_element ON scripture_passages(sanctuary_element);
CREATE INDEX IF NOT EXISTS idx_scripture_passages_featured ON scripture_passages(featured) WHERE featured = true;

-- Scripture Cross References
CREATE TABLE IF NOT EXISTS scripture_cross_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_passage_id UUID REFERENCES scripture_passages(id) ON DELETE CASCADE,
  related_passage_id UUID REFERENCES scripture_passages(id) ON DELETE CASCADE,
  relationship_type TEXT CHECK (relationship_type IN ('parallel', 'fulfillment', 'contrast', 'elaboration')),
  explanation TEXT,

  UNIQUE(primary_passage_id, related_passage_id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cross_refs_primary ON scripture_cross_references(primary_passage_id);
CREATE INDEX IF NOT EXISTS idx_cross_refs_related ON scripture_cross_references(related_passage_id);

-- Hebrew/Greek Word Studies
CREATE TABLE IF NOT EXISTS hebrew_greek_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_word TEXT NOT NULL,
  transliteration TEXT,
  strongs_number TEXT,
  language TEXT CHECK (language IN ('hebrew', 'greek')) NOT NULL,

  -- Definitions
  definition TEXT NOT NULL,
  literal_meaning TEXT,
  theological_significance TEXT,
  sanctuary_significance TEXT,

  -- Usage
  usage_count INTEGER DEFAULT 0,
  example_verses TEXT[],

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hebrew_greek_language ON hebrew_greek_words(language);
CREATE INDEX IF NOT EXISTS idx_hebrew_greek_strongs ON hebrew_greek_words(strongs_number);

-- =====================================================
-- SYMBOLISM MODE MODULE
-- =====================================================

-- Symbol Categories
CREATE TABLE IF NOT EXISTS symbol_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  color_hex TEXT,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_symbol_categories_order ON symbol_categories(display_order);

-- Sanctuary Symbols (Main Table)
CREATE TABLE IF NOT EXISTS sanctuary_symbols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES symbol_categories(id),
  subcategory TEXT,

  -- Hebrew/Original Language
  hebrew_term TEXT,
  hebrew_transliteration TEXT,
  hebrew_meaning TEXT,

  -- Interpretations by Tradition
  hebrew_interpretation TEXT,
  christian_interpretation TEXT,
  adventist_interpretation TEXT,

  -- Typology
  ot_type TEXT,
  nt_antitype TEXT,
  christ_connection TEXT,

  -- Scripture References
  primary_scripture TEXT[],
  cross_references TEXT[],

  -- Visual/Interactive
  image_url TEXT,
  icon_name TEXT,
  hover_detail_short TEXT,
  hover_detail_medium TEXT,
  hover_detail_long TEXT,
  animation_type TEXT,

  -- Sanctuary Location
  sanctuary_location TEXT,
  sanctuary_element TEXT,
  model_component_id TEXT,

  -- Metadata
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'scholarly')),
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_symbols_category ON sanctuary_symbols(category_id);
CREATE INDEX IF NOT EXISTS idx_symbols_element ON sanctuary_symbols(sanctuary_element);
CREATE INDEX IF NOT EXISTS idx_symbols_featured ON sanctuary_symbols(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_symbols_difficulty ON sanctuary_symbols(difficulty_level);

-- Symbol Scholarly Sources
CREATE TABLE IF NOT EXISTS symbol_scholarly_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol_id UUID REFERENCES sanctuary_symbols(id) ON DELETE CASCADE,

  -- Author Information
  author_name TEXT NOT NULL,
  author_affiliation TEXT,

  -- Source Details
  work_title TEXT NOT NULL,
  publication_year INTEGER,
  page_number TEXT,
  quote_text TEXT NOT NULL,

  -- Categorization
  source_type TEXT CHECK (source_type IN ('egw', 'sda_scholar', 'biblical_scholar', 'historical')),
  tradition TEXT CHECK (tradition IN ('jewish', 'christian', 'adventist', 'general')),

  -- Metadata
  citation_format TEXT,
  url TEXT,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scholarly_sources_symbol ON symbol_scholarly_sources(symbol_id);
CREATE INDEX IF NOT EXISTS idx_scholarly_sources_author ON symbol_scholarly_sources(author_name);
CREATE INDEX IF NOT EXISTS idx_scholarly_sources_type ON symbol_scholarly_sources(source_type);

-- =====================================================
-- INVESTIGATIVE JUDGMENT MODULE
-- =====================================================

-- Timeline Events
CREATE TABLE IF NOT EXISTS judgment_timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Date Information
  event_date DATE,
  event_year INTEGER NOT NULL,
  date_display TEXT NOT NULL,

  -- Event Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  significance TEXT NOT NULL,

  -- Scripture and Sources
  scripture_references TEXT[],
  sda_source_quote TEXT,
  sda_source_citation TEXT,

  -- Visual/Interactive
  event_type TEXT CHECK (event_type IN ('prophetic_start', 'prophetic_fulfillment', 'prophetic_major', 'ongoing', 'future')),
  event_color TEXT,
  icon_name TEXT,
  video_url TEXT,
  image_url TEXT,

  -- Timeline Position
  timeline_position INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,

  -- Metadata
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timeline_events_year ON judgment_timeline_events(event_year);
CREATE INDEX IF NOT EXISTS idx_timeline_events_type ON judgment_timeline_events(event_type);
CREATE INDEX IF NOT EXISTS idx_timeline_events_order ON judgment_timeline_events(display_order);

-- Judgment Educational Resources
CREATE TABLE IF NOT EXISTS judgment_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Resource Details
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT CHECK (resource_type IN ('article', 'video', 'document', 'image', 'quiz')) NOT NULL,

  -- Content
  content_text TEXT,
  content_url TEXT,
  thumbnail_url TEXT,

  -- Categorization
  topic TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),

  -- Related Timeline
  related_event_id UUID REFERENCES judgment_timeline_events(id),

  -- Metadata
  author TEXT,
  source_citation TEXT,
  estimated_duration_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_judgment_resources_type ON judgment_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_judgment_resources_topic ON judgment_resources(topic);
CREATE INDEX IF NOT EXISTS idx_judgment_resources_event ON judgment_resources(related_event_id);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS judgment_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Question Content
  question_text TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'ordering')) NOT NULL,

  -- Answers
  correct_answer TEXT NOT NULL,
  wrong_answers TEXT[],
  answer_explanation TEXT NOT NULL,

  -- Context
  scripture_reference TEXT,
  related_topic TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),

  -- Metadata
  times_answered INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_type ON judgment_quiz_questions(question_type);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON judgment_quiz_questions(difficulty_level);

-- =====================================================
-- MYTH VS. FACT MODULE
-- =====================================================

-- Myth Categories
CREATE TABLE IF NOT EXISTS myth_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  color_hex TEXT,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_myth_categories_order ON myth_categories(display_order);

-- Myths and Facts
CREATE TABLE IF NOT EXISTS myths_and_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES myth_categories(id),

  -- Content
  myth_text TEXT NOT NULL,
  fact_text TEXT NOT NULL,
  detailed_explanation TEXT NOT NULL,

  -- Scripture Support
  scripture_references TEXT[],

  -- SDA Sources
  egw_quote TEXT,
  egw_source TEXT,
  scholar_quote TEXT,
  scholar_source TEXT,

  -- Related Content Links
  related_scripture_link TEXT,
  related_symbolism_link TEXT,
  related_judgment_link TEXT,
  related_library_id UUID,

  -- Metadata
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  common_misconception BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,

  -- Engagement Metrics
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_myths_category ON myths_and_facts(category_id);
CREATE INDEX IF NOT EXISTS idx_myths_common ON myths_and_facts(common_misconception) WHERE common_misconception = true;
CREATE INDEX IF NOT EXISTS idx_myths_featured ON myths_and_facts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_myths_difficulty ON myths_and_facts(difficulty_level);

-- Related Content Cross-Links
CREATE TABLE IF NOT EXISTS related_content_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source
  source_module TEXT CHECK (source_module IN ('scripture', 'symbolism', 'judgment', 'myths')) NOT NULL,
  source_id UUID NOT NULL,

  -- Target
  target_module TEXT CHECK (target_module IN ('scripture', 'symbolism', 'judgment', 'myths', 'library')) NOT NULL,
  target_id UUID NOT NULL,

  -- Link Details
  link_type TEXT CHECK (link_type IN ('reference', 'expansion', 'related', 'example')),
  description TEXT,

  UNIQUE(source_module, source_id, target_module, target_id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_related_links_source ON related_content_links(source_module, source_id);
CREATE INDEX IF NOT EXISTS idx_related_links_target ON related_content_links(target_module, target_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE scripture_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripture_cross_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE hebrew_greek_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbol_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctuary_symbols ENABLE ROW LEVEL SECURITY;
ALTER TABLE symbol_scholarly_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE judgment_timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE judgment_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE judgment_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE myth_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE myths_and_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_content_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read scripture passages" ON scripture_passages FOR SELECT TO public USING (true);
CREATE POLICY "Public read scripture cross refs" ON scripture_cross_references FOR SELECT TO public USING (true);
CREATE POLICY "Public read hebrew greek" ON hebrew_greek_words FOR SELECT TO public USING (true);
CREATE POLICY "Public read symbol categories" ON symbol_categories FOR SELECT TO public USING (true);
CREATE POLICY "Public read symbols" ON sanctuary_symbols FOR SELECT TO public USING (true);
CREATE POLICY "Public read symbol sources" ON symbol_scholarly_sources FOR SELECT TO public USING (true);
CREATE POLICY "Public read timeline events" ON judgment_timeline_events FOR SELECT TO public USING (true);
CREATE POLICY "Public read judgment resources" ON judgment_resources FOR SELECT TO public USING (true);
CREATE POLICY "Public read quiz questions" ON judgment_quiz_questions FOR SELECT TO public USING (true);
CREATE POLICY "Public read myth categories" ON myth_categories FOR SELECT TO public USING (true);
CREATE POLICY "Public read myths" ON myths_and_facts FOR SELECT TO public USING (true);
CREATE POLICY "Public read related links" ON related_content_links FOR SELECT TO public USING (true);

CREATE POLICY "Service role all scripture passages" ON scripture_passages FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all cross refs" ON scripture_cross_references FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all hebrew greek" ON hebrew_greek_words FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all symbol categories" ON symbol_categories FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all symbols" ON sanctuary_symbols FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all symbol sources" ON symbol_scholarly_sources FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all timeline events" ON judgment_timeline_events FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all judgment resources" ON judgment_resources FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all quiz questions" ON judgment_quiz_questions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all myth categories" ON myth_categories FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all myths" ON myths_and_facts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all related links" ON related_content_links FOR ALL TO service_role USING (true) WITH CHECK (true);
