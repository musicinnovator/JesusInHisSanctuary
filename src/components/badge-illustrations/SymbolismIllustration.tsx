import React from 'react';

interface SymbolismIllustrationProps {
  className?: string;
}

const SymbolismIllustration: React.FC<SymbolismIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#symbolismGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="symbolismGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#B8272C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.1" />
        </linearGradient>
        <filter id="symbolGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Golden Menorah (7-branched candlestick) */}
      <g transform="translate(200, 200)">
        {/* Base */}
        <ellipse cx="0" cy="0" rx="50" ry="8" fill="#D4AF37" stroke="#B8860B" strokeWidth="2" />

        {/* Central Stem */}
        <rect x="-5" y="-100" width="10" height="100" fill="#D4AF37" stroke="#B8860B" strokeWidth="1" />

        {/* Branches */}
        {/* Left 3 */}
        <path d="M -5 -60 Q -30 -70 -40 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />
        <path d="M -5 -50 Q -20 -60 -30 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />
        <path d="M -5 -40 Q -15 -55 -20 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />

        {/* Right 3 */}
        <path d="M 5 -60 Q 30 -70 40 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />
        <path d="M 5 -50 Q 20 -60 30 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />
        <path d="M 5 -40 Q 15 -55 20 -85" stroke="#D4AF37" strokeWidth="6" fill="none" />

        {/* Flames with Glow */}
        <g filter="url(#symbolGlow)">
          <ellipse cx="-40" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="-30" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="-20" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="0" cy="-105" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="20" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="30" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
          <ellipse cx="40" cy="-90" rx="4" ry="8" fill="#FFD700" opacity="0.9" />
        </g>

        {/* Light Rays */}
        <g opacity="0.3">
          <path d="M -40 -90 L -50 -110" stroke="#FFD700" strokeWidth="2" />
          <path d="M -40 -90 L -60 -95" stroke="#FFD700" strokeWidth="2" />
          <path d="M 40 -90 L 50 -110" stroke="#FFD700" strokeWidth="2" />
          <path d="M 40 -90 L 60 -95" stroke="#FFD700" strokeWidth="2" />
          <path d="M 0 -105 L -10 -125" stroke="#FFD700" strokeWidth="2" />
          <path d="M 0 -105 L 10 -125" stroke="#FFD700" strokeWidth="2" />
        </g>
      </g>

      {/* Symbolic Meaning Labels */}
      <g opacity="0.7">
        <circle cx="60" cy="80" r="25" fill="white" opacity="0.9" />
        <text x="60" y="88" textAnchor="middle" fill="#B8272C" fontSize="28" fontWeight="bold">7</text>

        <text x="60" y="125" textAnchor="middle" fill="#8B7355" fontSize="11" fontWeight="600">
          Perfection
        </text>
      </g>

      <g opacity="0.7">
        <circle cx="340" cy="80" r="25" fill="white" opacity="0.9" />
        <text x="340" y="88" textAnchor="middle" fill="#D4AF37" fontSize="24">✦</text>

        <text x="340" y="125" textAnchor="middle" fill="#8B7355" fontSize="11" fontWeight="600">
          Divine Light
        </text>
      </g>

      {/* Decorative Arc */}
      <path
        d="M 100 40 Q 200 20 300 40"
        stroke="#B8272C"
        strokeWidth="2"
        strokeDasharray="5 3"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
};

export default SymbolismIllustration;
