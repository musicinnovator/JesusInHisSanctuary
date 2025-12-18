import React from 'react';

interface TimelineIllustrationProps {
  className?: string;
}

const TimelineIllustration: React.FC<TimelineIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#timelineGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="timelineGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4b5563" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Main Timeline Arrow */}
      <g>
        <line x1="50" y1="150" x2="350" y2="150" stroke="#9ca3af" strokeWidth="4" />
        <path d="M 350 150 L 340 145 L 340 155 Z" fill="#9ca3af" />
      </g>

      {/* Timeline Events */}
      {/* Aaron (Earthly) - Top */}
      <g transform="translate(100, 80)">
        <circle cx="0" cy="0" r="20" fill="#CD7F32" stroke="#8B6914" strokeWidth="2" />
        <text x="0" y="-30" textAnchor="middle" fill="#8B7355" fontSize="12" fontWeight="bold">Aaron</text>
        <line x1="0" y1="20" x2="0" y2="70" stroke="#CD7F32" strokeWidth="2" strokeDasharray="3 2" />

        {/* High Priest Figure */}
        <rect x="-8" y="-10" width="16" height="20" fill="#6B46C1" opacity="0.8" rx="2" />
        <circle cx="0" cy="-15" r="5" fill="#F5E6D3" />
      </g>

      <g transform="translate(200, 80)">
        <circle cx="0" cy="0" r="18" fill="#B8860B" stroke="#8B6914" strokeWidth="2" />
        <line x1="0" y1="18" x2="0" y2="70" stroke="#B8860B" strokeWidth="2" strokeDasharray="3 2" />
        <text x="0" y="8" textAnchor="middle" fill="white" fontSize="20">🕯</text>
      </g>

      <g transform="translate(300, 80)">
        <circle cx="0" cy="0" r="18" fill="#B8272C" stroke="#8B1F23" strokeWidth="2" />
        <line x1="0" y1="18" x2="0" y2="70" stroke="#B8272C" strokeWidth="2" strokeDasharray="3 2" />
        <text x="0" y="8" textAnchor="middle" fill="white" fontSize="18">⚖</text>
      </g>

      {/* Jesus (Heavenly) - Bottom */}
      <g transform="translate(100, 220)">
        <circle cx="0" cy="0" r="20" fill="#D4AF37" stroke="#B8860B" strokeWidth="2" />
        <text x="0" y="35" textAnchor="middle" fill="#8B7355" fontSize="12" fontWeight="bold">Jesus</text>
        <line x1="0" y1="-70" x2="0" y2="-20" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 2" />

        {/* Christ Figure */}
        <rect x="-8" y="-10" width="16" height="20" fill="white" opacity="0.9" rx="2" />
        <circle cx="0" cy="-15" r="5" fill="#FFD700" />
        <circle cx="0" cy="-15" r="8" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
      </g>

      <g transform="translate(200, 220)">
        <circle cx="0" cy="0" r="18" fill="#FFD700" stroke="#D4AF37" strokeWidth="2" />
        <line x1="0" y1="-70" x2="0" y2="-18" stroke="#FFD700" strokeWidth="2" strokeDasharray="3 2" />
        <text x="0" y="8" textAnchor="middle" fill="white" fontSize="16">✝</text>
      </g>

      <g transform="translate(300, 220)">
        <circle cx="0" cy="0" r="18" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />
        <line x1="0" y1="-70" x2="0" y2="-18" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 2" />
        <text x="0" y="8" textAnchor="middle" fill="white" fontSize="18">👑</text>
      </g>

      {/* Type/Antitype Labels */}
      <text x="50" y="85" fill="#CD7F32" fontSize="11" fontWeight="600">Type</text>
      <text x="50" y="225" fill="#D4AF37" fontSize="11" fontWeight="600">Antitype</text>

      {/* Parallel Connection Lines */}
      <g opacity="0.3">
        <path d="M 100 100 L 100 200" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 200 98 L 200 202" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 300 98 L 300 202" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2 2" />
      </g>
    </svg>
  );
};

export default TimelineIllustration;
