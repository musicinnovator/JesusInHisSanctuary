import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { timelineQuestions } from '../data/timelineQuestions';
import type { TimelineQuestion, UserProgress, UserStats, Achievement } from '../types/questions';

// Generate or retrieve user ID (anonymous for now, can be replaced with auth later)
const getUserId = () => {
  let userId = localStorage.getItem('timeline_user_id');
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('timeline_user_id', userId);
  }
  return userId;
};

export const useTimelineLearning = (stepId: number) => {
  const [questions, setQuestions] = useState<TimelineQuestion[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserId();

  useEffect(() => {
    loadData();
  }, [stepId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load questions for this step from local data
      const stepQuestions = timelineQuestions.filter(q => q.stepId === stepId);
      setQuestions(stepQuestions);

      // Load user progress for this step
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('step_id', stepId);

      if (progressError) throw progressError;
      setProgress(progressData || []);

      // Load user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (statsError && statsError.code !== 'PGRST116') throw statsError;
      setStats(statsData);

      // Initialize stats if not exists
      if (!statsData) {
        const { data: newStats, error: insertError } = await supabase
          .from('user_stats')
          .insert({
            user_id: userId,
            total_questions_answered: 0,
            total_correct_answers: 0,
            steps_completed: 0,
            current_streak_days: 0,
            longest_streak_days: 0,
            last_study_date: null,
            total_study_time_seconds: 0
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setStats(newStats);
      }

    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load learning data');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (questionId: string, isCorrect: boolean) => {
    try {
      // Check if progress already exists
      const existingProgress = progress.find(p => p.questionId === questionId);

      if (existingProgress) {
        // Update existing progress
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            is_correct: isCorrect,
            attempts: existingProgress.attempts + 1,
            last_attempt_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('question_id', questionId);

        if (updateError) throw updateError;
      } else {
        // Insert new progress
        const { error: insertError } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            question_id: questionId,
            step_id: stepId,
            is_correct: isCorrect,
            attempts: 1,
            last_attempt_at: new Date().toISOString()
          });

        if (insertError) throw insertError;
      }

      // Update user stats
      if (stats) {
        const newTotalAnswered = stats.totalQuestionsAnswered + 1;
        const newTotalCorrect = isCorrect ? stats.totalCorrectAnswers + 1 : stats.totalCorrectAnswers;

        const { error: statsError } = await supabase
          .from('user_stats')
          .update({
            total_questions_answered: newTotalAnswered,
            total_correct_answers: newTotalCorrect,
            last_study_date: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        if (statsError) throw statsError;
      }

      // Reload data to reflect changes
      await loadData();

      // Check for achievements
      await checkAchievements();

    } catch (err) {
      console.error('Error submitting answer:', err);
      throw err;
    }
  };

  const checkAchievements = async () => {
    try {
      // Reload current stats and progress
      const { data: currentStats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      const { data: allProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      const { data: existingAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_type')
        .eq('user_id', userId);

      const achievedTypes = new Set(existingAchievements?.map(a => a.achievement_type) || []);

      // Check for new achievements
      const newAchievements: { type: string; name: string; metadata: any }[] = [];

      // First correct answer
      if (!achievedTypes.has('first_correct') && currentStats && currentStats.total_correct_answers >= 1) {
        newAchievements.push({
          type: 'first_correct',
          name: 'First Steps',
          metadata: { description: 'Answered your first question correctly!' }
        });
      }

      // Complete a step (all questions correct)
      const stepProgress = allProgress?.filter(p => p.step_id === stepId && p.is_correct) || [];
      const stepQuestionCount = questions.length;
      if (!achievedTypes.has(`step_${stepId}_complete`) && stepProgress.length === stepQuestionCount && stepQuestionCount > 0) {
        newAchievements.push({
          type: `step_${stepId}_complete`,
          name: `Step ${stepId} Master`,
          metadata: { description: `Completed all questions for Step ${stepId}!`, stepId }
        });
      }

      // 10 correct answers
      if (!achievedTypes.has('10_correct') && currentStats && currentStats.total_correct_answers >= 10) {
        newAchievements.push({
          type: '10_correct',
          name: 'Growing Knowledge',
          metadata: { description: 'Answered 10 questions correctly!' }
        });
      }

      // 50 correct answers
      if (!achievedTypes.has('50_correct') && currentStats && currentStats.total_correct_answers >= 50) {
        newAchievements.push({
          type: '50_correct',
          name: 'Sanctuary Scholar',
          metadata: { description: 'Answered 50 questions correctly!' }
        });
      }

      // Insert new achievements
      for (const achievement of newAchievements) {
        await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_type: achievement.type,
            achievement_name: achievement.name,
            metadata: achievement.metadata
          });
      }

      return newAchievements;

    } catch (err) {
      console.error('Error checking achievements:', err);
      return [];
    }
  };

  const getStepProgress = () => {
    const correctAnswers = progress.filter(p => p.isCorrect).length;
    const totalQuestions = questions.length;
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    };
  };

  return {
    questions,
    progress,
    stats,
    loading,
    error,
    submitAnswer,
    getStepProgress,
    userId
  };
};
