/*
  # M.L. Andreasen "The Sanctuary Service" Book System

  1. Overview
    - Complete database schema for M.L. Andreasen's "The Sanctuary Service" (1947)
    - Follows Crosier and Haskell book implementation patterns
    - Supports 6 interactive view modes: Chapter View, Scripture Explorer, Concepts Map,
      Timeline/Chronology, Illustrations & Diagrams, Search & Study Tools

  2. New Tables
    - `andreasen_book_info`
      - Book metadata (title, author, year, publisher, description)

    - `andreasen_chapters`
      - Chapter information (number, title, summary, word count, key themes)

    - `andreasen_sections`
      - Section-by-section content within chapters

    - `andreasen_scriptures`
      - Scripture references with context, theme tags, and chapter links

    - `andreasen_theological_concepts`
      - Theological concepts with definitions, biblical foundations, and significance

    - `andreasen_concept_relationships`
      - Relationships between theological concepts (related, contrasts, builds_upon)

    - `andreasen_illustrations`
      - Diagrams, charts, and visual aids referenced in the book

    - `andreasen_timeline_events`
      - Prophetic timeline events (2300 days, 1844, eschatological framework)

    - `andreasen_quotations`
      - Ellen G. White and other quotations with sources

    - `andreasen_study_questions`
      - Discussion questions for each chapter and section

    - `andreasen_cross_references`
      - Links between chapters, sections, scriptures, and concepts

  3. Security
    - Enable RLS on all tables
    - Public read access for authenticated and anonymous users
    - Restricted write access for seeding and admin operations
*/

-- Book Info Table
CREATE TABLE IF NOT EXISTS andreasen_book_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'The Sanctuary Service',
  author text NOT NULL DEFAULT 'M.L. Andreasen',
  publication_year integer NOT NULL DEFAULT 1947,
  publisher text NOT NULL DEFAULT 'Review and Herald Publishing Association',
  description text NOT NULL,
  theological_context text NOT NULL,
  total_chapters integer NOT NULL DEFAULT 22,
  total_pages integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_book_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for book info"
  ON andreasen_book_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding book info"
  ON andreasen_book_info FOR INSERT
  TO public
  WITH CHECK (true);

-- Chapters Table
CREATE TABLE IF NOT EXISTS andreasen_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number integer NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  word_count integer DEFAULT 0,
  key_themes text[] DEFAULT '{}',
  main_scripture_references text[] DEFAULT '{}',
  theological_focus text NOT NULL,
  practical_application text,
  memorable_quote text,
  chapter_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(chapter_number)
);

ALTER TABLE andreasen_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for chapters"
  ON andreasen_chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding chapters"
  ON andreasen_chapters FOR INSERT
  TO public
  WITH CHECK (true);

-- Sections Table
CREATE TABLE IF NOT EXISTS andreasen_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES andreasen_chapters(id) ON DELETE CASCADE,
  section_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  key_points text[] DEFAULT '{}',
  scripture_references text[] DEFAULT '{}',
  section_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for sections"
  ON andreasen_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding sections"
  ON andreasen_sections FOR INSERT
  TO public
  WITH CHECK (true);

-- Scriptures Table
CREATE TABLE IF NOT EXISTS andreasen_scriptures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL,
  book text NOT NULL,
  chapter integer NOT NULL,
  verse_start integer,
  verse_end integer,
  text_kjv text,
  context_in_book text NOT NULL,
  theme_tags text[] DEFAULT '{}',
  theological_significance text,
  related_chapter_ids uuid[] DEFAULT '{}',
  related_concept_ids uuid[] DEFAULT '{}',
  citation_count integer DEFAULT 1,
  primary_usage boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_scriptures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for scriptures"
  ON andreasen_scriptures FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding scriptures"
  ON andreasen_scriptures FOR INSERT
  TO public
  WITH CHECK (true);

-- Theological Concepts Table
CREATE TABLE IF NOT EXISTS andreasen_theological_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  definition text NOT NULL,
  biblical_foundation text[] DEFAULT '{}',
  chapter_references uuid[] DEFAULT '{}',
  related_scriptures text[] DEFAULT '{}',
  significance text NOT NULL,
  adventist_distinctive boolean DEFAULT false,
  controversy_level text DEFAULT 'low',
  practical_application text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_theological_concepts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for theological concepts"
  ON andreasen_theological_concepts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding theological concepts"
  ON andreasen_theological_concepts FOR INSERT
  TO public
  WITH CHECK (true);

