import React from 'react';
import { Trophy, Star, Award, Target, BookOpen, Zap, Crown, Sparkles } from 'lucide-react';

interface AchievementBadgeProps {
  type: string;
  name: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  earned?: boolean;
}

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  first_correct: <Star className="w-full h-full" />,
  '10_correct': <Target className="w-full h-full" />,
  '50_correct': <Trophy className="w-full h-full" />,
  '100_correct': <Crown className="w-full h-full" />,
  step_complete: <Award className="w-full h-full" />,
  perfect_step: <Sparkles className="w-full h-full" />,
  streak_7: <Zap className="w-full h-full" />,
  scholar: <BookOpen className="w-full h-full" />,
};

const getIconForType = (type: string) => {
  if (type.startsWith('step_')) return ACHIEVEMENT_ICONS.step_complete;
  return ACHIEVEMENT_ICONS[type] || ACHIEVEMENT_ICONS.first_correct;
};

const SIZE_CLASSES = {
  small: 'w-12 h-12',
  medium: 'w-16 h-16',
  large: 'w-24 h-24'
};

const ICON_SIZE_CLASSES = {
  small: 'w-6 h-6',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  name,
  description,
  size = 'medium',
  earned = true
}) => {
  return (
    <div
      className={`group relative ${earned ? 'opacity-100' : 'opacity-40 grayscale'}`}
      title={description || name}
    >
      <div
        className={`${SIZE_CLASSES[size]} rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
          earned
            ? 'bg-gradient-to-br from-sanctuary-gold to-yellow-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        <div className={ICON_SIZE_CLASSES[size]}>
          {getIconForType(type)}
        </div>
      </div>
      {size !== 'small' && (
        <div className="mt-2 text-center">
          <p className={`font-semibold text-xs ${earned ? 'text-sanctuary-purple' : 'text-gray-400'}`}>
            {name}
          </p>
        </div>
      )}
      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-sanctuary-purple text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-sanctuary-purple" />
        </div>
      )}
    </div>
  );
};
