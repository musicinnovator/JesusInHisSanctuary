/*
  # Enhanced Crosier Book Features System

  ## Overview
  This migration creates the database structure for four new features:
  1. Scripture Reference Index with full KJV texts
  2. Theological Concepts Map with relationships
  3. Interactive Diagrams
  4. Historical/Contemporary/Biblical Timelines

  ## New Tables
  
  ### `crosier_scripture_texts`
  Stores full KJV text for each scripture reference in the book
  - `id` (uuid, primary key)
  - `reference_id` (uuid, foreign key to crosier_scripture_references)
  - `kjv_text` (text, full verse text)
  - `book` (text, Bible book name)
  - `chapter` (integer)
  - `verse_start` (integer)
  - `verse_end` (integer, nullable for single verses)
  - `usage_context` (text, how Crosier uses this verse)
  - `theme` (text, theological theme)
  - `cross_references` (text[], related verses)
  - `created_at` (timestamp)

  ### `crosier_concept_relationships`
  Defines relationships between theological concepts
  - `id` (uuid, primary key)
  - `concept_from_id` (uuid, foreign key)
  - `concept_to_id` (uuid, foreign key)
  - `relationship_type` (text: depends_on, contrasts_with, fulfills, precedes)
  - `strength` (integer, 1-10 for visualization sizing)
  - `description` (text, explains the relationship)
  - `created_at` (timestamp)

  ### `crosier_diagrams`
  Defines diagram metadata
  - `id` (uuid, primary key)
  - `diagram_type` (text: sanctuary_comparison, type_antitype, ministry_phases, prophecy_timeline)
  - `title` (text)
  - `description` (text)
  - `display_order` (integer)
  - `viewBox` (text, SVG viewBox dimensions)
  - `created_at` (timestamp)

  ### `crosier_diagram_elements`
  Individual elements within each diagram
  - `id` (uuid, primary key)
  - `diagram_id` (uuid, foreign key)
  - `element_type` (text: box, arrow, label, icon, image)
  - `element_data` (jsonb, contains type-specific data)
  - `position` (jsonb, x, y, width, height)
  - `related_scripture_ref` (text, optional scripture link)
  - `related_chapter_id` (uuid, optional chapter link)
  - `interactive` (boolean, clickable?)
  - `style` (jsonb, colors, fonts, etc)
  - `display_order` (integer)
  - `created_at` (timestamp)

  ### `crosier_timeline_events`
  Events for three timeline types
  - `id` (uuid, primary key)
  - `timeline_type` (text: historical, contemporary, biblical)
  - `event_date` (date)
  - `event_year` (integer, for BCE/CE handling)
  - `event_title` (text)
  - `event_description` (text)
  - `significance` (text, theological/historical importance)
  - `related_scriptures` (text[], scripture references)
  - `related_people` (text[], key figures)
  - `related_concepts` (uuid[], links to theological concepts)
  - `image_url` (text, optional)
  - `display_order` (integer)
  - `created_at` (timestamp)

  ## Security
  - Enable RLS on all tables
  - Allow public read access (educational content)
  - Restrict write access to service role only
*/

-- Create scripture texts table
CREATE TABLE IF NOT EXISTS crosier_scripture_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id uuid REFERENCES crosier_scripture_references(id) ON DELETE CASCADE,
  kjv_text text NOT NULL,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse_start integer NOT NULL,
  verse_end integer,
  usage_context text,
  theme text,
  cross_references text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create concept relationships table
CREATE TABLE IF NOT EXISTS crosier_concept_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_from_id uuid REFERENCES crosier_theological_concepts(id) ON DELETE CASCADE,
  concept_to_id uuid REFERENCES crosier_theological_concepts(id) ON DELETE CASCADE,
  relationship_type text NOT NULL CHECK (relationship_type IN ('depends_on', 'contrasts_with', 'fulfills', 'precedes', 'supports', 'exemplifies')),
  strength integer DEFAULT 5 CHECK (strength BETWEEN 1 AND 10),
  description text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT no_self_reference CHECK (concept_from_id != concept_to_id)
);

-- Create diagrams table
CREATE TABLE IF NOT EXISTS crosier_diagrams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_type text NOT NULL CHECK (diagram_type IN ('sanctuary_comparison', 'type_antitype', 'ministry_phases', 'prophecy_timeline')),
  title text NOT NULL,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  viewbox text DEFAULT '0 0 1200 800',
  created_at timestamptz DEFAULT now()
);

-- Create diagram elements table
CREATE TABLE IF NOT EXISTS crosier_diagram_elements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_id uuid REFERENCES crosier_diagrams(id) ON DELETE CASCADE,
  element_type text NOT NULL CHECK (element_type IN ('box', 'arrow', 'label', 'icon', 'image', 'line')),
  element_data jsonb NOT NULL DEFAULT '{}',
  position jsonb NOT NULL DEFAULT '{"x": 0, "y": 0, "width": 100, "height": 100}',
  related_scripture_ref text,
  related_chapter_id uuid REFERENCES crosier_chapters(id),
  interactive boolean DEFAULT false,
  style jsonb DEFAULT '{}',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create timeline events table
CREATE TABLE IF NOT EXISTS crosier_timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_type text NOT NULL CHECK (timeline_type IN ('historical', 'contemporary', 'biblical')),
  event_date date,
  event_year integer NOT NULL,
  event_title text NOT NULL,
  event_description text,
  significance text,
  related_scriptures text[] DEFAULT '{}',
  related_people text[] DEFAULT '{}',
  related_concepts uuid[] DEFAULT '{}',
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scripture_texts_reference ON crosier_scripture_texts(reference_id);
CREATE INDEX IF NOT EXISTS idx_scripture_texts_book ON crosier_scripture_texts(book);
CREATE INDEX IF NOT EXISTS idx_scripture_texts_theme ON crosier_scripture_texts(theme);
CREATE INDEX IF NOT EXISTS idx_concept_relationships_from ON crosier_concept_relationships(concept_from_id);
CREATE INDEX IF NOT EXISTS idx_concept_relationships_to ON crosier_concept_relationships(concept_to_id);
CREATE INDEX IF NOT EXISTS idx_diagram_elements_diagram ON crosier_diagram_elements(diagram_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_type ON crosier_timeline_events(timeline_type);
CREATE INDEX IF NOT EXISTS idx_timeline_events_year ON crosier_timeline_events(event_year);

-- Enable Row Level Security
ALTER TABLE crosier_scripture_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_concept_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_diagram_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE crosier_timeline_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (educational content)
CREATE POLICY "Allow public read access to scripture texts"
  ON crosier_scripture_texts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to concept relationships"
  ON crosier_concept_relationships
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to diagrams"
  ON crosier_diagrams
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to diagram elements"
  ON crosier_diagram_elements
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to timeline events"
  ON crosier_timeline_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert policies for seeding (service role only)
CREATE POLICY "Allow service role to insert scripture texts"
  ON crosier_scripture_texts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert concept relationships"
  ON crosier_concept_relationships
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert diagrams"
  ON crosier_diagrams
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert diagram elements"
  ON crosier_diagram_elements
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert timeline events"
  ON crosier_timeline_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);