import React from 'react';

interface HeavenlyIllustrationProps {
  className?: string;
}

const HeavenlyIllustration: React.FC<HeavenlyIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#heavenlyGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="heavenlyGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3730a3" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="portalGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3730a3" stopOpacity="0.1" />
        </radialGradient>
        <filter id="heavenlyGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Heavenly Portal/Gate */}
      <g transform="translate(200, 150)">
        {/* Portal Opening with Glow */}
        <ellipse
          cx="0"
          cy="0"
          rx="80"
          ry="100"
          fill="url(#portalGlow)"
          filter="url(#heavenlyGlow)"
          opacity="0.6"
        />

        {/* Gate Structure */}
        <path
          d="M -70 60 L -70 -80 Q -70 -100 -50 -100 L 50 -100 Q 70 -100 70 -80 L 70 60"
          stroke="#D4AF37"
          strokeWidth="4"
          fill="none"
        />

        {/* Arch Top */}
        <path
          d="M -70 -80 Q 0 -120 70 -80"
          stroke="#D4AF37"
          strokeWidth="4"
          fill="none"
        />

        {/* Gate Doors (Opening) */}
        <path
          d="M -40 -90 L -40 60"
          stroke="#FFD700"
          strokeWidth="3"
          opacity="0.7"
        />
        <path
          d="M 40 -90 L 40 60"
          stroke="#FFD700"
          strokeWidth="3"
          opacity="0.7"
        />

        {/* Inner Light/Glory */}
        <ellipse
          cx="0"
          cy="-20"
          rx="35"
          ry="50"
          fill="white"
          opacity="0.6"
          filter="url(#heavenlyGlow)"
        />

        {/* Stars/Divine Elements */}
        <g opacity="0.8">
          <text x="-50" y="-40" fill="#FFD700" fontSize="16">✦</text>
          <text x="45" y="-40" fill="#FFD700" fontSize="16">✦</text>
          <text x="-30" y="-70" fill="white" fontSize="12">✦</text>
          <text x="25" y="-70" fill="white" fontSize="12">✦</text>
          <text x="0" y="-95" fill="#FFD700" fontSize="20">✦</text>
        </g>
      </g>

      {/* Steps Leading Up */}
      <g>
        <rect x="150" y="230" width="100" height="8" fill="#9ca3af" opacity="0.5" />
        <rect x="140" y="240" width="120" height="8" fill="#9ca3af" opacity="0.6" />
        <rect x="130" y="250" width="140" height="8" fill="#9ca3af" opacity="0.7" />
      </g>

      {/* Throne Room Elements */}
      <g transform="translate(200, 80)" opacity="0.5">
        {/* Throne Silhouette */}
        <rect x="-25" y="-20" width="50" height="40" fill="#D4AF37" opacity="0.4" rx="5" />
        <rect x="-30" y="-25" width="8" height="50" fill="#D4AF37" opacity="0.4" />
        <rect x="22" y="-25" width="8" height="50" fill="#D4AF37" opacity="0.4" />

        {/* Crown */}
        <path d="M -15 -25 L -10 -35 L -5 -28 L 0 -35 L 5 -28 L 10 -35 L 15 -25 Z" fill="#FFD700" opacity="0.6" />
      </g>

      {/* Heavenly Beings (Seraphim) */}
      <g opacity="0.4">
        <circle cx="80" cy="100" r="8" fill="white" />
        <path d="M 75 100 Q 65 95 60 100" stroke="white" strokeWidth="2" fill="none" />
        <path d="M 85 100 Q 95 95 100 100" stroke="white" strokeWidth="2" fill="none" />

        <circle cx="320" cy="100" r="8" fill="white" />
        <path d="M 315 100 Q 305 95 300 100" stroke="white" strokeWidth="2" fill="none" />
        <path d="M 325 100 Q 335 95 340 100" stroke="white" strokeWidth="2" fill="none" />
      </g>

      {/* Worshipful Text */}
      <text x="200" y="280" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="600" opacity="0.7">
        "Enter His Gates with Thanksgiving"
      </text>
    </svg>
  );
};

export default HeavenlyIllustration;
