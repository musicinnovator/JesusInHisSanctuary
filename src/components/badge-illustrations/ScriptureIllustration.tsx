import React from 'react';

interface ScriptureIllustrationProps {
  className?: string;
}

const ScriptureIllustration: React.FC<ScriptureIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#scriptureGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="scriptureGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#CD7F32" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Open Bible/Scroll */}
      <g transform="translate(200, 150)">
        {/* Left Page */}
        <path
          d="M -120 -80 Q -125 -75 -120 -70 L -20 80 Q -15 85 -10 80 L -10 -70 Q -15 -75 -20 -80 Z"
          fill="#F5E6D3"
          stroke="#8B7355"
          strokeWidth="2"
        />

        {/* Right Page */}
        <path
          d="M 10 -70 Q 15 -75 20 -80 L 120 -80 Q 125 -75 120 -70 L 20 80 Q 15 85 10 80 Z"
          fill="#FFF8E7"
          stroke="#8B7355"
          strokeWidth="2"
        />

        {/* Center Binding */}
        <rect x="-5" y="-80" width="10" height="165" fill="#8B6914" />

        {/* Text Lines on Left Page */}
        <g opacity="0.6">
          <line x1="-100" y1="-50" x2="-30" y2="-50" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="-100" y1="-35" x2="-30" y2="-35" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="-100" y1="-20" x2="-30" y2="-20" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="-100" y1="-5" x2="-30" y2="-5" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="-100" y1="10" x2="-30" y2="10" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="-100" y1="25" x2="-50" y2="25" stroke="#8B7355" strokeWidth="1.5" />
        </g>

        {/* Text Lines on Right Page */}
        <g opacity="0.6">
          <line x1="30" y1="-50" x2="100" y2="-50" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="30" y1="-35" x2="100" y2="-35" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="30" y1="-20" x2="100" y2="-20" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="30" y1="-5" x2="100" y2="-5" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="30" y1="10" x2="100" y2="10" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="30" y1="25" x2="80" y2="25" stroke="#8B7355" strokeWidth="1.5" />
        </g>

        {/* Highlighted Verse (Glowing) */}
        <rect
          x="30"
          y="-22"
          width="70"
          height="8"
          fill="#D4AF37"
          opacity="0.4"
          filter="url(#glow)"
        />

        {/* Decorative Initial Letter */}
        <text x="-95" y="-40" fill="#D4AF37" fontSize="24" fontWeight="bold" fontFamily="serif">E</text>

        {/* Bookmark Ribbon */}
        <path
          d="M -2 -80 L -2 -100 L 2 -100 L 2 -80"
          fill="#B8272C"
          stroke="#8B1F23"
          strokeWidth="0.5"
        />
      </g>

      {/* Link Lines to Sanctuary Element */}
      <g opacity="0.5">
        <path
          d="M 265 130 Q 300 120 320 100"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="5 3"
          fill="none"
        />
        <circle cx="320" cy="100" r="5" fill="#D4AF37" />

        {/* Small Sanctuary Icon */}
        <rect x="315" y="80" width="20" height="15" fill="#CD7F32" opacity="0.7" stroke="#8B6914" strokeWidth="1" />
      </g>

      {/* Verse Reference */}
      <text x="200" y="260" textAnchor="middle" fill="#8B7355" fontSize="14" fontWeight="600" opacity="0.8">
        Exodus 25:8-9
      </text>
    </svg>
  );
};

export default ScriptureIllustration;
