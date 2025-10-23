import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Book, Layers, Info, Eye, ChevronRight } from 'lucide-react';
import DonationBanner from './DonationBanner';
import BabylonScene from './BabylonScene';
import { useSanctuaryData } from '../hooks/useSanctuaryData';
import { SanctuaryComponent } from '../types/sanctuary';

const EnhancedSanctuaryViewer = () => {
  const [selectedModelId, setSelectedModelId] = useState('tabernacle');
  const [selectedComponent, setSelectedComponent] = useState<SanctuaryComponent | null>(null);
  const [showScripture, setShowScripture] = useState(false);

  const { data: sanctuaryData, loading, error } = useSanctuaryData(selectedModelId);

  const modelOptions = [
    { id: 'tabernacle', name: 'Wilderness Tabernacle', color: 'from-amber-600 to-orange-700' },
    { id: 'solomon', name: "Solomon's Temple", color: 'from-blue-600 to-indigo-700' },
    { id: 'heavenly', name: 'Heavenly Sanctuary', color: 'from-purple-600 to-indigo-700' }
  ];

  const handleComponentClick = (component: SanctuaryComponent) => {
    setSelectedComponent(component);
    setShowScripture(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sanctuary-gold mx-auto mb-4"></div>
          <p className="text-sanctuary-purple text-lg">Loading sanctuary model...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Info className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-2">Error loading sanctuary data</p>
          <p className="text-sanctuary-brass">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      {/* Header */}
      <div className={`bg-gradient-to-r ${modelOptions.find(m => m.id === selectedModelId)?.color || 'from-sanctuary-gold to-sanctuary-brass'} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Eye className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Interactive 3D Sanctuary Explorer</h1>
              <p className="text-white/90 text-lg">
                {sanctuaryData?.name || 'Exploring Biblical Sanctuaries'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Model Selector */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-6 mb-8">
          <h2 className="text-2xl font-bold text-sanctuary-purple mb-4 flex items-center space-x-2">
            <Layers className="w-6 h-6" />
            <span>Select Sanctuary Model</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelOptions.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModelId(model.id);
                  setSelectedComponent(null);
                  setShowScripture(false);
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedModelId === model.id
                    ? 'border-sanctuary-gold bg-sanctuary-gold/10 shadow-lg'
                    : 'border-sanctuary-silver hover:border-sanctuary-gold/50 hover:shadow-md'
                }`}
              >
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">{model.name}</h3>
                <div className={`h-2 w-full bg-gradient-to-r ${model.color} rounded-full`}></div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-sanctuary-purple text-white p-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{sanctuaryData?.name}</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">{sanctuaryData?.period}</span>
                </div>
              </div>

              {/* 3D Viewer with Babylon.js */}
              <div className="relative h-96 lg:h-[600px] bg-sanctuary-linen-dark">
                <BabylonScene
                  modelId={selectedModelId}
                  onComponentClick={(componentId) => {
                    const component = sanctuaryData?.components.find(c => c.id === componentId);
                    if (component) {
                      handleComponentClick(component);
                    }
                  }}
                  highlightedComponent={selectedComponent?.id}
                  className="w-full h-full"
                />
              </div>

              {/* Components Grid */}
              <div className="p-6 border-t border-sanctuary-silver">
                <h4 className="text-lg font-semibold text-sanctuary-purple mb-4">Sacred Components</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sanctuaryData?.components.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => handleComponentClick(component)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedComponent?.id === component.id
                          ? 'border-sanctuary-gold bg-sanctuary-gold/10'
                          : 'border-sanctuary-silver hover:border-sanctuary-gold/50 hover:bg-sanctuary-linen'
                      }`}
                    >
                      <h5 className="font-semibold text-sanctuary-purple mb-1">{component.name}</h5>
                      <p className="text-xs text-sanctuary-brass">{component.material}</p>
                      {component.scriptureRefs && component.scriptureRefs.length > 0 && (
                        <div className="mt-2 flex items-center text-xs text-sanctuary-gold">
                          <Book className="w-3 h-3 mr-1" />
                          <span>{component.scriptureRefs.length} reference(s)</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scripture Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden sticky top-4">
              <div className="bg-sanctuary-gold text-sanctuary-purple p-4">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>Scripture References</span>
                </h3>
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto">
                {!showScripture || !selectedComponent ? (
                  <div className="text-center text-sanctuary-brass py-8">
                    <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Select a component to view its Scripture references</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-sanctuary-purple mb-2">{selectedComponent.name}</h4>
                      <p className="text-sm text-sanctuary-brass mb-4">
                        Material: {selectedComponent.material || 'Not specified'}
                      </p>
                      {selectedComponent.confidence && (
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                          selectedComponent.confidence.level === 'high' ? 'bg-green-100 text-green-800' :
                          selectedComponent.confidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          Confidence: {selectedComponent.confidence.level}
                        </div>
                      )}
                    </div>

                    {selectedComponent.scriptureRefs && selectedComponent.scriptureRefs.length > 0 ? (
                      selectedComponent.scriptureRefs.map((ref, index) => (
                        <div key={index} className="border-l-4 border-sanctuary-gold pl-4 py-2">
                          <div className="font-semibold text-sanctuary-purple mb-2">
                            {ref.book} {ref.chapter}:{ref.verses}
                          </div>
                          {ref.excerpt && (
                            <p className="text-sm text-sanctuary-brass italic leading-relaxed">
                              "{ref.excerpt}"
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-sanctuary-brass italic">No Scripture references available</p>
                    )}

                    {selectedComponent.confidence?.notes && (
                      <div className="mt-4 p-4 bg-sanctuary-linen rounded-lg">
                        <p className="text-xs font-semibold text-sanctuary-purple mb-1">Notes:</p>
                        <p className="text-xs text-sanctuary-brass">{selectedComponent.confidence.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* General Scripture */}
              {sanctuaryData?.scripture && sanctuaryData.scripture.length > 0 && (
                <div className="border-t border-sanctuary-silver p-6 bg-sanctuary-linen/50">
                  <h4 className="text-sm font-bold text-sanctuary-purple mb-3">General References</h4>
                  <div className="space-y-3">
                    {sanctuaryData.scripture.map((ref, index) => (
                      <div key={index} className="text-xs">
                        <div className="font-semibold text-sanctuary-purple">
                          {ref.book} {ref.chapter}:{ref.verses}
                        </div>
                        {ref.excerpt && (
                          <p className="text-sanctuary-brass italic mt-1">"{ref.excerpt}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <Link
                to="/compare"
                className="block w-full bg-sanctuary-blue text-white text-center py-3 rounded-lg hover:bg-sanctuary-blue-dark transition-colors font-medium"
              >
                <ChevronRight className="w-5 h-5 inline mr-2" />
                Compare Models
              </Link>
              <Link
                to="/scripture"
                className="block w-full bg-sanctuary-gold text-sanctuary-purple text-center py-3 rounded-lg hover:bg-sanctuary-gold-dark transition-colors font-medium"
              >
                <Book className="w-5 h-5 inline mr-2" />
                Full Scripture Navigator
              </Link>
            </div>
          </div>
        </div>

        {/* Review Status */}
        {sanctuaryData?.review && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-6">
            <h3 className="text-lg font-bold text-sanctuary-purple mb-4">Review Status & Sources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-sanctuary-brass mb-2">
                  <strong>Status:</strong>{' '}
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    sanctuaryData.review.status === 'approved' ? 'bg-green-100 text-green-800' :
                    sanctuaryData.review.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {sanctuaryData.review.status}
                  </span>
                </p>
                {sanctuaryData.review.notes && (
                  <p className="text-sm text-sanctuary-brass italic">{sanctuaryData.review.notes}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-sanctuary-purple mb-2">Sources:</p>
                <ul className="text-sm text-sanctuary-brass space-y-1">
                  {sanctuaryData.review.sources?.map((source, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ChevronRight className="w-4 h-4 text-sanctuary-gold mt-0.5 flex-shrink-0" />
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSanctuaryViewer;
