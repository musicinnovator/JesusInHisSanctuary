/*
  # Create F.C. Gilbert "Messiah in His Sanctuary" Book System

  1. New Tables
    - `gilbert_chapters`
      - `id` (uuid, primary key)
      - `chapter_number` (integer) - Chapter order (0 for Introduction)
      - `title` (text) - Chapter title
      - `subtitle` (text, nullable) - Chapter subtitle
      - `content` (text) - Full chapter content
      - `summary` (text) - Brief chapter summary
      - `key_themes` (text array) - Main themes/topics
      - `scripture_references` (text array) - Bible references cited
      - `word_count` (integer) - Approximate word count
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `gilbert_sections`
      - `id` (uuid, primary key)
      - `chapter_id` (uuid, foreign key)
      - `section_number` (integer) - Order within chapter
      - `heading` (text, nullable) - Section heading
      - `content` (text) - Section text content
      - `created_at` (timestamptz)

    - `gilbert_scripture_links`
      - `id` (uuid, primary key)
      - `chapter_id` (uuid, foreign key)
      - `scripture_reference` (text) - Bible reference
      - `context` (text) - How it's used in the chapter
      - `created_at` (timestamptz)

    - `gilbert_key_concepts`
      - `id` (uuid, primary key)
      - `concept_name` (text) - Key theological concept
      - `definition` (text) - Explanation of the concept
      - `chapters` (uuid array) - Related chapter IDs
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (educational content)
    - Add policies for authenticated seed operations
*/

-- Create gilbert_chapters table
CREATE TABLE IF NOT EXISTS gilbert_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number integer NOT NULL,
  title text NOT NULL,
  subtitle text,
  content text NOT NULL,
  summary text NOT NULL,
  key_themes text[] DEFAULT '{}',
  scripture_references text[] DEFAULT '{}',
  word_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gilbert_sections table
CREATE TABLE IF NOT EXISTS gilbert_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  section_number integer NOT NULL,
  heading text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create gilbert_scripture_links table
CREATE TABLE IF NOT EXISTS gilbert_scripture_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES gilbert_chapters(id) ON DELETE CASCADE,
  scripture_reference text NOT NULL,
  context text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create gilbert_key_concepts table
CREATE TABLE IF NOT EXISTS gilbert_key_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_name text NOT NULL UNIQUE,
  definition text NOT NULL,
  chapters uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gilbert_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE gilbert_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE gilbert_scripture_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE gilbert_key_concepts ENABLE ROW LEVEL SECURITY;

-- Policies for gilbert_chapters
CREATE POLICY "Anyone can view Gilbert chapters"
  ON gilbert_chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Gilbert chapters"
  ON gilbert_chapters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Gilbert chapters"
  ON gilbert_chapters FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for gilbert_sections
CREATE POLICY "Anyone can view Gilbert sections"
  ON gilbert_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Gilbert sections"
  ON gilbert_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for gilbert_scripture_links
CREATE POLICY "Anyone can view Gilbert scripture links"
  ON gilbert_scripture_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Gilbert scripture links"
  ON gilbert_scripture_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for gilbert_key_concepts
CREATE POLICY "Anyone can view Gilbert key concepts"
  ON gilbert_key_concepts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Gilbert key concepts"
  ON gilbert_key_concepts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Gilbert key concepts"
  ON gilbert_key_concepts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gilbert_chapters_number ON gilbert_chapters(chapter_number);
CREATE INDEX IF NOT EXISTS idx_gilbert_sections_chapter ON gilbert_sections(chapter_id);
CREATE INDEX IF NOT EXISTS idx_gilbert_scripture_chapter ON gilbert_scripture_links(chapter_id);
CREATE INDEX IF NOT EXISTS idx_gilbert_concepts_name ON gilbert_key_concepts(concept_name);