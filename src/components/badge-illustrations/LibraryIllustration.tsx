import React from 'react';

interface LibraryIllustrationProps {
  className?: string;
}

const LibraryIllustration: React.FC<LibraryIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#libraryGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="libraryGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Bookshelf Structure */}
      <g transform="translate(200, 150)">
        {/* Shelves */}
        <rect x="-140" y="-80" width="280" height="8" fill="#8B6914" />
        <rect x="-140" y="-20" width="280" height="8" fill="#8B6914" />
        <rect x="-140" y="40" width="280" height="8" fill="#8B6914" />
        <rect x="-140" y="100" width="280" height="8" fill="#8B7355" />

        {/* Left Support */}
        <rect x="-145" y="-80" width="10" height="188" fill="#654321" />

        {/* Right Support */}
        <rect x="135" y="-80" width="10" height="188" fill="#654321" />

        {/* Books on Top Shelf */}
        <g transform="translate(-120, -72)">
          <rect x="0" y="0" width="25" height="60" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          <rect x="28" y="5" width="25" height="55" fill="#2F4F2F" stroke="#1B3B1B" strokeWidth="1" />
          <rect x="56" y="0" width="28" height="60" fill="#8B0000" stroke="#660000" strokeWidth="1" />
          <rect x="87" y="8" width="25" height="52" fill="#4A5568" stroke="#2D3748" strokeWidth="1" />
          <rect x="115" y="0" width="30" height="60" fill="#6B4423" stroke="#4A2F17" strokeWidth="1" />
        </g>

        <g transform="translate(50, -72)">
          <rect x="0" y="0" width="25" height="60" fill="#1B3B1B" stroke="#0F2B0F" strokeWidth="1" />
          <rect x="28" y="10" width="22" height="50" fill="#654321" stroke="#4A3319" strokeWidth="1" />
          <rect x="53" y="0" width="28" height="60" fill="#8B6914" stroke="#6B5410" strokeWidth="1" />
        </g>

        {/* Books on Second Shelf */}
        <g transform="translate(-120, -12)">
          <rect x="0" y="0" width="30" height="48" fill="#2F4F2F" stroke="#1B3B1B" strokeWidth="1" />
          <rect x="33" y="0" width="25" height="48" fill="#8B0000" stroke="#660000" strokeWidth="1" />
          <rect x="61" y="5" width="28" height="43" fill="#D4AF37" stroke="#B8860B" strokeWidth="1" />
          <rect x="92" y="0" width="26" height="48" fill="#4A5568" stroke="#2D3748" strokeWidth="1" />
          <rect x="121" y="0" width="24" height="48" fill="#8B4513" stroke="#654321" strokeWidth="1" />
        </g>

        <g transform="translate(50, -12)">
          <rect x="0" y="8" width="28" height="40" fill="#6B4423" stroke="#4A2F17" strokeWidth="1" />
          <rect x="31" y="0" width="25" height="48" fill="#1B3B1B" stroke="#0F2B0F" strokeWidth="1" />
          <rect x="59" y="0" width="22" height="48" fill="#654321" stroke="#4A3319" strokeWidth="1" />
        </g>

        {/* Books on Third Shelf */}
        <g transform="translate(-120, 48)">
          <rect x="0" y="0" width="35" height="48" fill="#654321" stroke="#4A3319" strokeWidth="1" />
          <rect x="38" y="5" width="28" height="43" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          <rect x="69" y="0" width="26" height="48" fill="#2F4F2F" stroke="#1B3B1B" strokeWidth="1" />
          <rect x="98" y="0" width="30" height="48" fill="#8B0000" stroke="#660000" strokeWidth="1" />
        </g>

        <g transform="translate(30, 48)">
          <rect x="0" y="8" width="25" height="40" fill="#4A5568" stroke="#2D3748" strokeWidth="1" />
          <rect x="28" y="0" width="28" height="48" fill="#6B4423" stroke="#4A2F17" strokeWidth="1" />
          <rect x="59" y="0" width="25" height="48" fill="#1B3B1B" stroke="#0F2B0F" strokeWidth="1" />
          <rect x="87" y="5" width="23" height="43" fill="#8B6914" stroke="#6B5410" strokeWidth="1" />
        </g>
      </g>

      {/* Spotlight/Reading Light */}
      <g opacity="0.3">
        <path d="M 200 0 L 150 100" stroke="#FFD700" strokeWidth="40" opacity="0.2" />
        <path d="M 200 0 L 250 100" stroke="#FFD700" strokeWidth="40" opacity="0.2" />
      </g>

      {/* Decorative Academic Elements */}
      <g transform="translate(50, 40)" opacity="0.7">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#059669" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fill="#059669" fontSize="24" fontWeight="bold">📚</text>
      </g>

      <g transform="translate(350, 260)" opacity="0.7">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#059669" strokeWidth="2" />
        <text x="0" y="6" textAnchor="middle" fill="#059669" fontSize="20">🔍</text>
      </g>

      {/* Citation/Reference Icon */}
      <g transform="translate(340, 60)" opacity="0.5">
        <rect x="-15" y="-10" width="30" height="20" fill="white" stroke="#8B7355" strokeWidth="1" rx="2" />
        <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#8B7355" strokeWidth="1" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#8B7355" strokeWidth="1" />
        <line x1="-10" y1="5" x2="5" y2="5" stroke="#8B7355" strokeWidth="1" />
      </g>
    </svg>
  );
};

export default LibraryIllustration;
