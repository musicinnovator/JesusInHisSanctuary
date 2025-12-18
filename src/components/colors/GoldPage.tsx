import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const GoldPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-sanctuary-gold to-yellow-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-sanctuary-gold rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Gold - Heavenly or Deity</h1>
              <p className="text-yellow-100 text-lg">The Divine Nature</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-gold overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3">Revelation 21:18 (KJV)</h3>
                  <blockquote className="text-yellow-700 italic leading-relaxed">
                    "And the building of the wall of it was of jasper: and the city was pure gold, like unto clear glass."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-8 border border-yellow-200">
              <h2 className="text-3xl font-bold text-yellow-800 mb-6">Spiritual Significance of Gold</h2>

              <div className="space-y-6 text-yellow-700 leading-relaxed">
                <p className="text-lg">
                  Everything described about heaven is made of pure gold. See Revelation 21:18.
                </p>

                <div className="bg-yellow-100 rounded-lg p-6 mt-8 border-l-4 border-yellow-600">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-3">Gold = Heavenly or Deity</h3>
                  <p className="text-yellow-700 font-medium text-lg">
                    The color gold throughout the sanctuary represents heavenly things and deity -
                    the divine nature and celestial origin of God's dwelling place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Gold"
        previousColor={{ name: "Brass", path: "/colors/brass" }}
        nextColor={{ name: "Silver", path: "/colors/silver" }}
      />
    </div>
  );
};

export default GoldPage;
