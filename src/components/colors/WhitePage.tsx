import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const WhitePage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-8 border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-400 shadow-lg">
              <Book className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">White - Christ's Righteousness</h1>
              <p className="text-gray-600 text-lg">The Garment of Salvation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Revelation 19:7-8 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come,
                    and his wife hath made herself ready. And to her was granted that she should be arrayed in
                    fine linen, clean and white: for the fine linen is the righteousness of saints."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Isaiah 64:6 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "But we are all as an unclean thing, and all our righteousnesses are as filthy rags;
                    and we all do fade as a leaf; and our iniquities, like the wind, have taken us away."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Spiritual Significance of White</h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Our right doings (righteousnesses) are as "filthy rags" (Isaiah 64:6). The white in the sanctuary
                  is implied when we see the word "linen" in the Bible, especially when it comes to the sanctuary and its services.
                </p>

                <p className="text-lg">
                  The fine linen represents the righteousness of saints - not their own righteousness, but Christ's
                  righteousness imputed to them. This has significance for eternity as well.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-600">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">White = Christ's Righteousness</h3>
                  <p className="text-gray-700 font-medium text-lg">
                    The color white throughout the sanctuary represents Christ's righteousness - the pure,
                    clean garment of salvation that covers the believer's filthy rags of self-righteousness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="White"
        previousColor={{ name: "Red", path: "/colors/red" }}
        nextColor={{ name: "Purple", path: "/colors/purple" }}
      />
    </div>
  );
};

export default WhitePage;
