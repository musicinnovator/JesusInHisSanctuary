export interface ScripturePassage {
  id: string;
  reference: string;
  book: string;
  chapter_start: number;
  verse_start: number;
  chapter_end: number | null;
  verse_end: number | null;
  translation: string;

  // Content
  title: string;
  full_text: string;
  summary: string | null;

  // Sanctuary Connections
  sanctuary_element: string | null;
  model_id: string | null;
  element_component_id: string | null;

  // Metadata
  passage_type: 'direct' | 'typological' | 'prophetic' | 'historical';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  view_count: number;

  created_at: string;
  updated_at: string;
}

export interface ScriptureCrossReference {
  id: string;
  primary_passage_id: string;
  related_passage_id: string;
  relationship_type: 'parallel' | 'fulfillment' | 'contrast' | 'elaboration';
  explanation: string | null;
  created_at: string;
}

export interface HebrewGreekWord {
  id: string;
  original_word: string;
  transliteration: string | null;
  strongs_number: string | null;
  language: 'hebrew' | 'greek';

  // Definitions
  definition: string;
  literal_meaning: string | null;
  theological_significance: string | null;
  sanctuary_significance: string | null;

  // Usage
  usage_count: number;
  example_verses: string[];

  created_at: string;
}

export interface PassageWithRelations {
  passage: ScripturePassage;
  crossReferences: ScripturePassage[];
  hebrewWords: HebrewGreekWord[];
  greekWords: HebrewGreekWord[];
  relatedHotspot?: {
    id: string;
    title: string;
    position_x: number;
    position_y: number;
    position_z: number;
  };
}

export interface ScriptureSearchFilters {
  book?: string;
  translation?: string;
  sanctuaryElement?: string;
  passageType?: ScripturePassage['passage_type'];
  difficultyLevel?: ScripturePassage['difficulty_level'];
  featured?: boolean;
}

export interface Scripture3DLink {
  passageId: string;
  modelId: string;
  hotspotId?: string;
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
  cameraTarget: {
    x: number;
    y: number;
    z: number;
  };
  highlightElement?: string;
  animationDuration?: number;
}
