import React from 'react';

interface MythsIllustrationProps {
  className?: string;
}

const MythsIllustration: React.FC<MythsIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#mythsGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="mythsGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#db2777" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Split Design: Myth vs Fact */}
      {/* Left Side - Myth (X) */}
      <g transform="translate(100, 150)">
        <circle cx="0" cy="0" r="60" fill="#fecaca" opacity="0.5" />
        <circle cx="0" cy="0" r="55" fill="white" stroke="#dc2626" strokeWidth="3" />

        {/* X Mark */}
        <line x1="-25" y1="-25" x2="25" y2="25" stroke="#dc2626" strokeWidth="6" />
        <line x1="25" y1="-25" x2="-25" y2="25" stroke="#dc2626" strokeWidth="6" />

        <text x="0" y="85" textAnchor="middle" fill="#dc2626" fontSize="18" fontWeight="bold">
          MYTH
        </text>

        {/* Question Mark */}
        <text x="-50" y="-70" fill="#dc2626" fontSize="30" opacity="0.5">?</text>
      </g>

      {/* Right Side - Fact (Check) */}
      <g transform="translate(300, 150)">
        <circle cx="0" cy="0" r="60" fill="#bbf7d0" opacity="0.5" />
        <circle cx="0" cy="0" r="55" fill="white" stroke="#16a34a" strokeWidth="3" />

        {/* Check Mark */}
        <path
          d="M -20 0 L -5 20 L 25 -20"
          stroke="#16a34a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="0" y="85" textAnchor="middle" fill="#16a34a" fontSize="18" fontWeight="bold">
          FACT
        </text>

        {/* Lightbulb */}
        <g transform="translate(50, -70)" opacity="0.6">
          <circle cx="0" cy="0" r="8" fill="#FFD700" />
          <rect x="-3" y="8" width="6" height="4" fill="#8B7355" />
          <line x1="-12" y1="0" x2="-15" y2="0" stroke="#FFD700" strokeWidth="2" />
          <line x1="12" y1="0" x2="15" y2="0" stroke="#FFD700" strokeWidth="2" />
          <line x1="0" y1="-12" x2="0" y2="-15" stroke="#FFD700" strokeWidth="2" />
        </g>
      </g>

      {/* Arrow Transition */}
      <g transform="translate(200, 150)">
        <line x1="-40" y1="0" x2="40" y2="0" stroke="#db2777" strokeWidth="4" />
        <path d="M 40 0 L 30 -8 L 30 8 Z" fill="#db2777" />
      </g>

      {/* Quiz/Question Elements */}
      <g opacity="0.6">
        <rect x="150" y="40" width="100" height="30" fill="white" stroke="#db2777" strokeWidth="2" rx="5" />
        <text x="200" y="60" textAnchor="middle" fill="#db2777" fontSize="14" fontWeight="600">
          Test Your Knowledge
        </text>
      </g>

      {/* Common Misconceptions List */}
      <g transform="translate(50, 230)" opacity="0.5">
        <circle cx="0" cy="0" r="3" fill="#dc2626" />
        <line x1="8" y1="0" x2="60" y2="0" stroke="#dc2626" strokeWidth="1" />
      </g>

      <g transform="translate(150, 230)" opacity="0.5">
        <circle cx="0" cy="0" r="3" fill="#dc2626" />
        <line x1="8" y1="0" x2="60" y2="0" stroke="#dc2626" strokeWidth="1" />
      </g>

      <g transform="translate(250, 230)" opacity="0.5">
        <circle cx="0" cy="0" r="3" fill="#dc2626" />
        <line x1="8" y1="0" x2="60" y2="0" stroke="#dc2626" strokeWidth="1" />
      </g>

      {/* Biblical Clarity Icon */}
      <g transform="translate(350, 50)" opacity="0.6">
        <rect x="-15" y="-20" width="30" height="40" fill="#8B4513" rx="2" />
        <rect x="-12" y="-17" width="24" height="34" fill="#F5E6D3" />
        <line x1="-8" y1="-10" x2="8" y2="-10" stroke="#db2777" strokeWidth="1" />
        <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#db2777" strokeWidth="1" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#db2777" strokeWidth="1" />
      </g>

      {/* Interactive Quiz Icon */}
      <g transform="translate(50, 50)" opacity="0.6">
        <rect x="-20" y="-15" width="40" height="30" fill="white" stroke="#db2777" strokeWidth="2" rx="3" />
        <circle cx="-8" cy="-5" r="3" fill="#db2777" />
        <circle cx="-8" cy="5" r="3" fill="none" stroke="#db2777" strokeWidth="1" />
        <circle cx="8" cy="-5" r="3" fill="none" stroke="#db2777" strokeWidth="1" />
        <circle cx="8" cy="5" r="3" fill="#16a34a" />
      </g>
    </svg>
  );
};

export default MythsIllustration;
