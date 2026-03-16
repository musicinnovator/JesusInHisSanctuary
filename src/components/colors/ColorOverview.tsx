import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Hop as Home, ArrowRight } from 'lucide-react';
import DonationBanner from '../DonationBanner';

const ColorOverview = () => {
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
      <div className="bg-sanctuary-navy text-white py-16">
        <div className="container-academic">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sanctuary-gold-light hover:text-white transition-colors font-body"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Palette className="w-12 h-12 text-sanctuary-gold-light" />
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Sacred Colors in Scripture</h1>
              <p className="text-gray-200 text-lg font-body">
                Exploring the eight divine colors and their theological significance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container-academic section-spacing">
        <div className="bg-white rounded p-8 border border-divider mb-12">
          <h2 className="text-3xl font-heading font-semibold text-sanctuary-navy mb-6">The Eight Sacred Colors</h2>
          <div className="space-y-4 text-base text-text-primary leading-relaxed font-body">
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

          {/* Color Swatches */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-8">
            {colors.map((color) => (
              <Link
                key={color.name}
                to={color.path}
                className="text-center group"
              >
                <div
                  className="w-full h-16 rounded mx-auto mb-2 border border-divider group-hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: color.hexColor }}
                ></div>
                <span className="text-sm font-medium text-sanctuary-navy group-hover:text-sanctuary-gold font-body">{color.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Color Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {colors.map((color) => (
            <Link
              key={color.name}
              to={color.path}
              className="card-academic group"
            >
              {/* Color Swatch */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded flex-shrink-0 border border-divider"
                  style={{ backgroundColor: color.hexColor }}
                ></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-sanctuary-navy mb-1">{color.name}</h3>
                      <p className="text-base text-text-secondary font-body mb-3">{color.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sanctuary-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-body">
                    {color.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white border border-divider rounded p-8 text-center">
          <h3 className="text-2xl font-heading font-semibold text-sanctuary-navy mb-4">Begin Your Journey Through the Colors</h3>
          <p className="text-base text-text-secondary mb-6 max-w-3xl mx-auto font-body">
            Each color page contains detailed biblical references, spiritual insights,
            and theological significance. Navigate through all eight colors to gain
            a comprehensive understanding of God's design for the sanctuary.
          </p>
          <Link
            to="/colors/blue"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Start with Blue</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Biblical Quote */}
        <div className="scripture-block mt-8">
          <div className="scripture-reference">Exodus 25:8 (KJV)</div>
          <p>
            "And let them make me a sanctuary; that I may dwell among them."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorOverview;
