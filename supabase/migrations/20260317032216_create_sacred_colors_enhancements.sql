/*
  # Sacred Colors Enhancement System

  1. New Tables
    - `color_symbolic_meanings`
      - Stores expandable theological explanations for each symbolic meaning
      - Links to sacred colors with detailed SDA commentary
    - `color_scripture_texts`
      - Stores full scripture text content for inline viewing
      - Multiple translations support (KJV, NKJV, ESV)
    - `color_symbolic_relationships`
      - Links symbolic meanings to related concepts and symbols

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Color Symbolic Meanings Table
CREATE TABLE IF NOT EXISTS color_symbolic_meanings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  color_id uuid REFERENCES sacred_colors(id) ON DELETE CASCADE,
  meaning_title text NOT NULL,
  short_description text NOT NULL,
  detailed_explanation text NOT NULL,
  sda_theological_perspective text,
  eg_white_quote text,
  eg_white_reference text,
  related_sanctuary_concept text,
  practical_application text,
  order_index integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE color_symbolic_meanings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to color symbolic meanings"
  ON color_symbolic_meanings
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated insert on color symbolic meanings"
  ON color_symbolic_meanings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Color Scripture Texts Table
CREATE TABLE IF NOT EXISTS color_scripture_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  color_id uuid REFERENCES sacred_colors(id) ON DELETE CASCADE,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse_start integer NOT NULL,
  verse_end integer,
  translation text NOT NULL CHECK (translation IN ('KJV', 'NKJV', 'ESV', 'NIV')),
  text_content text NOT NULL,
  context_before text,
  context_after text,
  key_phrases text[] DEFAULT '{}',
  theological_notes text,
  cross_references text[] DEFAULT '{}',
  is_primary_reference boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE color_scripture_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to scripture texts"
  ON color_scripture_texts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated insert on scripture texts"
  ON color_scripture_texts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Color Symbolic Relationships Table
CREATE TABLE IF NOT EXISTS color_symbolic_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meaning_id uuid REFERENCES color_symbolic_meanings(id) ON DELETE CASCADE,
  related_type text NOT NULL CHECK (related_type IN ('sanctuary_symbol', 'biblical_concept', 'prophetic_type', 'historical_event')),
  related_name text NOT NULL,
  relationship_description text,
  scripture_support text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE color_symbolic_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to symbolic relationships"
  ON color_symbolic_relationships
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated insert on symbolic relationships"
  ON color_symbolic_relationships
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_color_meanings_color_id ON color_symbolic_meanings(color_id);
CREATE INDEX IF NOT EXISTS idx_color_meanings_order ON color_symbolic_meanings(color_id, order_index);
CREATE INDEX IF NOT EXISTS idx_scripture_texts_color_id ON color_scripture_texts(color_id);
CREATE INDEX IF NOT EXISTS idx_scripture_texts_reference ON color_scripture_texts(book, chapter, verse_start);
CREATE INDEX IF NOT EXISTS idx_symbolic_relationships_meaning ON color_symbolic_relationships(meaning_id);
