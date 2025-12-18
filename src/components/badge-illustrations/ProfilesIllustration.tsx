import React from 'react';

interface ProfilesIllustrationProps {
  className?: string;
}

const ProfilesIllustration: React.FC<ProfilesIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#profilesGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="profilesGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
        </linearGradient>
        <filter id="badgeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* User Profile Card */}
      <g transform="translate(200, 120)">
        <rect x="-80" y="-60" width="160" height="120" fill="white" stroke="#ea580c" strokeWidth="3" rx="10" />

        {/* Profile Avatar */}
        <circle cx="0" cy="-25" r="25" fill="#ea580c" opacity="0.3" />
        <circle cx="0" cy="-30" r="12" fill="#ea580c" />
        <ellipse cx="0" cy="-10" rx="18" ry="20" fill="#ea580c" />

        {/* Progress Bar */}
        <rect x="-60" y="20" width="120" height="8" fill="#f3f4f6" rx="4" />
        <rect x="-60" y="20" width="85" height="8" fill="#ea580c" rx="4" />
        <text x="0" y="42" textAnchor="middle" fill="#6b7280" fontSize="10">
          Progress: 71%
        </text>
      </g>

      {/* Achievement Badges */}
      <g transform="translate(80, 220)" filter="url(#badgeGlow)">
        <circle cx="0" cy="0" r="22" fill="#FFD700" stroke="#D4AF37" strokeWidth="2" />
        <path
          d="M 0 -12 L 3 -3 L 12 -3 L 5 3 L 8 12 L 0 6 L -8 12 L -5 3 L -12 -3 L -3 -3 Z"
          fill="white"
        />
        <text x="0" y="35" textAnchor="middle" fill="#8B7355" fontSize="9" fontWeight="600">
          Explorer
        </text>
      </g>

      <g transform="translate(200, 220)" filter="url(#badgeGlow)">
        <circle cx="0" cy="0" r="22" fill="#C0C0C0" stroke="#9ca3af" strokeWidth="2" />
        <path
          d="M 0 -12 L 3 -3 L 12 -3 L 5 3 L 8 12 L 0 6 L -8 12 L -5 3 L -12 -3 L -3 -3 Z"
          fill="white"
        />
        <text x="0" y="35" textAnchor="middle" fill="#8B7355" fontSize="9" fontWeight="600">
          Scholar
        </text>
      </g>

      <g transform="translate(320, 220)" filter="url(#badgeGlow)">
        <circle cx="0" cy="0" r="22" fill="#CD7F32" stroke="#8B6914" strokeWidth="2" />
        <path
          d="M 0 -12 L 3 -3 L 12 -3 L 5 3 L 8 12 L 0 6 L -8 12 L -5 3 L -12 -3 L -3 -3 Z"
          fill="white"
        />
        <text x="0" y="35" textAnchor="middle" fill="#8B7355" fontSize="9" fontWeight="600">
          Student
        </text>
      </g>

      {/* Bookmark Icon */}
      <g transform="translate(330, 60)" opacity="0.6">
        <path
          d="M -10 -15 L 10 -15 L 10 15 L 0 8 L -10 15 Z"
          fill="#ea580c"
          stroke="#dc2626"
          strokeWidth="2"
        />
      </g>

      {/* Learning Path */}
      <g opacity="0.4">
        <circle cx="60" cy="80" r="5" fill="#ea580c" />
        <circle cx="85" cy="65" r="5" fill="#ea580c" />
        <circle cx="110" cy="75" r="5" fill="#ea580c" />
        <path d="M 60 80 Q 72 72 85 65 Q 97 70 110 75" stroke="#ea580c" strokeWidth="2" fill="none" strokeDasharray="3 2" />
      </g>

      {/* Stats Display */}
      <g transform="translate(50, 30)">
        <rect x="0" y="0" width="80" height="40" fill="white" stroke="#ea580c" strokeWidth="2" rx="5" opacity="0.9" />
        <text x="40" y="20" textAnchor="middle" fill="#ea580c" fontSize="18" fontWeight="bold">24</text>
        <text x="40" y="32" textAnchor="middle" fill="#6b7280" fontSize="9">Completed</text>
      </g>

      {/* Recommendation Icon */}
      <g transform="translate(340, 120)" opacity="0.5">
        <circle cx="0" cy="0" r="15" fill="white" stroke="#ea580c" strokeWidth="2" />
        <path d="M -5 0 L 0 5 L 8 -8" stroke="#ea580c" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
};

export default ProfilesIllustration;
