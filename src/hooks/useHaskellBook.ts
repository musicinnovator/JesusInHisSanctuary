/**
 * Custom hooks for accessing Stephen N. Haskell's "The Cross and Its Shadow" book data
 *
 * Provides type-safe, efficient data fetching for book content, chapters,
 * scripture references, and theological concepts.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  HaskellBookMetadata,
  HaskellChapter,
  HaskellSection,
  ScriptureReference,
  TheologicalConcept,
  TypeAntitypePair,
  ChapterWithSections,
  ScriptureReferenceGrouped,
  ConceptWithRelations,
  BookSearchFilters,
  SearchResults
} from '../types/haskellBook';

/**
 * Hook to fetch book metadata including endorsements
 */
export function useHaskellMetadata() {
  const [metadata, setMetadata] = useState<HaskellBookMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('haskell_book_metadata')
          .select('*')
          .maybeSingle();

        if (error) throw error;
        setMetadata(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, []);

  return { metadata, loading, error };
}

/**
 * Hook to fetch all chapters with optional filtering
 */
export function useHaskellChapters(chapterNumber?: number) {
  const [chapters, setChapters] = useState<HaskellChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        let query = supabase
          .from('haskell_chapters')
          .select('*')
          .order('chapter_number', { ascending: true });

        if (chapterNumber) {
          query = query.eq('chapter_number', chapterNumber);
        }

        const { data, error } = await query;

        if (error) throw error;
        setChapters(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [chapterNumber]);

  return { chapters, loading, error };
}

/**
 * Hook to fetch a single chapter with all its sections
 */
