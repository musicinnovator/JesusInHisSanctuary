// Advanced Symbolism Explorer Types (Phases 3-8)

// ============================================================================
// PHASE 3: Library Integration
// ============================================================================

export interface LibraryResource {
  id: string;
  symbol_id: string;
  resource_type: 'book' | 'article' | 'video' | 'audio' | 'sermon';
  title: string;
  author?: string;
  publication_year?: number;
  publisher?: string;
  isbn?: string;
  url?: string;
  description?: string;
  relevance_score: number;
  preview_text?: string;
  page_count?: number;
  language: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface BookReference {
  id: string;
  library_resource_id: string;
  symbol_id: string;
  chapter_number?: number;
  chapter_title?: string;
  page_start?: number;
  page_end?: number;
  quote_text?: string;
  context_notes?: string;
  significance?: string;
  created_at: string;
}

// ============================================================================
// PHASE 4: Type/Antitype Expansion
// ============================================================================

export type FulfillmentCertainty = 'certain' | 'probable' | 'possible' | 'debated';

export interface PropheticFulfillment {
  id: string;
  symbol_id: string;
  prophecy_reference: string;
  fulfillment_reference: string;
  fulfillment_date?: string;
  fulfillment_description: string;
  prophetic_principle?: string;
  historical_context?: string;
  theological_significance?: string;
  adventist_interpretation?: string;
  fulfillment_certainty?: FulfillmentCertainty;
  eschatological_implications?: string;
  created_at: string;
}

export type TypeCategory = 'person' | 'event' | 'object' | 'ritual' | 'place' | 'time';

export interface CorrespondencePoint {
  type_aspect: string;
  antitype_aspect: string;
  explanation: string;
}

export interface Contrast {
  type_limitation: string;
  antitype_superiority: string;
  explanation: string;
}

export interface TypologyConnection {
  id: string;
  symbol_id: string;
  type_category: TypeCategory;
  type_name: string;
  type_reference: string;
  antitype_name: string;
  antitype_reference: string;
  correspondence_points: CorrespondencePoint[];
  contrasts: Contrast[];
  progressive_revelation?: string;
  hermeneutical_notes?: string;
  related_types: string[];
  visual_diagram_url?: string;
  created_at: string;
}

// ============================================================================
// PHASE 5: Linguistic Deep Dive
// ============================================================================

export type BiblicalLanguage = 'hebrew' | 'aramaic' | 'greek';
export type Testament = 'OT' | 'NT' | 'both';

export interface WordStudy {
  id: string;
  symbol_id: string;
  original_word: string;
  language: BiblicalLanguage;
  transliteration: string;
  strongs_number?: string;
  pronunciation_ipa?: string;
  root_word?: string;
  morphology?: string;
  part_of_speech?: string;
  word_frequency?: number;
  first_occurrence?: string;
  last_occurrence?: string;
  total_occurrences?: number;
  testament?: Testament;
  created_at: string;
}

export interface CognateLanguage {
  language: string;
  word: string;
  transliteration: string;
  meaning: string;
}

export interface Etymology {
  id: string;
  word_study_id: string;
  etymological_origin?: string;
  cognate_languages: CognateLanguage[];
  historical_development?: string;
  cultural_context?: string;
  ancient_usage_examples: string[];
  meaning_evolution?: string;
  related_words: string[];
  created_at: string;
}

export interface SemanticRange {
  id: string;
  word_study_id: string;
  meaning_category: string;
  definition: string;
  usage_context?: string;
  example_verses: string[];
  frequency_in_context?: number;
  theological_significance?: string;
  translation_notes?: string;
  created_at: string;
}

// ============================================================================
// PHASE 7: 3D Integration
// ============================================================================

export type ModelFormat = 'gltf' | 'glb' | 'babylon' | 'obj';

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

export interface Model3D {
  id: string;
  symbol_id: string;
  model_name: string;
  model_url: string;
  model_format: ModelFormat;
  thumbnail_url?: string;
  poly_count?: number;
  texture_resolution?: string;
  file_size_mb?: number;
  scale_factor: number;
  initial_camera_position?: CameraPosition;
  lighting_preset: string;
  pbr_materials: boolean;
  animation_available: boolean;
  vr_compatible: boolean;
  mobile_optimized: boolean;
  load_priority: number;
  created_at: string;
}

export type HotspotType = 'info' | 'scripture' | 'symbol' | 'measurement' | 'material' | 'video';

export interface Hotspot3D {
  id: string;
  model_id: string;
  hotspot_name: string;
  position_x: number;
  position_y: number;
  position_z: number;
  hotspot_type?: HotspotType;
  title: string;
  description?: string;
  scripture_reference?: string;
  popup_content?: string;
  icon_type?: string;
  interaction_type: string;
  related_symbol_id?: string;
  created_at: string;
}

export type AnimationType = 'tour' | 'reveal' | 'explode' | 'timeline' | 'ritual' | 'construction';

export interface AnimationKeyframe {
  time: number;
  camera_position: CameraPosition;
  target_mesh?: string;
  highlight?: boolean;
  annotation?: string;
}

export interface Animation3D {
  id: string;
  model_id: string;
  animation_name: string;
  animation_type?: AnimationType;
  duration_seconds: number;
  keyframes: AnimationKeyframe[];
  narration_text?: string;
  narration_audio_url?: string;
  camera_path?: any;
  auto_play: boolean;
  loop_animation: boolean;
  created_at: string;
}

// ============================================================================
// PHASE 8: Advanced Learning Features
// ============================================================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'scholarly';

export interface LearningPath {
  id: string;
  path_name: string;
  path_description?: string;
  difficulty_level?: DifficultyLevel;
  estimated_duration_minutes?: number;
  path_order?: number;
  prerequisites: string[];
  learning_objectives: string[];
  symbol_sequence: string[];
  is_published: boolean;
  created_at: string;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'bookmarked';

export interface UserProgress {
  id: string;
  user_id: string;
  symbol_id: string;
  learning_path_id?: string;
  status: ProgressStatus;
  progress_percentage: number;
  time_spent_seconds: number;
  last_accessed: string;
  completion_date?: string;
  notes?: string;
  created_at: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'ordering';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface Quiz {
  id: string;
  symbol_id: string;
  question_text: string;
  question_type?: QuestionType;
  correct_answer: string;
  wrong_answers: string[];
  explanation?: string;
  difficulty?: QuestionDifficulty;
  scripture_reference?: string;
  points: number;
  created_at: string;
}

export type AnnotationType = 'note' | 'highlight' | 'question' | 'insight' | 'bookmark';

export interface Annotation {
  id: string;
  user_id: string;
  symbol_id: string;
  annotation_type?: AnnotationType;
  content: string;
  highlighted_text?: string;
  color: string;
  is_private: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// ============================================================================
// COMPOSITE TYPES
// ============================================================================

export interface SymbolWithAdvancedFeatures {
  symbol: any; // Reference to base symbol type
  library_resources: LibraryResource[];
  book_references: BookReference[];
  prophetic_fulfillments: PropheticFulfillment[];
  typology_connections: TypologyConnection[];
  word_studies: WordStudy[];
  etymology: Etymology[];
  semantic_ranges: SemanticRange[];
  models_3d: Model3D[];
  hotspots_3d: Hotspot3D[];
  animations_3d: Animation3D[];
  learning_paths: LearningPath[];
  quizzes: Quiz[];
  user_progress?: UserProgress;
  user_annotations?: Annotation[];
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface LibraryFilters {
  resource_type?: 'book' | 'article' | 'video' | 'audio' | 'sermon';
  author?: string;
  publication_year_from?: number;
  publication_year_to?: number;
  language?: string;
  min_relevance_score?: number;
}

export interface TypologyFilters {
  type_category?: TypeCategory;
  fulfillment_certainty?: FulfillmentCertainty;
}

export interface LinguisticFilters {
  language?: BiblicalLanguage;
  testament?: Testament;
  has_etymology?: boolean;
}

export interface LearningFilters {
  difficulty_level?: DifficultyLevel;
  status?: ProgressStatus;
  min_duration?: number;
  max_duration?: number;
}
