import React from 'react';

interface MediaIllustrationProps {
  className?: string;
}

const MediaIllustration: React.FC<MediaIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#mediaGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="mediaGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
        </linearGradient>
        <filter id="mediaGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Video Player */}
      <g transform="translate(200, 120)">
        <rect x="-120" y="-70" width="240" height="135" fill="#1f2937" stroke="#6366f1" strokeWidth="3" rx="8" />

        {/* Video Thumbnail */}
        <rect x="-110" y="-60" width="220" height="115" fill="#374151" rx="4" />

        {/* Sanctuary Scene in Video */}
        <g transform="translate(0, -10)">
          <rect x="-60" y="-20" width="120" height="50" fill="#D4AF37" opacity="0.3" />
          <rect x="-40" y="-10" width="80" height="30" fill="#CD7F32" opacity="0.4" />
        </g>

        {/* Play Button */}
        <circle cx="0" cy="-5" r="30" fill="white" opacity="0.9" filter="url(#mediaGlow)" />
        <path d="M -10 -15 L -10 5 L 15 -5 Z" fill="#6366f1" />
      </g>

      {/* Podcast/Audio Wave */}
      <g transform="translate(80, 220)">
        <rect x="0" y="-20" width="4" height="40" fill="#7c3aed" opacity="0.6" rx="2" />
        <rect x="8" y="-30" width="4" height="60" fill="#7c3aed" opacity="0.7" rx="2" />
        <rect x="16" y="-15" width="4" height="30" fill="#7c3aed" opacity="0.6" rx="2" />
        <rect x="24" y="-35" width="4" height="70" fill="#7c3aed" opacity="0.8" rx="2" />
        <rect x="32" y="-25" width="4" height="50" fill="#7c3aed" opacity="0.7" rx="2" />
        <rect x="40" y="-18" width="4" height="36" fill="#7c3aed" opacity="0.6" rx="2" />

        {/* Headphones Icon */}
        <g transform="translate(-40, 0)">
          <path
            d="M 0 -15 Q -15 -15 -15 0 L -15 10 Q -15 15 -10 15 L -5 15 Q 0 15 0 10 L 0 0"
            stroke="#6366f1"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 0 -15 Q 15 -15 15 0 L 15 10 Q 15 15 10 15 L 5 15 Q 0 15 0 10 L 0 0"
            stroke="#6366f1"
            strokeWidth="3"
            fill="none"
          />
          <rect x="-3" y="8" width="6" height="8" fill="#6366f1" rx="1" />
          <rect x="-18" y="8" width="6" height="8" fill="#6366f1" rx="1" />
          <rect x="12" y="8" width="6" height="8" fill="#6366f1" rx="1" />
        </g>
      </g>

      {/* Media Grid/Gallery */}
      <g transform="translate(280, 220)">
        <rect x="0" y="0" width="35" height="25" fill="#6366f1" opacity="0.4" rx="2" />
        <circle cx="17" cy="12" r="10" fill="white" opacity="0.8" />
        <path d="M 12 12 L 17 7 L 22 12 Z" fill="#6366f1" />

        <rect x="40" y="0" width="35" height="25" fill="#7c3aed" opacity="0.4" rx="2" />
        <path d="M 50 8 L 50 17 L 65 17 Z" fill="white" opacity="0.8" />

        <rect x="0" y="30" width="35" height="25" fill="#7c3aed" opacity="0.4" rx="2" />
        <rect x="40" y="30" width="35" height="25" fill="#6366f1" opacity="0.4" rx="2" />
      </g>

      {/* Microphone Icon */}
      <g transform="translate(350, 70)" opacity="0.6">
        <rect x="-8" y="-20" width="16" height="30" fill="#6366f1" rx="8" />
        <line x1="0" y1="10" x2="0" y2="25" stroke="#6366f1" strokeWidth="3" />
        <line x1="-10" y1="25" x2="10" y2="25" stroke="#6366f1" strokeWidth="3" />
        <path d="M -12 0 Q -12 15 0 15 Q 12 15 12 0" stroke="#6366f1" strokeWidth="2" fill="none" />
      </g>

      {/* YouTube/Channel Icon */}
      <g transform="translate(50, 70)" opacity="0.6">
        <rect x="-25" y="-15" width="50" height="30" fill="#dc2626" rx="4" />
        <path d="M -8 -8 L -8 8 L 12 0 Z" fill="white" />
      </g>

      {/* Interview/Discussion Icon */}
      <g transform="translate(60, 150)" opacity="0.5">
        <circle cx="-15" cy="0" r="12" fill="#6366f1" />
        <circle cx="15" cy="0" r="12" fill="#7c3aed" />
        <rect x="-20" y="12" width="15" height="20" fill="#6366f1" rx="2" />
        <rect x="5" y="12" width="15" height="20" fill="#7c3aed" rx="2" />
      </g>

      {/* Weekly Badge */}
      <g transform="translate(340, 150)" opacity="0.7">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#6366f1" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fill="#6366f1" fontSize="16" fontWeight="bold">
          7
        </text>
        <text x="0" y="35" textAnchor="middle" fill="#6366f1" fontSize="9" fontWeight="600">
          Weekly
        </text>
      </g>

      {/* Streaming Waves */}
      <g opacity="0.3">
        <path d="M 150 50 Q 165 45 180 50" stroke="#6366f1" strokeWidth="2" fill="none" />
        <path d="M 145 60 Q 165 50 185 60" stroke="#6366f1" strokeWidth="2" fill="none" />
        <path d="M 140 70 Q 165 55 190 70" stroke="#6366f1" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
};

export default MediaIllustration;
