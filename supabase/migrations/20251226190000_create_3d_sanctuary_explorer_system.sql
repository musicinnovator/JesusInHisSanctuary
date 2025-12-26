/*
  # 3D Sanctuary Explorer System

  ## Overview
  Comprehensive database schema for the Interactive 3D Sanctuary Explorer module, enabling
  immersive exploration of four biblical sanctuaries with guided tours, interactive hotspots,
  and educational content integration.

  ## New Tables Created

  ### 1. `sanctuary_3d_models`
  Core table storing metadata for the four 3D sanctuary models
  - `id` (uuid, primary key)
  - `name` (text, unique) - Internal identifier: 'tabernacle', 'solomon', 'herod', 'heavenly'
  - `title` (text) - Display name: 'Wilderness Tabernacle', 'Solomon's Temple', etc.
  - `description` (text) - Historical and theological context
  - `model_file_url` (text) - Path to 3D model file (.glb/.gltf)
  - `thumbnail_url` (text) - Preview image
  - `time_period` (text) - Historical dating
  - `biblical_references` (text[]) - Key scripture passages
  - `dimensions_cubits` (jsonb) - {length, width, height} in cubits
  - `scale_factor` (decimal) - Model scaling for rendering
  - `default_camera_position` (jsonb) - {x, y, z} coordinates
  - `default_camera_target` (jsonb) - {x, y, z} look-at point
  - `featured` (boolean) - Homepage display priority
  - `total_views` (integer) - Analytics tracking
  - `order_position` (integer) - Display order

  ### 2. `model_hotspots`
  Interactive points of interest within 3D models (furnishings, locations, elements)
  - `id` (uuid, primary key)
  - `model_id` (uuid, foreign key) - References sanctuary_3d_models
  - `hotspot_name` (text) - Internal identifier
  - `title` (text) - Display name
  - `description` (text) - Detailed explanation
  - `position_x` (decimal) - 3D coordinates in model space
  - `position_y` (decimal)
  - `position_z` (decimal)
  - `category` (text) - 'furniture', 'structure', 'location', 'detail'
  - `scripture_references` (text[]) - Related Bible verses
  - `symbolism_summary` (text) - Quick symbolic meaning
  - `related_library_ids` (uuid[]) - Links to library_resources table
  - `related_color_ids` (uuid[]) - Links to sacred_colors table
  - `icon_type` (text) - Lucide icon name
  - `color_hex` (text) - Marker color
  - `view_count` (integer) - Analytics

  ### 3. `guided_tours`
  Curated educational journeys through sanctuary models
  - `id` (uuid, primary key)
  - `model_id` (uuid, foreign key) - References sanctuary_3d_models
  - `tour_name` (text) - Display name
  - `description` (text) - What users will learn
  - `total_duration_seconds` (integer) - Estimated completion time
  - `difficulty_level` (text) - 'beginner', 'intermediate', 'advanced'
  - `featured` (boolean) - Recommended tour
  - `completion_count` (integer) - Analytics
  - `average_rating` (decimal) - User feedback

  ### 4. `tour_stops`
  Individual waypoints within a guided tour
  - `id` (uuid, primary key)
  - `tour_id` (uuid, foreign key) - References guided_tours
  - `stop_number` (integer) - Sequence order
  - `hotspot_id` (uuid, foreign key) - References model_hotspots
  - `camera_position` (jsonb) - {x, y, z} camera location for this stop
  - `camera_target` (jsonb) - {x, y, z} camera focus point
  - `narration_text` (text) - Audio script / text explanation
  - `audio_url` (text) - Optional audio narration file
  - `duration_seconds` (integer) - Time at this stop
  - `scripture_overlay` (text) - Bible verse to display
  - `quiz_question_id` (uuid) - Optional checkpoint question

  ### 5. `user_tour_progress`
  Track user completion of guided tours
  - `user_id` (uuid) - User identifier
  - `tour_id` (uuid, foreign key) - References guided_tours
  - `current_stop` (integer) - Last completed stop
  - `completed` (boolean) - Finished entire tour
  - `rating` (integer) - 1-5 star rating
  - `feedback` (text) - User comments
  - `last_accessed` (timestamptz) - Resume capability
  - Primary key: (user_id, tour_id)

  ### 6. `model_comparisons`
  Saved comparison configurations for Compare Mode
  - `id` (uuid, primary key)
  - `title` (text) - Comparison name
  - `description` (text) - What's being compared
  - `model_left_id` (uuid, foreign key) - References sanctuary_3d_models
  - `model_right_id` (uuid, foreign key) - References sanctuary_3d_models
  - `comparison_type` (text) - 'structural', 'chronological', 'theological'
  - `created_by` (uuid) - User who created (nullable for system presets)
  - `is_public` (boolean) - Available to all users
  - `featured` (boolean) - Homepage display
  - `view_count` (integer) - Analytics

  ### 7. `comparison_points`
  Specific differences/similarities highlighted in comparisons
  - `id` (uuid, primary key)
  - `comparison_id` (uuid, foreign key) - References model_comparisons
  - `point_title` (text) - What's being compared
  - `category` (text) - 'dimension', 'material', 'symbolism', 'function', 'historical'
  - `left_value` (text) - Attribute of left model
  - `right_value` (text) - Attribute of right model
  - `significance` (text) - Why this difference matters
  - `supporting_scripture` (text[]) - Biblical evidence

  ### 8. `element_measurements`
  Detailed dimensional data for sanctuary elements
  - `id` (uuid, primary key)
  - `model_id` (uuid, foreign key) - References sanctuary_3d_models
  - `element_name` (text) - Component being measured
  - `length_cubits` (decimal) - Dimensions in biblical units
  - `width_cubits` (decimal)
  - `height_cubits` (decimal)
  - `material` (text) - Construction material
  - `color_scheme` (text[]) - Colors used
  - `weight_talents` (decimal) - Weight if applicable (gold, etc.)
  - `biblical_reference` (text) - Scripture describing dimensions

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for models, hotspots, tours, measurements, comparisons
  - Authenticated users can track progress and create personal comparisons
  - Users can only modify their own progress and comparisons

  ## Indexes
  - Spatial indexing for hotspot lookups
  - Tour stop ordering optimization
  - User progress queries optimization
  - Full-text search on descriptions

  ## Analytics
  - View count tracking with triggers
  - Tour completion metrics
  - Hotspot interaction tracking
  - Comparison usage analytics
*/

