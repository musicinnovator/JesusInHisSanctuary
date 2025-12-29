import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Scripture Texts
export interface ScriptureText {
  id: string;
  reference_id?: string;
  kjv_text: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  usage_context?: string;
  theme?: string;
  cross_references: string[];
}

// Timeline Events
export interface TimelineEvent {
  id: string;
  timeline_type: 'historical' | 'contemporary' | 'biblical';
  event_year: number;
  event_date?: string;
  event_title: string;
  event_description?: string;
  significance?: string;
  related_scriptures: string[];
  related_people: string[];
  display_order: number;
}

// Concept Relationships
export interface ConceptRelationship {
  id: string;
  concept_from_id: string;
  concept_to_id: string;
  relationship_type: string;
  strength: number;
  description?: string;
  from_concept?: any;
  to_concept?: any;
}

// Diagrams
export interface Diagram {
  id: string;
  diagram_type: string;
  title: string;
  description?: string;
  display_order: number;
  viewbox: string;
  elements?: DiagramElement[];
}

export interface DiagramElement {
  id: string;
  diagram_id: string;
  element_type: string;
  element_data: Record<string, any>;
  position: { x: number; y: number; width: number; height: number };
  related_scripture_ref?: string;
  interactive: boolean;
  style: Record<string, any>;
  display_order: number;
}

// Hook for Scripture Texts
export function useScriptureTexts() {
  const [scriptures, setScriptures] = useState<ScriptureText[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchScriptures();
  }, []);

  const fetchScriptures = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('crosier_scripture_texts')
        .select('*')
        .order('book', { ascending: true })
        .order('chapter', { ascending: true })
        .order('verse_start', { ascending: true });

      if (fetchError) throw fetchError;

      setScriptures(data || []);
    } catch (err) {
      console.error('Error fetching scripture texts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch scriptures'));
    } finally {
      setLoading(false);
    }
  };

  const filterByBook = (book: string) => {
    return scriptures.filter(s => s.book === book);
  };

  const filterByTheme = (theme: string) => {
    return scriptures.filter(s => s.theme === theme);
  };

  const searchScriptures = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return scriptures.filter(s =>
      s.kjv_text.toLowerCase().includes(lowerQuery) ||
      s.book.toLowerCase().includes(lowerQuery) ||
      (s.theme && s.theme.toLowerCase().includes(lowerQuery))
    );
  };

  return {
    scriptures,
    loading,
    error,
    filterByBook,
    filterByTheme,
    searchScriptures,
    refresh: fetchScriptures
  };
}

// Hook for Timeline Events
export function useTimelineEvents(timelineType?: 'historical' | 'contemporary' | 'biblical') {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [timelineType]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('crosier_timeline_events')
        .select('*');

      if (timelineType) {
        query = query.eq('timeline_type', timelineType);
      }

      query = query.order('event_year', { ascending: true });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching timeline events:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch timeline events'));
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    refresh: fetchEvents
  };
}

// Hook for Concept Relationships
export function useConceptRelationships() {
  const [relationships, setRelationships] = useState<ConceptRelationship[]>([]);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRelationships();
  }, []);

  const fetchRelationships = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch concepts first
      const { data: conceptsData, error: conceptsError } = await supabase
        .from('crosier_theological_concepts')
        .select('*');

      if (conceptsError) throw conceptsError;
      setConcepts(conceptsData || []);

      // Fetch relationships
      const { data, error: fetchError } = await supabase
        .from('crosier_concept_relationships')
        .select('*');

      if (fetchError) throw fetchError;

      // Enrich relationships with concept data
      const enrichedData = (data || []).map(rel => {
        const fromConcept = conceptsData?.find(c => c.id === rel.concept_from_id);
        const toConcept = conceptsData?.find(c => c.id === rel.concept_to_id);
        return {
          ...rel,
          from_concept: fromConcept,
          to_concept: toConcept
        };
      });

      setRelationships(enrichedData);
    } catch (err) {
      console.error('Error fetching concept relationships:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch concept relationships'));
    } finally {
      setLoading(false);
    }
  };

  return {
    relationships,
    concepts,
    loading,
    error,
    refresh: fetchRelationships
  };
}

// Hook for Diagrams
export function useDiagrams(diagramType?: string) {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchDiagrams();
  }, [diagramType]);

  const fetchDiagrams = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('crosier_diagrams')
        .select('*');

      if (diagramType) {
        query = query.eq('diagram_type', diagramType);
      }

      query = query.order('display_order', { ascending: true });

      const { data: diagramsData, error: diagramsError } = await query;

      if (diagramsError) throw diagramsError;

      // Fetch elements for each diagram
      const diagramsWithElements = await Promise.all(
        (diagramsData || []).map(async (diagram) => {
          const { data: elementsData, error: elementsError } = await supabase
            .from('crosier_diagram_elements')
            .select('*')
            .eq('diagram_id', diagram.id)
            .order('display_order', { ascending: true });

          if (elementsError) {
            console.error(`Error fetching elements for diagram ${diagram.id}:`, elementsError);
            return { ...diagram, elements: [] };
          }

          return { ...diagram, elements: elementsData || [] };
        })
      );

      setDiagrams(diagramsWithElements);
    } catch (err) {
      console.error('Error fetching diagrams:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch diagrams'));
    } finally {
      setLoading(false);
    }
  };

  return {
    diagrams,
    loading,
    error,
    refresh: fetchDiagrams
  };
}
