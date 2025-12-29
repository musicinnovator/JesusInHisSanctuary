/*
  # Fix Gilbert Chapters Table Schema

  ## Overview
  The gilbert_chapters table is missing required columns for the book content.
  This migration adds the missing columns to match the expected schema.

  ## Changes
  - Add content column (full chapter text)
  - Add summary column (brief chapter summary)
  - Add subtitle column (optional chapter subtitle)
  - Add key_themes column (array of themes)
  - Add scripture_references column (array of Bible references)
  - Add word_count column (approximate word count)
  - Remove columns that aren't needed (description, order_index if they exist)
*/

-- Add missing columns if they don't exist
DO $$ 
BEGIN
  -- Add content column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'content'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN content text;
  END IF;

  -- Add summary column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'summary'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN summary text;
  END IF;

  -- Add subtitle column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'subtitle'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN subtitle text;
  END IF;

  -- Add key_themes column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'key_themes'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN key_themes text[] DEFAULT '{}';
  END IF;

  -- Add scripture_references column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'scripture_references'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN scripture_references text[] DEFAULT '{}';
  END IF;

  -- Add word_count column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gilbert_chapters' AND column_name = 'word_count'
  ) THEN
    ALTER TABLE gilbert_chapters ADD COLUMN word_count integer DEFAULT 0;
  END IF;
END $$;

-- Make content and summary NOT NULL after adding them
ALTER TABLE gilbert_chapters ALTER COLUMN content SET NOT NULL;
ALTER TABLE gilbert_chapters ALTER COLUMN summary SET NOT NULL;