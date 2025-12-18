import React from 'react';

interface BibleIllustrationProps {
  className?: string;
}

const BibleIllustration: React.FC<BibleIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#bibleGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="bibleGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
        </linearGradient>
        <filter id="bibleGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Holy Bible Book */}
      <g transform="translate(200, 150)">
        {/* Bible Cover */}
        <rect x="-90" y="-80" width="180" height="160" fill="#4A3319" stroke="#2C1F11" strokeWidth="3" rx="8" />

        {/* Inner Pages */}
        <rect x="-85" y="-75" width="170" height="150" fill="#F5E6D3" />

        {/* Gold Cross on Cover */}
        <g filter="url(#bibleGlow)">
          <rect x="-8" y="-40" width="16" height="80" fill="#D4AF37" />
          <rect x="-30" y="-8" width="60" height="16" fill="#D4AF37" />
        </g>

        {/* "Holy Bible" Text */}
        <text x="0" y="-55" textAnchor="middle" fill="#D4AF37" fontSize="18" fontWeight="bold" fontFamily="serif">
          HOLY
        </text>
        <text x="0" y="60" textAnchor="middle" fill="#D4AF37" fontSize="18" fontWeight="bold" fontFamily="serif">
          BIBLE
        </text>

        {/* Book Spine Details */}
        <rect x="-90" y="-80" width="15" height="160" fill="#2C1F11" />
        <line x1="-90" y1="-60" x2="-75" y2="-60" stroke="#D4AF37" strokeWidth="1" />
        <line x1="-90" y1="60" x2="-75" y2="60" stroke="#D4AF37" strokeWidth="1" />

        {/* Page Edges (Gold) */}
        <rect x="85" y="-75" width="5" height="150" fill="#FFD700" />
        <g opacity="0.5">
          <line x1="85" y1="-70" x2="90" y2="-70" stroke="#D4AF37" strokeWidth="0.5" />
          <line x1="85" y1="-60" x2="90" y2="-60" stroke="#D4AF37" strokeWidth="0.5" />
          <line x1="85" y1="-50" x2="90" y2="-50" stroke="#D4AF37" strokeWidth="0.5" />
        </g>
      </g>

      {/* Search Icon */}
      <g transform="translate(80, 80)" opacity="0.7">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#d97706" strokeWidth="3" />
        <line x1="15" y1="15" x2="28" y2="28" stroke="#d97706" strokeWidth="3" />
        <text x="0" y="6" textAnchor="middle" fill="#d97706" fontSize="20">🔍</text>
      </g>

      {/* Memorization/Heart Icon */}
      <g transform="translate(320, 80)" opacity="0.7">
        <path
          d="M 0 -5 Q -15 -20 -25 -10 Q -25 5 0 20 Q 25 5 25 -10 Q 15 -20 0 -5"
          fill="#dc2626"
          opacity="0.7"
        />
        <text x="0" y="45" textAnchor="middle" fill="#8B7355" fontSize="11" fontWeight="600">
          Memorize
        </text>
      </g>

      {/* Cross References Lines */}
      <g opacity="0.4">
        <line x1="150" y1="210" x2="200" y2="230" stroke="#d97706" strokeWidth="2" strokeDasharray="3 2" />
        <line x1="200" y1="230" x2="250" y2="210" stroke="#d97706" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="150" cy="210" r="4" fill="#d97706" />
        <circle cx="250" cy="210" r="4" fill="#d97706" />
        <circle cx="200" cy="230" r="4" fill="#ea580c" />
      </g>

      {/* KJV Badge */}
      <g transform="translate(60, 220)">
        <rect x="-25" y="-15" width="50" height="30" fill="white" stroke="#d97706" strokeWidth="2" rx="5" />
        <text x="0" y="-3" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold">
          KJV
        </text>
        <text x="0" y="9" textAnchor="middle" fill="#8B7355" fontSize="8">
          1611
        </text>
      </g>

      {/* Verse Reference */}
      <g transform="translate(340, 220)">
        <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#d97706" strokeWidth="2" rx="5" />
        <text x="0" y="3" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="600">
          John 3:16
        </text>
      </g>

      {/* Reading Light Rays */}
      <g opacity="0.2">
        <path d="M 200 50 L 180 100" stroke="#FFD700" strokeWidth="20" />
        <path d="M 200 50 L 200 100" stroke="#FFD700" strokeWidth="20" />
        <path d="M 200 50 L 220 100" stroke="#FFD700" strokeWidth="20" />
      </g>

      {/* Study Notes Icon */}
      <g transform="translate(320, 240)" opacity="0.5">
        <rect x="-10" y="-15" width="20" height="25" fill="white" stroke="#d97706" strokeWidth="1" />
        <line x1="-7" y1="-10" x2="7" y2="-10" stroke="#d97706" strokeWidth="1" />
        <line x1="-7" y1="-5" x2="7" y2="-5" stroke="#d97706" strokeWidth="1" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#d97706" strokeWidth="1" />
      </g>
    </svg>
  );
};

export default BibleIllustration;
