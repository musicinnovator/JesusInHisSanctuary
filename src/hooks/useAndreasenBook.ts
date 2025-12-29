import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  AndreasenBookInfo,
  AndreasenChapter,
  AndreasenSection,
  AndreasenScripture,
  AndreasenTheologicalConcept,
  AndreasenConceptRelationship,
  AndreasenIllustration,
  AndreasenTimelineEvent,
  AndreasenQuotation,
  AndreasenStudyQuestion,
  AndreasenCrossReference,
  AndreasenViewMode,
  ChapterWithSections,
  ScriptureWithContext,
  ConceptWithRelationships
} from '../types/andreasenBook';

export function useAndreasenBook() {
  const [bookInfo, setBookInfo] = useState<AndreasenBookInfo | null>(null);
  const [chapters, setChapters] = useState<AndreasenChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<AndreasenChapter | null>(null);
  const [sections, setSections] = useState<AndreasenSection[]>([]);
  const [scriptures, setScriptures] = useState<AndreasenScripture[]>([]);
  const [concepts, setConcepts] = useState<AndreasenTheologicalConcept[]>([]);
  const [conceptRelationships, setConceptRelationships] = useState<AndreasenConceptRelationship[]>([]);
  const [illustrations, setIllustrations] = useState<AndreasenIllustration[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<AndreasenTimelineEvent[]>([]);
  const [quotations, setQuotations] = useState<AndreasenQuotation[]>([]);
  const [studyQuestions, setStudyQuestions] = useState<AndreasenStudyQuestion[]>([]);
  const [crossReferences, setCrossReferences] = useState<AndreasenCrossReference[]>([]);
  const [viewMode, setViewMode] = useState<AndreasenViewMode>('chapters');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBookData();
  }, []);

  const loadBookData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        bookInfoData,
        chaptersData,
        scripturesData,
        conceptsData,
        illustrationsData,
        timelineData
      ] = await Promise.all([
        supabase.from('andreasen_book_info').select('*').maybeSingle(),
        supabase.from('andreasen_chapters').select('*').order('chapter_order'),
        supabase.from('andreasen_scriptures').select('*').order('reference'),
        supabase.from('andreasen_theological_concepts').select('*').order('name'),
        supabase.from('andreasen_illustrations').select('*').order('display_order'),
        supabase.from('andreasen_timeline_events').select('*').order('timeline_position')
      ]);

      if (bookInfoData.error) throw bookInfoData.error;
      if (chaptersData.error) throw chaptersData.error;
      if (scripturesData.error) throw scripturesData.error;
      if (conceptsData.error) throw conceptsData.error;
      if (illustrationsData.error) throw illustrationsData.error;
      if (timelineData.error) throw timelineData.error;

      setBookInfo(bookInfoData.data);
      setChapters(chaptersData.data || []);
      setScriptures(scripturesData.data || []);
      setConcepts(conceptsData.data || []);
      setIllustrations(illustrationsData.data || []);
      setTimelineEvents(timelineData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load book data');
      console.error('Error loading Andreasen book data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadChapterSections = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from('andreasen_sections')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('section_order');

      if (error) throw error;
      setSections(data || []);
      return data || [];
    } catch (err) {
      console.error('Error loading chapter sections:', err);
      return [];
    }
  };

  const loadChapterQuotations = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from('andreasen_quotations')
        .select('*')
        .eq('chapter_id', chapterId);

      if (error) throw error;
      setQuotations(data || []);
      return data || [];
    } catch (err) {
      console.error('Error loading quotations:', err);
      return [];
    }
  };

  const loadChapterStudyQuestions = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from('andreasen_study_questions')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('question_order');

      if (error) throw error;
      setStudyQuestions(data || []);
      return data || [];
    } catch (err) {
      console.error('Error loading study questions:', err);
      return [];
    }
  };

  const loadConceptRelationships = async (conceptId: string) => {
    try {
      const { data, error } = await supabase
        .from('andreasen_concept_relationships')
        .select('*')
        .or(`concept_a_id.eq.${conceptId},concept_b_id.eq.${conceptId}`);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error loading concept relationships:', err);
      return [];
    }
  };

  const selectChapter = async (chapter: AndreasenChapter) => {
    setSelectedChapter(chapter);
    await Promise.all([
      loadChapterSections(chapter.id),
      loadChapterQuotations(chapter.id),
      loadChapterStudyQuestions(chapter.id)
    ]);
  };

  const getChapterWithSections = async (chapterId: string): Promise<ChapterWithSections | null> => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return null;

    const [sectionsList, questionsList, illustrationsList] = await Promise.all([
      loadChapterSections(chapterId),
      loadChapterStudyQuestions(chapterId),
      supabase.from('andreasen_illustrations').select('*').eq('chapter_id', chapterId).then(r => r.data || [])
    ]);

    return {
      ...chapter,
      sections: sectionsList,
      studyQuestions: questionsList,
      illustrations: illustrationsList
    };
  };

  const getScriptureWithContext = async (scriptureId: string): Promise<ScriptureWithContext | null> => {
    const scripture = scriptures.find(s => s.id === scriptureId);
    if (!scripture) return null;

    const relatedChapters = chapters.filter(c =>
      scripture.related_chapter_ids.includes(c.id)
    );

    const relatedConcepts = concepts.filter(c =>
      scripture.related_concept_ids.includes(c.id)
    );

    return {
      ...scripture,
      relatedChapters,
      relatedConcepts
    };
  };

  const getConceptWithRelationships = async (conceptId: string): Promise<ConceptWithRelationships | null> => {
    const concept = concepts.find(c => c.id === conceptId);
    if (!concept) return null;

    const relationships = await loadConceptRelationships(conceptId);

    const relationshipsWithConcepts = relationships.map(rel => {
      const relatedConceptId = rel.concept_a_id === conceptId ? rel.concept_b_id : rel.concept_a_id;
      const relatedConcept = concepts.find(c => c.id === relatedConceptId);
      return {
        relationship: rel,
        relatedConcept: relatedConcept!
      };
    }).filter(r => r.relatedConcept);

    const relatedChapters = chapters.filter(c =>
      concept.chapter_references.includes(c.id)
    );

    return {
      ...concept,
      relationships: relationshipsWithConcepts,
      relatedChapters
    };
  };

  const searchContent = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;

    try {
      const lowerQuery = query.toLowerCase();

      const matchingChapters = chapters.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.summary.toLowerCase().includes(lowerQuery) ||
        c.key_themes.some(t => t.toLowerCase().includes(lowerQuery))
      );

      const matchingScriptures = scriptures.filter(s =>
        s.reference.toLowerCase().includes(lowerQuery) ||
        s.context_in_book.toLowerCase().includes(lowerQuery) ||
        s.theme_tags.some(t => t.toLowerCase().includes(lowerQuery))
      );

      const matchingConcepts = concepts.filter(c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.definition.toLowerCase().includes(lowerQuery) ||
        c.category.toLowerCase().includes(lowerQuery)
      );

      return {
        chapters: matchingChapters,
        scriptures: matchingScriptures,
        concepts: matchingConcepts
      };
    } catch (err) {
      console.error('Error searching content:', err);
      return { chapters: [], scriptures: [], concepts: [] };
    }
  };

  const getScripturesByTheme = (theme: string) => {
    return scriptures.filter(s => s.theme_tags.includes(theme));
  };

  const getConceptsByCategory = (category: string) => {
    return concepts.filter(c => c.category === category);
  };

  const getChapterIllustrations = (chapterId: string) => {
    return illustrations.filter(i => i.chapter_id === chapterId);
  };

  const getTimelineEventsByCategory = (category: string) => {
    return timelineEvents.filter(e => e.category === category);
  };

  return {
    bookInfo,
    chapters,
    selectedChapter,
    sections,
    scriptures,
    concepts,
    conceptRelationships,
    illustrations,
    timelineEvents,
    quotations,
    studyQuestions,
    crossReferences,
    viewMode,
    searchQuery,
    loading,
    error,
    selectChapter,
    setViewMode,
    loadChapterSections,
    loadChapterQuotations,
    loadChapterStudyQuestions,
    loadConceptRelationships,
    getChapterWithSections,
    getScriptureWithContext,
    getConceptWithRelationships,
    searchContent,
    getScripturesByTheme,
    getConceptsByCategory,
    getChapterIllustrations,
    getTimelineEventsByCategory,
    reloadData: loadBookData
  };
}
