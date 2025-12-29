export interface GilbertChapter {
  id: string;
  chapter_number: number;
  title: string;
  subtitle?: string;
  content: string;
  summary: string;
  key_themes: string[];
  scripture_references: string[];
  word_count: number;
  created_at: string;
  updated_at: string;
}

export interface GilbertSection {
  id: string;
  chapter_id: string;
  section_number: number;
  heading?: string;
  content: string;
  created_at: string;
}

export interface GilbertScriptureLink {
  id: string;
  chapter_id: string;
  scripture_reference: string;
  context: string;
  created_at: string;
}

export interface GilbertKeyConcept {
  id: string;
  concept_name: string;
  definition: string;
  chapters: string[];
  created_at: string;
}

export interface GilbertChapterWithSections extends GilbertChapter {
  sections?: GilbertSection[];
  scripture_links?: GilbertScriptureLink[];
}

export interface GilbertBookMetadata {
  title: string;
  author: string;
  subtitle: string;
  total_chapters: number;
  description: string;
}