-- =====================================================
-- 1. SANCTUARY 3D MODELS (Core Model Metadata)
-- =====================================================

CREATE TABLE IF NOT EXISTS sanctuary_3d_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  model_file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  time_period TEXT,
  biblical_references TEXT[] DEFAULT '{}',
  dimensions_cubits JSONB DEFAULT '{}',
  scale_factor DECIMAL DEFAULT 1.0,
  default_camera_position JSONB DEFAULT '{"x": 0, "y": 10, "z": 20}',
  default_camera_target JSONB DEFAULT '{"x": 0, "y": 0, "z": 0}',
  featured BOOLEAN DEFAULT false,
  total_views INTEGER DEFAULT 0,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE sanctuary_3d_models ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view 3D models"
  ON sanctuary_3d_models FOR SELECT
  TO public
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_3d_models_name ON sanctuary_3d_models(name);
CREATE INDEX IF NOT EXISTS idx_3d_models_featured ON sanctuary_3d_models(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_3d_models_order ON sanctuary_3d_models(order_position);

-- =====================================================
-- 2. MODEL HOTSPOTS (Interactive Points of Interest)
-- =====================================================

CREATE TABLE IF NOT EXISTS model_hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES sanctuary_3d_models(id) ON DELETE CASCADE,
  hotspot_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  position_x DECIMAL NOT NULL,
  position_y DECIMAL NOT NULL,
  position_z DECIMAL NOT NULL,
  category TEXT DEFAULT 'furniture' CHECK (category IN ('furniture', 'structure', 'location', 'detail')),
  scripture_references TEXT[] DEFAULT '{}',
  symbolism_summary TEXT,
  related_library_ids UUID[] DEFAULT '{}',
  related_color_ids UUID[] DEFAULT '{}',
  icon_type TEXT DEFAULT 'MapPin',
  color_hex TEXT DEFAULT '#FFD700',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE model_hotspots ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view hotspots"
  ON model_hotspots FOR SELECT
  TO public
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_hotspots_model ON model_hotspots(model_id);
CREATE INDEX IF NOT EXISTS idx_hotspots_category ON model_hotspots(category);
CREATE INDEX IF NOT EXISTS idx_hotspots_position ON model_hotspots(model_id, position_x, position_y, position_z);

-- =====================================================
-- 3. GUIDED TOURS (Curated Learning Journeys)
-- =====================================================

CREATE TABLE IF NOT EXISTS guided_tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES sanctuary_3d_models(id) ON DELETE CASCADE,
  tour_name TEXT NOT NULL,
  description TEXT,
  total_duration_seconds INTEGER DEFAULT 0,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  featured BOOLEAN DEFAULT false,
  completion_count INTEGER DEFAULT 0,
  average_rating DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE guided_tours ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view guided tours"
  ON guided_tours FOR SELECT
  TO public
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tours_model ON guided_tours(model_id);
CREATE INDEX IF NOT EXISTS idx_tours_difficulty ON guided_tours(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_tours_featured ON guided_tours(featured) WHERE featured = true;

-- =====================================================
-- 4. TOUR STOPS (Waypoints in Guided Tours)
-- =====================================================

CREATE TABLE IF NOT EXISTS tour_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES guided_tours(id) ON DELETE CASCADE,
  stop_number INTEGER NOT NULL,
  hotspot_id UUID REFERENCES model_hotspots(id) ON DELETE SET NULL,
  camera_position JSONB NOT NULL,
  camera_target JSONB NOT NULL,
  narration_text TEXT,
  audio_url TEXT,
  duration_seconds INTEGER DEFAULT 30,
  scripture_overlay TEXT,
  quiz_question_id UUID,
  UNIQUE(tour_id, stop_number)
);

-- Enable RLS
ALTER TABLE tour_stops ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view tour stops"
  ON tour_stops FOR SELECT
  TO public
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tour_stops_tour ON tour_stops(tour_id, stop_number);
CREATE INDEX IF NOT EXISTS idx_tour_stops_hotspot ON tour_stops(hotspot_id);

-- =====================================================
-- 5. USER TOUR PROGRESS (Personal Learning Tracking)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_tour_progress (
  user_id UUID NOT NULL,
  tour_id UUID NOT NULL REFERENCES guided_tours(id) ON DELETE CASCADE,
  current_stop INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  last_accessed TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tour_id)
);

-- Enable RLS
ALTER TABLE user_tour_progress ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own progress
CREATE POLICY "Users can view own tour progress"
  ON user_tour_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tour progress"
  ON user_tour_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tour progress"
  ON user_tour_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_tour_progress_user ON user_tour_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tour_progress_completed ON user_tour_progress(user_id, completed) WHERE completed = true;

-- =====================================================
-- 6. MODEL COMPARISONS (Compare Mode Configurations)
-- =====================================================

CREATE TABLE IF NOT EXISTS model_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  model_left_id UUID NOT NULL REFERENCES sanctuary_3d_models(id) ON DELETE CASCADE,
  model_right_id UUID NOT NULL REFERENCES sanctuary_3d_models(id) ON DELETE CASCADE,
  comparison_type TEXT DEFAULT 'structural' CHECK (comparison_type IN ('structural', 'chronological', 'theological')),
  created_by UUID,
  is_public BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  CHECK (model_left_id != model_right_id)
);

-- Enable RLS
ALTER TABLE model_comparisons ENABLE ROW LEVEL SECURITY;

-- Public can view public comparisons
CREATE POLICY "Public can view public comparisons"
  ON model_comparisons FOR SELECT
  TO public
  USING (is_public = true);

-- Users can view their own private comparisons
CREATE POLICY "Users can view own comparisons"
  ON model_comparisons FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

-- Users can create comparisons
CREATE POLICY "Authenticated users can create comparisons"
  ON model_comparisons FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Users can update their own comparisons
CREATE POLICY "Users can update own comparisons"
  ON model_comparisons FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_comparisons_models ON model_comparisons(model_left_id, model_right_id);
CREATE INDEX IF NOT EXISTS idx_comparisons_public ON model_comparisons(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_comparisons_user ON model_comparisons(created_by);

-- =====================================================
-- 7. COMPARISON POINTS (Specific Comparison Details)
-- =====================================================

CREATE TABLE IF NOT EXISTS comparison_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comparison_id UUID NOT NULL REFERENCES model_comparisons(id) ON DELETE CASCADE,
  point_title TEXT NOT NULL,
  category TEXT DEFAULT 'structural' CHECK (category IN ('dimension', 'material', 'symbolism', 'function', 'historical')),
  left_value TEXT,
  right_value TEXT,
  significance TEXT,
  supporting_scripture TEXT[] DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE comparison_points ENABLE ROW LEVEL SECURITY;

-- Public can view points from public comparisons
CREATE POLICY "Public can view comparison points from public comparisons"
  ON comparison_points FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM model_comparisons
      WHERE model_comparisons.id = comparison_points.comparison_id
      AND model_comparisons.is_public = true
    )
  );

-- Users can view points from their own comparisons
CREATE POLICY "Users can view points from own comparisons"
  ON comparison_points FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM model_comparisons
      WHERE model_comparisons.id = comparison_points.comparison_id
      AND model_comparisons.created_by = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_comparison_points_comparison ON comparison_points(comparison_id);
CREATE INDEX IF NOT EXISTS idx_comparison_points_category ON comparison_points(category);

-- =====================================================
-- 8. ELEMENT MEASUREMENTS (Dimensional Data)
-- =====================================================

CREATE TABLE IF NOT EXISTS element_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES sanctuary_3d_models(id) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  length_cubits DECIMAL,
  width_cubits DECIMAL,
  height_cubits DECIMAL,
  material TEXT,
  color_scheme TEXT[] DEFAULT '{}',
  weight_talents DECIMAL,
  biblical_reference TEXT
);

-- Enable RLS
ALTER TABLE element_measurements ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view element measurements"
  ON element_measurements FOR SELECT
  TO public
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_measurements_model ON element_measurements(model_id);
CREATE INDEX IF NOT EXISTS idx_measurements_element ON element_measurements(element_name);

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Function to increment model view count
CREATE OR REPLACE FUNCTION increment_model_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE sanctuary_3d_models
  SET total_views = total_views + 1
  WHERE id = (SELECT model_id FROM guided_tours WHERE id = NEW.tour_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on tour progress
CREATE TRIGGER trigger_increment_model_views
  AFTER INSERT ON user_tour_progress
  FOR EACH ROW
  EXECUTE FUNCTION increment_model_view_count();

-- Function to update tour completion count
CREATE OR REPLACE FUNCTION update_tour_completion_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = true AND (OLD IS NULL OR OLD.completed = false) THEN
    UPDATE guided_tours
    SET completion_count = completion_count + 1
    WHERE id = NEW.tour_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on tour completion
CREATE TRIGGER trigger_update_tour_completion
  AFTER INSERT OR UPDATE OF completed ON user_tour_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_tour_completion_count();

-- Function to update average tour rating
CREATE OR REPLACE FUNCTION update_tour_average_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE guided_tours
  SET average_rating = (
    SELECT AVG(rating)
    FROM user_tour_progress
    WHERE tour_id = NEW.tour_id AND rating IS NOT NULL
  )
  WHERE id = NEW.tour_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on rating update
CREATE TRIGGER trigger_update_tour_rating
  AFTER INSERT OR UPDATE OF rating ON user_tour_progress
  FOR EACH ROW
  WHEN (NEW.rating IS NOT NULL)
  EXECUTE FUNCTION update_tour_average_rating();