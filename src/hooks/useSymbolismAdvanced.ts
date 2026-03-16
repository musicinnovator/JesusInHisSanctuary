import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  LibraryResource,
  BookReference,
  PropheticFulfillment,
  TypologyConnection,
  WordStudy,
  Etymology,
  SemanticRange,
  Model3D,
  Hotspot3D,
  Animation3D,
  LearningPath,
  UserProgress,
  Quiz,
  Annotation,
  LibraryFilters,
  TypologyFilters,
  LinguisticFilters,
  LearningFilters,
} from '../types/symbolismAdvanced';

// ============================================================================
// PHASE 3: Library Integration Hooks
// ============================================================================

export function useLibraryResources(symbolId?: string, filters?: LibraryFilters) {
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_library_resources')
          .select('*')
          .order('relevance_score', { ascending: false });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        if (filters?.resource_type) {
          query = query.eq('resource_type', filters.resource_type);
        }

        if (filters?.author) {
          query = query.ilike('author', `%${filters.author}%`);
        }

        if (filters?.language) {
          query = query.eq('language', filters.language);
        }

        if (filters?.min_relevance_score) {
          query = query.gte('relevance_score', filters.min_relevance_score);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setResources(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [symbolId, JSON.stringify(filters)]);

  return { resources, loading, error };
}

export function useBookReferences(resourceId?: string, symbolId?: string) {
  const [references, setReferences] = useState<BookReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchReferences() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_book_references')
          .select('*')
          .order('page_start', { ascending: true });

        if (resourceId) {
          query = query.eq('library_resource_id', resourceId);
        }

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setReferences(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchReferences();
  }, [resourceId, symbolId]);

  return { references, loading, error };
}

// ============================================================================
// PHASE 4: Type/Antitype Hooks
// ============================================================================

export function usePropheticFulfillments(symbolId?: string) {
  const [fulfillments, setFulfillments] = useState<PropheticFulfillment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFulfillments() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_prophetic_fulfillments')
          .select('*')
          .order('created_at', { ascending: false });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setFulfillments(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchFulfillments();
  }, [symbolId]);

  return { fulfillments, loading, error };
}

export function useTypologyConnections(symbolId?: string, filters?: TypologyFilters) {
  const [connections, setConnections] = useState<TypologyConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConnections() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_typology_connections')
          .select('*')
          .order('type_name', { ascending: true });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        if (filters?.type_category) {
          query = query.eq('type_category', filters.type_category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setConnections(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchConnections();
  }, [symbolId, JSON.stringify(filters)]);

  return { connections, loading, error };
}

// ============================================================================
// PHASE 5: Linguistic Hooks
// ============================================================================

export function useWordStudies(symbolId?: string, filters?: LinguisticFilters) {
  const [wordStudies, setWordStudies] = useState<WordStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWordStudies() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_word_studies')
          .select('*')
          .order('word_frequency', { ascending: false });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        if (filters?.language) {
          query = query.eq('language', filters.language);
        }

        if (filters?.testament) {
          query = query.eq('testament', filters.testament);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setWordStudies(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchWordStudies();
  }, [symbolId, JSON.stringify(filters)]);

  return { wordStudies, loading, error };
}

export function useEtymology(wordStudyId: string) {
  const [etymology, setEtymology] = useState<Etymology | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEtymology() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_etymology')
          .select('*')
          .eq('word_study_id', wordStudyId)
          .maybeSingle();

        if (fetchError) throw fetchError;
        setEtymology(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (wordStudyId) {
      fetchEtymology();
    }
  }, [wordStudyId]);

  return { etymology, loading, error };
}

export function useSemanticRanges(wordStudyId: string) {
  const [ranges, setRanges] = useState<SemanticRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRanges() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_semantic_ranges')
          .select('*')
          .eq('word_study_id', wordStudyId)
          .order('frequency_in_context', { ascending: false });

        if (fetchError) throw fetchError;
        setRanges(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (wordStudyId) {
      fetchRanges();
    }
  }, [wordStudyId]);

  return { ranges, loading, error };
}

