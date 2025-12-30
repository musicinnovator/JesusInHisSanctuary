import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  HebrewExpression,
  ScriptureEnhanced,
  StudyQuestion,
  MemorableQuote,
  Illustration,
  TimelineEvent,
  TypeAntitypeLink,
  UserProgress,
  Bookmark,
  StudyPath,
  GilbertViewMode,
  SearchResults
} from '../types/gilbertEnhanced';
import { GilbertChapter, GilbertConcept } from '../types/gilbertBook';

export function useGilbertEnhanced() {
  // Base data
  const [chapters, setChapters] = useState<GilbertChapter[]>([]);
  const [concepts, setConcepts] = useState<GilbertConcept[]>([]);

  // Enhanced data
  const [hebrewExpressions, setHebrewExpressions] = useState<HebrewExpression[]>([]);
  const [scripturesEnhanced, setScripturesEnhanced] = useState<ScriptureEnhanced[]>([]);
  const [studyQuestions, setStudyQuestions] = useState<StudyQuestion[]>([]);
  const [memorableQuotes, setMemorableQuotes] = useState<MemorableQuote[]>([]);
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [typeAntitypeLinks, setTypeAntitypeLinks] = useState<TypeAntitypeLink[]>([]);
  const [studyPaths, setStudyPaths] = useState<StudyPath[]>([]);

  // User-specific data
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // UI state
  const [selectedChapter, setSelectedChapter] = useState<GilbertChapter | null>(null);
  const [viewMode, setViewMode] = useState<GilbertViewMode>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      await Promise.all([
        loadChapters(),
        loadConcepts(),
        loadHebrewExpressions(),
        loadScripturesEnhanced(),
        loadStudyQuestions(),
        loadMemorableQuotes(),
        loadIllustrations(),
        loadTimelineEvents(),
        loadTypeAntitypeLinks(),
        loadStudyPaths()
      ]);
    } catch (err) {
      console.error('Error loading Gilbert data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  // Base data loaders
  async function loadChapters() {
    const { data, error } = await supabase
      .from('gilbert_chapters')
      .select('*')
      .order('chapter_number', { ascending: true });

    if (error) throw error;
    setChapters(data || []);
  }

  async function loadConcepts() {
    const { data, error } = await supabase
      .from('gilbert_key_concepts')
      .select('*')
      .order('concept_name', { ascending: true });

    if (error) throw error;
    setConcepts(data || []);
  }

  // Enhanced data loaders
  async function loadHebrewExpressions() {
    const { data, error } = await supabase
      .from('gilbert_hebrew_expressions')
      .select('*')
      .order('transliteration', { ascending: true });

    if (error) throw error;
    setHebrewExpressions(data || []);
  }

  async function loadScripturesEnhanced() {
    const { data, error } = await supabase
      .from('gilbert_scripture_enhanced')
      .select('*')
      .order('reference', { ascending: true });

    if (error) throw error;
    setScripturesEnhanced(data || []);
  }

  async function loadStudyQuestions() {
    const { data, error } = await supabase
      .from('gilbert_study_questions')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    setStudyQuestions(data || []);
  }

  async function loadMemorableQuotes() {
    const { data, error } = await supabase
      .from('gilbert_memorable_quotes')
      .select('*');

    if (error) throw error;
    setMemorableQuotes(data || []);
  }

  async function loadIllustrations() {
    const { data, error } = await supabase
      .from('gilbert_illustrations')
      .select('*');

    if (error) throw error;
    setIllustrations(data || []);
  }

  async function loadTimelineEvents() {
    const { data, error } = await supabase
      .from('gilbert_timeline_events')
      .select('*')
      .order('timeline_position', { ascending: true });

    if (error) throw error;
    setTimelineEvents(data || []);
  }

  async function loadTypeAntitypeLinks() {
    const { data, error } = await supabase
      .from('gilbert_type_antitype_links')
      .select('*')
      .order('significance_level', { ascending: false });

    if (error) throw error;
    setTypeAntitypeLinks(data || []);
  }

  async function loadStudyPaths() {
    const { data, error } = await supabase
      .from('gilbert_study_paths')
      .select('*');

    if (error) throw error;
    setStudyPaths(data || []);
  }

  // Filtering and searching functions
  function searchHebrewExpressions(query: string): HebrewExpression[] {
    const lowerQuery = query.toLowerCase();
    return hebrewExpressions.filter(expr =>
      expr.transliteration.toLowerCase().includes(lowerQuery) ||
      expr.meaning.toLowerCase().includes(lowerQuery) ||
      expr.expression.toLowerCase().includes(lowerQuery)
    );
  }

  function getHebrewByCategory(category: string): HebrewExpression[] {
    return hebrewExpressions.filter(expr => expr.category === category);
  }

  function getHebrewByLetterGroup(letter: string): HebrewExpression[] {
    return hebrewExpressions.filter(expr => expr.letter_group === letter);
  }

  function getScripturesByTestament(testament: 'OT' | 'NT' | 'all'): ScriptureEnhanced[] {
    if (testament === 'all') return scripturesEnhanced;
    return scripturesEnhanced.filter(s => s.testament === testament);
  }

  function getScripturesByTheme(theme: string): ScriptureEnhanced[] {
    return scripturesEnhanced.filter(s => s.theme_tags?.includes(theme));
  }

  function getMessianicScriptures(): ScriptureEnhanced[] {
    return scripturesEnhanced.filter(s => s.is_messianic);
  }

  function getTypeAntitypeByCategory(category: string): TypeAntitypeLink[] {
    return typeAntitypeLinks.filter(link => link.category === category);
  }

  function getTimelineByType(type: 'historical' | 'sanctuary' | 'prophetic' | 'all'): TimelineEvent[] {
    if (type === 'all') return timelineEvents;
    return timelineEvents.filter(e => e.timeline_type === type);
  }

  function getTimelineByPeriod(period: 'past' | 'present' | 'future'): TimelineEvent[] {
    switch (period) {
      case 'past':
        return timelineEvents.filter(e => e.is_past);
      case 'present':
        return timelineEvents.filter(e => e.is_present);
      case 'future':
        return timelineEvents.filter(e => e.is_future);
    }
  }

  function getStudyQuestionsForChapter(chapterId: string): StudyQuestion[] {
    return studyQuestions.filter(q => q.chapter_id === chapterId);
  }

  function getMemorableQuotesForChapter(chapterId: string): MemorableQuote[] {
    return memorableQuotes.filter(q => q.chapter_id === chapterId);
  }

  function getIllustrationsForChapter(chapterId: string): Illustration[] {
    return illustrations.filter(i => i.chapter_id === chapterId);
  }

  // Comprehensive search
  async function searchAll(query: string): Promise<SearchResults> {
    const lowerQuery = query.toLowerCase();

    return {
      chapters: chapters.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.summary.toLowerCase().includes(lowerQuery)
      ),
      scriptures: scripturesEnhanced.filter(s =>
        s.reference.toLowerCase().includes(lowerQuery) ||
        s.text_kjv?.toLowerCase().includes(lowerQuery)
      ),
      hebrewTerms: searchHebrewExpressions(query),
      typeAntitypes: typeAntitypeLinks.filter(t =>
        t.ot_type_name.toLowerCase().includes(lowerQuery) ||
        t.nt_antitype_name.toLowerCase().includes(lowerQuery) ||
        t.connection_explanation.toLowerCase().includes(lowerQuery)
      )
    };
  }

  // User progress functions
  async function getProgress(userId: string) {
    const { data, error } = await supabase
      .from('gilbert_user_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading progress:', error);
      return;
    }

    setUserProgress(data || []);
  }

  async function updateProgress(userId: string, chapterId: string, completed: boolean) {
    const { error } = await supabase
      .from('gilbert_user_progress')
      .upsert({
        user_id: userId,
        chapter_id: chapterId,
        completed,
        completion_date: completed ? new Date().toISOString() : null,
        last_accessed: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating progress:', error);
      return;
    }

    await getProgress(userId);
  }

  // Bookmark functions
  async function getBookmarks(userId: string) {
    const { data, error } = await supabase
      .from('gilbert_bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading bookmarks:', error);
      return;
    }

    setBookmarks(data || []);
  }

  async function addBookmark(userId: string, chapterId: string, note?: string) {
    const { error } = await supabase
      .from('gilbert_bookmarks')
      .insert({
        user_id: userId,
        chapter_id: chapterId,
        note,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error adding bookmark:', error);
      return;
    }

    await getBookmarks(userId);
  }

  async function deleteBookmark(bookmarkId: string, userId: string) {
    const { error } = await supabase
      .from('gilbert_bookmarks')
      .delete()
      .eq('id', bookmarkId);

    if (error) {
      console.error('Error deleting bookmark:', error);
      return;
    }

    await getBookmarks(userId);
  }

  // Statistics and analytics
  function getReadingProgress(userId: string): number {
    if (chapters.length === 0) return 0;
    const completedCount = userProgress.filter(p => p.completed).length;
    return (completedCount / chapters.length) * 100;
  }

  function getTotalStudyTime(userId: string): number {
    return userProgress.reduce((total, p) => total + p.time_spent_minutes, 0);
  }

  function getBookStatistics() {
    return {
      totalChapters: chapters.length,
      totalConcepts: concepts.length,
      totalHebrewTerms: hebrewExpressions.length,
      totalScriptures: scripturesEnhanced.length,
      totalTypeAntitypes: typeAntitypeLinks.length,
      totalTimelineEvents: timelineEvents.length,
      totalStudyQuestions: studyQuestions.length
    };
  }

  // Hebrew categories
  function getHebrewCategories(): string[] {
    const categories = new Set(hebrewExpressions.map(e => e.category));
    return Array.from(categories).sort();
  }

  // Scripture themes
  function getScriptureThemes(): string[] {
    const themes = new Set<string>();
    scripturesEnhanced.forEach(s => {
      s.theme_tags?.forEach(tag => themes.add(tag));
    });
    return Array.from(themes).sort();
  }

  // Type/Antitype categories
  function getTypeAntitypeCategories(): string[] {
    const categories = new Set(typeAntitypeLinks.map(t => t.category));
    return Array.from(categories).sort();
  }

  return {
    // Base data
    chapters,
    concepts,
    selectedChapter,
    setSelectedChapter,

    // Enhanced data
    hebrewExpressions,
    scripturesEnhanced,
    studyQuestions,
    memorableQuotes,
    illustrations,
    timelineEvents,
    typeAntitypeLinks,
    studyPaths,

    // User data
    userProgress,
    bookmarks,

    // UI state
    viewMode,
    setViewMode,
    loading,
    error,

    // Filtering functions
    searchHebrewExpressions,
    getHebrewByCategory,
    getHebrewByLetterGroup,
    getScripturesByTestament,
    getScripturesByTheme,
    getMessianicScriptures,
    getTypeAntitypeByCategory,
    getTimelineByType,
    getTimelineByPeriod,
    getStudyQuestionsForChapter,
    getMemorableQuotesForChapter,
    getIllustrationsForChapter,
    searchAll,

    // User functions
    getProgress,
    updateProgress,
    getBookmarks,
    addBookmark,
    deleteBookmark,

    // Analytics
    getReadingProgress,
    getTotalStudyTime,
    getBookStatistics,

    // Categories and themes
    getHebrewCategories,
    getScriptureThemes,
    getTypeAntitypeCategories,

    // Reload data
    loadAllData
  };
}
