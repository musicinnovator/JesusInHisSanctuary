import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Book {
  id: string;
  title: string;
  author: string;
  year_published: number;
  overview_analysis: string;
  key_themes: string[];
  total_chapters: number;
  total_sections: number;
  total_scriptures: number;
  created_at: string;
  updated_at: string;
}

interface Section {
  id: string;
  book_id: string;
  section_number: number;
  section_title: string;
  section_overview: string;
  key_themes: string[];
  chapter_range: string;
  created_at: string;
}

interface Chapter {
  id: string;
  book_id: string;
  section_id: string;
  chapter_number: number;
  chapter_title: string;
  chapter_overview: string;
  content_full: string;
  key_points: string[];
  scripture_references: string[];
  created_at: string;
}

interface Scripture {
  id: string;
  book_id: string;
  chapter_id: string;
  reference: string;
  book_name: string;
  chapter_verse: string;
  context_in_book: string;
  footnote_number: number;
  quote_text: string;
  testament: 'Old' | 'New';
  category: string;
  created_at: string;
}

interface Concept {
  id: string;
  book_id: string;
  concept_name: string;
  concept_type: 'type' | 'antitype' | 'doctrine' | 'symbol' | 'prophecy' | 'teaching';
  description: string;
  scripture_foundation: string[];
  related_chapters: number[];
  old_testament_type: string;
  new_testament_antitype: string;
  significance: string;
  created_at: string;
}

interface Illustration {
  id: string;
  book_id: string;
  chapter_id: string;
  illustration_type: 'chart' | 'graph' | 'diagram' | 'timeline' | 'map' | 'table' | 'infographic';
  title: string;
  description: string;
  data_source: any;
  related_concepts: string[];
  related_scriptures: string[];
  display_order: number;
  created_at: string;
}

interface Highlight {
  id: string;
  book_id: string;
  chapter_id: string;
  section_id: string;
  highlight_text: string;
  highlight_type: 'key_point' | 'summary' | 'application' | 'insight' | 'definition' | 'quote';
  context: string;
  related_scriptures: string[];
  display_order: number;
  created_at: string;
}

export function useCrossShadowBook() {
  const [book, setBook] = useState<Book | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookData();
  }, []);

  async function fetchBookData() {
    try {
      setLoading(true);
      setError(null);

      // Fetch book metadata
      const { data: bookData, error: bookError } = await supabase
        .from('cross_shadow_book')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (bookError) throw bookError;

      if (!bookData) {
        setError('Book not found in database');
        setLoading(false);
        return;
      }

      setBook(bookData);

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('cross_shadow_sections')
        .select('*')
        .eq('book_id', bookData.id)
        .order('section_number', { ascending: true });

      if (sectionsError) throw sectionsError;
      setSections(sectionsData || []);

      // Fetch chapters
      const { data: chaptersData, error: chaptersError } = await supabase
        .from('cross_shadow_chapters')
        .select('*')
        .eq('book_id', bookData.id)
        .order('chapter_number', { ascending: true });

      if (chaptersError) throw chaptersError;
      setChapters(chaptersData || []);

      // Fetch scriptures
      const { data: scripturesData, error: scripturesError } = await supabase
        .from('cross_shadow_scriptures')
        .select('*')
        .eq('book_id', bookData.id)
        .order('footnote_number', { ascending: true });

      if (scripturesError) throw scripturesError;
      setScriptures(scripturesData || []);

      // Fetch concepts
      const { data: conceptsData, error: conceptsError } = await supabase
        .from('cross_shadow_concepts')
        .select('*')
        .eq('book_id', bookData.id);

      if (conceptsError) throw conceptsError;
      setConcepts(conceptsData || []);

      // Fetch illustrations
      const { data: illustrationsData, error: illustrationsError } = await supabase
        .from('cross_shadow_illustrations')
        .select('*')
        .eq('book_id', bookData.id)
        .order('display_order', { ascending: true });

      if (illustrationsError) throw illustrationsError;
      setIllustrations(illustrationsData || []);

      // Fetch highlights
      const { data: highlightsData, error: highlightsError } = await supabase
        .from('cross_shadow_highlights')
        .select('*')
        .eq('book_id', bookData.id)
        .order('display_order', { ascending: true });

      if (highlightsError) throw highlightsError;
      setHighlights(highlightsData || []);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching book data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  }

  return {
    book,
    sections,
    chapters,
    scriptures,
    concepts,
    illustrations,
    highlights,
    loading,
    error,
    refetch: fetchBookData
  };
}

export function useCrossShadowChapter(chapterId: string | undefined) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterId) {
      setLoading(false);
      return;
    }

    fetchChapterData();
  }, [chapterId]);

  async function fetchChapterData() {
    if (!chapterId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch chapter
      const { data: chapterData, error: chapterError } = await supabase
        .from('cross_shadow_chapters')
        .select('*')
        .eq('id', chapterId)
        .maybeSingle();

      if (chapterError) throw chapterError;
      setChapter(chapterData);

      if (!chapterData) {
        setLoading(false);
        return;
      }

      // Fetch chapter scriptures
      const { data: scripturesData, error: scripturesError } = await supabase
        .from('cross_shadow_scriptures')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('footnote_number', { ascending: true });

      if (scripturesError) throw scripturesError;
      setScriptures(scripturesData || []);

      // Fetch chapter highlights
      const { data: highlightsData, error: highlightsError } = await supabase
        .from('cross_shadow_highlights')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('display_order', { ascending: true });

      if (highlightsError) throw highlightsError;
      setHighlights(highlightsData || []);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching chapter data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  }

  return {
    chapter,
    scriptures,
    highlights,
    loading,
    error,
    refetch: fetchChapterData
  };
}

export function useCrossShadowConcepts() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [relationships, setRelationships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConceptsData();
  }, []);

  async function fetchConceptsData() {
    try {
      setLoading(true);
      setError(null);

      // Fetch concepts
      const { data: conceptsData, error: conceptsError } = await supabase
        .from('cross_shadow_concepts')
        .select('*');

      if (conceptsError) throw conceptsError;
      setConcepts(conceptsData || []);

      // Fetch concept relationships
      const { data: relationshipsData, error: relationshipsError } = await supabase
        .from('cross_shadow_concept_relationships')
        .select('*');

      if (relationshipsError) throw relationshipsError;
      setRelationships(relationshipsData || []);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching concepts data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  }

  return {
    concepts,
    relationships,
    loading,
    error,
    refetch: fetchConceptsData
  };
}
