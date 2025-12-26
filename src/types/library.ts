export type ResourceType = 'book' | 'article' | 'paper' | 'dissertation' | 'commentary' | 'manuscript' | 'periodical';

export type CopyrightStatus = 'public_domain' | 'copyrighted' | 'creative_commons' | 'fair_use';

export interface Author {
  id: string;
  full_name: string;
  birth_year: number | null;
  death_year: number | null;
  biography: string | null;
  photo_url: string | null;
  nationality: string | null;
  denomination: string;
  notable_works: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  color_scheme: string | null;
  parent_category_id: string | null;
  resource_count: number;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  subtitle: string | null;
  author_id: string | null;
  co_authors: string[] | null;
  category_id: string | null;
  resource_type: ResourceType;
  publisher: string | null;
  publication_year: number | null;
  edition: string | null;
  isbn: string | null;
  total_pages: number | null;
  description: string;
  abstract: string | null;
  keywords: string[] | null;
  language: string;
  cover_image_url: string | null;
  pdf_url: string | null;
  pdf_file_size: number | null;
  external_link: string | null;
  citation_count: number;
  average_rating: number;
  total_ratings: number;
  total_downloads: number;
  featured: boolean;
  verified: boolean;
  copyright_status: CopyrightStatus;
  license_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResourceWithAuthor extends Resource {
  author: Author | null;
  category: Category | null;
}

export interface Bookmark {
  id: string;
  user_id: string;
  resource_id: string;
  notes: string | null;
  created_at: string;
}

export interface ReadingHistory {
  id: string;
  user_id: string;
  resource_id: string;
  last_page: number;
  progress_percentage: number;
  last_accessed_at: string;
  completed: boolean;
}

export interface Rating {
  id: string;
  user_id: string;
  resource_id: string;
  rating: number;
  review_text: string | null;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface Download {
  id: string;
  user_id: string | null;
  resource_id: string;
  downloaded_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export interface Collection {
  id: string;
  title: string;
  description: string | null;
  curator_name: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CollectionResource {
  collection_id: string;
  resource_id: string;
  sort_order: number;
  added_at: string;
}

export interface CollectionWithResources extends Collection {
  resources: ResourceWithAuthor[];
  resource_count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  usage_count: number;
  created_at: string;
}

export interface ResourceTag {
  resource_id: string;
  tag_id: string;
}

export interface LibraryFilters {
  searchQuery: string;
  categoryId: string | null;
  authorId: string | null;
  resourceType: ResourceType | null;
  yearMin: number | null;
  yearMax: number | null;
  featured: boolean | null;
  tags: string[];
}

export interface LibrarySearchParams {
  query?: string;
  category?: string;
  author?: string;
  type?: ResourceType;
  yearMin?: number;
  yearMax?: number;
  featured?: boolean;
  sortBy?: 'title' | 'author' | 'year' | 'rating' | 'downloads' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface LibrarySearchResults {
  resources: ResourceWithAuthor[];
  total: number;
  hasMore: boolean;
}

export interface CitationFormat {
  apa: string;
  mla: string;
  chicago: string;
  bibtex: string;
}
