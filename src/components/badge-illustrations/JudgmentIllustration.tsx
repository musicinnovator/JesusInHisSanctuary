import React from 'react';

interface JudgmentIllustrationProps {
  className?: string;
}

const JudgmentIllustration: React.FC<JudgmentIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#judgmentGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="judgmentGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#CD7F32" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a16207" stopOpacity="0.1" />
        </linearGradient>
        <filter id="bookGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Judgment Scene - Books and Scales */}
      <g transform="translate(200, 150)">
        {/* Balance/Scales */}
        <line x1="0" y1="-60" x2="0" y2="40" stroke="#8B6914" strokeWidth="4" />

        {/* Left Scale Pan */}
        <g transform="translate(-60, -40)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#D4AF37" strokeWidth="3" />
          <line x1="-15" y1="0" x2="-15" y2="-5" stroke="#D4AF37" strokeWidth="2" />
          <line x1="15" y1="0" x2="15" y2="-5" stroke="#D4AF37" strokeWidth="2" />
          <path d="M -20 0 L -15 5 L 15 5 L 20 0" fill="#CD7F32" stroke="#8B6914" strokeWidth="1" />
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#8B6914" strokeWidth="2" />
        </g>

        {/* Right Scale Pan */}
        <g transform="translate(60, -40)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#D4AF37" strokeWidth="3" />
          <line x1="-15" y1="0" x2="-15" y2="-5" stroke="#D4AF37" strokeWidth="2" />
          <line x1="15" y1="0" x2="15" y2="-5" stroke="#D4AF37" strokeWidth="2" />
          <path d="M -20 0 L -15 5 L 15 5 L 20 0" fill="#CD7F32" stroke="#8B6914" strokeWidth="1" />
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#8B6914" strokeWidth="2" />
        </g>

        {/* Top Balance */}
        <line x1="-70" y1="-70" x2="70" y2="-70" stroke="#D4AF37" strokeWidth="4" />
        <circle cx="0" cy="-70" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />

        {/* Base */}
        <rect x="-15" y="40" width="30" height="15" fill="#8B6914" />
        <rect x="-25" y="55" width="50" height="8" fill="#8B6914" />
      </g>

      {/* Books of Judgment */}
      <g transform="translate(80, 210)" filter="url(#bookGlow)">
        <rect x="0" y="0" width="60" height="45" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="2" />
        <rect x="3" y="3" width="54" height="39" fill="#F5E6D3" />
        <line x1="10" y1="15" x2="50" y2="15" stroke="#8B7355" strokeWidth="1" />
        <line x1="10" y1="22" x2="50" y2="22" stroke="#8B7355" strokeWidth="1" />
        <line x1="10" y1="29" x2="45" y2="29" stroke="#8B7355" strokeWidth="1" />
        <text x="30" y="55" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="600">Daniel 8:14</text>
      </g>

      <g transform="translate(260, 200)">
        <rect x="0" y="0" width="60" height="50" fill="#654321" stroke="#4A3319" strokeWidth="2" rx="2" />
        <rect x="3" y="3" width="54" height="44" fill="#FFF8E7" />
        <line x1="10" y1="15" x2="50" y2="15" stroke="#8B7355" strokeWidth="1" />
        <line x1="10" y1="23" x2="50" y2="23" stroke="#8B7355" strokeWidth="1" />
        <line x1="10" y1="31" x2="48" y2="31" stroke="#8B7355" strokeWidth="1" />
        <line x1="10" y1="39" x2="45" y2="39" stroke="#8B7355" strokeWidth="1" />
        <text x="30" y="62" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="600">Life Records</text>
      </g>

      {/* 1844 Date Marker */}
      <g transform="translate(200, 60)">
        <rect x="-40" y="-15" width="80" height="30" fill="white" stroke="#CD7F32" strokeWidth="2" rx="5" opacity="0.9" />
        <text x="0" y="5" textAnchor="middle" fill="#8B6914" fontSize="20" fontWeight="bold">1844</text>
      </g>

      {/* Angel Figure (Witness) */}
      <g transform="translate(340, 120)" opacity="0.6">
        <ellipse cx="0" cy="0" rx="15" ry="20" fill="white" opacity="0.8" />
        <circle cx="0" cy="-15" r="8" fill="#FFD700" />
        <path d="M -20 -5 Q -15 -10 -10 -5" stroke="white" strokeWidth="3" fill="none" />
        <path d="M 10 -5 Q 15 -10 20 -5" stroke="white" strokeWidth="3" fill="none" />
      </g>

      {/* Heavenly Court Setting */}
      <g opacity="0.3">
        <rect x="50" y="30" width="300" height="4" fill="#D4AF37" />
        <circle cx="100" cy="32" r="3" fill="#FFD700" />
        <circle cx="200" cy="32" r="3" fill="#FFD700" />
        <circle cx="300" cy="32" r="3" fill="#FFD700" />
      </g>
    </svg>
  );
};

export default JudgmentIllustration;
