import React from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';

const BluePage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Blue - God's Law</h1>
              <p className="text-blue-100 text-lg">The Foundation of Divine Government</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden">
          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Exodus 24:9-10 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Then went up Moses, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel:
                    And they saw the God of Israel: and there was under his feet as it were a paved work
                    of a sapphire stone, and as it were the body of heaven in his clearness."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Revelation 4:6 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And before the throne there was a sea of glass like unto crystal: and in the midst
                    of the throne, and round about the throne, were four beasts full of eyes before and behind."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Revelation 15:2 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And I saw as it were a sea of glass mingled with fire: and them that had gotten
                    the victory over the beast, and over his image, and over his mark, and over the
                    number of his name, stand on the sea of glass, having the harps of God."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Numbers 15:38-41 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Speak unto the children of Israel, and bid them that they make them fringes in the
                    borders of their garments throughout their generations, and that they put upon the
                    fringe of the borders a ribband of blue..."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Ezekiel 1:26 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And above the firmament that was over their heads was the likeness of a throne,
                    as the appearance of a sapphire stone: and upon the likeness of the throne was
                    the likeness as the appearance of a man above upon it."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Spiritual Significance of Blue</h2>

              <div className="space-y-6 text-blue-700 leading-relaxed">
                <p className="text-lg">
                  While in vision on the Isle of Patmos, John the Revelator saw the same smooth blue surface
                  as did Moses, Aaron, Nadab, and Abihu. The Law is the foundation of God's government.
                </p>

                <p className="text-lg">
                  In the earthly sanctuary the tables of stone in the ark of the covenant were made of
                  sapphire stone to represent God's Law in Heaven.
                </p>

                <p className="text-lg">
                  Children of Israel had white garments with blue borders. This shows that the garment
                  of Christ's righteousness and the emblem of the law are bound together. One cannot be
                  removed without losing the other.
                </p>

                <p className="text-lg">
                  From outer space, blue is the color of the earth. The oceans, lakes and rivers are
                  blue when we look down. The sky and the heavens are blue on a clear day when we look up.
                </p>

                <p className="text-lg">
                  The representation of God's throne supported by the sapphire foundation shows that
                  His throne is based upon His law.
                </p>

                <p className="text-lg">
                  They had blue cuffs around their wrists and blue hems around their feet showing that
                  God's law should govern the works of their hands and keep them walking (living) in His law.
                </p>

                <div className="bg-blue-100 rounded-lg p-6 mt-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Blue = God's Law</h3>
                  <p className="text-blue-700 font-medium text-lg">
                    The color blue throughout the sanctuary represents the eternal, unchanging law of God
                    that serves as the foundation of His government and the standard of righteousness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ColorNavigation
        currentColor="Blue"
        nextColor={{ name: "Dark", path: "/colors/dark" }}
      />
    </div>
  );
};

export default BluePage;
