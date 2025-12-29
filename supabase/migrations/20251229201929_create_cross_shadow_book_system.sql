/*
  # Create "The Cross and Its Shadow" Book System

  ## Overview
  Comprehensive database schema for Stephen N. Haskell's "The Cross and Its Shadow" 
  digital library system. This migration creates the complete infrastructure for:
  - Book metadata and overview analysis
  - 50 chapters across 9 sections with hierarchical structure
  - 1,114+ scripture references with context and cataloging
  - Theological concepts and typological relationships
  - Interactive charts, graphs, and illustrations
  - Key highlights and navigation aids

  ## New Tables

  ### 1. `cross_shadow_book`
  Main book metadata and overview analysis
  - `id` (uuid, primary key)
  - `title` (text) - Book title
  - `author` (text) - Stephen N. Haskell
  - `year_published` (integer)
  - `overview_analysis` (text) - Comprehensive book overview
  - `key_themes` (jsonb) - Array of primary themes
  - `total_chapters` (integer) - 50 chapters
  - `total_sections` (integer) - 9 sections
  - `total_scriptures` (integer) - Count of scripture references
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `cross_shadow_sections`
  Major sections of the book (9 total)
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `section_number` (integer) - 1-9
  - `section_title` (text)
  - `section_overview` (text)
  - `key_themes` (jsonb)
  - `chapter_range` (text) - e.g., "Chapters 1-5"
  - `created_at` (timestamptz)

  ### 3. `cross_shadow_chapters`
  Individual chapters (50 total)
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `section_id` (uuid, foreign key)
  - `chapter_number` (integer) - 1-50
  - `chapter_title` (text)
  - `chapter_overview` (text)
  - `content_full` (text) - Complete chapter text
  - `key_points` (jsonb) - Array of highlighted key points
  - `scripture_references` (jsonb) - Quick reference array
  - `created_at` (timestamptz)

  ### 4. `cross_shadow_scriptures`
  Complete catalog of all scripture references (1,114+)
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `chapter_id` (uuid, foreign key)
  - `reference` (text) - e.g., "Exodus 25:8"
  - `book_name` (text) - Bible book
  - `chapter_verse` (text) - Chapter and verse
  - `context_in_book` (text) - How it's used in the book
  - `footnote_number` (integer) - Original footnote number
  - `quote_text` (text) - Actual quoted text if applicable
  - `testament` (text) - 'Old' or 'New'
  - `category` (text) - Type/purpose of reference
  - `created_at` (timestamptz)

  ### 5. `cross_shadow_concepts`
  Theological concepts and typological relationships
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `concept_name` (text)
  - `concept_type` (text) - 'type', 'antitype', 'doctrine', 'symbol'
  - `description` (text)
  - `scripture_foundation` (jsonb) - Key scriptures
  - `related_chapters` (jsonb) - Chapter references
  - `old_testament_type` (text) - If typological
  - `new_testament_antitype` (text) - If typological
  - `significance` (text)
  - `created_at` (timestamptz)

  ### 6. `cross_shadow_concept_relationships`
  Connections between theological concepts
  - `id` (uuid, primary key)
  - `concept_from_id` (uuid, foreign key)
  - `concept_to_id` (uuid, foreign key)
  - `relationship_type` (text) - 'fulfills', 'parallels', 'contrasts', 'illuminates'
  - `description` (text)
  - `created_at` (timestamptz)

  ### 7. `cross_shadow_illustrations`
  Charts, graphs, diagrams, and visual aids
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `chapter_id` (uuid, foreign key)
  - `illustration_type` (text) - 'chart', 'graph', 'diagram', 'timeline', 'map'
  - `title` (text)
  - `description` (text)
  - `data_source` (jsonb) - Data for generating visualization
  - `related_concepts` (jsonb)
  - `related_scriptures` (jsonb)
  - `display_order` (integer)
  - `created_at` (timestamptz)

  ### 8. `cross_shadow_highlights`
  Key points and highlights for quick reference
  - `id` (uuid, primary key)
  - `book_id` (uuid, foreign key)
  - `chapter_id` (uuid, foreign key)
  - `section_id` (uuid, foreign key)
  - `highlight_text` (text)
  - `highlight_type` (text) - 'key_point', 'summary', 'application', 'insight'
  - `context` (text)
  - `related_scriptures` (jsonb)
  - `display_order` (integer)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access (educational resource)
  - Authenticated write access for content management
  - Service role for seeding operations

  ## Indexes
  - Foreign key indexes for joins
  - Text search indexes for content discovery
  - Chapter/section number indexes for ordering
*/