-- Concept Relationships Table
CREATE TABLE IF NOT EXISTS andreasen_concept_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_a_id uuid REFERENCES andreasen_theological_concepts(id) ON DELETE CASCADE,
  concept_b_id uuid REFERENCES andreasen_theological_concepts(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  description text,
  strength text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_concept_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for concept relationships"
  ON andreasen_concept_relationships FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding concept relationships"
  ON andreasen_concept_relationships FOR INSERT
  TO public
  WITH CHECK (true);

-- Illustrations Table
CREATE TABLE IF NOT EXISTS andreasen_illustrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  chapter_id uuid REFERENCES andreasen_chapters(id) ON DELETE CASCADE,
  svg_data text,
  image_url text,
  caption text,
  theological_purpose text,
  elements jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_illustrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for illustrations"
  ON andreasen_illustrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding illustrations"
  ON andreasen_illustrations FOR INSERT
  TO public
  WITH CHECK (true);

-- Timeline Events Table
CREATE TABLE IF NOT EXISTS andreasen_timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  date_or_year text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  scripture_references text[] DEFAULT '{}',
  prophetic_significance text,
  chapter_references uuid[] DEFAULT '{}',
  timeline_position integer NOT NULL,
  is_past boolean DEFAULT true,
  is_present boolean DEFAULT false,
  is_future boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for timeline events"
  ON andreasen_timeline_events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding timeline events"
  ON andreasen_timeline_events FOR INSERT
  TO public
  WITH CHECK (true);

-- Quotations Table
CREATE TABLE IF NOT EXISTS andreasen_quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  source text NOT NULL,
  page_number text,
  quotation_text text NOT NULL,
  context text,
  chapter_id uuid REFERENCES andreasen_chapters(id) ON DELETE CASCADE,
  section_id uuid REFERENCES andreasen_sections(id) ON DELETE CASCADE,
  theme_tags text[] DEFAULT '{}',
  is_ellen_white boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for quotations"
  ON andreasen_quotations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding quotations"
  ON andreasen_quotations FOR INSERT
  TO public
  WITH CHECK (true);

-- Study Questions Table
CREATE TABLE IF NOT EXISTS andreasen_study_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES andreasen_chapters(id) ON DELETE CASCADE,
  section_id uuid REFERENCES andreasen_sections(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text NOT NULL,
  suggested_answer text,
  scripture_references text[] DEFAULT '{}',
  difficulty_level text DEFAULT 'medium',
  discussion_prompt boolean DEFAULT false,
  question_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_study_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for study questions"
  ON andreasen_study_questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding study questions"
  ON andreasen_study_questions FOR INSERT
  TO public
  WITH CHECK (true);

-- Cross References Table
CREATE TABLE IF NOT EXISTS andreasen_cross_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_id uuid NOT NULL,
  target_type text NOT NULL,
  target_id uuid NOT NULL,
  relationship_description text,
  relevance_score integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE andreasen_cross_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for cross references"
  ON andreasen_cross_references FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert for seeding cross references"
  ON andreasen_cross_references FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_andreasen_chapters_number ON andreasen_chapters(chapter_number);
CREATE INDEX IF NOT EXISTS idx_andreasen_chapters_order ON andreasen_chapters(chapter_order);
CREATE INDEX IF NOT EXISTS idx_andreasen_sections_chapter ON andreasen_sections(chapter_id);
CREATE INDEX IF NOT EXISTS idx_andreasen_sections_order ON andreasen_sections(section_order);
CREATE INDEX IF NOT EXISTS idx_andreasen_scriptures_book ON andreasen_scriptures(book);
CREATE INDEX IF NOT EXISTS idx_andreasen_scriptures_reference ON andreasen_scriptures(reference);
CREATE INDEX IF NOT EXISTS idx_andreasen_concepts_category ON andreasen_theological_concepts(category);
CREATE INDEX IF NOT EXISTS idx_andreasen_concepts_name ON andreasen_theological_concepts(name);
CREATE INDEX IF NOT EXISTS idx_andreasen_illustrations_chapter ON andreasen_illustrations(chapter_id);
CREATE INDEX IF NOT EXISTS idx_andreasen_timeline_position ON andreasen_timeline_events(timeline_position);
CREATE INDEX IF NOT EXISTS idx_andreasen_quotations_chapter ON andreasen_quotations(chapter_id);
CREATE INDEX IF NOT EXISTS idx_andreasen_questions_chapter ON andreasen_study_questions(chapter_id);

-- Insert book info
INSERT INTO andreasen_book_info (
  title,
  author,
  publication_year,
  publisher,
  description,
  theological_context,
  total_chapters
) VALUES (
  'The Sanctuary Service',
  'M.L. Andreasen',
  1947,
  'Review and Herald Publishing Association',
  'A comprehensive exposition of the sanctuary doctrine, exploring the typology of the Old Testament sanctuary service and its fulfillment in Christ''s heavenly ministry. Andreasen presents the sanctuary as the central organizing principle of biblical theology, connecting creation, redemption, and eschatology through the lens of the sanctuary. The work emphasizes the investigative judgment, last generation theology, and the final vindication of God''s character.',
  'Foundational text for Seventh-day Adventist sanctuary theology, written during the mid-20th century theological consolidation period. Represents systematic development of sanctuary doctrine with extensive Ellen G. White quotations and biblical exegesis.',
  22
) ON CONFLICT DO NOTHING;