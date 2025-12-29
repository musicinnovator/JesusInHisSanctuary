import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type {
  ScripturePassage,
  ScriptureCrossReference,
  HebrewGreekWord,
  PassageWithRelations,
  ScriptureSearchFilters,
  Scripture3DLink
} from '../types/scripture';
import { errorHandler } from '../utils/errorHandling';

/**
 * Fetch all scripture passages with optional filtering
 */
export function useScripturePassages(filters?: ScriptureSearchFilters) {
  const [passages, setPassages] = useState<ScripturePassage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPassages() {
      try {
        setLoading(true);
        let query = supabase
          .from('scripture_passages')
          .select('*')
          .order('book', { ascending: true })
          .order('chapter_start', { ascending: true });

        if (filters?.book) {
          query = query.eq('book', filters.book);
        }
        if (filters?.translation) {
          query = query.eq('translation', filters.translation);
        }
        if (filters?.sanctuaryElement) {
          query = query.eq('sanctuary_element', filters.sanctuaryElement);
        }
        if (filters?.passageType) {
          query = query.eq('passage_type', filters.passageType);
        }
        if (filters?.difficultyLevel) {
          query = query.eq('difficulty_level', filters.difficultyLevel);
        }
        if (filters?.featured !== undefined) {
          query = query.eq('featured', filters.featured);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setPassages(data || []);
      } catch (err) {
        errorHandler.logError(err as Error, 'Scripture Passages Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPassages();
  }, [filters?.book, filters?.translation, filters?.sanctuaryElement, filters?.passageType, filters?.difficultyLevel, filters?.featured]);

  return { passages, loading, error };
}

/**
 * Fetch a single scripture passage by reference
 */
export function useScripturePassage(reference: string | undefined, translation: string = 'KJV') {
  const [passage, setPassage] = useState<ScripturePassage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!reference) {
      setPassage(null);
      setLoading(false);
      return;
    }

    async function fetchPassage() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('scripture_passages')
          .select('*')
          .eq('reference', reference)
          .eq('translation', translation)
          .maybeSingle();

        if (fetchError) throw fetchError;
        setPassage(data);
      } catch (err) {
        errorHandler.logError(err as Error, 'Scripture Passage Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPassage();
  }, [reference, translation]);

  return { passage, loading, error };
}

/**
 * Fetch passage with all related data (cross-references, word studies, etc.)
 */
export function usePassageWithRelations(passageId: string | undefined) {
  const [data, setData] = useState<PassageWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!passageId) {
      setData(null);
      setLoading(false);
      return;
    }

    async function fetchFullPassageData() {
      try {
        setLoading(true);

        // Fetch main passage
        const { data: passageData, error: passageError } = await supabase
          .from('scripture_passages')
          .select('*')
          .eq('id', passageId)
          .single();

        if (passageError) throw passageError;

        // Fetch cross-references
        const { data: crossRefData, error: crossRefError } = await supabase
          .from('scripture_cross_references')
          .select('related_passage_id')
          .eq('primary_passage_id', passageId);

        if (crossRefError) throw crossRefError;

        // Fetch related passages
        let relatedPassages: ScripturePassage[] = [];
        if (crossRefData && crossRefData.length > 0) {
          const relatedIds = crossRefData.map(cr => cr.related_passage_id);
          const { data: relatedData, error: relatedError } = await supabase
            .from('scripture_passages')
            .select('*')
            .in('id', relatedIds);

          if (relatedError) throw relatedError;
          relatedPassages = relatedData || [];
        }

        // Fetch Hebrew words (placeholder - would filter by passage context)
        const { data: hebrewData, error: hebrewError } = await supabase
          .from('hebrew_greek_words')
          .select('*')
          .eq('language', 'hebrew')
          .limit(5);

        if (hebrewError) throw hebrewError;

        // Fetch Greek words (placeholder - would filter by passage context)
        const { data: greekData, error: greekError } = await supabase
          .from('hebrew_greek_words')
          .select('*')
          .eq('language', 'greek')
          .limit(5);

        if (greekError) throw greekError;

        // Fetch related hotspot if available
        let relatedHotspot = undefined;
        if (passageData.element_component_id) {
          const { data: hotspotData, error: hotspotError } = await supabase
            .from('model_hotspots')
            .select('id, title, position_x, position_y, position_z')
            .eq('hotspot_name', passageData.element_component_id)
            .maybeSingle();

          if (!hotspotError && hotspotData) {
            relatedHotspot = hotspotData;
          }
        }

        setData({
          passage: passageData,
          crossReferences: relatedPassages,
          hebrewWords: hebrewData || [],
          greekWords: greekData || [],
          relatedHotspot
        });
      } catch (err) {
        errorHandler.logError(err as Error, 'Passage With Relations Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchFullPassageData();
  }, [passageId]);

  return { data, loading, error };
}

