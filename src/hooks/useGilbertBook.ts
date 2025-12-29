import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GilbertChapter, GilbertKeyConcept } from '../types/gilbertBook';

interface UseGilbertBookResult {
  chapters: GilbertChapter[];
  concepts: GilbertKeyConcept[];
  loading: boolean;
  error: string | null;
}

export function useGilbertBook(): UseGilbertBookResult {
  const [chapters, setChapters] = useState<GilbertChapter[]>([]);
  const [concepts, setConcepts] = useState<GilbertKeyConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGilbertBook() {
      try {
        setLoading(true);
        setError(null);

        const [chaptersResponse, conceptsResponse] = await Promise.all([
          supabase
            .from('gilbert_chapters')
            .select('*')
            .order('chapter_number', { ascending: true }),
          supabase
            .from('gilbert_key_concepts')
            .select('*')
            .order('concept_name', { ascending: true })
        ]);

        if (chaptersResponse.error) {
          throw new Error(chaptersResponse.error.message);
        }

        if (conceptsResponse.error) {
          throw new Error(conceptsResponse.error.message);
        }

        setChapters(chaptersResponse.data || []);
        setConcepts(conceptsResponse.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Gilbert book';
        setError(errorMessage);
        console.error('Error fetching Gilbert book:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGilbertBook();
  }, []);

  return {
    chapters,
    concepts,
    loading,
    error
  };
}
