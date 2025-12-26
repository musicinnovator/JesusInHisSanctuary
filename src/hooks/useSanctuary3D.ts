import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  Sanctuary3DModel,
  ModelHotspot,
  GuidedTour,
  TourStop,
  TourWithStops,
  ModelWithHotspots,
  ModelComparison,
  ComparisonPoint,
  ComparisonWithDetails,
  ElementMeasurement
} from '../types/sanctuary3d';

export function useSanctuary3DModels() {
  const [models, setModels] = useState<Sanctuary3DModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('sanctuary_3d_models')
          .select('*')
          .order('order_position', { ascending: true });

        if (fetchError) throw fetchError;
        setModels(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  return { models, loading, error };
}

export function useModelByName(name: string | undefined) {
  const [modelData, setModelData] = useState<ModelWithHotspots | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    async function fetchModelDetails() {
      try {
        setLoading(true);

        const { data: modelResult, error: modelError } = await supabase
          .from('sanctuary_3d_models')
          .select('*')
          .eq('name', name)
          .single();

        if (modelError) throw modelError;
        if (!modelResult) throw new Error('Model not found');

        const [hotspotsResult, toursResult] = await Promise.all([
          supabase
            .from('model_hotspots')
            .select('*')
            .eq('model_id', modelResult.id)
            .order('category'),
          supabase
            .from('guided_tours')
            .select('*')
            .eq('model_id', modelResult.id)
            .order('difficulty_level')
        ]);

        if (hotspotsResult.error) throw hotspotsResult.error;
        if (toursResult.error) throw toursResult.error;

        setModelData({
          ...modelResult,
          hotspots: hotspotsResult.data || [],
          tours: toursResult.data || []
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchModelDetails();
  }, [name]);

  return { modelData, loading, error };
}

export function useModelHotspots(modelId: string | undefined) {
  const [hotspots, setHotspots] = useState<ModelHotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!modelId) {
      setLoading(false);
      return;
    }

    async function fetchHotspots() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('model_hotspots')
          .select('*')
          .eq('model_id', modelId)
          .order('category');

        if (fetchError) throw fetchError;
        setHotspots(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotspots();
  }, [modelId]);

  return { hotspots, loading, error };
}

export function useGuidedTours(modelId?: string) {
  const [tours, setTours] = useState<GuidedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        let query = supabase.from('guided_tours').select('*');

        if (modelId) {
          query = query.eq('model_id', modelId);
        }

        const { data, error: fetchError } = await query.order('featured', { ascending: false });

        if (fetchError) throw fetchError;
        setTours(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, [modelId]);

  return { tours, loading, error };
}

export function useTourWithStops(tourId: string | undefined) {
  const [tourData, setTourData] = useState<TourWithStops | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tourId) {
      setLoading(false);
      return;
    }

    async function fetchTourDetails() {
      try {
        setLoading(true);

        const { data: tourResult, error: tourError } = await supabase
          .from('guided_tours')
          .select('*')
          .eq('id', tourId)
          .single();

        if (tourError) throw tourError;
        if (!tourResult) throw new Error('Tour not found');

        const { data: stopsResult, error: stopsError } = await supabase
          .from('tour_stops')
          .select('*')
          .eq('tour_id', tourId)
          .order('stop_number');

        if (stopsError) throw stopsError;

        setTourData({
          ...tourResult,
          stops: stopsResult || []
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchTourDetails();
  }, [tourId]);

  return { tourData, loading, error };
}

export function useModelComparisons(featured?: boolean) {
  const [comparisons, setComparisons] = useState<ModelComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchComparisons() {
      try {
        setLoading(true);
        let query = supabase.from('model_comparisons').select('*');

        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        const { data, error: fetchError } = await query
          .eq('is_public', true)
          .order('view_count', { ascending: false });

        if (fetchError) throw fetchError;
        setComparisons(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchComparisons();
  }, [featured]);

  return { comparisons, loading, error };
}

export function useComparisonWithDetails(comparisonId: string | undefined) {
  const [comparisonData, setComparisonData] = useState<ComparisonWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!comparisonId) {
      setLoading(false);
      return;
    }

    async function fetchComparisonDetails() {
      try {
        setLoading(true);

        const { data: comparisonResult, error: comparisonError } = await supabase
          .from('model_comparisons')
          .select('*')
          .eq('id', comparisonId)
          .single();

        if (comparisonError) throw comparisonError;
        if (!comparisonResult) throw new Error('Comparison not found');

        const [pointsResult, leftModelResult, rightModelResult] = await Promise.all([
          supabase
            .from('comparison_points')
            .select('*')
            .eq('comparison_id', comparisonId)
            .order('category'),
          supabase
            .from('sanctuary_3d_models')
            .select('*')
            .eq('id', comparisonResult.model_left_id)
            .single(),
          supabase
            .from('sanctuary_3d_models')
            .select('*')
            .eq('id', comparisonResult.model_right_id)
            .single()
        ]);

        if (pointsResult.error) throw pointsResult.error;
        if (leftModelResult.error) throw leftModelResult.error;
        if (rightModelResult.error) throw rightModelResult.error;

        setComparisonData({
          ...comparisonResult,
          points: pointsResult.data || [],
          leftModel: leftModelResult.data,
          rightModel: rightModelResult.data
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchComparisonDetails();
  }, [comparisonId]);

  return { comparisonData, loading, error };
}

export function useElementMeasurements(modelId: string | undefined) {
  const [measurements, setMeasurements] = useState<ElementMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!modelId) {
      setLoading(false);
      return;
    }

    async function fetchMeasurements() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('element_measurements')
          .select('*')
          .eq('model_id', modelId)
          .order('element_name');

        if (fetchError) throw fetchError;
        setMeasurements(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeasurements();
  }, [modelId]);

  return { measurements, loading, error };
}

export async function trackModelView(modelId: string) {
  try {
    await supabase.rpc('increment_model_view_count', { model_id: modelId });
  } catch (error) {
    console.error('Error tracking model view:', error);
  }
}

export async function startTour(tourId: string, userId: string) {
  try {
    const { data: existingProgress } = await supabase
      .from('user_tour_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('tour_id', tourId)
      .maybeSingle();

    if (existingProgress) {
      await supabase
        .from('user_tour_progress')
        .update({
          current_stop: 0,
          last_accessed: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('tour_id', tourId);
    } else {
      await supabase
        .from('user_tour_progress')
        .insert({
          user_id: userId,
          tour_id: tourId,
          current_stop: 0,
          completed: false,
          last_accessed: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Error starting tour:', error);
    throw error;
  }
}

export async function updateTourProgress(
  tourId: string,
  userId: string,
  currentStop: number,
  completed: boolean = false
) {
  try {
    await supabase
      .from('user_tour_progress')
      .upsert({
        user_id: userId,
        tour_id: tourId,
        current_stop: currentStop,
        completed,
        last_accessed: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error updating tour progress:', error);
    throw error;
  }
}

export async function rateTour(
  tourId: string,
  userId: string,
  rating: number,
  feedback?: string
) {
  try {
    await supabase
      .from('user_tour_progress')
      .update({
        rating,
        feedback: feedback || null
      })
      .eq('user_id', userId)
      .eq('tour_id', tourId);
  } catch (error) {
    console.error('Error rating tour:', error);
    throw error;
  }
}

export async function trackHotspotView(hotspotId: string) {
  try {
    await supabase
      .from('model_hotspots')
      .update({
        view_count: supabase.raw('view_count + 1')
      })
      .eq('id', hotspotId);
  } catch (error) {
    console.error('Error tracking hotspot view:', error);
  }
}

export async function createUserComparison(
  userId: string,
  title: string,
  modelLeftId: string,
  modelRightId: string,
  comparisonType: 'structural' | 'chronological' | 'theological',
  description?: string
) {
  try {
    const { data, error } = await supabase
      .from('model_comparisons')
      .insert({
        title,
        description: description || null,
        model_left_id: modelLeftId,
        model_right_id: modelRightId,
        comparison_type: comparisonType,
        created_by: userId,
        is_public: false,
        featured: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating comparison:', error);
    throw error;
  }
}
