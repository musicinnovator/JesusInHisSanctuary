/*
  # Digital Library System - Complete Schema

  ## Overview
  Comprehensive database schema for the Curated Digital Library featuring Seventh-day Adventist
  sanctuary theology resources, books, articles, and academic papers.

  ## New Tables
  
  ### Core Resource Tables
  - `library_authors`: Author biographical information
  - `library_categories`: Resource categorization
  - `library_resources`: Main resource data
    
  ### User Interaction Tables
  - `library_bookmarks`: User saved resources
  - `library_reading_history`: Reading progress tracking
  - `library_ratings`: User ratings and reviews
  - `library_downloads`: Download tracking
  
  ### Organization Tables
  - `library_collections`: Curated resource groups
  - `library_collection_resources`: Collection membership
  - `library_tags`: Flexible tagging system
  - `library_resource_tags`: Resource-tag relationships
  
  ## Security
  - RLS enabled on all tables
  - Public read access for verified resources
  - Authenticated users can manage their own bookmarks, ratings, history
  - Download tracking for analytics
*/

-- AUTHORS TABLE
CREATE TABLE IF NOT EXISTS library_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  biography TEXT,
  photo_url TEXT,
  nationality TEXT,
  denomination TEXT DEFAULT 'Seventh-day Adventist',
  notable_works TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS library_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  color_scheme TEXT,
  parent_category_id UUID REFERENCES library_categories(id) ON DELETE SET NULL,
  resource_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RESOURCES TABLE
CREATE TABLE IF NOT EXISTS library_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  author_id UUID REFERENCES library_authors(id) ON DELETE SET NULL,
  co_authors TEXT[],
  category_id UUID REFERENCES library_categories(id) ON DELETE SET NULL,
  resource_type TEXT CHECK (resource_type IN ('book', 'article', 'paper', 'dissertation', 'commentary', 'manuscript', 'periodical')),
  publisher TEXT,
  publication_year INTEGER,
  edition TEXT,
  isbn TEXT,
  total_pages INTEGER,
  description TEXT NOT NULL,
  abstract TEXT,
  keywords TEXT[],
  language TEXT DEFAULT 'English',
  cover_image_url TEXT,
  pdf_url TEXT,
  pdf_file_size BIGINT,
  external_link TEXT,
  citation_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0 CHECK (average_rating >= 0 AND average_rating <= 5),
  total_ratings INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT true,
  copyright_status TEXT CHECK (copyright_status IN ('public_domain', 'copyrighted', 'creative_commons', 'fair_use')),
  license_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- USER BOOKMARKS
CREATE TABLE IF NOT EXISTS library_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

-- READING HISTORY
CREATE TABLE IF NOT EXISTS library_reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE NOT NULL,
  last_page INTEGER DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_accessed_at TIMESTAMPTZ DEFAULT now(),
  completed BOOLEAN DEFAULT false,
  UNIQUE(user_id, resource_id)
);

-- USER RATINGS
CREATE TABLE IF NOT EXISTS library_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

-- DOWNLOAD TRACKING
CREATE TABLE IF NOT EXISTS library_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- COLLECTIONS
CREATE TABLE IF NOT EXISTS library_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  curator_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- COLLECTION RESOURCES (Junction table)
CREATE TABLE IF NOT EXISTS library_collection_resources (
  collection_id UUID REFERENCES library_collections(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (collection_id, resource_id)
);

-- TAGS
CREATE TABLE IF NOT EXISTS library_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RESOURCE TAGS (Junction table)
CREATE TABLE IF NOT EXISTS library_resource_tags (
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES library_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, tag_id)
);

-- INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_resources_author ON library_resources(author_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON library_resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON library_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_year ON library_resources(publication_year);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON library_resources(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_resources_verified ON library_resources(verified) WHERE verified = true;
CREATE INDEX IF NOT EXISTS idx_resources_title_search ON library_resources USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_resources_description_search ON library_resources USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON library_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_history_user ON library_reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_resource ON library_ratings(resource_id);
CREATE INDEX IF NOT EXISTS idx_downloads_resource ON library_downloads(resource_id);
CREATE INDEX IF NOT EXISTS idx_downloads_date ON library_downloads(downloaded_at);

-- ROW LEVEL SECURITY POLICIES

-- Authors: Public read
ALTER TABLE library_authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view authors"
  ON library_authors FOR SELECT
  USING (true);

-- Categories: Public read
ALTER TABLE library_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON library_categories FOR SELECT
  USING (true);

-- Resources: Public read for verified resources
ALTER TABLE library_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view verified resources"
  ON library_resources FOR SELECT
  USING (verified = true);

-- Bookmarks: Users manage their own
ALTER TABLE library_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON library_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON library_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks"
  ON library_bookmarks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON library_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reading History: Users manage their own
ALTER TABLE library_reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history"
  ON library_reading_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history"
  ON library_reading_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history"
  ON library_reading_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading history"
  ON library_reading_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Ratings: Users manage their own, everyone can read
ALTER TABLE library_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings"
  ON library_ratings FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own ratings"
  ON library_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON library_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings"
  ON library_ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Downloads: Anyone can insert (for tracking)
ALTER TABLE library_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record downloads"
  ON library_downloads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view download stats"
  ON library_downloads FOR SELECT
  USING (true);

-- Collections: Public read
ALTER TABLE library_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view collections"
  ON library_collections FOR SELECT
  USING (true);

-- Collection Resources: Public read
ALTER TABLE library_collection_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view collection resources"
  ON library_collection_resources FOR SELECT
  USING (true);

-- Tags: Public read
ALTER TABLE library_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON library_tags FOR SELECT
  USING (true);

-- Resource Tags: Public read
ALTER TABLE library_resource_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resource tags"
  ON library_resource_tags FOR SELECT
  USING (true);

-- FUNCTIONS for auto-updating aggregates

-- Update resource count in categories
CREATE OR REPLACE FUNCTION update_category_resource_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE library_categories 
    SET resource_count = resource_count + 1 
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE library_categories 
    SET resource_count = resource_count - 1 
    WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND NEW.category_id != OLD.category_id THEN
    UPDATE library_categories 
    SET resource_count = resource_count - 1 
    WHERE id = OLD.category_id;
    UPDATE library_categories 
    SET resource_count = resource_count + 1 
    WHERE id = NEW.category_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_category_count ON library_resources;
CREATE TRIGGER trigger_update_category_count
AFTER INSERT OR UPDATE OR DELETE ON library_resources
FOR EACH ROW EXECUTE FUNCTION update_category_resource_count();

-- Update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE library_tags 
    SET usage_count = usage_count + 1 
    WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE library_tags 
    SET usage_count = usage_count - 1 
    WHERE id = OLD.tag_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_tag_usage ON library_resource_tags;
CREATE TRIGGER trigger_update_tag_usage
AFTER INSERT OR DELETE ON library_resource_tags
FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- Update download count on resources
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE library_resources 
  SET total_downloads = total_downloads + 1 
  WHERE id = NEW.resource_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_increment_downloads ON library_downloads;
CREATE TRIGGER trigger_increment_downloads
AFTER INSERT ON library_downloads
FOR EACH ROW EXECUTE FUNCTION increment_download_count();

-- Update average rating on resources
CREATE OR REPLACE FUNCTION update_resource_rating()
RETURNS TRIGGER AS $$
DECLARE
  new_avg DECIMAL(3,2);
  new_count INTEGER;
BEGIN
  SELECT AVG(rating)::DECIMAL(3,2), COUNT(*)
  INTO new_avg, new_count
  FROM library_ratings
  WHERE resource_id = COALESCE(NEW.resource_id, OLD.resource_id);
  
  UPDATE library_resources
  SET average_rating = COALESCE(new_avg, 0),
      total_ratings = new_count
  WHERE id = COALESCE(NEW.resource_id, OLD.resource_id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_rating ON library_ratings;
CREATE TRIGGER trigger_update_rating
AFTER INSERT OR UPDATE OR DELETE ON library_ratings
FOR EACH ROW EXECUTE FUNCTION update_resource_rating();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_authors ON library_authors;
CREATE TRIGGER set_updated_at_authors
BEFORE UPDATE ON library_authors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_categories ON library_categories;
CREATE TRIGGER set_updated_at_categories
BEFORE UPDATE ON library_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_resources ON library_resources;
CREATE TRIGGER set_updated_at_resources
BEFORE UPDATE ON library_resources
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_ratings ON library_ratings;
CREATE TRIGGER set_updated_at_ratings
BEFORE UPDATE ON library_ratings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_collections ON library_collections;
CREATE TRIGGER set_updated_at_collections
BEFORE UPDATE ON library_collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
