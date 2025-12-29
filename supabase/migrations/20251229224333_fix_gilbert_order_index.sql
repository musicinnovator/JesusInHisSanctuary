/*
  # Fix Gilbert Chapters order_index Column

  ## Overview
  Make order_index column nullable or provide default value.

  ## Changes
  - Make order_index nullable or set default
  - This allows seeding without requiring order_index
*/

-- Make order_index nullable and set default to chapter_number
ALTER TABLE gilbert_chapters 
  ALTER COLUMN order_index DROP NOT NULL;

-- Set default value for order_index to be the same as chapter_number
ALTER TABLE gilbert_chapters 
  ALTER COLUMN order_index SET DEFAULT 0;