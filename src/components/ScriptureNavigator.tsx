import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, Eye, Link, Languages } from 'lucide-react';
import DonationBanner from './DonationBanner';

const ScriptureNavigator = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('KJV');
  const [selectedPassage, setSelectedPassage] = useState('');
  const [highlightedElement, setHighlightedElement] = useState('');

  const translations = ['KJV', 'NIV', 'ESV', 'NASB', 'NKJV'];
  
  const sanctuaryPassages = [
    { ref: 'Exodus 25:10-22', title: 'The Ark of the Covenant', element: 'ark' },
    { ref: 'Exodus 25:23-30', title: 'Table of Showbread', element: 'table' },
    { ref: 'Exodus 25:31-40', title: 'Golden Lampstand', element: 'lampstand' },
    { ref: 'Exodus 27:1-8', title: 'Bronze Altar', element: 'altar' },
    { ref: 'Exodus 30:1-10', title: 'Altar of Incense', element: 'incense-altar' },
    { ref: 'Exodus 30:17-21', title: 'Bronze Laver', element: 'laver' },
    { ref: '1 Kings 6:1-38', title: 'Solomon\'s Temple', element: 'temple' },
    { ref: 'Hebrews 9:1-28', title: 'Heavenly Sanctuary', element: 'heavenly' }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-sanctuary-gold text-sanctuary-purple py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpen className="w-12 h-12 text-sanctuary-brass" />
            <div>
              <h1 className="text-4xl font-bold">Scripture Navigator</h1>
              <p className="text-sanctuary-brass text-lg">Linking Biblical Texts to 3D Sanctuary Models</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scripture Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Translation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span>Bible Translation</span>
              </h3>
              <select
                value={selectedTranslation}
                onChange={(e) => setSelectedTranslation(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-gold"
              >
                {translations.map((translation) => (
                  <option key={translation} value={translation}>{translation}</option>
                ))}
              </select>
            </div>

            {/* Passage Selector */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Select Passage</span>
              </h3>
              <div className="space-y-2">
                {sanctuaryPassages.map((passage) => (
                  <button
                    key={passage.ref}
                    onClick={() => {
                      setSelectedPassage(passage.ref);
                      setHighlightedElement(passage.element);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPassage === passage.ref
                        ? 'bg-sanctuary-gold text-sanctuary-purple'
                        : 'bg-sanctuary-linen hover:bg-sanctuary-gold/20 text-sanctuary-purple'
                    }`}
                  >
                    <div className="font-medium">{passage.ref}</div>
                    <div className="text-sm opacity-80">{passage.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scripture Text */}
            {selectedPassage && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">{selectedPassage} ({selectedTranslation})</h3>
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  {selectedPassage === 'Exodus 25:10-22' && (
                    <div className="space-y-3 text-sanctuary-purple">
                      <p><strong>10</strong> And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof.</p>
                      <p><strong>11</strong> And thou shalt overlay it with pure gold, within and without shalt thou overlay it, and shalt make upon it a crown of gold round about.</p>
                      <p><strong>12</strong>And thou shalt cast four rings of gold for it, and put them in the four corners thereof; and two rings shall be in the one side of it, and two rings in the other side of it.</p>
                      <p><strong>13</strong>And thou shalt make staves of shittim wood, and overlay them with gold.</p>
                      <p><strong>14</strong>And thou shalt put the staves into the rings by the sides of the ark, that the ark may be borne with them.</p>
                      <p><strong>15</strong>The staves shall be in the rings of the ark: they shall not be taken from it.</p>
                      <p><strong>16</strong>And thou shalt put into the ark the testimony which I shall give thee.</p>
                      <p><strong>17</strong> And thou shalt make a mercy seat of pure gold: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof.</p>
                      <p><strong>18</strong>And thou shalt make two cherubims of gold, of beaten work shalt thou make them, in the two ends of the mercy seat.</p>
                      <p><strong>19</strong>And make one cherub on the one end, and the other cherub on the other end: even of the mercy seat shall ye make the cherubims on the two ends thereof.</p>
                      <p><strong>20</strong>And the cherubims shall stretch forth their wings on high, covering the mercy seat with their wings, and their faces shall look one to another; toward the mercy seat shall the faces of the cherubims be.</p>
                      <p><strong>21</strong>And thou shalt put the mercy seat above upon the ark; and in the ark thou shalt put the testimony that I shall give thee.</p>
                      <p><strong>22</strong> And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel.</p>
                    </div>
                  )}
                  {selectedPassage === 'Exodus 25:23-30' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>23</strong>Thou shalt also make a table of shittim wood: two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof.</p>
                        <p><strong>24</strong>And thou shalt overlay it with pure gold, and make thereto a crown of gold round about.</p>
                        <p><strong>25</strong>And thou shalt make unto it a border of an hand breadth round about, and thou shalt make a golden crown to the border thereof round about.</p>
                        <p><strong>26</strong>And thou shalt make for it four rings of gold, and put the rings in the four corners that are on the four feet thereof. </p>
                        <p><strong>27</strong>Over against the border shall the rings be for places of the staves to bear the table. </p>
                        <p><strong>28</strong>And thou shalt make the staves of shittim wood, and overlay them with gold, that the table may be borne with them.</p>
                        <p><strong>29</strong>And thou shalt make the dishes thereof, and spoons thereof, and covers thereof, and bowls thereof, to cover withal: of pure gold shalt thou make them.</p>
                        <p><strong>30</strong>And thou shalt set upon the table shewbread before me alway.</p>
                      </div>
                  )}
                  {selectedPassage === 'Exodus 25:31-40' && (
                    <div className="space-y-3 text-sanctuary-purple">
                      <p><strong>31</strong> And thou shalt make a candlestick of pure gold: of beaten work shall the candlestick be made: his shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same.</p>
                      <p><strong>32</strong> And six branches shall come out of the sides of it; three branches of the candlestick out of the one side, and three branches of the candlestick out of the other side:</p>
                      <p><strong>33</strong>Three bowls made like unto almonds, with a knop and a flower in one branch; and three bowls made like almonds in the other branch, with a knop and a flower: so in the six branches that come out of the candlestick.</p>
                      <p><strong>34</strong>And in the candlestick shall be four bowls made like unto almonds, with their knops and their flowers.</p>
                      <p><strong>35</strong>And there shall be a knop under two branches of the same, and a knop under two branches of the same, and a knop under two branches of the same, according to the six branches that proceed out of the candlestick.</p>
                      <p><strong>36</strong>Their knops and their branches shall be of the same: all it shall be one beaten work of pure gold.</p>
                      <p><strong>37</strong> And thou shalt make the seven lamps thereof: and they shall light the lamps thereof, that they may give light over against it.</p>
                      <p><strong>38</strong>And the tongs thereof, and the snuffdishes thereof, shall be of pure gold.</p>
                      <p><strong>39</strong>Of a talent of pure gold shall he make it, with all these vessels.</p>
                      <p><strong>40</strong>And look that thou make them after their pattern, which was shewed thee in the mount.
                      </p>
                    </div>
                  )}
                  {selectedPassage === 'Exodus 25:23-30' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>31</strong> And thou shalt make a candlestick of pure gold: of beaten work shall the candlestick be made: his shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same.</p>
                        <p><strong>32</strong> And six branches shall come out of the sides of it; three branches of the candlestick out of the one side, and three branches of the candlestick out of the other side:</p>
                        <p><strong>37</strong> And thou shalt make the seven lamps thereof: and they shall light the lamps thereof, that they may give light over against it.</p>
                      </div>
                  )}
                  {!selectedPassage.startsWith('Exodus 25') && (
                    <p className="text-sanctuary-purple italic">Scripture text will appear here when you select a passage...</p>
                  )}
                </div>

                {/* Cross References */}
                <div className="mt-4 pt-4 border-t border-sanctuary-silver">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Cross References</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Hebrews 9:4</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Revelation 11:19</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">1 Kings 8:9</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-sanctuary-purple text-white p-4 flex items-center justify-between">
                <h3 className="font-semibold">Interactive Sanctuary Model</h3>
                <div className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span className="text-sm">Scripture-Linked Elements</span>
                </div>
              </div>

              <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-sanctuary-linen to-sanctuary-linen-dark flex items-center justify-center">
                {/* Model Placeholder */}
                <div className="text-center text-sanctuary-brass">
                  <Eye className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-xl">3D Sanctuary Model</p>
                  <p className="text-base">Click scripture passages to highlight elements</p>
                  {highlightedElement && (
                    <div className="mt-4 p-3 bg-sanctuary-gold/20 rounded-lg">
                      <p className="text-sanctuary-purple font-medium">
                        Highlighting: {sanctuaryPassages.find(p => p.element === highlightedElement)?.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Hotspots */}
                {highlightedElement === 'ark' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-sanctuary-gold rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Ark of the Covenant
                    </div>
                  </div>
                )}

                {highlightedElement === 'lampstand' && (
                  <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-sanctuary-gold rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Golden Lampstand
                    </div>
                  </div>
                )}
              </div>

              {/* Model Controls */}
              <div className="bg-sanctuary-linen p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="px-3 py-2 bg-sanctuary-blue text-white rounded-lg text-sm hover:bg-sanctuary-blue-dark transition-colors">
                    Reset View
                  </button>
                  <button className="px-3 py-2 bg-sanctuary-gold text-sanctuary-purple rounded-lg text-sm hover:bg-sanctuary-gold-dark transition-colors">
                    Full Screen
                  </button>
                </div>
                <div className="text-sm text-sanctuary-brass">
                  Use mouse to rotate • Scroll to zoom • Click elements for details
                </div>
              </div>
            </div>

            {/* Word Study Panel */}
            {selectedPassage && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Hebrew/Greek Word Study</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-purple mb-2">Key Hebrew Words</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sanctuary-blue">אָרוֹן (aron)</span>
                        <p className="text-sm text-sanctuary-brass">Ark, chest, coffin - Strong's H727</p>
                      </div>
                      <div>
                        <span className="font-medium text-sanctuary-blue">כַּפֹּרֶת (kapporet)</span>
                        <p className="text-sm text-sanctuary-brass">Mercy seat, atonement cover - Strong's H3727</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-purple mb-2">Theological Significance</h4>
                    <p className="text-sm text-sanctuary-brass">
                      The ark represents God's throne on earth, where His presence dwells among His people. 
                      The mercy seat symbolizes the place where divine justice and mercy meet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptureNavigator;