import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const SilverPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-sanctuary-silver to-gray-500 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-sanctuary-silver rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Silver - The Holy Spirit's Work</h1>
              <p className="text-gray-100 text-lg">The Comforter's Ministry</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-silver overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Revelation 3:12 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out:
                    and I will write upon him the name of my God, and the name of the city of my God, which is new Jerusalem,
                    which cometh down out of heaven from my God: and I will write upon him my new name."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Exodus 27:9-11 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "And thou shalt make the court of the tabernacle: for the south side southward there shall be hangings
                    for the court of fine twined linen... the hooks of the pillars and their fillets shall be of silver."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 md:col-span-2">
                  <h3 className="font-bold text-gray-800 mb-3">John 16:7-14 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away,
                    the Comforter will not come unto you... when he, the Spirit of truth, is come,
                    he will guide you into all truth..."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Spiritual Significance of Silver</h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  The Holy Spirit's Work is seen where there is silver in the Tabernacle service. The work of the Holy Spirit
                  is all throughout the Bible, but is clearly given by the words of Jesus found in John 16:7-14.
                </p>

                <p className="text-lg">
                  The Holy Spirit will reprove the world of sin, righteousness, and judgment. He will guide into all truth
                  and show things to come, always glorifying Christ.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-600">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Silver = The Holy Spirit's Work</h3>
                  <p className="text-gray-700 font-medium text-lg">
                    The color silver throughout the sanctuary represents the Holy Spirit's work -
                    the Comforter's ministry of conviction, guidance, and glorifying Christ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Silver"
        previousColor={{ name: "Gold", path: "/colors/gold" }}
      />
    </div>
  );
};

export default SilverPage;
