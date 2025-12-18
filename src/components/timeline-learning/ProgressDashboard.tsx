import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Calendar, Target, Award, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AchievementBadge } from './AchievementBadge';
import type { UserStats, Achievement } from '../../types/questions';

interface ProgressDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  isOpen,
  onClose,
  userId
}) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, userId]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (statsError) throw statsError;
      setStats(statsData);

      // Load achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (achievementsError) throw achievementsError;
      setAchievements(achievementsData || []);

    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const accuracy = stats && stats.totalQuestionsAnswered > 0
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-sanctuary-gold to-yellow-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Progress</h2>
                <p className="text-yellow-100">Timeline Learning Dashboard</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sanctuary-brass">
            <Trophy className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p>Loading your progress...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-sanctuary-purple to-sanctuary-blue text-white p-4 rounded-lg">
                <Target className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">{stats?.totalQuestionsAnswered || 0}</div>
                <div className="text-sm opacity-90">Questions Answered</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-lg">
                <Trophy className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">{stats?.totalCorrectAnswers || 0}</div>
                <div className="text-sm opacity-90">Correct Answers</div>
              </div>

              <div className="bg-gradient-to-br from-sanctuary-gold to-yellow-600 text-white p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">{accuracy}%</div>
                <div className="text-sm opacity-90">Accuracy</div>
              </div>

              <div className="bg-gradient-to-br from-sanctuary-scarlet to-red-600 text-white p-4 rounded-lg">
                <Calendar className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">{stats?.currentStreakDays || 0}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="bg-sanctuary-linen p-6 rounded-lg border border-sanctuary-silver">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-sanctuary-purple flex items-center space-x-2">
                  <Award className="w-6 h-6" />
                  <span>Achievements</span>
                </h3>
                <span className="text-sanctuary-brass font-medium">
                  {achievements.length} earned
                </span>
              </div>

              {achievements.length === 0 ? (
                <div className="text-center py-8 text-sanctuary-brass">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start answering questions to earn achievements!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      type={achievement.achievementType}
                      name={achievement.achievementName}
                      description={achievement.metadata?.description}
                      size="medium"
                      earned={true}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Steps Progress */}
            <div className="bg-white p-6 rounded-lg border border-sanctuary-silver">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Steps Completed</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-sanctuary-brass">
                  <span>Completed Steps</span>
                  <span>{stats?.stepsCompleted || 0} of 25</span>
                </div>
                <div className="w-full bg-sanctuary-linen rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-sanctuary-purple to-sanctuary-gold h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((stats?.stepsCompleted || 0) / 25) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Study Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Longest Streak</h4>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-sanctuary-gold" />
                  <span className="text-2xl font-bold text-sanctuary-brass">
                    {stats?.longestStreakDays || 0} days
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Last Study Date</h4>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-sanctuary-brass" />
                  <span className="text-lg text-sanctuary-brass">
                    {stats?.lastStudyDate || 'Never'}
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-sanctuary-purple to-sanctuary-blue text-white p-6 rounded-lg text-center">
              <h4 className="text-xl font-bold mb-2">Keep Learning!</h4>
              <p className="mb-4">Continue exploring the Timeline to deepen your understanding of the sanctuary doctrine.</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-sanctuary-purple rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Continue Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