-- Create the main book table
CREATE TABLE IF NOT EXISTS cross_shadow_book (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'The Cross and Its Shadow',
  author text NOT NULL DEFAULT 'Stephen N. Haskell',
  year_published integer DEFAULT 1914,
  overview_analysis text,
  key_themes jsonb DEFAULT '[]'::jsonb,
  total_chapters integer DEFAULT 50,
  total_sections integer DEFAULT 9,
  total_scriptures integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS cross_shadow_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  section_number integer NOT NULL,
  section_title text NOT NULL,
  section_overview text,
  key_themes jsonb DEFAULT '[]'::jsonb,
  chapter_range text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, section_number)
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS cross_shadow_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  section_id uuid REFERENCES cross_shadow_sections(id) ON DELETE CASCADE,
  chapter_number integer NOT NULL,
  chapter_title text NOT NULL,
  chapter_overview text,
  content_full text,
  key_points jsonb DEFAULT '[]'::jsonb,
  scripture_references jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, chapter_number)
);

-- Create scriptures catalog table
CREATE TABLE IF NOT EXISTS cross_shadow_scriptures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES cross_shadow_chapters(id) ON DELETE CASCADE,
  reference text NOT NULL,
  book_name text NOT NULL,
  chapter_verse text NOT NULL,
  context_in_book text,
  footnote_number integer,
  quote_text text,
  testament text CHECK (testament IN ('Old', 'New')),
  category text,
  created_at timestamptz DEFAULT now()
);

-- Create theological concepts table
CREATE TABLE IF NOT EXISTS cross_shadow_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  concept_name text NOT NULL,
  concept_type text CHECK (concept_type IN ('type', 'antitype', 'doctrine', 'symbol', 'prophecy', 'teaching')),
  description text,
  scripture_foundation jsonb DEFAULT '[]'::jsonb,
  related_chapters jsonb DEFAULT '[]'::jsonb,
  old_testament_type text,
  new_testament_antitype text,
  significance text,
  created_at timestamptz DEFAULT now()
);

-- Create concept relationships table
CREATE TABLE IF NOT EXISTS cross_shadow_concept_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_from_id uuid REFERENCES cross_shadow_concepts(id) ON DELETE CASCADE,
  concept_to_id uuid REFERENCES cross_shadow_concepts(id) ON DELETE CASCADE,
  relationship_type text CHECK (relationship_type IN ('fulfills', 'parallels', 'contrasts', 'illuminates', 'prefigures', 'completes')),
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(concept_from_id, concept_to_id, relationship_type)
);

-- Create illustrations table
CREATE TABLE IF NOT EXISTS cross_shadow_illustrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES cross_shadow_chapters(id) ON DELETE SET NULL,
  illustration_type text CHECK (illustration_type IN ('chart', 'graph', 'diagram', 'timeline', 'map', 'table', 'infographic')),
  title text NOT NULL,
  description text,
  data_source jsonb DEFAULT '{}'::jsonb,
  related_concepts jsonb DEFAULT '[]'::jsonb,
  related_scriptures jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create highlights table
CREATE TABLE IF NOT EXISTS cross_shadow_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES cross_shadow_book(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES cross_shadow_chapters(id) ON DELETE CASCADE,
  section_id uuid REFERENCES cross_shadow_sections(id) ON DELETE CASCADE,
  highlight_text text NOT NULL,
  highlight_type text CHECK (highlight_type IN ('key_point', 'summary', 'application', 'insight', 'definition', 'quote')),
  context text,
  related_scriptures jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cross_shadow_sections_book ON cross_shadow_sections(book_id, section_number);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_chapters_book ON cross_shadow_chapters(book_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_chapters_section ON cross_shadow_chapters(section_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_scriptures_book ON cross_shadow_scriptures(book_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_scriptures_chapter ON cross_shadow_scriptures(chapter_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_scriptures_reference ON cross_shadow_scriptures(reference);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_scriptures_book_name ON cross_shadow_scriptures(book_name);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_concepts_book ON cross_shadow_concepts(book_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_concepts_type ON cross_shadow_concepts(concept_type);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_illustrations_book ON cross_shadow_illustrations(book_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_illustrations_chapter ON cross_shadow_illustrations(chapter_id);
CREATE INDEX IF NOT EXISTS idx_cross_shadow_highlights_chapter ON cross_shadow_highlights(chapter_id);

-- Enable Row Level Security
ALTER TABLE cross_shadow_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_concept_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_illustrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_shadow_highlights ENABLE ROW LEVEL SECURITY;

-- Public read policies (educational resource available to all)
CREATE POLICY "Public can view book metadata"
  ON cross_shadow_book FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view sections"
  ON cross_shadow_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view chapters"
  ON cross_shadow_chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view scriptures"
  ON cross_shadow_scriptures FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view concepts"
  ON cross_shadow_concepts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view concept relationships"
  ON cross_shadow_concept_relationships FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view illustrations"
  ON cross_shadow_illustrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view highlights"
  ON cross_shadow_highlights FOR SELECT
  TO public
  USING (true);

-- Authenticated write policies for content management
CREATE POLICY "Authenticated users can manage book"
  ON cross_shadow_book FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage sections"
  ON cross_shadow_sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage chapters"
  ON cross_shadow_chapters FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage scriptures"
  ON cross_shadow_scriptures FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage concepts"
  ON cross_shadow_concepts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage relationships"
  ON cross_shadow_concept_relationships FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage illustrations"
  ON cross_shadow_illustrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage highlights"
  ON cross_shadow_highlights FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);