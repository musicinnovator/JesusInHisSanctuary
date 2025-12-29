/**
 * TypeScript type definitions for Stephen N. Haskell's "The Cross and Its Shadow" book analysis system
 *
 * This module provides type-safe interfaces for interacting with the comprehensive
 * database of Stephen N. Haskell's work on sanctuary theology and typology.
 */

export interface HaskellBookMetadata {
  id: string;
  title: string;
  author: string;
  publication_date: string;
  historical_context: string;
  theological_significance: string;
  endorsements: Endorsement[];
  created_at: string;
  updated_at: string;
}

export interface Endorsement {
  endorser: string;
  role: string;
  date: string;
  quote: string;
  source: string;
}

export interface HaskellChapter {
  id: string;
  chapter_number: number;
  title: string;
  summary: string;
  key_themes: string[];
  content: string;
  word_count: number;
  created_at: string;
}

export interface HaskellSection {
  id: string;
  chapter_id: string;
  section_number: number;
  heading: string;
  content: string;
  key_points: string[];
  theological_concepts: string[];
  created_at: string;
}

export interface ScriptureReference {
  id: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  reference_text: string;
  quoted_text?: string;
  context_in_book: string;
  chapter_id: string;
  section_id?: string;
  theological_theme: string;
  created_at: string;
}

export interface TheologicalConcept {
  id: string;
  concept_name: string;
  definition: string;
  biblical_foundation: string[];
  chapter_references: string[];
  related_concepts: string[];
  diagram_data: ConceptDiagramData;
  created_at: string;
}

export interface ConceptDiagramData {
  nodes?: ConceptNode[];
  connections?: ConceptConnection[];
  visualization_type?: 'tree' | 'network' | 'timeline' | 'hierarchy';
}

export interface ConceptNode {
  id: string;
  label: string;
  description: string;
  category: string;
}

export interface ConceptConnection {
  from: string;
  to: string;
  relationship: string;
}

export interface TypeAntitypePair {
  id: string;
  type_name: string;
  type_description: string;
  type_scripture: string[];
  antitype_name: string;
  antitype_description: string;
  antitype_scripture: string[];
  fulfillment_timing: string;
  chapter_id: string;
  created_at: string;
}

export interface HaskellDiagram {
  id: string;
  diagram_type: DiagramType;
  title: string;
  description: string;
  svg_data?: string;
  data_points: DiagramDataPoints;
  related_chapters: string[];
  created_at: string;
}

export type DiagramType =
  | 'timeline'
  | 'sanctuary_layout'
  | 'concept_map'
  | 'type_antitype_chart'
  | 'prophecy_timeline'
  | 'ministry_comparison'
  | 'offering_chart'
  | 'feast_calendar';

export interface DiagramDataPoints {
  [key: string]: any;
  events?: TimelineEvent[];
  locations?: SanctuaryLocation[];
  comparisons?: ComparisonData[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  significance: string;
  scripture_references: string[];
}

export interface SanctuaryLocation {
  name: string;
  type: 'earthly' | 'heavenly';
  compartment: 'court' | 'holy' | 'most_holy';
  description: string;
  furnishings: string[];
  symbolic_meaning: string;
}

export interface ComparisonData {
  category: string;
  old_covenant: string;
  new_covenant: string;
  scripture_support: string[];
}

export interface UserAnnotation {
  id: string;
  user_id: string;
  chapter_id?: string;
  section_id?: string;
  annotation_text: string;
  highlight_text?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// View Models for UI Components
export interface ChapterWithSections extends HaskellChapter {
  sections: HaskellSection[];
  scripture_count: number;
  concept_count: number;
}

export interface ScriptureReferenceGrouped {
  book: string;
  references: ScriptureReference[];
}

export interface ConceptWithRelations extends TheologicalConcept {
  related_concept_details: TheologicalConcept[];
  scripture_references: ScriptureReference[];
}

// Filter and Search Types
export interface BookSearchFilters {
  chapter_number?: number;
  theological_theme?: string;
  scripture_book?: string;
  concept_name?: string;
  text_query?: string;
}

export interface SearchResults {
  chapters: HaskellChapter[];
  sections: HaskellSection[];
  scripture_references: ScriptureReference[];
  concepts: TheologicalConcept[];
}

// Constants
export const THEOLOGICAL_THEMES = [
  'Sanctuary Services',
  'Levitical Offerings',
  'Christ the Sacrifice',
  'The High Priest',
  'Day of Atonement',
  'Feasts of the Lord',
  'Tabernacle Furniture',
  'Type and Antitype',
  'Priesthood Ministry',
  'Cleansing and Purification',
  'Blood Atonement',
  'Sanctuary Symbolism',
  'Prophetic Fulfillment',
  'Gospel in Types',
  'Investigative Judgment',
] as const;

export const CHAPTER_TITLES = [
  'The Sanctuary',
  'The Court',
  'The Altar of Burnt Offering',
  'The Laver',
  'The Holy Place',
  'The Table of Shewbread',
  'The Golden Candlestick',
  'The Altar of Incense',
  'The Most Holy Place',
  'The Ark of the Covenant',
  'The Mercy Seat',
  'The High Priest',
  'The Priesthood',
  'The Offerings',
  'The Sin Offering',
  'The Trespass Offering',
  'The Burnt Offering',
  'The Meal Offering',
  'The Peace Offering',
  'The Drink Offering',
  'The Feasts of the Lord',
  'The Passover',
  'Unleavened Bread',
  'The Firstfruits',
  'Pentecost',
  'The Feast of Trumpets',
  'The Day of Atonement',
  'The Feast of Tabernacles',
] as const;

export type TheologicalTheme = typeof THEOLOGICAL_THEMES[number];
export type ChapterTitle = typeof CHAPTER_TITLES[number];
