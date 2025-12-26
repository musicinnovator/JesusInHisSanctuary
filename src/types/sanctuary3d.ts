export interface Sanctuary3DModel {
  id: string;
  name: string;
  title: string;
  description: string | null;
  model_file_url: string;
  thumbnail_url: string | null;
  time_period: string | null;
  biblical_references: string[];
  dimensions_cubits: DimensionsCubits;
  scale_factor: number;
  default_camera_position: CameraPosition;
  default_camera_target: CameraPosition;
  featured: boolean;
  total_views: number;
  order_position: number;
  created_at: string;
}

export interface DimensionsCubits {
  length?: number;
  width?: number;
  height?: number;
}

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface ModelHotspot {
  id: string;
  model_id: string;
  hotspot_name: string;
  title: string;
  description: string | null;
  position_x: number;
  position_y: number;
  position_z: number;
  category: 'furniture' | 'structure' | 'location' | 'detail';
  scripture_references: string[];
  symbolism_summary: string | null;
  related_library_ids: string[];
  related_color_ids: string[];
  icon_type: string;
  color_hex: string;
  view_count: number;
  created_at: string;
}

export interface GuidedTour {
  id: string;
  model_id: string;
  tour_name: string;
  description: string | null;
  total_duration_seconds: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  completion_count: number;
  average_rating: number;
  created_at: string;
}

export interface TourStop {
  id: string;
  tour_id: string;
  stop_number: number;
  hotspot_id: string | null;
  camera_position: CameraPosition;
  camera_target: CameraPosition;
  narration_text: string | null;
  audio_url: string | null;
  duration_seconds: number;
  scripture_overlay: string | null;
  quiz_question_id: string | null;
}

export interface UserTourProgress {
  user_id: string;
  tour_id: string;
  current_stop: number;
  completed: boolean;
  rating: number | null;
  feedback: string | null;
  last_accessed: string;
}

export interface ModelComparison {
  id: string;
  title: string;
  description: string | null;
  model_left_id: string;
  model_right_id: string;
  comparison_type: 'structural' | 'chronological' | 'theological';
  created_by: string | null;
  is_public: boolean;
  featured: boolean;
  view_count: number;
  created_at: string;
}

export interface ComparisonPoint {
  id: string;
  comparison_id: string;
  point_title: string;
  category: 'dimension' | 'material' | 'symbolism' | 'function' | 'historical';
  left_value: string | null;
  right_value: string | null;
  significance: string | null;
  supporting_scripture: string[];
}

export interface ElementMeasurement {
  id: string;
  model_id: string;
  element_name: string;
  length_cubits: number | null;
  width_cubits: number | null;
  height_cubits: number | null;
  material: string | null;
  color_scheme: string[];
  weight_talents: number | null;
  biblical_reference: string | null;
}

export interface TourWithStops extends GuidedTour {
  stops: TourStop[];
}

export interface ModelWithHotspots extends Sanctuary3DModel {
  hotspots: ModelHotspot[];
  tours: GuidedTour[];
}

export interface ComparisonWithDetails extends ModelComparison {
  points: ComparisonPoint[];
  leftModel: Sanctuary3DModel;
  rightModel: Sanctuary3DModel;
}

export interface Explorer3DState {
  selectedModel: Sanctuary3DModel | null;
  activeHotspot: ModelHotspot | null;
  activeTour: TourWithStops | null;
  currentTourStop: number;
  cameraPosition: CameraPosition;
  cameraTarget: CameraPosition;
  isPlaying: boolean;
  showLabels: boolean;
  viewMode: 'free' | 'tour' | 'comparison';
}

export interface HotspotInteraction {
  hotspot: ModelHotspot;
  timestamp: string;
  duration_seconds: number;
}

export interface ModelStats {
  total_models: number;
  total_hotspots: number;
  total_tours: number;
  most_viewed_model: Sanctuary3DModel | null;
  most_completed_tour: GuidedTour | null;
  user_stats?: {
    models_viewed: number;
    tours_completed: number;
    total_exploration_time: number;
    favorite_model_id: string | null;
  };
}
