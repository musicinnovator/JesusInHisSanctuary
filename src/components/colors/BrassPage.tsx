import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const BrassPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-sanctuary-brass to-amber-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-sanctuary-brass rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Brass - Earthly</h1>
              <p className="text-amber-100 text-lg">Things Done on Earth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-brass overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-3">Exodus 27:2 (KJV)</h3>
                  <blockquote className="text-amber-700 italic leading-relaxed">
                    "And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same:
                    and thou shalt overlay it with brass."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-8 border border-amber-200">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Spiritual Significance of Brass</h2>

              <div className="space-y-6 text-amber-700 leading-relaxed">
                <p className="text-lg">
                  The color (metallic color) represents things that are done on the earth. The sacrifice of Messiah
                  was to take place on earth.
                </p>

                <p className="text-lg">
                  This is why only the outer court furniture (the altar of sacrifice, the laver and its foot,
                  the utensils, etc) were all made or covered with brass.
                </p>

                <p className="text-lg">
                  Speaking of the altar of sacrifice: Exodus 27:2 says it was to be overlayed with brass.
                </p>

                <div className="bg-amber-100 rounded-lg p-6 mt-8 border-l-4 border-amber-600">
                  <h3 className="text-2xl font-bold text-amber-800 mb-3">Brass = Earthly</h3>
                  <p className="text-amber-700 font-medium text-lg">
                    The color brass throughout the sanctuary represents earthly things - the work and sacrifice
                    that must be accomplished on earth for humanity's salvation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Brass"
        previousColor={{ name: "Purple", path: "/colors/purple" }}
        nextColor={{ name: "Gold", path: "/colors/gold" }}
      />
    </div>
  );
};

export default BrassPage;