export function useHaskellChapterWithSections(chapterId: string) {
  const [chapter, setChapter] = useState<ChapterWithSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchChapterWithSections() {
      try {
        setLoading(true);

        // Fetch chapter
        const { data: chapterData, error: chapterError } = await supabase
          .from('haskell_chapters')
          .select('*')
          .eq('id', chapterId)
          .maybeSingle();

        if (chapterError) throw chapterError;

        if (!chapterData) {
          setChapter(null);
          setLoading(false);
          return;
        }

        // Fetch sections for this chapter
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('haskell_sections')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('section_number', { ascending: true });

        if (sectionsError) throw sectionsError;

        // Count scripture references
        const { count: scriptureCount } = await supabase
          .from('haskell_scripture_references')
          .select('*', { count: 'exact', head: true })
          .eq('chapter_id', chapterId);

        // Count unique theological concepts
        const { data: conceptsData } = await supabase
          .from('haskell_sections')
          .select('theological_concepts')
          .eq('chapter_id', chapterId);

        const uniqueConcepts = new Set(
          conceptsData?.flatMap(s => s.theological_concepts || []) || []
        );

        setChapter({
          ...chapterData,
          sections: sectionsData || [],
          scripture_count: scriptureCount || 0,
          concept_count: uniqueConcepts.size
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (chapterId) {
      fetchChapterWithSections();
    }
  }, [chapterId]);

  return { chapter, loading, error };
}

/**
 * Hook to fetch scripture references with grouping and filtering
 */
export function useHaskellScriptures(filters?: {
  book?: string;
  chapterId?: string;
  theme?: string;
}) {
  const [scriptures, setScriptures] = useState<ScriptureReference[]>([]);
  const [grouped, setGrouped] = useState<ScriptureReferenceGrouped[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchScriptures() {
      try {
        setLoading(true);
        let query = supabase
          .from('haskell_scripture_references')
          .select('*')
          .order('book', { ascending: true })
          .order('chapter', { ascending: true })
          .order('verse_start', { ascending: true });

        if (filters?.book) {
          query = query.eq('book', filters.book);
        }
        if (filters?.chapterId) {
          query = query.eq('chapter_id', filters.chapterId);
        }
        if (filters?.theme) {
          query = query.eq('theological_theme', filters.theme);
        }

        const { data, error } = await query;

        if (error) throw error;

        setScriptures(data || []);

        // Group by book
        const groupedData: { [book: string]: ScriptureReference[] } = {};
        (data || []).forEach(ref => {
          if (!groupedData[ref.book]) {
            groupedData[ref.book] = [];
          }
          groupedData[ref.book].push(ref);
        });

        const groupedArray = Object.entries(groupedData).map(([book, references]) => ({
          book,
          references
        }));

        setGrouped(groupedArray);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchScriptures();
  }, [filters?.book, filters?.chapterId, filters?.theme]);

  return { scriptures, grouped, loading, error };
}

/**
 * Hook to fetch theological concepts with relationships
 */
export function useHaskellConcepts(conceptName?: string) {
  const [concepts, setConcepts] = useState<TheologicalConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConcepts() {
      try {
        setLoading(true);
        let query = supabase
          .from('haskell_theological_concepts')
          .select('*')
          .order('concept_name', { ascending: true });

        if (conceptName) {
          query = query.eq('concept_name', conceptName);
        }

        const { data, error } = await query;

        if (error) throw error;
        setConcepts(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchConcepts();
  }, [conceptName]);

  return { concepts, loading, error };
}

/**
 * Hook to fetch a single concept with all related data
 */
export function useHaskellConceptDetails(conceptId: string) {
  const [concept, setConcept] = useState<ConceptWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConceptDetails() {
      try {
        setLoading(true);

        const { data: conceptData, error: conceptError } = await supabase
          .from('haskell_theological_concepts')
          .select('*')
          .eq('id', conceptId)
          .maybeSingle();

        if (conceptError) throw conceptError;

        if (!conceptData) {
          setConcept(null);
          setLoading(false);
          return;
        }

        // Fetch related concepts
        const relatedIds = conceptData.related_concepts || [];
        let relatedConcepts: TheologicalConcept[] = [];

        if (relatedIds.length > 0) {
          const { data: relatedData } = await supabase
            .from('haskell_theological_concepts')
            .select('*')
            .in('id', relatedIds);

          relatedConcepts = relatedData || [];
        }

        // Fetch scripture references for chapters mentioned in this concept
        const chapterIds = conceptData.chapter_references || [];
        let scriptureRefs: ScriptureReference[] = [];

        if (chapterIds.length > 0) {
          const { data: scriptureData } = await supabase
            .from('haskell_scripture_references')
            .select('*')
            .in('chapter_id', chapterIds);

          scriptureRefs = scriptureData || [];
        }

        setConcept({
          ...conceptData,
          related_concept_details: relatedConcepts,
          scripture_references: scriptureRefs
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (conceptId) {
      fetchConceptDetails();
    }
  }, [conceptId]);

  return { concept, loading, error };
}

/**
 * Hook to fetch type-antitype pairs
 */
export function useHaskellTypeAntitypes(chapterId?: string) {
  const [pairs, setPairs] = useState<TypeAntitypePair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPairs() {
      try {
        setLoading(true);
        let query = supabase
          .from('haskell_type_antitype_pairs')
          .select('*')
          .order('created_at', { ascending: true });

        if (chapterId) {
          query = query.eq('chapter_id', chapterId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setPairs(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPairs();
  }, [chapterId]);

  return { pairs, loading, error };
}

/**
 * Hook to search across all book content
 */
export function useHaskellSearch(filters: BookSearchFilters) {
  const [results, setResults] = useState<SearchResults>({
    chapters: [],
    sections: [],
    scripture_references: [],
    concepts: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function performSearch() {
      if (!filters.text_query && !filters.chapter_number && !filters.theological_theme && !filters.scripture_book && !filters.concept_name) {
        setResults({ chapters: [], sections: [], scripture_references: [], concepts: [] });
        return;
      }

      try {
        setLoading(true);

        const searchResults: SearchResults = {
          chapters: [],
          sections: [],
          scripture_references: [],
          concepts: []
        };

        // Search chapters
        if (filters.text_query || filters.chapter_number) {
          let chapterQuery = supabase.from('haskell_chapters').select('*');

          if (filters.chapter_number) {
            chapterQuery = chapterQuery.eq('chapter_number', filters.chapter_number);
          }
          if (filters.text_query) {
            chapterQuery = chapterQuery.or(`title.ilike.%${filters.text_query}%,summary.ilike.%${filters.text_query}%,content.ilike.%${filters.text_query}%`);
          }

          const { data } = await chapterQuery;
          searchResults.chapters = data || [];
        }

        // Search scripture references
        if (filters.scripture_book || filters.theological_theme) {
          let scriptureQuery = supabase.from('haskell_scripture_references').select('*');

          if (filters.scripture_book) {
            scriptureQuery = scriptureQuery.eq('book', filters.scripture_book);
          }
          if (filters.theological_theme) {
            scriptureQuery = scriptureQuery.eq('theological_theme', filters.theological_theme);
          }

          const { data } = await scriptureQuery;
          searchResults.scripture_references = data || [];
        }

        // Search concepts
        if (filters.concept_name || filters.text_query) {
          let conceptQuery = supabase.from('haskell_theological_concepts').select('*');

          if (filters.concept_name) {
            conceptQuery = conceptQuery.eq('concept_name', filters.concept_name);
          }
          if (filters.text_query) {
            conceptQuery = conceptQuery.or(`concept_name.ilike.%${filters.text_query}%,definition.ilike.%${filters.text_query}%`);
          }

          const { data } = await conceptQuery;
          searchResults.concepts = data || [];
        }

        setResults(searchResults);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [filters.text_query, filters.chapter_number, filters.theological_theme, filters.scripture_book, filters.concept_name]);

  return { results, loading, error };
}

/**
 * Hook to fetch Bible book names used in references
 */
export function useHaskellBibleBooks() {
  const [books, setBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('haskell_scripture_references')
          .select('book');

        if (error) throw error;

        const uniqueBooks = [...new Set(data?.map(d => d.book) || [])].sort();
        setBooks(uniqueBooks);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return { books, loading, error };
}
