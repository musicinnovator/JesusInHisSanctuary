import React from 'react';

interface CompareIllustrationProps {
  className?: string;
}

const CompareIllustration: React.FC<CompareIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#compareGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="compareGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Split Screen Comparison */}
      {/* Left Side - Tabernacle */}
      <g transform="translate(80, 150)">
        <rect x="-50" y="-60" width="100" height="120" fill="#F5E6D3" stroke="#8B7355" strokeWidth="2" opacity="0.9" />
        <rect x="-40" y="-50" width="80" height="40" fill="#D4AF37" opacity="0.8" />
        <rect x="-30" y="0" width="60" height="60" fill="#CD7F32" opacity="0.7" />
        <text x="0" y="85" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">Tabernacle</text>
      </g>

      {/* Right Side - Temple */}
      <g transform="translate(320, 150)">
        <rect x="-60" y="-70" width="120" height="140" fill="#F5E6D3" stroke="#8B7355" strokeWidth="2" opacity="0.9" />
        <rect x="-50" y="-60" width="100" height="50" fill="#D4AF37" opacity="0.8" />
        <rect x="-40" y="-5" width="80" height="70" fill="#B8860B" opacity="0.7" />
        <rect x="-20" y="20" width="40" height="45" fill="#8B6914" opacity="0.8" />
        <text x="0" y="95" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">Temple</text>
      </g>

      {/* Comparison Arrows */}
      <g transform="translate(200, 150)">
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#7c3aed" strokeWidth="3" />
        <path d="M -25 0 L -15 -5 L -15 5 Z" fill="#7c3aed" />
        <path d="M 25 0 L 15 -5 L 15 5 Z" fill="#7c3aed" />
        <circle cx="0" cy="0" r="15" fill="white" stroke="#7c3aed" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="bold">VS</text>
      </g>

      {/* Comparison Metrics */}
      <g opacity="0.7">
        <rect x="30" y="30" width="80" height="4" fill="#7c3aed" opacity="0.6" />
        <rect x="290" y="30" width="80" height="4" fill="#a855f7" opacity="0.6" />

        <rect x="30" y="45" width="60" height="4" fill="#7c3aed" opacity="0.6" />
        <rect x="290" y="45" width="90" height="4" fill="#a855f7" opacity="0.6" />

        <circle cx="200" cy="250" r="6" fill="#7c3aed" />
        <circle cx="230" cy="250" r="6" fill="#a855f7" />
        <circle cx="170" cy="250" r="6" fill="#c084fc" />
      </g>
    </svg>
  );
};

export default CompareIllustration;
