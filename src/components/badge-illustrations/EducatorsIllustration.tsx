import React from 'react';

interface EducatorsIllustrationProps {
  className?: string;
}

const EducatorsIllustration: React.FC<EducatorsIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#educatorsGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="educatorsGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Presentation Board/Screen */}
      <g transform="translate(200, 120)">
        <rect x="-100" y="-70" width="200" height="120" fill="white" stroke="#0d9488" strokeWidth="3" rx="5" />

        {/* Sanctuary Diagram on Board */}
        <g transform="translate(0, -20)">
          {/* Simple Tabernacle Outline */}
          <rect x="-60" y="-20" width="120" height="60" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
          <rect x="-40" y="-10" width="80" height="40" fill="#0d9488" opacity="0.2" />
          <rect x="10" y="0" width="30" height="30" fill="#0d9488" opacity="0.4" />
        </g>

        {/* Board Stand */}
        <line x1="0" y1="50" x2="0" y2="100" stroke="#6b7280" strokeWidth="4" />
        <line x1="-40" y1="100" x2="40" y2="100" stroke="#6b7280" strokeWidth="4" />
      </g>

      {/* Teacher/Educator Figure */}
      <g transform="translate(90, 200)">
        <circle cx="0" cy="-20" r="15" fill="#0d9488" opacity="0.7" />
        <rect x="-12" y="-5" width="24" height="35" fill="#0d9488" opacity="0.7" rx="3" />

        {/* Pointer/Stick */}
        <line x1="15" y1="-10" x2="60" y2="-40" stroke="#8B6914" strokeWidth="3" />
      </g>

      {/* Students/Audience */}
      <g transform="translate(280, 210)" opacity="0.6">
        <circle cx="0" cy="0" r="10" fill="#0891b2" />
        <rect x="-8" y="10" width="16" height="20" fill="#0891b2" rx="2" />
      </g>

      <g transform="translate(320, 210)" opacity="0.6">
        <circle cx="0" cy="0" r="10" fill="#0d9488" />
        <rect x="-8" y="10" width="16" height="20" fill="#0d9488" rx="2" />
      </g>

      <g transform="translate(360, 210)" opacity="0.6">
        <circle cx="0" cy="0" r="10" fill="#0891b2" />
        <rect x="-8" y="10" width="16" height="20" fill="#0891b2" rx="2" />
      </g>

      {/* Lesson Plan Document */}
      <g transform="translate(50, 60)">
        <rect x="0" y="0" width="60" height="80" fill="white" stroke="#0d9488" strokeWidth="2" rx="3" />
        <rect x="0" y="0" width="60" height="20" fill="#0d9488" opacity="0.3" />
        <text x="30" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          Lesson
        </text>

        {/* Lines representing text */}
        <line x1="10" y1="30" x2="50" y2="30" stroke="#0d9488" strokeWidth="1" />
        <line x1="10" y1="40" x2="50" y2="40" stroke="#0d9488" strokeWidth="1" />
        <line x1="10" y1="50" x2="45" y2="50" stroke="#0d9488" strokeWidth="1" />
        <line x1="10" y1="60" x2="50" y2="60" stroke="#0d9488" strokeWidth="1" />
        <line x1="10" y1="70" x2="40" y2="70" stroke="#0d9488" strokeWidth="1" />

        <text x="30" y="155" textAnchor="middle" fill="#0d9488" fontSize="10" fontWeight="600">
          Lesson Plans
        </text>
      </g>

      {/* Presentation Slides Icon */}
      <g transform="translate(340, 70)">
        <rect x="0" y="0" width="45" height="35" fill="white" stroke="#0d9488" strokeWidth="2" rx="2" />
        <rect x="5" y="5" width="35" height="3" fill="#0d9488" />
        <rect x="5" y="12" width="25" height="2" fill="#0891b2" opacity="0.6" />
        <rect x="5" y="17" width="30" height="2" fill="#0891b2" opacity="0.6" />
        <rect x="5" y="22" width="20" height="2" fill="#0891b2" opacity="0.6" />

        <text x="22" y="55" textAnchor="middle" fill="#0d9488" fontSize="10" fontWeight="600">
          Slides
        </text>
      </g>

      {/* Classroom Activity Icon */}
      <g transform="translate(50, 240)" opacity="0.7">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#0d9488" strokeWidth="2" />
        <path d="M -8 -3 L -3 3 L 8 -8" stroke="#0d9488" strokeWidth="2" fill="none" />
      </g>

      {/* Download/Resource Icon */}
      <g transform="translate(350, 240)" opacity="0.7">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#0d9488" strokeWidth="2" />
        <line x1="0" y1="-8" x2="0" y2="5" stroke="#0d9488" strokeWidth="2" />
        <path d="M -5 0 L 0 5 L 5 0" stroke="#0d9488" strokeWidth="2" fill="none" />
        <line x1="-8" y1="8" x2="8" y2="8" stroke="#0d9488" strokeWidth="2" />
      </g>

      {/* Graduation Cap Accent */}
      <g transform="translate(200, 35)" opacity="0.4">
        <path d="M -20 0 L 0 -8 L 20 0 L 20 3 L 0 -5 L -20 3 Z" fill="#0d9488" />
        <rect x="18" y="0" width="3" height="15" fill="#0d9488" />
        <circle cx="19.5" cy="17" r="3" fill="#0d9488" />
      </g>
    </svg>
  );
};

export default EducatorsIllustration;
