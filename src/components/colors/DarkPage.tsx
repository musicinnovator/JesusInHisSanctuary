import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const DarkPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Dark - Humanity</h1>
              <p className="text-gray-100 text-lg">The Veiling of Divine Glory</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-900 overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Isaiah 53:2 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "For he shall grow up before him as a tender plant, and as a root out of a dry ground:
                    he hath no form nor comeliness; and when we shall see him, there is no beauty that we should desire him."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Isaiah 60:2 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "For, behold, the darkness shall cover the earth, and gross darkness the people:
                    but the LORD shall arise upon thee, and his glory shall be seen upon thee."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">1 John 1:5 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "This then is the message which we have heard of him, and declare unto you,
                    that God is light, and in him is no darkness at all."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Exodus 25:8 (KJV)</h3>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "And let them make me a sanctuary; that I may dwell among them."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Spiritual Significance of Dark</h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  There was no beauty in Christ's appearance. He wasn't given any appearance that drew men to Him.
                  His outward form was that of a normal man.
                </p>

                <p className="text-lg">
                  His covering of humanity veiled the brightness of His Righteousness that we might endure the
                  Presence of the Pure God among men.
                </p>

                <p className="text-lg">
                  In order for God's command to Israel to "make Me a Sanctuary that I may dwell among them (Exodus 25:8)",
                  Jesus, our Sanctuary, had to have on humanity.
                </p>

                <p className="text-lg">
                  For him to be "one with us", that is, "Emmanuel", He had to take on the darkness of human flesh.
                  Why? The Bible says in 1 John 1:5, "that God is light, and in him is no darkness at all."
                </p>

                <p className="text-lg">
                  This color was the color of badger's skin that covered the outside of the Tabernacle
                  (the Holy Place and Most Holy Place Compartments). The Dark color is what the people saw
                  when they would look at the Tabernacle itself.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-800">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Dark = Humanity</h3>
                  <p className="text-gray-700 font-medium text-lg">
                    The color dark throughout the sanctuary represents humanity - the veiling of divine glory
                    so that mortal beings could endure the presence of the pure God among them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Dark"
        previousColor={{ name: "Blue", path: "/colors/blue" }}
        nextColor={{ name: "Red", path: "/colors/red" }}
      />
    </div>
  );
};

export default DarkPage;
