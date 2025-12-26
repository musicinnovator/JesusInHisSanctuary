/*
  # Add 3D Explorer Seeding Policies

  ## Overview
  Add INSERT, UPDATE, and DELETE policies to allow seeding of 3D sanctuary explorer content.
  These policies enable the seeding script to populate initial educational data.

  ## Changes
  - Add INSERT policies for all 3D explorer tables
  - Add UPDATE policies for idempotent seeding
  - Add DELETE policy for tour_stops to allow re-seeding

  ## Security Note
  These are temporary policies for initial data population.
  In production, these should be revoked and replaced with proper admin-only policies.
*/

-- 3D Sanctuary Explorer INSERT policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'sanctuary_3d_models' 
    AND policyname = 'Allow public insert for seeding sanctuary_3d_models'
  ) THEN
    CREATE POLICY "Allow public insert for seeding sanctuary_3d_models"
      ON sanctuary_3d_models FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'model_hotspots' 
    AND policyname = 'Allow public insert for seeding model_hotspots'
  ) THEN
    CREATE POLICY "Allow public insert for seeding model_hotspots"
      ON model_hotspots FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'guided_tours' 
    AND policyname = 'Allow public insert for seeding guided_tours'
  ) THEN
    CREATE POLICY "Allow public insert for seeding guided_tours"
      ON guided_tours FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tour_stops' 
    AND policyname = 'Allow public insert for seeding tour_stops'
  ) THEN
    CREATE POLICY "Allow public insert for seeding tour_stops"
      ON tour_stops FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'model_comparisons' 
    AND policyname = 'Allow public insert for seeding model_comparisons'
  ) THEN
    CREATE POLICY "Allow public insert for seeding model_comparisons"
      ON model_comparisons FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'comparison_points' 
    AND policyname = 'Allow public insert for seeding comparison_points'
  ) THEN
    CREATE POLICY "Allow public insert for seeding comparison_points"
      ON comparison_points FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'element_measurements' 
    AND policyname = 'Allow public insert for seeding element_measurements'
  ) THEN
    CREATE POLICY "Allow public insert for seeding element_measurements"
      ON element_measurements FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- UPDATE policies for idempotent seeding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'sanctuary_3d_models' 
    AND policyname = 'Allow public update for seeding sanctuary_3d_models'
  ) THEN
    CREATE POLICY "Allow public update for seeding sanctuary_3d_models"
      ON sanctuary_3d_models FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'model_hotspots' 
    AND policyname = 'Allow public update for seeding model_hotspots'
  ) THEN
    CREATE POLICY "Allow public update for seeding model_hotspots"
      ON model_hotspots FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'guided_tours' 
    AND policyname = 'Allow public update for seeding guided_tours'
  ) THEN
    CREATE POLICY "Allow public update for seeding guided_tours"
      ON guided_tours FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tour_stops' 
    AND policyname = 'Allow public update for seeding tour_stops'
  ) THEN
    CREATE POLICY "Allow public update for seeding tour_stops"
      ON tour_stops FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'element_measurements' 
    AND policyname = 'Allow public update for seeding element_measurements'
  ) THEN
    CREATE POLICY "Allow public update for seeding element_measurements"
      ON element_measurements FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- DELETE policy for tour_stops (to allow re-seeding of tours)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tour_stops' 
    AND policyname = 'Allow public delete for seeding tour_stops'
  ) THEN
    CREATE POLICY "Allow public delete for seeding tour_stops"
      ON tour_stops FOR DELETE
      TO public
      USING (true);
  END IF;
END $$;
