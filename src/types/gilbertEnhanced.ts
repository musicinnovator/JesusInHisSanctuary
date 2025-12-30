// Enhanced types for Gilbert Book comprehensive features

export interface HebrewExpression {
  id: string;
  expression: string;
  transliteration: string;
  meaning: string;
  category: string;
  subcategory?: string;
  hebrew_text?: string;
  pronunciation_guide?: string;
  theological_significance?: string;
  usage_examples?: string[];
  related_chapters?: string[];
  related_expressions?: string[];
  scripture_references?: string[];
  letter_group: string;
  created_at: string;
  updated_at: string;
}

export interface ScriptureEnhanced {
  id: string;
  reference: string;
  book: string;
  chapter_num: number;
  verse_start: number;
  verse_end?: number;
  text_kjv?: string;
  hebrew_context?: string;
  greek_context?: string;
  theological_significance?: string;
  type_antitype_link?: string;
  chapter_id?: string;
  theme_tags?: string[];
  testament: 'OT' | 'NT';
  is_messianic: boolean;
  citation_count: number;
  created_at: string;
}

export interface StudyQuestion {
  id: string;
  chapter_id: string;
  question_text: string;
  question_type: 'reflection' | 'analysis' | 'application' | 'interpretation';
  difficulty_level: 'easy' | 'medium' | 'hard';
  answer_hints?: string[];
  scripture_references?: string[];
  order_index: number;
  created_at: string;
}

export interface MemorableQuote {
  id: string;
  chapter_id: string;
  quote_text: string;
  context?: string;
  significance?: string;
  page_number?: number;
  theme_tags?: string[];
  created_at: string;
}

export interface Illustration {
  id: string;
  title: string;
  description: string;
  type: 'diagram' | 'chart' | 'map' | 'photo' | 'drawing';
  chapter_id?: string;
  image_url?: string;
  caption?: string;
  theological_purpose?: string;
  related_concepts?: string[];
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  event_name: string;
  date_or_period?: string;
  timeline_type: 'historical' | 'sanctuary' | 'prophetic';
  category: string;
  ot_type?: string;
  nt_antitype?: string;
  description: string;
  prophetic_significance?: string;
  scripture_references?: string[];
  chapter_references?: string[];
  timeline_position?: number;
  is_past: boolean;
  is_present: boolean;
  is_future: boolean;
  created_at: string;
}

export interface TypeAntitypeLink {
  id: string;
  category: string;
  ot_type_name: string;
  ot_type_description: string;
  ot_scripture_refs: string[];
  nt_antitype_name: string;
  nt_antitype_description: string;
  nt_scripture_refs: string[];
  connection_explanation: string;
  gilbert_commentary?: string;
  chapter_references?: string[];
  visual_diagram_url?: string;
  significance_level: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  chapter_id: string;
  completed: boolean;
  completion_date?: string;
  time_spent_minutes: number;
  notes?: string;
  last_accessed: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  chapter_id: string;
  section_text?: string;
  note?: string;
  color_tag: 'yellow' | 'green' | 'blue' | 'red' | 'purple';
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudyPath {
  id: string;
  path_name: string;
  description: string;
  chapter_sequence: string[];
  estimated_hours?: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  focus_areas?: string[];
  created_at: string;
}

export type GilbertViewMode =
  | 'overview'
  | 'chapters'
  | 'hebrew'
  | 'scriptures'
  | 'type-antitype'
  | 'timeline'
  | 'study-tools';

export interface SearchResults {
  chapters: any[];
  scriptures: ScriptureEnhanced[];
  hebrewTerms: HebrewExpression[];
  typeAntitypes: TypeAntitypeLink[];
}

export interface HebrewDictionaryFilters {
  category: string;
  letterGroup: string;
  searchQuery: string;
}

export interface ScriptureFilters {
  testament: 'all' | 'OT' | 'NT';
  themeTag: string;
  isMessianic: boolean | null;
  searchQuery: string;
}

export interface TimelineFilters {
  timelineType: 'all' | 'historical' | 'sanctuary' | 'prophetic';
  category: string;
  timePeriod: 'past' | 'present' | 'future' | 'all';
}

export interface TypeAntitypeFilters {
  category: string;
  significance: number;
  searchQuery: string;
}

// Categories for filtering
export const HEBREW_CATEGORIES = [
  'Sanctuary',
  'Sacrificial System',
  'Priesthood',
  'Prophecy',
  'Calendar & Time',
  'Messianic Prophecy',
  'Names of God',
  'Attributes of God',
  'Measurements',
  'Materials',
  'Covenant',
  'Law',
  'Scripture',
  'Religious Practice',
  'Leadership',
  'Family Terms',
  'Social Terms',
  'Creation',
  'Language',
  'Historical Events',
  'Eschatology',
  'Theology'
] as const;

export const TYPE_ANTITYPE_CATEGORIES = [
  'Sanctuary Furniture',
  'Sacrifices',
  'Priesthood',
  'Festivals',
  'Materials'
] as const;

export const TIMELINE_TYPES = [
  'historical',
  'sanctuary',
  'prophetic'
] as const;

export const STUDY_QUESTION_TYPES = [
  'reflection',
  'analysis',
  'application',
  'interpretation'
] as const;
