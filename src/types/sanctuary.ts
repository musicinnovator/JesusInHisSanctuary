export interface ScriptureRef {
  book: string;
  chapter: number;
  verses: string;
  excerpt?: string;
}

export interface Confidence {
  level: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface SanctuaryComponent {
  id: string;
  name: string;
  type: string;
  material?: string;
  meshRef?: string;
  scriptureRefs?: ScriptureRef[];
  confidence?: Confidence;
}

export interface Dimensions {
  unit: string;
  values: Record<string, number | string>;
}

export interface Review {
  status: 'beta' | 'approved' | 'withheld';
  reviewedBy?: string[];
  sources?: string[];
  notes?: string;
}

export interface SanctuaryModel {
  id: string;
  name: string;
  period: 'Tabernacle' | 'Solomon' | 'Zerubbabel' | 'Herod' | 'Heavenly';
  dimensions?: Dimensions;
  components: SanctuaryComponent[];
  scripture: ScriptureRef[];
  review: Review;
}
