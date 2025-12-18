import React from 'react';

interface ColorsIllustrationProps {
  className?: string;
}

const ColorsIllustration: React.FC<ColorsIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="400" height="300" fill="url(#colorsGradient)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="colorsGradient" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#db2777" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
        </linearGradient>
        <filter id="colorGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Sacred Color Palette - 8 Divine Colors */}
      <g transform="translate(200, 150)">
        {/* Blue - God's Law */}
        <g transform="translate(-120, -80)">
          <rect x="0" y="0" width="60" height="60" fill="#1e40af" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="600">
            Blue
          </text>
        </g>

        {/* Purple - Royalty */}
        <g transform="translate(-40, -80)">
          <rect x="0" y="0" width="60" height="60" fill="#6B46C1" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#6B46C1" fontSize="10" fontWeight="600">
            Purple
          </text>
        </g>

        {/* Scarlet/Red - Sacrifice */}
        <g transform="translate(40, -80)">
          <rect x="0" y="0" width="60" height="60" fill="#B8272C" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#B8272C" fontSize="10" fontWeight="600">
            Scarlet
          </text>
        </g>

        {/* White - Purity */}
        <g transform="translate(-120, 0)">
          <rect x="0" y="0" width="60" height="60" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="600">
            White
          </text>
        </g>

        {/* Gold - Divinity */}
        <g transform="translate(-40, 0)">
          <rect x="0" y="0" width="60" height="60" fill="#D4AF37" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#B8860B" fontSize="10" fontWeight="600">
            Gold
          </text>
        </g>

        {/* Brass/Bronze - Judgment */}
        <g transform="translate(40, 0)">
          <rect x="0" y="0" width="60" height="60" fill="#CD7F32" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="600">
            Brass
          </text>
        </g>

        {/* Silver - Redemption */}
        <g transform="translate(-80, 80)">
          <rect x="0" y="0" width="60" height="60" fill="#C0C0C0" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="600">
            Silver
          </text>
        </g>

        {/* Black/Dark - Sin/Death */}
        <g transform="translate(20, 80)">
          <rect x="0" y="0" width="60" height="60" fill="#1f2937" rx="5" filter="url(#colorGlow)" />
          <text x="30" y="75" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="600">
            Dark
          </text>
        </g>
      </g>

      {/* Fabric/Textile Texture Overlay */}
      <g opacity="0.3">
        <line x1="50" y1="40" x2="110" y2="40" stroke="#CBD5E0" strokeWidth="1" />
        <line x1="50" y1="45" x2="110" y2="45" stroke="#CBD5E0" strokeWidth="1" />
        <line x1="50" y1="50" x2="110" y2="50" stroke="#CBD5E0" strokeWidth="1" />
      </g>

      {/* Color Meaning Symbols */}
      <g transform="translate(340, 60)" opacity="0.6">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#6B46C1" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fontSize="20">👑</text>
      </g>

      <g transform="translate(60, 240)" opacity="0.6">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#D4AF37" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fontSize="20">✨</text>
      </g>

      {/* Palette Icon */}
      <g transform="translate(350, 240)" opacity="0.5">
        <ellipse cx="0" cy="0" rx="25" ry="22" fill="#F3F4F6" stroke="#6b7280" strokeWidth="2" />
        <circle cx="-8" cy="-8" r="4" fill="#1e40af" />
        <circle cx="8" cy="-8" r="4" fill="#B8272C" />
        <circle cx="-8" cy="8" r="4" fill="#D4AF37" />
        <circle cx="8" cy="8" r="4" fill="#6B46C1" />
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="1" />
      </g>

      {/* Sacred Number 8 */}
      <g transform="translate(50, 60)" opacity="0.7">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#db2777" strokeWidth="2" />
        <text x="0" y="10" textAnchor="middle" fill="#db2777" fontSize="28" fontWeight="bold">
          8
        </text>
        <text x="0" y="45" textAnchor="middle" fill="#8B7355" fontSize="10" fontWeight="600">
          Sacred Colors
        </text>
      </g>

      {/* Thread/Weaving Pattern */}
      <g opacity="0.2">
        <path d="M 150 280 Q 175 270 200 280 Q 225 290 250 280" stroke="#db2777" strokeWidth="2" fill="none" />
        <path d="M 150 285 Q 175 275 200 285 Q 225 295 250 285" stroke="#6366f1" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
};

export default ColorsIllustration;
