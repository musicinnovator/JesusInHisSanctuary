export interface AndreasenBookInfo {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  publisher: string;
  description: string;
  theological_context: string;
  total_chapters: number;
  total_pages?: number;
  created_at: string;
  updated_at: string;
}

export interface AndreasenChapter {
  id: string;
  chapter_number: number;
  title: string;
  summary: string;
  word_count: number;
  key_themes: string[];
  main_scripture_references: string[];
  theological_focus: string;
  practical_application?: string;
  memorable_quote?: string;
  chapter_order: number;
  created_at: string;
  updated_at: string;
}

export interface AndreasenSection {
  id: string;
  chapter_id: string;
  section_number: number;
  title: string;
  content: string;
  summary?: string;
  key_points: string[];
  scripture_references: string[];
  section_order: number;
  created_at: string;
  updated_at: string;
}

export interface AndreasenScripture {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verse_start?: number;
  verse_end?: number;
  text_kjv?: string;
  context_in_book: string;
  theme_tags: string[];
  theological_significance?: string;
  related_chapter_ids: string[];
  related_concept_ids: string[];
  citation_count: number;
  primary_usage: boolean;
  created_at: string;
  updated_at: string;
}

export interface AndreasenTheologicalConcept {
  id: string;
  name: string;
  category: string;
  definition: string;
  biblical_foundation: string[];
  chapter_references: string[];
  related_scriptures: string[];
  significance: string;
  adventist_distinctive: boolean;
  controversy_level: 'low' | 'medium' | 'high';
  practical_application?: string;
  created_at: string;
  updated_at: string;
}

export interface AndreasenConceptRelationship {
  id: string;
  concept_a_id: string;
  concept_b_id: string;
  relationship_type: 'related' | 'contrasts' | 'builds_upon' | 'prerequisite' | 'fulfills';
  description?: string;
  strength: 'weak' | 'medium' | 'strong';
  created_at: string;
}

export interface AndreasenIllustration {
  id: string;
  title: string;
  type: 'diagram' | 'chart' | 'flowchart' | 'map' | 'timeline' | 'infographic';
  description: string;
  chapter_id: string;
  svg_data?: string;
  image_url?: string;
  caption?: string;
  theological_purpose?: string;
  elements: IllustrationElement[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface IllustrationElement {
  id: string;
  type: string;
  label?: string;
  description?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  color?: string;
  scripture_reference?: string;
}

export interface AndreasenTimelineEvent {
  id: string;
  event_name: string;
  date_or_year: string;
  category: 'historical' | 'prophetic' | 'eschatological' | 'typological';
  description: string;
  scripture_references: string[];
  prophetic_significance?: string;
  chapter_references: string[];
  timeline_position: number;
  is_past: boolean;
  is_present: boolean;
  is_future: boolean;
  created_at: string;
  updated_at: string;
}

export interface AndreasenQuotation {
  id: string;
  author: string;
  source: string;
  page_number?: string;
  quotation_text: string;
  context?: string;
  chapter_id: string;
  section_id?: string;
  theme_tags: string[];
  is_ellen_white: boolean;
  created_at: string;
  updated_at: string;
}

export interface AndreasenStudyQuestion {
  id: string;
  chapter_id: string;
  section_id?: string;
  question_text: string;
  question_type: 'reflection' | 'discussion' | 'application' | 'analysis' | 'synthesis';
  suggested_answer?: string;
  scripture_references: string[];
  difficulty_level: 'easy' | 'medium' | 'hard';
  discussion_prompt: boolean;
  question_order: number;
  created_at: string;
  updated_at: string;
}

export interface AndreasenCrossReference {
  id: string;
  source_type: 'chapter' | 'section' | 'scripture' | 'concept' | 'illustration';
  source_id: string;
  target_type: 'chapter' | 'section' | 'scripture' | 'concept' | 'illustration';
  target_id: string;
  relationship_description?: string;
  relevance_score: number;
  created_at: string;
}

export type AndreasenViewMode =
  | 'chapters'
  | 'scriptures'
  | 'concepts'
  | 'timeline'
  | 'illustrations'
  | 'study';

export interface AndreasenBookState {
  bookInfo: AndreasenBookInfo | null;
  chapters: AndreasenChapter[];
  selectedChapter: AndreasenChapter | null;
  sections: AndreasenSection[];
  scriptures: AndreasenScripture[];
  concepts: AndreasenTheologicalConcept[];
  conceptRelationships: AndreasenConceptRelationship[];
  illustrations: AndreasenIllustration[];
  timelineEvents: AndreasenTimelineEvent[];
  quotations: AndreasenQuotation[];
  studyQuestions: AndreasenStudyQuestion[];
  crossReferences: AndreasenCrossReference[];
  viewMode: AndreasenViewMode;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

export interface ChapterWithSections extends AndreasenChapter {
  sections: AndreasenSection[];
  studyQuestions: AndreasenStudyQuestion[];
  illustrations: AndreasenIllustration[];
}

export interface ScriptureWithContext extends AndreasenScripture {
  relatedChapters: AndreasenChapter[];
  relatedConcepts: AndreasenTheologicalConcept[];
}

export interface ConceptWithRelationships extends AndreasenTheologicalConcept {
  relationships: Array<{
    relatedConcept: AndreasenTheologicalConcept;
    relationship: AndreasenConceptRelationship;
  }>;
  relatedChapters: AndreasenChapter[];
}
