import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Crown, Heart, Sparkles, Shield, Coins, Moon, ArrowRight, Loader2 } from 'lucide-react';
import { useSacredColors } from '../hooks/useSacredColors';
import type { SacredColor } from '../types/sacredColors';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Scale,
  Crown,
  Heart,
  Sparkles,
  Shield,
  Coins,
  Moon
};

export default function SacredColorsLanding() {
  const { colors, loading, error } = useSacredColors();
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading colors</p>
          <p className="text-stone-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-amber-600" />
            <h1 className="text-5xl font-bold text-stone-900">Sacred Colors of the Sanctuary</h1>
            <Sparkles className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed">
            Explore the eight divine colors and their profound spiritual significance in the biblical sanctuary.
            Each color reveals deep truths about God's character and the plan of salvation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {colors.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              isHovered={hoveredColor === color.id}
              onHover={setHoveredColor}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">
            A Journey Through Color and Meaning
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-stone-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Divine Symbolism</h3>
              <p>
                Every color used in the sanctuary was chosen by God with intentional meaning. From the blue
                representing His eternal law to the scarlet pointing to Christ's sacrifice, these colors weave
                together the complete story of redemption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Multiple Traditions</h3>
              <p>
                Discover how Jewish scholars, Christian theologians, and Adventist thought leaders have understood
                these sacred colors throughout history. Each perspective adds depth to our understanding of God's
                plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Sanctuary Applications</h3>
              <p>
                See exactly where and how each color was used in the tabernacle - from the veil with its blue, purple,
                and scarlet threads to the gold-covered ark of the covenant. Every application teaches a spiritual lesson.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Test Your Knowledge</h3>
              <p>
                Each color page includes interactive quiz questions to reinforce your learning. Challenge yourself
                and earn points as you master the symbolism and biblical significance of these divine colors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColorCardProps {
  color: SacredColor;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function ColorCard({ color, isHovered, onHover }: ColorCardProps) {
  const Icon = iconMap[color.icon_name] || Sparkles;

  return (
    <Link
      to={`/colors/${color.slug}`}
      className="group relative"
      onMouseEnter={() => onHover(color.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300
          ${isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl'}
        `}
        style={{
          background: `linear-gradient(135deg, ${color.color_hex} 0%, ${adjustBrightness(color.color_hex, -20)} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

        <div className="relative p-6 min-h-[280px] flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
              <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {color.color_name}
            </h3>

            {color.hebrew_name && (
              <p className="text-white/90 text-lg mb-3 drop-shadow">
                {color.hebrew_transliteration}
              </p>
            )}

            <p className="text-white/95 text-sm leading-relaxed drop-shadow line-clamp-3">
              {color.biblical_significance}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="flex items-center justify-between text-white/90 text-xs">
              <span>{color.symbolic_representations.length} Symbols</span>
              <span>{color.scripture_references.length} Verses</span>
            </div>
          </div>
        </div>

        <div
          className={`
            absolute bottom-0 left-0 right-0 h-1 bg-white/50
            transform origin-left transition-transform duration-300
            ${isHovered ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
          `}
        />
      </div>
    </Link>
  );
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}
