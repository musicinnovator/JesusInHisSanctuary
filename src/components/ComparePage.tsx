import React, { useState } from 'react';
import { ArrowLeft, GitCompare, Eye, Layers, Download, Share2, Maximize2 } from 'lucide-react';
import DonationBanner from './DonationBanner';

const ComparePage = () => {
  const [selectedSanctuaries, setSelectedSanctuaries] = useState(['wilderness', 'solomon']);
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [activeLayer, setActiveLayer] = useState('all');

  const sanctuaries = [
    { id: 'wilderness', name: 'Wilderness Tabernacle', period: '1450-1000 BC' },
    { id: 'solomon', name: "Solomon's Temple", period: '1000-586 BC' },
    { id: 'zerubbabel', name: "Zerubbabel's Temple", period: '516-20 BC' },
    { id: 'herod', name: "Herod's Temple", period: '20 BC - 70 AD' },
    { id: 'heavenly', name: 'Heavenly Sanctuary', period: 'Eternal' }
  ];

  const layers = [
    { id: 'all', name: 'Complete Structure' },
    { id: 'outer', name: 'Outer Court' },
    { id: 'holy', name: 'Holy Place' },
    { id: 'most-holy', name: 'Most Holy Place' },
    { id: 'furnishings', name: 'Sacred Furnishings' }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-sanctuary-purple-dark text-white py-8">
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
            <GitCompare className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Compare Mode: Side-by-Side Analysis</h1>
              <p className="text-sanctuary-linen text-lg">Synchronized navigation and detailed structural comparisons</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sanctuary Selection */}
            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Select Sanctuaries</h3>
              <div className="space-y-2">
                {sanctuaries.map((sanctuary) => (
                  <label key={sanctuary.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedSanctuaries.includes(sanctuary.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSanctuaries([...selectedSanctuaries, sanctuary.id]);
                        } else {
                          setSelectedSanctuaries(selectedSanctuaries.filter(id => id !== sanctuary.id));
                        }
                      }}
                      className="rounded border-sanctuary-silver"
                    />
                    <div>
                      <div className="font-medium text-sanctuary-purple">{sanctuary.name}</div>
                      <div className="text-sm text-sanctuary-brass">{sanctuary.period}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Comparison Mode */}
            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Comparison Mode</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="mode"
                    value="side-by-side"
                    checked={comparisonMode === 'side-by-side'}
                    onChange={(e) => setComparisonMode(e.target.value)}
                    className="text-sanctuary-purple"
                  />
                  <span className="text-sanctuary-purple">Side-by-Side</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="mode"
                    value="overlay"
                    checked={comparisonMode === 'overlay'}
                    onChange={(e) => setComparisonMode(e.target.value)}
                    className="text-sanctuary-purple"
                  />
                  <span className="text-sanctuary-purple">Overlay Mode</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="mode"
                    value="timeline"
                    checked={comparisonMode === 'timeline'}
                    onChange={(e) => setComparisonMode(e.target.value)}
                    className="text-sanctuary-purple"
                  />
                  <span className="text-sanctuary-purple">Historical Timeline</span>
                </label>
              </div>
            </div>

            {/* Layer Controls */}
            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Focus Layer</h3>
              <select
                value={activeLayer}
                onChange={(e) => setActiveLayer(e.target.value)}
                className="w-full p-2 border border-sanctuary-silver rounded-lg"
              >
                {layers.map((layer) => (
                  <option key={layer.id} value={layer.id}>{layer.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-sanctuary-silver">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-blue text-white rounded-lg hover:bg-sanctuary-blue-dark transition-colors">
                <Eye className="w-4 h-4" />
                <span>Sync Navigation</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-gold text-sanctuary-purple rounded-lg hover:bg-sanctuary-gold-dark transition-colors">
                <Layers className="w-4 h-4" />
                <span>Toggle Annotations</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Viewer */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
          <div className="bg-sanctuary-purple text-white p-4">
            <h3 className="font-semibold">Comparing: {selectedSanctuaries.map(id => sanctuaries.find(s => s.id === id)?.name).join(' vs ')}</h3>
          </div>

          {comparisonMode === 'side-by-side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {selectedSanctuaries.slice(0, 2).map((sanctuaryId, index) => {
                const sanctuary = sanctuaries.find(s => s.id === sanctuaryId);
                return (
                  <div key={sanctuaryId} className="space-y-4">
                    <h4 className="text-lg font-semibold text-sanctuary-purple">{sanctuary?.name}</h4>
                    <div className="h-96 bg-gradient-to-br from-sanctuary-linen to-sanctuary-linen-dark rounded-lg border-2 border-sanctuary-brass/30 flex items-center justify-center">
                      <div className="text-center text-sanctuary-brass">
                        <Eye className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg">3D Model Viewer</p>
                        <p className="text-sm">{sanctuary?.name}</p>
                      </div>
                    </div>
                    
                    {/* Comparison Details */}
                    <div className="bg-sanctuary-linen rounded-lg p-4">
                      <h5 className="font-semibold text-sanctuary-purple mb-3">Key Features</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass">Period:</span>
                          <span className="text-sanctuary-purple font-medium">{sanctuary?.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass">Material:</span>
                          <span className="text-sanctuary-purple font-medium">
                            {sanctuaryId === 'wilderness' ? 'Acacia Wood, Gold' : 'Stone, Cedar, Gold'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass">Location:</span>
                          <span className="text-sanctuary-purple font-medium">
                            {sanctuaryId === 'wilderness' ? 'Portable' : 'Jerusalem'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {comparisonMode === 'timeline' && (
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-sanctuary-brass"></div>
                <div className="space-y-8">
                  {selectedSanctuaries.map((sanctuaryId, index) => {
                    const sanctuary = sanctuaries.find(s => s.id === sanctuaryId);
                    return (
                      <div key={sanctuaryId} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sanctuary-gold rounded-full border-4 border-white z-10`}></div>
                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className="bg-white rounded-lg p-4 shadow-md border border-sanctuary-silver">
                            <h4 className="font-semibold text-sanctuary-purple">{sanctuary?.name}</h4>
                            <p className="text-sanctuary-brass text-sm">{sanctuary?.period}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Tools */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Structural Differences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg">
                <span className="text-sanctuary-purple font-medium">Outer Court Size</span>
                <span className="text-sanctuary-brass">Varies significantly</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg">
                <span className="text-sanctuary-purple font-medium">Construction Material</span>
                <span className="text-sanctuary-brass">Wood vs Stone</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg">
                <span className="text-sanctuary-purple font-medium">Portability</span>
                <span className="text-sanctuary-brass">Mobile vs Permanent</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Theological Significance</h3>
            <div className="space-y-4">
              <div className="p-3 bg-sanctuary-linen rounded-lg">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Continuity of Purpose</h4>
                <p className="text-sanctuary-brass text-sm">All sanctuaries maintain the same basic tripartite structure and symbolic meaning</p>
              </div>
              <div className="p-3 bg-sanctuary-linen rounded-lg">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Progressive Revelation</h4>
                <p className="text-sanctuary-brass text-sm">Each sanctuary reveals deeper aspects of God's plan of salvation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;