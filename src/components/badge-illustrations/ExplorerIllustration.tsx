import React from 'react';

interface ExplorerIllustrationProps {
  className?: string;
}

const ExplorerIllustration: React.FC<ExplorerIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#explorerGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="explorerGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 3D Isometric Tabernacle */}
      <g transform="translate(200, 150)">
        {/* Base/Ground */}
        <ellipse cx="0" cy="80" rx="120" ry="30" fill="#8B7355" opacity="0.3" />

        {/* Outer Court Walls */}
        <path
          d="M -100 40 L -100 -20 L -80 -35 L -80 25 Z"
          fill="#E8E8E8"
          stroke="#4A5568"
          strokeWidth="2"
        />
        <path
          d="M 100 40 L 100 -20 L 80 -35 L 80 25 Z"
          fill="#F5F5F5"
          stroke="#4A5568"
          strokeWidth="2"
        />

        {/* Holy Place Structure */}
        <rect
          x="-60"
          y="-20"
          width="120"
          height="80"
          fill="#D4AF37"
          stroke="#B8860B"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Roof */}
        <path
          d="M -60 -20 L 0 -50 L 60 -20 Z"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="2"
        />

        {/* Holy of Holies (darker section) */}
        <rect
          x="20"
          y="0"
          width="40"
          height="60"
          fill="#B8860B"
          stroke="#8B6914"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Altar (foreground) */}
        <rect
          x="-20"
          y="50"
          width="40"
          height="25"
          fill="#CD7F32"
          stroke="#8B4513"
          strokeWidth="2"
        />

        {/* Door/Veil */}
        <rect
          x="-10"
          y="30"
          width="20"
          height="30"
          fill="#6B46C1"
          opacity="0.8"
        />

        {/* Decorative 3D Grid Lines */}
        <line x1="-100" y1="40" x2="100" y2="40" stroke="#4A5568" strokeWidth="1" opacity="0.3" />
        <line x1="-80" y1="-35" x2="80" y2="-35" stroke="#4A5568" strokeWidth="1" opacity="0.3" />

        {/* Dimension Lines (3D effect) */}
        <line x1="-100" y1="-20" x2="-80" y2="-35" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="100" y1="-20" x2="80" y2="-35" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="4 2" />
      </g>

      {/* Floating Icons for Interactivity */}
      <g opacity="0.6">
        <circle cx="70" cy="50" r="15" fill="white" opacity="0.8" />
        <path d="M 70 43 L 70 57 M 63 50 L 77 50" stroke="#1e40af" strokeWidth="2" />

        <circle cx="330" cy="80" r="15" fill="white" opacity="0.8" />
        <circle cx="330" cy="80" r="8" fill="none" stroke="#1e40af" strokeWidth="2" />

        <circle cx="60" cy="220" r="15" fill="white" opacity="0.8" />
        <path d="M 53 220 L 60 213 L 67 220" stroke="#1e40af" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
};

export default ExplorerIllustration;
