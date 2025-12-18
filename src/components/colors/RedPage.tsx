import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const RedPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Red (Scarlet) - Messiah's Blood</h1>
              <p className="text-red-100 text-lg">The Sacrifice of the Innocent Victim</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-600 overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <h3 className="font-bold text-red-800 mb-3">Isaiah 1:16-18 (KJV)</h3>
                  <blockquote className="text-red-700 italic leading-relaxed">
                    "Wash you, make you clean; put away the evil of your doings from before mine eyes; cease to do evil;
                    Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.
                    Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow;
                    though they be red like crimson, they shall be as wool."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-8 border border-red-200">
              <h2 className="text-3xl font-bold text-red-800 mb-6">Spiritual Significance of Red (Scarlet)</h2>

              <div className="space-y-6 text-red-700 leading-relaxed">
                <p className="text-lg">
                  Red (scarlet) was always seen throughout the sanctuary, especially when the sacrifices were being conducted.
                  The color scarlet represents the blood of the victim, shed for the sinner.
                </p>

                <p className="text-lg">
                  When the person sees red, it symbolized the fact that sin causes the death of an innocent victim who did no sin.
                  The red symbolized the fact that Someone who did no sin, would have to die.
                </p>

                <p className="text-lg">
                  Real blood (the color is red) would have be shed by the Innocent Victim. Even though the blood was the color of scarlet,
                  it would cleanse the sinner thoroughly from his sins.
                </p>

                <p className="text-lg">
                  The red blood would cleanse the sin so much they would be as white as snow. How can the color red become white?
                  The Bible says, "Wash you make you clean; put away the evil of your doings... though your sins be as scarlet,
                  they shall be as white as snow; though they be red like crimson, they shall be as wool" (Isaiah 1:16,17).
                </p>

                <p className="text-lg">
                  There is a worm called the "scarlet worm" and it is where we get the term "scarlet" from.
                  The scarlet worm's eggs contain the red dye. This dye was leeched and used.
                </p>

                <div className="bg-red-100 rounded-lg p-6 mt-8 border-l-4 border-red-600">
                  <h3 className="text-2xl font-bold text-red-800 mb-3">Red (Scarlet) = Messiah's Blood</h3>
                  <p className="text-red-700 font-medium text-lg">
                    The color red (scarlet) throughout the sanctuary represents the blood of the innocent victim -
                    the Messiah's sacrifice that cleanses sin and transforms scarlet sins to be white as snow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorNavigation
        currentColor="Red"
        previousColor={{ name: "Dark", path: "/colors/dark" }}
        nextColor={{ name: "White", path: "/colors/white" }}
      />
    </div>
  );
};

export default RedPage;