/**
 * Fetch cross-references for a passage
 */
export function useCrossReferences(passageId: string | undefined) {
  const [crossRefs, setCrossRefs] = useState<ScriptureCrossReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!passageId) {
      setCrossRefs([]);
      setLoading(false);
      return;
    }

    async function fetchCrossRefs() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('scripture_cross_references')
          .select('*')
          .eq('primary_passage_id', passageId);

        if (fetchError) throw fetchError;
        setCrossRefs(data || []);
      } catch (err) {
        errorHandler.logError(err as Error, 'Cross References Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCrossRefs();
  }, [passageId]);

  return { crossRefs, loading, error };
}

/**
 * Fetch Hebrew/Greek words by language
 */
export function useHebrewGreekWords(language: 'hebrew' | 'greek' | 'both' = 'both') {
  const [words, setWords] = useState<HebrewGreekWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWords() {
      try {
        setLoading(true);
        let query = supabase
          .from('hebrew_greek_words')
          .select('*')
          .order('usage_count', { ascending: false });

        if (language !== 'both') {
          query = query.eq('language', language);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setWords(data || []);
      } catch (err) {
        errorHandler.logError(err as Error, 'Hebrew/Greek Words Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchWords();
  }, [language]);

  return { words, loading, error };
}

/**
 * Track passage view
 */
export async function trackPassageView(passageId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_passage_views', {
      passage_id: passageId
    });

    if (error) throw error;
  } catch (err) {
    errorHandler.logError(err as Error, 'Track Passage View');
  }
}

/**
 * Get 3D link data for a passage
 */
export function useScripture3DLink(passageReference: string | undefined): {
  link: Scripture3DLink | null;
  loading: boolean;
  error: Error | null;
} {
  const [link, setLink] = useState<Scripture3DLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!passageReference) {
      setLink(null);
      setLoading(false);
      return;
    }

    async function fetch3DLink() {
      try {
        setLoading(true);

        // Fetch passage to get model_id and element_component_id
        const { data: passageData, error: passageError } = await supabase
          .from('scripture_passages')
          .select('id, model_id, element_component_id, sanctuary_element')
          .eq('reference', passageReference)
          .maybeSingle();

        if (passageError) throw passageError;

        if (!passageData || !passageData.model_id) {
          setLink(null);
          return;
        }

        // Fetch hotspot data if element exists
        if (passageData.element_component_id) {
          const { data: hotspotData, error: hotspotError } = await supabase
            .from('model_hotspots')
            .select('id, position_x, position_y, position_z')
            .eq('model_id', passageData.model_id)
            .eq('hotspot_name', passageData.element_component_id)
            .maybeSingle();

          if (!hotspotError && hotspotData) {
            setLink({
              passageId: passageData.id,
              modelId: passageData.model_id,
              hotspotId: hotspotData.id,
              cameraPosition: {
                x: hotspotData.position_x,
                y: hotspotData.position_y + 2,
                z: hotspotData.position_z + 5
              },
              cameraTarget: {
                x: hotspotData.position_x,
                y: hotspotData.position_y,
                z: hotspotData.position_z
              },
              highlightElement: passageData.element_component_id,
              animationDuration: 1500
            });
            return;
          }
        }

        // Default link without specific hotspot
        setLink({
          passageId: passageData.id,
          modelId: passageData.model_id,
          cameraPosition: { x: 0, y: 10, z: 15 },
          cameraTarget: { x: 0, y: 0, z: 0 },
          animationDuration: 1000
        });
      } catch (err) {
        errorHandler.logError(err as Error, '3D Link Fetch');
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetch3DLink();
  }, [passageReference]);

  return { link, loading, error };
}

/**
 * Search scripture passages by text
 */
export function useScriptureSearch(searchQuery: string) {
  const [results, setResults] = useState<ScripturePassage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async () => {
    if (!searchQuery || searchQuery.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const { data, error: searchError } = await supabase
        .from('scripture_passages')
        .select('*')
        .or(`title.ilike.%${searchQuery}%,full_text.ilike.%${searchQuery}%,reference.ilike.%${searchQuery}%`)
        .limit(20);

      if (searchError) throw searchError;
      setResults(data || []);
    } catch (err) {
      errorHandler.logError(err as Error, 'Scripture Search');
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  return { results, loading, error, search };
}
