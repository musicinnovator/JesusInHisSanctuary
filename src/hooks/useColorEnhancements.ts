import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SymbolicMeaning {
  id: string;
  color_id: string;
  meaning_title: string;
  short_description: string;
  detailed_explanation: string;
  sda_theological_perspective?: string;
  eg_white_quote?: string;
  eg_white_reference?: string;
  related_sanctuary_concept?: string;
  practical_application?: string;
  order_index: number;
  tags?: string[];
}

interface ScriptureText {
  id: string;
  color_id: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  translation: string;
  text_content: string;
  context_before?: string;
  context_after?: string;
  key_phrases?: string[];
  theological_notes?: string;
  cross_references?: string[];
  is_primary_reference: boolean;
}

interface ColorEnhancements {
  meanings: SymbolicMeaning[];
  scriptures: ScriptureText[];
  loading: boolean;
  error: Error | null;
}

export function useColorEnhancements(colorId: string | undefined): ColorEnhancements {
  const [meanings, setMeanings] = useState<SymbolicMeaning[]>([]);
  const [scriptures, setScriptures] = useState<ScriptureText[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!colorId) {
      setLoading(false);
      return;
    }

    async function fetchEnhancements() {
      try {
        setLoading(true);
        setError(null);

        // Fetch symbolic meanings
        const { data: meaningsData, error: meaningsError } = await supabase
          .from('color_symbolic_meanings')
          .select('*')
          .eq('color_id', colorId)
          .order('order_index', { ascending: true });

        if (meaningsError) throw meaningsError;

        // Fetch scripture texts
        const { data: scripturesData, error: scripturesError } = await supabase
          .from('color_scripture_texts')
          .select('*')
          .eq('color_id', colorId)
          .order('is_primary_reference', { ascending: false });

        if (scripturesError) throw scripturesError;

        setMeanings(meaningsData || []);
        setScriptures(scripturesData || []);
      } catch (err) {
        console.error('Error fetching color enhancements:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch color enhancements'));
      } finally {
        setLoading(false);
      }
    }

    fetchEnhancements();
  }, [colorId]);

  return { meanings, scriptures, loading, error };
}
