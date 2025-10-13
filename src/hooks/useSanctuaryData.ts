import { useState, useEffect } from 'react';
import { SanctuaryModel } from '../types/sanctuary';

export const useSanctuaryData = (modelId: string) => {
  const [data, setData] = useState<SanctuaryModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/data/models/${modelId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load model data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error loading data');
        console.error('Error loading sanctuary data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (modelId) {
      loadData();
    }
  }, [modelId]);

  return { data, loading, error };
};

export const useAllSanctuaryModels = () => {
  const [models, setModels] = useState<SanctuaryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllModels = async () => {
      setLoading(true);
      setError(null);

      const modelIds = ['tabernacle', 'solomon', 'heavenly'];

      try {
        const promises = modelIds.map(async (id) => {
          const response = await fetch(`/data/models/${id}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load ${id}`);
          }
          return response.json();
        });

        const results = await Promise.all(promises);
        setModels(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error loading models');
        console.error('Error loading sanctuary models:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllModels();
  }, []);

  return { models, loading, error };
};
