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

-- 3D Sanctuary Explorer INSERT policies
CREATE POLICY "Allow public insert for seeding sanctuary_3d_models"
  ON sanctuary_3d_models FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding model_hotspots"
  ON model_hotspots FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding guided_tours"
  ON guided_tours FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding tour_stops"
  ON tour_stops FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding model_comparisons"
  ON model_comparisons FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding comparison_points"
  ON comparison_points FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert for seeding element_measurements"
  ON element_measurements FOR INSERT
  TO public
  WITH CHECK (true);

-- UPDATE policies for seeding (allows idempotent seeding)
CREATE POLICY "Allow public update for seeding sanctuary_3d_models"
  ON sanctuary_3d_models FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update for seeding model_hotspots"
  ON model_hotspots FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update for seeding guided_tours"
  ON guided_tours FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update for seeding tour_stops"
  ON tour_stops FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update for seeding element_measurements"
  ON element_measurements FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- DELETE policies for tour_stops (to allow re-seeding of tours)
CREATE POLICY "Allow public delete for seeding tour_stops"
  ON tour_stops FOR DELETE
  TO public
  USING (true);