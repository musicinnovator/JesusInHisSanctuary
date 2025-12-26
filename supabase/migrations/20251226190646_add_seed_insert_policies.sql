/*
  # Add INSERT Policies for Seeding

  ## Overview
  Temporarily add INSERT policies to allow seeding of initial educational content.
  These policies allow public insertion for setup purposes and can be revoked after seeding.

  ## Changes
  - Add INSERT policies for sacred_colors tables
  - Add INSERT policies for 3D explorer tables
  - These are for initial data population only
*/

-- Sacred Colors INSERT policies
CREATE POLICY "Allow public insert for seeding sacred_colors"
  ON sacred_colors FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding color_symbolism"
  ON color_symbolism FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding color_applications"
  ON color_applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding color_combinations"
  ON color_combinations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding color_quiz_questions"
  ON color_quiz_questions FOR INSERT
  TO public
  WITH CHECK (true);