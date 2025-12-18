import React from 'react';

interface ForumsIllustrationProps {
  className?: string;
}

const ForumsIllustration: React.FC<ForumsIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#forumsGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="forumsGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Discussion Circle - People in Community */}
      <g transform="translate(200, 150)">
        {/* Center Discussion Topic */}
        <circle cx="0" cy="0" r="40" fill="white" stroke="#2563eb" strokeWidth="3" />
        <text x="0" y="-10" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="600">
          Sanctuary
        </text>
        <text x="0" y="8" textAnchor="middle" fill="#0891b2" fontSize="12">
          Doctrine
        </text>

        {/* People Around Circle - Diverse Community */}
        {/* Person 1 - Top */}
        <g transform="translate(0, -100)">
          <circle cx="0" cy="0" r="25" fill="#3b82f6" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Person 2 - Top Right */}
        <g transform="translate(85, -55)">
          <circle cx="0" cy="0" r="25" fill="#06b6d4" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Person 3 - Bottom Right */}
        <g transform="translate(85, 55)">
          <circle cx="0" cy="0" r="25" fill="#2563eb" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Person 4 - Bottom */}
        <g transform="translate(0, 100)">
          <circle cx="0" cy="0" r="25" fill="#0891b2" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Person 5 - Bottom Left */}
        <g transform="translate(-85, 55)">
          <circle cx="0" cy="0" r="25" fill="#3b82f6" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Person 6 - Top Left */}
        <g transform="translate(-85, -55)">
          <circle cx="0" cy="0" r="25" fill="#06b6d4" opacity="0.8" />
          <circle cx="0" cy="-5" r="8" fill="white" />
          <ellipse cx="0" cy="8" rx="10" ry="12" fill="white" />
        </g>

        {/* Connection Lines */}
        <g opacity="0.3" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2">
          <line x1="0" y1="-60" x2="0" y2="-40" />
          <line x1="50" y1="-32" x2="35" y2="-25" />
          <line x1="50" y1="32" x2="35" y2="25" />
          <line x1="0" y1="60" x2="0" y2="40" />
          <line x1="-50" y1="32" x2="-35" y2="25" />
          <line x1="-50" y1="-32" x2="-35" y2="-25" />
        </g>
      </g>

      {/* Speech Bubbles */}
      <g opacity="0.7">
        <ellipse cx="80" cy="80" rx="30" ry="20" fill="white" stroke="#2563eb" strokeWidth="2" />
        <path d="M 70 95 L 75 100 L 80 95" fill="white" stroke="#2563eb" strokeWidth="2" />
        <line x1="65" y1="75" x2="95" y2="75" stroke="#2563eb" strokeWidth="1" />
        <line x1="65" y1="82" x2="90" y2="82" stroke="#2563eb" strokeWidth="1" />
      </g>

      <g opacity="0.7">
        <ellipse cx="320" cy="220" rx="35" ry="22" fill="white" stroke="#0891b2" strokeWidth="2" />
        <path d="M 310 238 L 305 245 L 315 238" fill="white" stroke="#0891b2" strokeWidth="2" />
        <line x1="300" y1="215" x2="340" y2="215" stroke="#0891b2" strokeWidth="1" />
        <line x1="300" y1="222" x2="335" y2="222" stroke="#0891b2" strokeWidth="1" />
      </g>

      {/* Moderation Shield */}
      <g transform="translate(50, 240)">
        <path
          d="M 0 -15 L 10 -10 L 10 5 Q 10 10 0 15 Q -10 10 -10 5 L -10 -10 Z"
          fill="#2563eb"
          opacity="0.6"
        />
        <text x="0" y="3" textAnchor="middle" fill="white" fontSize="12">✓</text>
      </g>

      {/* Global Community Icon */}
      <g transform="translate(350, 50)" opacity="0.5">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#0891b2" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="20" ry="10" fill="none" stroke="#0891b2" strokeWidth="2" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#0891b2" strokeWidth="2" />
      </g>
    </svg>
  );
};

export default ForumsIllustration;
