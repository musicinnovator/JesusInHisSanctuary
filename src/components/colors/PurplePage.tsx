import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const PurplePage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Purple - Royalty</h1>
              <p className="text-purple-100 text-lg">The Royal Law of Liberty</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-purple-600 overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3">Luke 16:19 (KJV)</h3>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "There was a certain rich man, which was clothed in purple and fine linen,
                    and fared sumptuously every day:"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3">John 19:2 (KJV)</h3>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "And the soldiers platted a crown of thorns, and put it on his head,
                    and they put on him a purple robe;"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3">James 2:8 (KJV)</h3>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well:"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3">1 John 1:7 (KJV)</h3>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "But if we walk in the light, as he is in the light, we have fellowship one with another,
                    and the blood of Jesus Christ his Son cleanseth us from all sin."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-8 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-6">Spiritual Significance of Purple</h2>

              <div className="space-y-6 text-purple-700 leading-relaxed">
                <p className="text-lg">
                  The color "purple" is the combination of two colors already mentioned above - blue and red.
                </p>

                <p className="text-lg">
                  When the Bible mentions anything about the concept of "royalty", we can think of the color purple
                  which is a combination of service ("to whom ye obey, ye serve" - Romans 6:16) and sacrifice
                  ("the blood of Christ cleanseth us from all sin" - 1 John 1:7).
                </p>

                <p className="text-lg">
                  Therefore, when we see the text found in James 2:8, we understand that the "Royal Law of Liberty"
                  is the Law that man broke in Eden, and this law was enunciated on Mt. Sinai.
                </p>

                <p className="text-lg">
                  This Law, broken by man, is esteemed by God as a law that is blue (His Character) and that is red (His Sacrifice).
                </p>

                <div className="bg-purple-100 rounded-lg p-6 mt-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-purple-800 mb-3">Purple = Royalty</h3>
                  <p className="text-purple-700 font-medium text-lg">
                    The color purple throughout the sanctuary represents royalty - the combination of God's law (blue)
                    and Christ's sacrifice (red), forming the Royal Law of Liberty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Purple"
        previousColor={{ name: "White", path: "/colors/white" }}
        nextColor={{ name: "Brass", path: "/colors/brass" }}
      />
    </div>
  );
};

export default PurplePage;