// ============================================================================
// PHASE 7: 3D Integration Hooks
// ============================================================================

export function use3DModels(symbolId?: string) {
  const [models, setModels] = useState<Model3D[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_3d_models')
          .select('*')
          .order('load_priority', { ascending: true });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setModels(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [symbolId]);

  return { models, loading, error };
}

export function use3DHotspots(modelId: string) {
  const [hotspots, setHotspots] = useState<Hotspot3D[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHotspots() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_3d_hotspots')
          .select('*')
          .eq('model_id', modelId);

        if (fetchError) throw fetchError;
        setHotspots(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (modelId) {
      fetchHotspots();
    }
  }, [modelId]);

  return { hotspots, loading, error };
}

export function use3DAnimations(modelId: string) {
  const [animations, setAnimations] = useState<Animation3D[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAnimations() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_3d_animations')
          .select('*')
          .eq('model_id', modelId)
          .order('animation_name', { ascending: true });

        if (fetchError) throw fetchError;
        setAnimations(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (modelId) {
      fetchAnimations();
    }
  }, [modelId]);

  return { animations, loading, error };
}

// ============================================================================
// PHASE 8: Advanced Learning Hooks
// ============================================================================

export function useLearningPaths(filters?: LearningFilters) {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPaths() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_learning_paths')
          .select('*')
          .eq('is_published', true)
          .order('path_order', { ascending: true });

        if (filters?.difficulty_level) {
          query = query.eq('difficulty_level', filters.difficulty_level);
        }

        if (filters?.min_duration) {
          query = query.gte('estimated_duration_minutes', filters.min_duration);
        }

        if (filters?.max_duration) {
          query = query.lte('estimated_duration_minutes', filters.max_duration);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setPaths(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPaths();
  }, [JSON.stringify(filters)]);

  return { paths, loading, error };
}

export function useUserProgress(userId?: string, symbolId?: string) {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_user_progress')
          .select('*')
          .eq('user_id', userId)
          .order('last_accessed', { ascending: false });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProgress(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [userId, symbolId]);

  const updateProgress = async (progressData: Partial<UserProgress>) => {
    if (!userId) return;

    try {
      const { error: updateError } = await supabase
        .from('symbolism_user_progress')
        .upsert({
          user_id: userId,
          ...progressData,
          last_accessed: new Date().toISOString(),
        });

      if (updateError) throw updateError;
    } catch (err) {
      setError(err as Error);
    }
  };

  return { progress, loading, error, updateProgress };
}

export function useQuizzes(symbolId?: string) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_quizzes')
          .select('*')
          .order('difficulty', { ascending: true });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setQuizzes(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [symbolId]);

  return { quizzes, loading, error };
}

export function useAnnotations(userId?: string, symbolId?: string) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAnnotations() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_annotations')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (symbolId) {
          query = query.eq('symbol_id', symbolId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setAnnotations(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnotations();
  }, [userId, symbolId]);

  const addAnnotation = async (annotationData: Partial<Annotation>) => {
    if (!userId) return;

    try {
      const { data, error: insertError } = await supabase
        .from('symbolism_annotations')
        .insert({
          user_id: userId,
          ...annotationData,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) {
        setAnnotations((prev) => [data, ...prev]);
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateAnnotation = async (id: string, updates: Partial<Annotation>) => {
    try {
      const { error: updateError } = await supabase
        .from('symbolism_annotations')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', userId);

      if (updateError) throw updateError;

      setAnnotations((prev) =>
        prev.map((ann) => (ann.id === id ? { ...ann, ...updates } : ann))
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteAnnotation = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('symbolism_annotations')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      setAnnotations((prev) => prev.filter((ann) => ann.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    annotations,
    loading,
    error,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
  };
}
