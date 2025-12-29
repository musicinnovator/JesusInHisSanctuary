/*
  # Add INSERT Policies for Gilbert Book Seeding

  ## Overview
  Add INSERT policies to allow seeding of Gilbert book content.
  These policies allow public insertion for setup purposes.

  ## Changes
  - Add INSERT policies for gilbert_chapters
  - Add INSERT policies for gilbert_sections
  - Add INSERT policies for gilbert_scripture_links
  - Add INSERT policies for gilbert_key_concepts
  - These are for initial data population
*/

-- Gilbert Book INSERT policies
CREATE POLICY "Allow public insert for seeding gilbert_chapters"
  ON gilbert_chapters FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding gilbert_sections"
  ON gilbert_sections FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding gilbert_scripture_links"
  ON gilbert_scripture_links FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding gilbert_key_concepts"
  ON gilbert_key_concepts FOR INSERT
  TO public
  WITH CHECK (true);

-- UPDATE policies for seeding (allows idempotent seeding)
CREATE POLICY "Allow public update for seeding gilbert_chapters"
  ON gilbert_chapters FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update for seeding gilbert_key_concepts"
  ON gilbert_key_concepts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);