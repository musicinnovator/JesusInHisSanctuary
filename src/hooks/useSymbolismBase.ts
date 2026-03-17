import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// ============================================================================
// BASE SYMBOLISM TYPES (Phases 1-2)
// ============================================================================

export interface Symbol {
  id: string;
  name: string;
  category: 'furniture' | 'materials' | 'colors' | 'rituals' | 'numbers' | 'architecture' | 'garments' | 'sacrifices' | 'festivals' | 'people';
  sanctuary_location?: 'outer_court' | 'holy_place' | 'most_holy_place' | 'general' | 'all_areas';
  short_description: string;
  detailed_description?: string;
  primary_scripture_references: string[];
  symbolic_meaning?: string;
  christological_type?: string;
  hebrew_term?: string;
  hebrew_transliteration?: string;
  greek_term?: string;
  greek_transliteration?: string;
  historical_context?: string;
  theological_significance?: string;
  practical_application?: string;
  related_symbols: string[];
  image_url?: string;
  diagram_url?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SDACommentary {
  id: string;
  symbol_id: string;
  source_type: 'eg_white' | 'bible_commentary' | 'modern_scholar' | 'historic_pioneer';
  author: string;
  book_title?: string;
  publication_year?: number;
  quote_text: string;
  page_reference?: string;
  context?: string;
  theological_emphasis?: string;
  application_notes?: string;
  created_at: string;
}

export interface SymbolFilters {
  category?: Symbol['category'];
  sanctuary_location?: Symbol['sanctuary_location'];
  search?: string;
  tags?: string[];
}

// ============================================================================
// HOOKS
// ============================================================================

export function useSymbols(filters?: SymbolFilters) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSymbols() {
      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_symbols')
          .select('*')
          .order('name', { ascending: true });

        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.sanctuary_location) {
          query = query.eq('sanctuary_location', filters.sanctuary_location);
        }

        if (filters?.search) {
          query = query.or(
            `name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%,detailed_description.ilike.%${filters.search}%`
          );
        }

        if (filters?.tags && filters.tags.length > 0) {
          query = query.contains('tags', filters.tags);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setSymbols(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSymbols();
  }, [JSON.stringify(filters)]);

  return { symbols, loading, error };
}

export function useSymbol(symbolId?: string) {
  const [symbol, setSymbol] = useState<Symbol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSymbol() {
      if (!symbolId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_symbols')
          .select('*')
          .eq('id', symbolId)
          .maybeSingle();

        if (fetchError) throw fetchError;
        setSymbol(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSymbol();
  }, [symbolId]);

  return { symbol, loading, error };
}

export function useSDACommentary(symbolId?: string, sourceType?: SDACommentary['source_type']) {
  const [commentary, setCommentary] = useState<SDACommentary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCommentary() {
      if (!symbolId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = supabase
          .from('symbolism_sda_commentary')
          .select('*')
          .eq('symbol_id', symbolId)
          .order('created_at', { ascending: false });

        if (sourceType) {
          query = query.eq('source_type', sourceType);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setCommentary(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommentary();
  }, [symbolId, sourceType]);

  return { commentary, loading, error };
}

export function useSymbolCategories() {
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('symbolism_symbols')
          .select('category');

        if (fetchError) throw fetchError;

        // Count categories
        const categoryCounts = (data || []).reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const categoryArray = Object.entries(categoryCounts).map(([category, count]) => ({
          category,
          count,
        }));

        setCategories(categoryArray.sort((a, b) => b.count - a.count));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useRelatedSymbols(symbolId?: string) {
  const [relatedSymbols, setRelatedSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelatedSymbols() {
      if (!symbolId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // First get the current symbol to find related IDs
        const { data: currentSymbol, error: symbolError } = await supabase
          .from('symbolism_symbols')
          .select('related_symbols')
          .eq('id', symbolId)
          .maybeSingle();

        if (symbolError) throw symbolError;

        if (!currentSymbol?.related_symbols || currentSymbol.related_symbols.length === 0) {
          setRelatedSymbols([]);
          setLoading(false);
          return;
        }

        // Fetch related symbols
        const { data, error: fetchError } = await supabase
          .from('symbolism_symbols')
          .select('*')
          .in('id', currentSymbol.related_symbols);

        if (fetchError) throw fetchError;
        setRelatedSymbols(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedSymbols();
  }, [symbolId]);

  return { relatedSymbols, loading, error };
}
