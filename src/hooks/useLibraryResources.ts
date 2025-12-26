import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type {
  Resource,
  Author,
  Category,
  ResourceWithAuthor,
  LibrarySearchParams,
  LibrarySearchResults,
  Collection,
  CollectionWithResources
} from '../types/library';

export function useLibraryResources(params: LibrarySearchParams = {}) {
  const [resources, setResources] = useState<ResourceWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('library_resources')
        .select(`
          *,
          author:library_authors(*),
          category:library_categories(*)
        `, { count: 'exact' })
        .eq('verified', true);

      if (params.query) {
        query = query.or(`title.ilike.%${params.query}%,description.ilike.%${params.query}%`);
      }

      if (params.category) {
        query = query.eq('category_id', params.category);
      }

      if (params.author) {
        query = query.eq('author_id', params.author);
      }

      if (params.type) {
        query = query.eq('resource_type', params.type);
      }

      if (params.yearMin) {
        query = query.gte('publication_year', params.yearMin);
      }

      if (params.yearMax) {
        query = query.lte('publication_year', params.yearMax);
      }

      if (params.featured !== undefined) {
        query = query.eq('featured', params.featured);
      }

      const sortBy = params.sortBy || 'title';
      const sortOrder = params.sortOrder || 'asc';

      switch (sortBy) {
        case 'author':
          query = query.order('author_id', { ascending: sortOrder === 'asc' });
          break;
        case 'year':
          query = query.order('publication_year', { ascending: sortOrder === 'asc', nullsFirst: false });
          break;
        case 'rating':
          query = query.order('average_rating', { ascending: sortOrder === 'asc' });
          break;
        case 'downloads':
          query = query.order('total_downloads', { ascending: sortOrder === 'asc' });
          break;
        default:
          query = query.order('title', { ascending: sortOrder === 'asc' });
      }

      if (params.limit) {
        query = query.limit(params.limit);
      }

      if (params.offset) {
        query = query.range(params.offset, params.offset + (params.limit || 20) - 1);
      }

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setResources(data as ResourceWithAuthor[] || []);
      setTotal(count || 0);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  }, [params.query, params.category, params.author, params.type, params.yearMin, params.yearMax, params.featured, params.sortBy, params.sortOrder, params.limit, params.offset]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, loading, error, total, refetch: fetchResources };
}

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('library_authors')
          .select('*')
          .order('full_name');

        if (fetchError) throw fetchError;
        setAuthors(data || []);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching authors:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthors();
  }, []);

  return { authors, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('library_categories')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;
        setCategories(data || []);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useFeaturedCollections() {
  const [collections, setCollections] = useState<CollectionWithResources[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);

        const { data: collectionsData, error: collectionsError } = await supabase
          .from('library_collections')
          .select('*')
          .eq('is_featured', true)
          .order('sort_order');

        if (collectionsError) throw collectionsError;

        const collectionsWithResources = await Promise.all(
          (collectionsData || []).map(async (collection) => {
            const { data: resourcesData, count } = await supabase
              .from('library_collection_resources')
              .select(`
                resource_id,
                sort_order,
                resource:library_resources(
                  *,
                  author:library_authors(*),
                  category:library_categories(*)
                )
              `, { count: 'exact' })
              .eq('collection_id', collection.id)
              .order('sort_order');

            return {
              ...collection,
              resources: (resourcesData || []).map((r: any) => r.resource).filter(Boolean),
              resource_count: count || 0
            };
          })
        );

        setCollections(collectionsWithResources);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching collections:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { collections, loading, error };
}

export function useResourceDownload() {
  const [downloading, setDownloading] = useState(false);

  const trackDownload = useCallback(async (resourceId: string) => {
    try {
      setDownloading(true);

      await supabase
        .from('library_downloads')
        .insert({
          resource_id: resourceId,
          user_id: null,
          ip_address: null,
          user_agent: navigator.userAgent
        });

      const { data: resource } = await supabase
        .from('library_resources')
        .select('pdf_url, title')
        .eq('id', resourceId)
        .single();

      if (resource?.pdf_url) {
        window.open(resource.pdf_url, '_blank');
      }
    } catch (err) {
      console.error('Error tracking download:', err);
    } finally {
      setDownloading(false);
    }
  }, []);

  return { trackDownload, downloading };
}
