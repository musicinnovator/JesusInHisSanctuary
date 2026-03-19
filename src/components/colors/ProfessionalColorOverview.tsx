import React from 'react';
import { Link } from 'react-router-dom';
import DonationBanner from '../DonationBanner';

const ProfessionalColorOverview = () => {
  const colors = [
    {
      name: 'Blue',
      subtitle: "God's Law",
      description: 'The foundation of divine government',
      path: '/colors/blue',
      hexColor: '#0000FF',
    },
    {
      name: 'Dark',
      subtitle: 'Humanity',
      description: 'The veiling of divine glory',
      path: '/colors/dark',
      hexColor: '#2C2C2C',
    },
    {
      name: 'Red',
      subtitle: "Messiah's Blood",
      description: 'The sacrifice of the innocent victim',
      path: '/colors/red',
      hexColor: '#DC143C',
    },
    {
      name: 'White',
      subtitle: "Christ's Righteousness",
      description: 'The garment of salvation',
      path: '/colors/white',
      hexColor: '#FFFFFF',
    },
    {
      name: 'Purple',
      subtitle: 'Royalty',
      description: 'The royal law of liberty',
      path: '/colors/purple',
      hexColor: '#800080',
    },
    {
      name: 'Brass',
      subtitle: 'Earthly',
      description: 'Things done on earth',
      path: '/colors/brass',
      hexColor: '#B5651D',
    },
    {
      name: 'Gold',
      subtitle: 'Heavenly or Deity',
      description: 'The divine nature',
      path: '/colors/gold',
      hexColor: '#FFD700',
    },
    {
      name: 'Silver',
      subtitle: "The Holy Spirit's Work",
      description: "The Comforter's ministry",
      path: '/colors/silver',
      hexColor: '#C0C0C0',
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-background">
      <DonationBanner />

      {/* Header */}
      <div className="hero-professional text-white py-16">
        <div className="container-academic">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="nav-classical text-sanctuary-gold-light hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">Sacred Colors in Scripture</h1>
            <div className="divider-ornamental max-w-md mx-auto"></div>
            <p className="text-stone-200 text-lg font-crimson max-w-3xl mx-auto">
              Exploring the eight divine colors and their theological significance
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container-academic section-spacing">
        <div className="card-frame mb-12">
          <h2 className="text-3xl font-cinzel font-semibold text-sanctuary-navy mb-6 section-header">The Eight Sacred Colors</h2>
          <div className="space-y-4 text-base text-stone-700 leading-relaxed font-crimson">
            <p>
              In the book of Exodus, God revealed eight distinct colors for the wilderness sanctuary,
              each carrying profound spiritual significance and pointing to heavenly realities.
              These colors were not merely decorative but served as divine symbols teaching
              eternal truths about God's character and His plan of salvation.
            </p>
            <p>
              Each color represents a specific aspect of God's nature, His law, His sacrifice,
              and His work for humanity. From the blue representing God's eternal law to the
              silver symbolizing the Holy Spirit's ministry, every hue tells a story of redemption
              and divine love.
            </p>
            <p className="font-medium text-sanctuary-gold">
              Click on any color below to explore its full biblical significance, scripture references,
              and spiritual meaning within the sanctuary service.
            </p>
          </div>

          {/* Color Swatches - Professional Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-8">
            {colors.map((color) => (
              <Link
                key={color.name}
                to={color.path}
                className="text-center group"
              >
                <div
                  className="color-swatch w-full h-16 mx-auto mb-2 group-hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: color.hexColor }}
                ></div>
                <span className="text-sm font-medium text-sanctuary-navy group-hover:text-sanctuary-gold">{color.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Color Cards Grid - Book Catalog Style */}
        <div className="grid md:grid-cols-2 gap-6">
          {colors.map((color) => (
            <Link
              key={color.name}
              to={color.path}
              className="feature-card group"
            >
              {/* Material Swatch */}
              <div className="flex items-start gap-6">
                <div
                  className="color-swatch w-20 h-20 flex-shrink-0"
                  style={{ backgroundColor: color.hexColor }}
                ></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="text-2xl font-cinzel font-semibold text-sanctuary-navy mb-1">{color.name}</h3>
                      <p className="text-base text-stone-600 font-crimson italic">{color.subtitle}</p>
                    </div>
                    <span className="nav-classical text-sm">→</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-crimson">
                    {color.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 card-frame text-center">
          <h3 className="text-2xl font-cinzel font-semibold text-sanctuary-navy mb-4">Begin Your Journey Through the Colors</h3>
          <div className="divider-ornamental max-w-xs mx-auto"></div>
          <p className="text-base text-stone-600 mb-6 max-w-3xl mx-auto font-crimson">
            Each color page contains detailed biblical references, spiritual insights,
            and theological significance. Navigate through all eight colors to gain
            a comprehensive understanding of God's design for the sanctuary.
          </p>
          <Link
            to="/colors/blue"
            className="btn-professional-primary"
          >
            <span>Start with Blue</span>
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Biblical Quote */}
        <div className="quote-scholarly mt-8">
          <div className="text-xs font-bold uppercase tracking-wider text-sanctuary-gold mb-2">Exodus 25:8 (KJV)</div>
          <p className="font-crimson text-lg text-stone-800 italic">
            "And let them make me a sanctuary; that I may dwell among them."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalColorOverview;
