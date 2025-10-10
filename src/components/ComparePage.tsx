import React, { useState } from 'react';
import { ArrowLeft, GitCompare, Eye, Layers, Download, Share2, Maximize2, Info } from 'lucide-react';
import DonationBanner from './DonationBanner';
import SanctuaryVisualizer from './SanctuaryVisualizer';

interface SanctuaryData {
  id: string;
  name: string;
  period: string;
  materials: string;
  location: string;
  dimensions: string;
  outerCourtSize: string;
  holyPlaceSize: string;
  mostHolySize: string;
  colors: string;
  specialFeatures: string[];
}

const ComparePage = () => {
  const [selectedSanctuaries, setSelectedSanctuaries] = useState<string[]>(['wilderness', 'solomon']);
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [activeLayer, setActiveLayer] = useState('all');
  const [syncNavigation, setSyncNavigation] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [annotationMessage, setAnnotationMessage] = useState<string>('');

  const sanctuaryData: Record<string, SanctuaryData> = {
    wilderness: {
      id: 'wilderness',
      name: 'Wilderness Tabernacle',
      period: '1450-1000 BC',
      materials: 'Acacia Wood, Gold, Silver, Bronze, Linen',
      location: 'Portable (Desert)',
      dimensions: 'Court: 100x50 cubits, Tabernacle: 30x10x10 cubits',
      outerCourtSize: '100 x 50 cubits',
      holyPlaceSize: '20 x 10 x 10 cubits',
      mostHolySize: '10 x 10 x 10 cubits (perfect cube)',
      colors: 'Blue, Purple, Scarlet, White (Fine Linen)',
      specialFeatures: ['Portable design', 'Gold-covered acacia wood', 'Bronze altar', 'Bronze laver', '7-branched menorah']
    },
    solomon: {
      id: 'solomon',
      name: "Solomon's Temple",
      period: '1000-586 BC',
      materials: 'Cedar, Stone, Gold, Bronze',
      location: 'Jerusalem (Mount Moriah)',
      dimensions: 'Court: Expanded, Temple: 60x20x30 cubits',
      outerCourtSize: 'Multiple courts, significantly larger',
      holyPlaceSize: '40 x 20 x 30 cubits',
      mostHolySize: '20 x 20 x 20 cubits (perfect cube)',
      colors: 'Gold predominant, Cedar wood, Bronze',
      specialFeatures: ['Permanent structure', 'Jachin & Boaz pillars', 'Molten Sea', '10 golden lampstands', 'Ornate carvings']
    },
    zerubbabel: {
      id: 'zerubbabel',
      name: "Zerubbabel's Temple",
      period: '516-20 BC',
      materials: 'Stone, Wood, Limited gold',
      location: 'Jerusalem (Rebuilt)',
      dimensions: 'Similar to Solomon but less ornate',
      outerCourtSize: 'Restored courts',
      holyPlaceSize: 'Similar dimensions to Solomon',
      mostHolySize: '20 x 20 x 20 cubits (empty)',
      colors: 'Natural stone, Limited ornamentation',
      specialFeatures: ['Post-exile reconstruction', 'Simpler design', 'No Ark of Covenant', 'Persian influence', 'Less wealth']
    },
    herod: {
      id: 'herod',
      name: "Herod's Temple",
      period: '20 BC - 70 AD',
      materials: 'White marble, Gold, Stone',
      location: 'Jerusalem (Expanded Mount)',
      dimensions: 'Massive expansion, Temple Mount enlarged',
      outerCourtSize: 'Vast courtyards with porticos',
      holyPlaceSize: 'Similar to Solomon',
      mostHolySize: '20 x 20 x 20 cubits (empty)',
      colors: 'White marble, Gold overlay, Brilliant appearance',
      specialFeatures: ['Massive expansion', 'Royal Portico', 'Court of Gentiles', 'Beautiful Gate', 'Still no Ark']
    },
    heavenly: {
      id: 'heavenly',
      name: 'Heavenly Sanctuary',
      period: 'Eternal',
      materials: 'Spiritual/Eternal substances, Pure gold',
      location: 'Heaven (God\'s throne room)',
      dimensions: 'Beyond earthly measurements',
      outerCourtSize: 'Sea of Glass',
      holyPlaceSize: 'First apartment of heavenly temple',
      mostHolySize: 'Throne room of God',
      colors: 'Radiant light, Gold, Crystal, Precious stones',
      specialFeatures: ['True sanctuary', 'Ark present', 'Christ as High Priest', 'Pattern for earthly sanctuaries', 'Eternal']
    }
  };

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

  const handleSanctuarySelection = (sanctuaryId: string, checked: boolean) => {
    if (comparisonMode === 'side-by-side') {
      if (checked) {
        if (selectedSanctuaries.length < 2) {
          setSelectedSanctuaries([...selectedSanctuaries, sanctuaryId]);
        } else {
          setSelectedSanctuaries([selectedSanctuaries[1], sanctuaryId]);
        }
      } else {
        setSelectedSanctuaries(selectedSanctuaries.filter(id => id !== sanctuaryId));
      }
    } else if (comparisonMode === 'overlay') {
      if (checked) {
        if (selectedSanctuaries.length < 2) {
          setSelectedSanctuaries([...selectedSanctuaries, sanctuaryId]);
        } else {
          setSelectedSanctuaries([selectedSanctuaries[1], sanctuaryId]);
        }
      } else {
        setSelectedSanctuaries(selectedSanctuaries.filter(id => id !== sanctuaryId));
      }
    } else {
      if (checked) {
        setSelectedSanctuaries([...selectedSanctuaries, sanctuaryId].sort((a, b) => {
          const order = ['wilderness', 'solomon', 'zerubbabel', 'herod', 'heavenly'];
          return order.indexOf(a) - order.indexOf(b);
        }));
      } else {
        setSelectedSanctuaries(selectedSanctuaries.filter(id => id !== sanctuaryId));
      }
    }
  };

  const handleAnnotationClick = (message: string) => {
    setAnnotationMessage(message);
    setTimeout(() => setAnnotationMessage(''), 4000);
  };

  const getHistoricalChanges = () => {
    if (selectedSanctuaries.length < 2) return [];

    const changes = [];
    const sorted = [...selectedSanctuaries].sort((a, b) => {
      const order = ['wilderness', 'solomon', 'zerubbabel', 'herod', 'heavenly'];
      return order.indexOf(a) - order.indexOf(b);
    });

    for (let i = 0; i < sorted.length - 1; i++) {
      const from = sanctuaryData[sorted[i]];
      const to = sanctuaryData[sorted[i + 1]];

      changes.push({
        from: from.name,
        to: to.name,
        materialChange: `${from.materials} → ${to.materials}`,
        dimensionChange: `${from.dimensions} → ${to.dimensions}`,
        locationChange: `${from.location} → ${to.location}`,
        colorChange: `${from.colors} → ${to.colors}`,
        keyChanges: [
          `Materials: ${from.materials} changed to ${to.materials}`,
          `Layout: ${from.dimensions} evolved to ${to.dimensions}`,
          `Location: Moved from ${from.location} to ${to.location}`
        ]
      });
    }

    return changes;
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

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
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Select Sanctuaries</h3>
              <div className="space-y-2">
                {sanctuaries.map((sanctuary) => (
                  <label key={sanctuary.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedSanctuaries.includes(sanctuary.id)}
                      onChange={(e) => handleSanctuarySelection(sanctuary.id, e.target.checked)}
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

            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Focus Layer</h3>
              <select
                value={activeLayer}
                onChange={(e) => setActiveLayer(e.target.value)}
                className="w-full p-2 border border-sanctuary-silver rounded-lg text-sanctuary-purple"
              >
                {layers.map((layer) => (
                  <option key={layer.id} value={layer.id}>{layer.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-sanctuary-silver">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSyncNavigation(!syncNavigation)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  syncNavigation
                    ? 'bg-sanctuary-blue text-white'
                    : 'bg-sanctuary-silver text-sanctuary-purple'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Sync Navigation {syncNavigation ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showAnnotations
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-silver text-sanctuary-purple'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Annotations {showAnnotations ? 'ON' : 'OFF'}</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors" title="Download comparison">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors" title="Share comparison">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors" title="Fullscreen">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {annotationMessage && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center space-x-3 max-w-2xl">
            <Info className="w-5 h-5 text-sanctuary-gold" />
            <span>{annotationMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
          <div className="bg-sanctuary-purple text-white p-4">
            <h3 className="font-semibold">
              {comparisonMode === 'timeline'
                ? `Historical Timeline: ${selectedSanctuaries.length} Sanctuaries Selected`
                : `Comparing: ${selectedSanctuaries.slice(0, 2).map(id => sanctuaries.find(s => s.id === id)?.name).filter(Boolean).join(' vs ')}`}
            </h3>
          </div>

          {comparisonMode === 'side-by-side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {selectedSanctuaries.slice(0, 2).map((sanctuaryId, index) => {
                const sanctuary = sanctuaryData[sanctuaryId];
                return (
                  <div key={sanctuaryId} className="space-y-4">
                    <h4 className="text-xl font-semibold text-sanctuary-purple">{sanctuary?.name}</h4>

                    <div className="h-[500px] border-2 border-sanctuary-brass/30 rounded-lg overflow-hidden">
                      <SanctuaryVisualizer
                        sanctuaryId={sanctuaryId}
                        layer={activeLayer}
                        showAnnotations={showAnnotations}
                        onAnnotationClick={handleAnnotationClick}
                      />
                    </div>

                    <div className="bg-sanctuary-linen rounded-lg p-4 space-y-3">
                      <h5 className="font-semibold text-sanctuary-purple mb-3">Detailed Information</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass font-medium">Period:</span>
                          <span className="text-sanctuary-purple">{sanctuary?.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass font-medium">Materials:</span>
                          <span className="text-sanctuary-purple text-right">{sanctuary?.materials}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass font-medium">Location:</span>
                          <span className="text-sanctuary-purple">{sanctuary?.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sanctuary-brass font-medium">Colors:</span>
                          <span className="text-sanctuary-purple text-right">{sanctuary?.colors}</span>
                        </div>
                      </div>

                      {activeLayer === 'outer' && (
                        <div className="pt-3 border-t border-sanctuary-silver">
                          <span className="text-sanctuary-brass font-medium">Outer Court: </span>
                          <span className="text-sanctuary-purple">{sanctuary?.outerCourtSize}</span>
                        </div>
                      )}
                      {activeLayer === 'holy' && (
                        <div className="pt-3 border-t border-sanctuary-silver">
                          <span className="text-sanctuary-brass font-medium">Holy Place: </span>
                          <span className="text-sanctuary-purple">{sanctuary?.holyPlaceSize}</span>
                        </div>
                      )}
                      {activeLayer === 'most-holy' && (
                        <div className="pt-3 border-t border-sanctuary-silver">
                          <span className="text-sanctuary-brass font-medium">Most Holy: </span>
                          <span className="text-sanctuary-purple">{sanctuary?.mostHolySize}</span>
                        </div>
                      )}
                    </div>

                    {sanctuary?.specialFeatures && (
                      <div className="bg-white rounded-lg p-4 border border-sanctuary-gold/30">
                        <h5 className="font-semibold text-sanctuary-purple mb-2">Special Features</h5>
                        <ul className="space-y-1">
                          {sanctuary.specialFeatures.map((feature, i) => (
                            <li key={i} className="text-sm text-sanctuary-brass flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 bg-sanctuary-gold rounded-full"></span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {comparisonMode === 'overlay' && selectedSanctuaries.length >= 2 && (
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sanctuary-purple font-medium mb-2">
                  Overlay Opacity: {overlayOpacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-sanctuary-brass mt-1">
                  <span>{sanctuaryData[selectedSanctuaries[0]]?.name}</span>
                  <span>{sanctuaryData[selectedSanctuaries[1]]?.name}</span>
                </div>
              </div>

              <div className="relative h-[600px] border-2 border-sanctuary-brass/30 rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                  <SanctuaryVisualizer
                    sanctuaryId={selectedSanctuaries[0]}
                    layer={activeLayer}
                    showAnnotations={false}
                    onAnnotationClick={handleAnnotationClick}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ opacity: overlayOpacity / 100 }}
                >
                  <SanctuaryVisualizer
                    sanctuaryId={selectedSanctuaries[1]}
                    layer={activeLayer}
                    showAnnotations={showAnnotations}
                    onAnnotationClick={handleAnnotationClick}
                  />
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                {selectedSanctuaries.slice(0, 2).map((sanctuaryId) => {
                  const sanctuary = sanctuaryData[sanctuaryId];
                  return (
                    <div key={sanctuaryId} className="bg-sanctuary-linen rounded-lg p-4">
                      <h5 className="font-semibold text-sanctuary-purple mb-3">{sanctuary?.name}</h5>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-sanctuary-brass">Dimensions:</span> {sanctuary?.dimensions}</div>
                        <div><span className="text-sanctuary-brass">Materials:</span> {sanctuary?.materials}</div>
                        <div><span className="text-sanctuary-brass">Colors:</span> {sanctuary?.colors}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {comparisonMode === 'timeline' && (
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-sanctuary-brass"></div>
                <div className="space-y-12">
                  {selectedSanctuaries.map((sanctuaryId, index) => {
                    const sanctuary = sanctuaryData[sanctuaryId];
                    const isLeft = index % 2 === 0;
                    return (
                      <div key={sanctuaryId} className={`relative flex items-start ${isLeft ? 'justify-start' : 'justify-end'}`}>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-sanctuary-gold rounded-full border-4 border-white z-10 flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-sanctuary-purple rounded-full"></div>
                        </div>
                        <div className={`w-5/12 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                          <div className="bg-white rounded-lg p-6 shadow-lg border border-sanctuary-gold/30">
                            <h4 className="font-bold text-xl text-sanctuary-purple mb-2">{sanctuary?.name}</h4>
                            <p className="text-sanctuary-brass text-sm mb-4">{sanctuary?.period}</p>

                            <div className="h-48 mb-4 border-2 border-sanctuary-brass/30 rounded-lg overflow-hidden">
                              <SanctuaryVisualizer
                                sanctuaryId={sanctuaryId}
                                layer={activeLayer}
                                showAnnotations={false}
                                onAnnotationClick={handleAnnotationClick}
                              />
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="bg-sanctuary-linen p-2 rounded">
                                <span className="font-semibold text-sanctuary-purple">Materials: </span>
                                <span className="text-sanctuary-brass">{sanctuary?.materials}</span>
                              </div>
                              <div className="bg-sanctuary-linen p-2 rounded">
                                <span className="font-semibold text-sanctuary-purple">Dimensions: </span>
                                <span className="text-sanctuary-brass">{sanctuary?.dimensions}</span>
                              </div>
                              <div className="bg-sanctuary-linen p-2 rounded">
                                <span className="font-semibold text-sanctuary-purple">Colors: </span>
                                <span className="text-sanctuary-brass">{sanctuary?.colors}</span>
                              </div>
                              <div className="bg-sanctuary-linen p-2 rounded">
                                <span className="font-semibold text-sanctuary-purple">Location: </span>
                                <span className="text-sanctuary-brass">{sanctuary?.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {getHistoricalChanges().length > 0 && (
                <div className="mt-12 bg-white rounded-lg p-6 border border-sanctuary-gold/30">
                  <h4 className="text-xl font-bold text-sanctuary-purple mb-6">Historical Changes & Evolution</h4>
                  <div className="space-y-6">
                    {getHistoricalChanges().map((change, index) => (
                      <div key={index} className="bg-sanctuary-linen rounded-lg p-4">
                        <h5 className="font-semibold text-sanctuary-purple mb-3">
                          {change.from} → {change.to}
                        </h5>
                        <div className="space-y-2 text-sm">
                          {change.keyChanges.map((keyChange, i) => (
                            <div key={i} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-1.5"></span>
                              <span className="text-sanctuary-brass flex-1">{keyChange}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Structural Analysis</h3>
            <div className="space-y-3">
              {selectedSanctuaries.slice(0, 2).map((sanctuaryId) => {
                const sanctuary = sanctuaryData[sanctuaryId];
                return (
                  <div key={sanctuaryId} className="p-3 bg-sanctuary-linen rounded-lg">
                    <div className="font-semibold text-sanctuary-purple mb-2">{sanctuary?.name}</div>
                    <div className="text-sm text-sanctuary-brass space-y-1">
                      <div>Outer Court: {sanctuary?.outerCourtSize}</div>
                      <div>Holy Place: {sanctuary?.holyPlaceSize}</div>
                      <div>Most Holy: {sanctuary?.mostHolySize}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Theological Significance</h3>
            <div className="space-y-4">
              <div className="p-3 bg-sanctuary-linen rounded-lg">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Continuity of Purpose</h4>
                <p className="text-sanctuary-brass text-sm">All sanctuaries maintain the same basic tripartite structure and symbolic meaning representing humanity's journey to God.</p>
              </div>
              <div className="p-3 bg-sanctuary-linen rounded-lg">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Progressive Revelation</h4>
                <p className="text-sanctuary-brass text-sm">Each sanctuary reveals deeper aspects of God's plan of salvation, culminating in the heavenly sanctuary where Christ ministers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
