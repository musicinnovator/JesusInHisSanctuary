import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  SacredColor,
  ColorSymbolism,
  ColorApplication,
  ColorQuizQuestion,
  ColorDetailData,
  ColorCombination
} from '../types/sacredColors';

export function useSacredColors() {
  const [colors, setColors] = useState<SacredColor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchColors() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('sacred_colors')
          .select('*')
          .order('order_position', { ascending: true });

        if (fetchError) throw fetchError;
        setColors(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchColors();
  }, []);

  return { colors, loading, error };
}

export function useColorBySlug(slug: string | undefined) {
  const [colorData, setColorData] = useState<ColorDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchColorDetails() {
      try {
        setLoading(true);

        const { data: colorResult, error: colorError } = await supabase
          .from('sacred_colors')
          .select('*')
          .eq('slug', slug)
          .single();

        if (colorError) throw colorError;
        if (!colorResult) throw new Error('Color not found');

        const [symbolismResult, applicationsResult, quizResult] = await Promise.all([
          supabase
            .from('color_symbolism')
            .select('*')
            .eq('color_id', colorResult.id)
            .order('tradition'),
          supabase
            .from('color_applications')
            .select('*')
            .eq('color_id', colorResult.id),
          supabase
            .from('color_quiz_questions')
            .select('*')
            .eq('color_id', colorResult.id)
        ]);

        if (symbolismResult.error) throw symbolismResult.error;
        if (applicationsResult.error) throw applicationsResult.error;
        if (quizResult.error) throw quizResult.error;

        setColorData({
          color: colorResult,
          symbolism: symbolismResult.data || [],
          applications: applicationsResult.data || [],
          quizQuestions: quizResult.data || []
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchColorDetails();
  }, [slug]);

  return { colorData, loading, error };
}

export function useColorCombinations() {
  const [combinations, setCombinations] = useState<ColorCombination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCombinations() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('color_combinations')
          .select('*');

        if (fetchError) throw fetchError;
        setCombinations(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCombinations();
  }, []);

  return { combinations, loading, error };
}

export function useColorQuiz(colorId: string | undefined) {
  const [questions, setQuestions] = useState<ColorQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!colorId) {
      setLoading(false);
      return;
    }

    async function fetchQuizQuestions() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('color_quiz_questions')
          .select('*')
          .eq('color_id', colorId);

        if (fetchError) throw fetchError;
        setQuestions(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizQuestions();
  }, [colorId]);

  return { questions, loading, error };
}

export async function trackColorView(colorId: string, userId?: string) {
  if (!userId) return;

  try {
    const { data: existingProgress } = await supabase
      .from('user_color_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('color_id', colorId)
      .maybeSingle();

    if (existingProgress) {
      await supabase
        .from('user_color_progress')
        .update({
          visited: true,
          last_visited: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('color_id', colorId);
    } else {
      await supabase
        .from('user_color_progress')
        .insert({
          user_id: userId,
          color_id: colorId,
          visited: true,
          last_visited: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Error tracking color view:', error);
  }
}

export async function updateQuizScore(
  colorId: string,
  userId: string,
  score: number
) {
  try {
    const { data: existingProgress } = await supabase
      .from('user_color_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('color_id', colorId)
      .maybeSingle();

    if (existingProgress) {
      await supabase
        .from('user_color_progress')
        .update({
          quiz_completed: true,
          quiz_score: score,
          last_visited: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('color_id', colorId);
    } else {
      await supabase
        .from('user_color_progress')
        .insert({
          user_id: userId,
          color_id: colorId,
          quiz_completed: true,
          quiz_score: score,
          visited: true,
          last_visited: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Error updating quiz score:', error);
    throw error;
  }
}

export async function toggleColorBookmark(
  colorId: string,
  userId: string,
  bookmarked: boolean
) {
  try {
    const { data: existingProgress } = await supabase
      .from('user_color_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('color_id', colorId)
      .maybeSingle();

    if (existingProgress) {
      await supabase
        .from('user_color_progress')
        .update({ bookmarked })
        .eq('user_id', userId)
        .eq('color_id', colorId);
    } else {
      await supabase
        .from('user_color_progress')
        .insert({
          user_id: userId,
          color_id: colorId,
          bookmarked,
          visited: true,
          last_visited: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
}
