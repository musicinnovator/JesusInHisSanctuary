import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Eye, Book, Users, ToggleLeft, ToggleRight } from 'lucide-react';

const SymbolismPage = () => {
  const [selectedFurnishing, setSelectedFurnishing] = useState('');
  const [theologicalView, setTheologicalView] = useState('adventist');
  const [selectedAuthor, setSelectedAuthor] = useState('all');

  const furnishings = [
    {
      id: 'ark',
      name: 'Ark of the Covenant',
      location: 'Most Holy Place',
      hebrew: 'God\'s throne and law',
      adventist: 'Investigative judgment and divine law'
    },
    {
      id: 'lampstand',
      name: 'Golden Lampstand',
      location: 'Holy Place',
      hebrew: 'Divine light and wisdom',
      adventist: 'Christ as the light of the world and the Holy Spirit'
    },
    {
      id: 'table',
      name: 'Table of Showbread',
      location: 'Holy Place',
      hebrew: 'God\'s provision and presence',
      adventist: 'Christ as the bread of life'
    },
    {
      id: 'incense-altar',
      name: 'Altar of Incense',
      location: 'Holy Place',
      hebrew: 'Prayers ascending to God',
      adventist: 'Christ\'s intercession in the heavenly sanctuary'
    },
    {
      id: 'bronze-altar',
      name: 'Bronze Altar',
      location: 'Outer Court',
      hebrew: 'Sacrifice and atonement',
      adventist: 'Christ\'s sacrifice on Calvary'
    },
    {
      id: 'laver',
      name: 'Bronze Laver',
      location: 'Outer Court',
      hebrew: 'Cleansing and purification',
      adventist: 'Baptism and sanctification'
    }
  ];

  const authors = [
    { id: 'all', name: 'All Authors' },
    { id: 'white', name: 'Ellen G. White' },
    { id: 'andreasen', name: 'M.L. Andreasen' },
    { id: 'haskell', name: 'S.N. Haskell' },
    { id: 'evans', name: 'Merrill Evans' },
    { id: 'gilbert', name: 'F.C. Gilbert' },
    { id: 'hardinge', name: 'Leslie Hardinge' }
  ];

  const getQuoteByAuthor = (furnishingId: string, authorId: string) => {
    const quotes = {
      ark: {
        white: "The ark of God's testament is in His temple in heaven. In that ark is the original of those tables of stone which were written upon by the finger of God.",
        andreasen: "The ark represents the throne of God, and the law within it represents the foundation of His government.",
        haskell: "The ark was the most sacred object in the sanctuary, representing God's presence among His people."
      },
      lampstand: {
        white: "The golden candlestick shed its light continually in the holy place, as Christ, our Intercessor, by His Spirit sheds light continually upon His people.",
        andreasen: "The seven lamps represent the fullness of the Spirit's illumination in the believer's life.",
        gilbert: "The lampstand symbolizes Christ as the light of the world, dispelling the darkness of sin."
      }
    };
    
    return quotes[furnishingId]?.[authorId] || "Quote not available for this combination.";
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-scarlet to-red-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Sparkles className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Explore Symbolism Mode</h1>
              <p className="text-red-100 text-lg">Discover the theological meaning behind every sanctuary furnishing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theological View Toggle */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Theological Perspective</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setTheologicalView('hebrew')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    theologicalView === 'hebrew'
                      ? 'bg-sanctuary-blue text-white'
                      : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-sanctuary-blue/10'
                  }`}
                >
                  <span>Traditional Hebrew</span>
                  {theologicalView === 'hebrew' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setTheologicalView('adventist')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    theologicalView === 'adventist'
                      ? 'bg-sanctuary-purple text-white'
                      : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-sanctuary-purple/10'
                  }`}
                >
                  <span>Seventh-day Adventist</span>
                  {theologicalView === 'adventist' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Author Filter */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Author Perspective</span>
              </h3>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-purple"
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>

            {/* Furnishing List */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Sanctuary Furnishings</h3>
              <div className="space-y-2">
                {furnishings.map((furnishing) => (
                  <button
                    key={furnishing.id}
                    onClick={() => setSelectedFurnishing(furnishing.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFurnishing === furnishing.id
                        ? 'bg-sanctuary-scarlet text-white'
                        : 'bg-sanctuary-linen hover:bg-sanctuary-scarlet/10 text-sanctuary-purple'
                    }`}
                  >
                    <div className="font-medium">{furnishing.name}</div>
                    <div className="text-sm opacity-80">{furnishing.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* 3D Model Viewer */}
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-sanctuary-purple text-white p-4">
                <h3 className="font-semibold">Interactive Sanctuary Model - Symbolism Mode</h3>
              </div>
              
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-sanctuary-linen to-sanctuary-linen-dark flex items-center justify-center">
                <div className="text-center text-sanctuary-brass">
                  <Eye className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-xl">3D Sanctuary Model</p>
                  <p className="text-base">Click on furnishings to explore their symbolism</p>
                  {selectedFurnishing && (
                    <div className="mt-4 p-3 bg-sanctuary-scarlet/20 rounded-lg">
                      <p className="text-sanctuary-purple font-medium">
                        Selected: {furnishings.find(f => f.id === selectedFurnishing)?.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Hotspots */}
                {selectedFurnishing && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-sanctuary-scarlet rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-sanctuary-scarlet text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                      {furnishings.find(f => f.id === selectedFurnishing)?.name}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-sanctuary-linen p-4 text-center text-sm text-sanctuary-brass">
                Hover over furnishings to reveal symbolic meanings • Click for detailed analysis
              </div>
            </div>

            {/* Symbolism Details */}
            {selectedFurnishing && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-6 h-6 text-sanctuary-scarlet" />
                  <h3 className="text-2xl font-bold text-sanctuary-purple">
                    {furnishings.find(f => f.id === selectedFurnishing)?.name}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-blue mb-3">Traditional Hebrew View</h4>
                    <p className="text-sanctuary-purple">
                      {furnishings.find(f => f.id === selectedFurnishing)?.hebrew}
                    </p>
                  </div>
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-purple mb-3">Seventh-day Adventist Theology</h4>
                    <p className="text-sanctuary-purple">
                      {furnishings.find(f => f.id === selectedFurnishing)?.adventist}
                    </p>
                  </div>
                </div>

                {/* Scholar Quotes */}
                <div className="bg-gradient-to-r from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
                  <h4 className="font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                    <Book className="w-5 h-5" />
                    <span>Scholar Insights</span>
                  </h4>
                  
                  {selectedAuthor !== 'all' ? (
                    <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-scarlet">
                      <h5 className="font-semibold text-sanctuary-purple mb-2">
                        {authors.find(a => a.id === selectedAuthor)?.name}
                      </h5>
                      <blockquote className="text-sanctuary-brass italic">
                        "{getQuoteByAuthor(selectedFurnishing, selectedAuthor)}"
                      </blockquote>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-blue">
                        <h5 className="font-semibold text-sanctuary-purple mb-2">Ellen G. White</h5>
                        <blockquote className="text-sanctuary-brass italic">
                          "{getQuoteByAuthor(selectedFurnishing, 'white')}"
                        </blockquote>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-gold">
                        <h5 className="font-semibold text-sanctuary-purple mb-2">M.L. Andreasen</h5>
                        <blockquote className="text-sanctuary-brass italic">
                          "{getQuoteByAuthor(selectedFurnishing, 'andreasen')}"
                        </blockquote>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scripture References */}
                <div className="mt-6 bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-3">Related Scripture References</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-sanctuary-blue text-white px-3 py-1 rounded-full text-sm">Exodus 25:10-22</span>
                    <span className="bg-sanctuary-blue text-white px-3 py-1 rounded-full text-sm">Hebrews 9:4</span>
                    <span className="bg-sanctuary-blue text-white px-3 py-1 rounded-full text-sm">Revelation 11:19</span>
                    <span className="bg-sanctuary-blue text-white px-3 py-1 rounded-full text-sm">1 Kings 8:9</span>
                  </div>
                </div>
              </div>
            )}

            {/* Comparative Analysis */}
            {selectedFurnishing && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Comparative Theological Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sanctuary-silver">
                        <th className="text-left py-3 px-4 font-semibold text-sanctuary-purple">Perspective</th>
                        <th className="text-left py-3 px-4 font-semibold text-sanctuary-purple">Symbolic Meaning</th>
                        <th className="text-left py-3 px-4 font-semibold text-sanctuary-purple">Application</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-sanctuary-silver/50">
                        <td className="py-3 px-4 font-medium text-sanctuary-blue">Traditional Hebrew</td>
                        <td className="py-3 px-4 text-sanctuary-brass">
                          {furnishings.find(f => f.id === selectedFurnishing)?.hebrew}
                        </td>
                        <td className="py-3 px-4 text-sanctuary-brass">Historical worship practices</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-sanctuary-purple">Adventist Theology</td>
                        <td className="py-3 px-4 text-sanctuary-brass">
                          {furnishings.find(f => f.id === selectedFurnishing)?.adventist}
                        </td>
                        <td className="py-3 px-4 text-sanctuary-brass">Prophetic and soteriological implications</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolismPage;