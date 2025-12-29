/*
  # Crosier's "The Sanctuary" Book Analysis System
  
  ## Overview
  Creates a comprehensive database structure for O.R.L. Crosier's historical work
  "The Sanctuary: The Center of Christ's Work" (1846). This system enables:
  - Full-text book content with structured chapters and sections
  - Scripture reference indexing and cross-referencing
  - Theological concept mapping and relationships
  - Interactive diagrams and visualizations
  - User annotations and study notes
  
  ## New Tables
  
  ### 1. `crosier_book_metadata`
  - `id` (uuid, primary key)
  - `title` (text) - Book title
  - `author` (text) - O.R.L. Crosier
  - `publication_date` (date) - Original 1846 publication
  - `historical_context` (text) - Background information
  - `theological_significance` (text) - Importance to SDA theology
  - `endorsements` (jsonb) - Ellen G. White and others
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. `crosier_chapters`
  - `id` (uuid, primary key)
  - `chapter_number` (integer)
  - `title` (text)
  - `summary` (text)
  - `key_themes` (text[])
  - `content` (text) - Full chapter text
  - `word_count` (integer)
  - `created_at` (timestamptz)
  
  ### 3. `crosier_sections`
  - `id` (uuid, primary key)
  - `chapter_id` (uuid, foreign key)
  - `section_number` (integer)
  - `heading` (text)
  - `content` (text)
  - `key_points` (text[])
  - `theological_concepts` (text[])
  - `created_at` (timestamptz)
  
  ### 4. `crosier_scripture_references`
  - `id` (uuid, primary key)
  - `book` (text) - Bible book name
  - `chapter` (integer)
  - `verse_start` (integer)
  - `verse_end` (integer, nullable)
  - `reference_text` (text) - e.g., "Hebrews 9:11-12"
  - `quoted_text` (text) - Actual scripture quoted
  - `context_in_book` (text) - How Crosier uses it
  - `chapter_id` (uuid, foreign key)
  - `section_id` (uuid, foreign key, nullable)
  - `theological_theme` (text)
  - `created_at` (timestamptz)
  
  ### 5. `crosier_theological_concepts`
  - `id` (uuid, primary key)
  - `concept_name` (text) - e.g., "Heavenly Sanctuary"
  - `definition` (text)
  - `biblical_foundation` (text[])
  - `chapter_references` (uuid[])
  - `related_concepts` (uuid[])
  - `diagram_data` (jsonb) - Visual representation data
  - `created_at` (timestamptz)
  
  ### 6. `crosier_type_antitype_pairs`
  - `id` (uuid, primary key)
  - `type_name` (text) - Old Testament type
  - `type_description` (text)
  - `type_scripture` (text[])
  - `antitype_name` (text) - New Testament fulfillment
  - `antitype_description` (text)
  - `antitype_scripture` (text[])
  - `fulfillment_timing` (text) - When fulfilled
  - `chapter_id` (uuid, foreign key)
  - `created_at` (timestamptz)
  
  ### 7. `crosier_diagrams`
  - `id` (uuid, primary key)
  - `diagram_type` (text) - 'timeline', 'sanctuary_layout', 'concept_map', etc.
  - `title` (text)
  - `description` (text)
  - `svg_data` (text, nullable) - SVG markup for diagrams
  - `data_points` (jsonb) - Structured data for charts
  - `related_chapters` (uuid[])
  - `created_at` (timestamptz)
  
  ### 8. `crosier_user_annotations`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Links to auth.users
  - `chapter_id` (uuid, foreign key, nullable)
  - `section_id` (uuid, foreign key, nullable)
  - `annotation_text` (text)
  - `highlight_text` (text, nullable)
  - `is_public` (boolean, default false)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Public read access for book content
  - Authenticated users can create annotations
  - Users can only modify their own annotations
*/

-- Create tables
CREATE TABLE IF NOT EXISTS crosier_book_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL DEFAULT 'O.R.L. Crosier',
  publication_date date DEFAULT '1846-02-07',
  historical_context text,
  theological_significance text,
  endorsements jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  summary text,
  key_themes text[] DEFAULT ARRAY[]::text[],
  content text,
  word_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES crosier_chapters(id) ON DELETE CASCADE,
  section_number integer NOT NULL,
  heading text NOT NULL,
  content text,
  key_points text[] DEFAULT ARRAY[]::text[],
  theological_concepts text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, section_number)
);

CREATE TABLE IF NOT EXISTS crosier_scripture_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book text NOT NULL,
  chapter integer NOT NULL,
  verse_start integer NOT NULL,
  verse_end integer,
  reference_text text NOT NULL,
  quoted_text text,
  context_in_book text,
  chapter_id uuid REFERENCES crosier_chapters(id) ON DELETE CASCADE,
  section_id uuid REFERENCES crosier_sections(id) ON DELETE SET NULL,
  theological_theme text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_theological_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_name text NOT NULL UNIQUE,
  definition text,
  biblical_foundation text[] DEFAULT ARRAY[]::text[],
  chapter_references uuid[] DEFAULT ARRAY[]::uuid[],
  related_concepts uuid[] DEFAULT ARRAY[]::uuid[],
  diagram_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_type_antitype_pairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_name text NOT NULL,
  type_description text,
  type_scripture text[] DEFAULT ARRAY[]::text[],
  antitype_name text NOT NULL,
  antitype_description text,
  antitype_scripture text[] DEFAULT ARRAY[]::text[],
  fulfillment_timing text,
  chapter_id uuid REFERENCES crosier_chapters(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_diagrams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_type text NOT NULL,
  title text NOT NULL,
  description text,
  svg_data text,
  data_points jsonb DEFAULT '{}'::jsonb,
  related_chapters uuid[] DEFAULT ARRAY[]::uuid[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crosier_user_annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  chapter_id uuid REFERENCES crosier_chapters(id) ON DELETE CASCADE,
  section_id uuid REFERENCES crosier_sections(id) ON DELETE CASCADE,
  annotation_text text NOT NULL,
  highlight_text text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_crosier_chapters_number ON crosier_chapters(chapter_number);
CREATE INDEX IF NOT EXISTS idx_crosier_sections_chapter ON crosier_sections(chapter_id);
CREATE INDEX IF NOT EXISTS idx_crosier_scripture_book ON crosier_scripture_references(book);
CREATE INDEX IF NOT EXISTS idx_crosier_scripture_chapter ON crosier_scripture_references(chapter_id);
CREATE INDEX IF NOT EXISTS idx_crosier_concepts_name ON crosier_theological_concepts(concept_name);
CREATE INDEX IF NOT EXISTS idx_crosier_annotations_user ON crosier_user_annotations(user_id);

-- Enable Row Level Security
ALTER TABLE crosier_book_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_scripture_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_theological_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_type_antitype_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_user_annotations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for book content
CREATE POLICY "Public can view book metadata"
  ON crosier_book_metadata FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view chapters"
  ON crosier_chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view sections"
  ON crosier_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view scripture references"
  ON crosier_scripture_references FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view theological concepts"
  ON crosier_theological_concepts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view type-antitype pairs"
  ON crosier_type_antitype_pairs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view diagrams"
  ON crosier_diagrams FOR SELECT
  TO public
  USING (true);

-- RLS Policies: Annotations (authenticated users)
CREATE POLICY "Public can view public annotations"
  ON crosier_user_annotations FOR SELECT
  TO public
  USING (is_public = true);

CREATE POLICY "Users can view own annotations"
  ON crosier_user_annotations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create annotations"
  ON crosier_user_annotations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own annotations"
  ON crosier_user_annotations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own annotations"
  ON crosier_user_annotations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
