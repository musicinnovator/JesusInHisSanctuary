/*
  # Add Missing Columns to Crosier Diagrams Tables

  ## Changes
  - Add display_order column to crosier_diagrams
  - Add viewbox column to crosier_diagrams  
  - These columns are needed for the enhanced diagram functionality
*/

-- Add display_order to diagrams table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crosier_diagrams' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE crosier_diagrams ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Add viewbox to diagrams table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crosier_diagrams' AND column_name = 'viewbox'
  ) THEN
    ALTER TABLE crosier_diagrams ADD COLUMN viewbox text DEFAULT '0 0 1200 800';
  END IF;
END $$;