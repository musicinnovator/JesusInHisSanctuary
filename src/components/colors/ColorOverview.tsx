import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Home, ArrowRight } from 'lucide-react';
import DonationBanner from '../DonationBanner';

const ColorOverview = () => {
  const colors = [
    {
      name: 'Blue',
      subtitle: "God's Law",
      description: 'The foundation of divine government',
      path: '/colors/blue',
      bgColor: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-800',
      iconBg: 'bg-blue-600',
      borderColor: 'border-blue-500'
    },
    {
      name: 'Dark',
      subtitle: 'Humanity',
      description: 'The veiling of divine glory',
      path: '/colors/dark',
      bgColor: 'from-gray-900 to-gray-800',
      textColor: 'text-gray-800',
      iconBg: 'bg-gray-900',
      borderColor: 'border-gray-900'
    },
    {
      name: 'Red',
      subtitle: "Messiah's Blood",
      description: 'The sacrifice of the innocent victim',
      path: '/colors/red',
      bgColor: 'from-red-600 to-red-700',
      textColor: 'text-red-800',
      iconBg: 'bg-red-600',
      borderColor: 'border-red-600'
    },
    {
      name: 'White',
      subtitle: "Christ's Righteousness",
      description: 'The garment of salvation',
      path: '/colors/white',
      bgColor: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-800',
      iconBg: 'bg-white',
      borderColor: 'border-gray-300'
    },
    {
      name: 'Purple',
      subtitle: 'Royalty',
      description: 'The royal law of liberty',
      path: '/colors/purple',
      bgColor: 'from-purple-600 to-purple-700',
      textColor: 'text-purple-800',
      iconBg: 'bg-purple-600',
      borderColor: 'border-purple-600'
    },
    {
      name: 'Brass',
      subtitle: 'Earthly',
      description: 'Things done on earth',
      path: '/colors/brass',
      bgColor: 'from-sanctuary-brass to-amber-700',
      textColor: 'text-amber-800',
      iconBg: 'bg-sanctuary-brass',
      borderColor: 'border-sanctuary-brass'
    },
    {
      name: 'Gold',
      subtitle: 'Heavenly or Deity',
      description: 'The divine nature',
      path: '/colors/gold',
      bgColor: 'from-sanctuary-gold to-yellow-600',
      textColor: 'text-yellow-800',
      iconBg: 'bg-sanctuary-gold',
      borderColor: 'border-sanctuary-gold'
    },
    {
      name: 'Silver',
      subtitle: "The Holy Spirit's Work",
      description: "The Comforter's ministry",
      path: '/colors/silver',
      bgColor: 'from-sanctuary-silver to-gray-500',
      textColor: 'text-gray-800',
      iconBg: 'bg-sanctuary-silver',
      borderColor: 'border-sanctuary-silver'
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      {/* Header */}
      <div className="bg-gradient-to-br from-sanctuary-purple-dark via-sanctuary-blue-dark to-sanctuary-purple text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-linen transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Palette className="w-16 h-16 text-sanctuary-gold" />
            <div>
              <h1 className="text-5xl font-bold mb-2">Sacred Colors of the Sanctuary</h1>
              <p className="text-sanctuary-linen text-xl">
                Exploring the eight divine colors and their spiritual significance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-12">
          <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">The Eight Sacred Colors</h2>
          <div className="space-y-4 text-lg text-sanctuary-brass leading-relaxed">
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
            <p className="font-medium text-sanctuary-purple">
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
                <div className={`w-full h-16 ${color.iconBg} rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}></div>
                <span className="text-sm font-medium text-sanctuary-purple group-hover:text-sanctuary-blue">{color.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Color Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {colors.map((color) => (
            <Link
              key={color.name}
              to={color.path}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-sanctuary-gold"
            >
              {/* Color Header */}
              <div className={`bg-gradient-to-r ${color.bgColor} ${color.name === 'White' ? 'text-gray-800' : 'text-white'} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{color.name}</h3>
                    <p className={`text-lg ${color.name === 'White' ? 'text-gray-600' : 'opacity-90'}`}>{color.subtitle}</p>
                  </div>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Color Content */}
              <div className="p-6">
                <p className="text-sanctuary-brass text-lg leading-relaxed mb-4">
                  {color.description}
                </p>
                <div className="flex items-center text-sanctuary-blue group-hover:text-sanctuary-purple font-semibold">
                  <span>Explore {color.name}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-sanctuary-blue to-sanctuary-purple text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Begin Your Journey Through the Colors</h3>
          <p className="text-lg text-sanctuary-linen mb-6 max-w-3xl mx-auto">
            Each color page contains detailed biblical references, spiritual insights,
            and theological significance. Navigate through all eight colors to gain
            a comprehensive understanding of God's design for the sanctuary.
          </p>
          <Link
            to="/colors/blue"
            className="inline-flex items-center space-x-2 bg-white text-sanctuary-purple px-8 py-3 rounded-lg hover:bg-sanctuary-gold hover:text-white transition-all duration-300 font-semibold"
          >
            <span>Start with Blue</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Biblical Quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-sanctuary-brass italic text-lg">
            "And let them make me a sanctuary; that I may dwell among them."
            <span className="block text-sanctuary-purple font-semibold mt-2">- Exodus 25:8 (KJV)</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default ColorOverview;
