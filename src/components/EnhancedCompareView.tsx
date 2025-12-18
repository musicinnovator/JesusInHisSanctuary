import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, GitCompare, Book, Check, X, ArrowLeftRight } from 'lucide-react';
import DonationBanner from './DonationBanner';
import BabylonScene from './BabylonScene';
import { useAllSanctuaryModels } from '../hooks/useSanctuaryData';
import { SanctuaryModel } from '../types/sanctuary';

const EnhancedCompareView = () => {
  const { models, loading, error } = useAllSanctuaryModels();
  const [leftModel, setLeftModel] = useState<string>('tabernacle');
  const [rightModel, setRightModel] = useState<string>('heavenly');
  const [syncCameras, setSyncCameras] = useState(true);
  const [compareMode, setCompareMode] = useState<'components' | 'scripture' | 'dimensions'>('components');

  const getModelData = (modelId: string): SanctuaryModel | undefined => {
    return models.find(m => m.id === modelId);
  };

  const leftData = getModelData(leftModel);
  const rightData = getModelData(rightModel);

  if (loading) {
    return (
      <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sanctuary-gold mx-auto mb-4"></div>
          <p className="text-sanctuary-purple text-lg">Loading sanctuary models...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
        <div className="text-center max-w-md">
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
      <div className="bg-gradient-to-r from-sanctuary-purple to-sanctuary-blue text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <GitCompare className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Compare Sanctuaries</h1>
              <p className="text-white/90 text-lg">Side-by-side sanctuary analysis with synchronized navigation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Model Selector */}
            <div>
              <label className="block text-sm font-semibold text-sanctuary-purple mb-2">
                Left Model
              </label>
              <select
                value={leftModel}
                onChange={(e) => setLeftModel(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sanctuary-silver rounded-lg focus:border-sanctuary-gold focus:outline-none"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Model Selector */}
            <div>
              <label className="block text-sm font-semibold text-sanctuary-purple mb-2">
                Right Model
              </label>
              <select
                value={rightModel}
                onChange={(e) => setRightModel(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sanctuary-silver rounded-lg focus:border-sanctuary-gold focus:outline-none"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Mode Selector */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-sanctuary-purple mb-2">
              Comparison Mode
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCompareMode('components')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  compareMode === 'components'
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-linen text-sanctuary-brass hover:bg-sanctuary-gold/20'
                }`}
              >
                Components
              </button>
              <button
                onClick={() => setCompareMode('scripture')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  compareMode === 'scripture'
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-linen text-sanctuary-brass hover:bg-sanctuary-gold/20'
                }`}
              >
                <Book className="w-4 h-4 inline mr-1" />
                Scripture
              </button>
              <button
                onClick={() => setCompareMode('dimensions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  compareMode === 'dimensions'
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-linen text-sanctuary-brass hover:bg-sanctuary-gold/20'
                }`}
              >
                Dimensions
              </button>
            </div>
          </div>

          {/* Sync Camera Toggle */}
          <div className="mt-6 flex items-center space-x-3">
            <button
              onClick={() => setSyncCameras(!syncCameras)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                syncCameras
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {syncCameras ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              <span>Sync Cameras</span>
            </button>
            <p className="text-sm text-sanctuary-brass">
              {syncCameras ? 'Camera movements are synchronized' : 'Cameras move independently'}
            </p>
          </div>
        </div>

        {/* Dual View */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Pane */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
            <div className="bg-gradient-to-r from-sanctuary-gold to-sanctuary-brass text-sanctuary-purple p-4">
              <h3 className="text-xl font-semibold">{leftData?.name}</h3>
              <p className="text-sm opacity-90">{leftData?.period}</p>
            </div>

            {/* 3D Viewer */}
            <div className="relative h-96 bg-sanctuary-linen-dark">
              <BabylonScene
                modelId={leftModel}
                onComponentClick={(componentId) => {
                  console.log('Left model component clicked:', componentId);
                }}
                highlightedComponent={null}
                className="w-full h-full"
              />
            </div>

            {/* Comparison Data */}
            <div className="p-6">
              {compareMode === 'components' && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Components ({leftData?.components.length})
                  </h4>
                  <div className="space-y-2">
                    {leftData?.components.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg"
                      >
                        <span className="text-sm text-sanctuary-purple">{comp.name}</span>
                        <span className="text-xs text-sanctuary-brass">{comp.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {compareMode === 'scripture' && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Scripture References
                  </h4>
                  <div className="space-y-2">
                    {leftData?.scripture.map((ref, index) => (
                      <div key={index} className="p-3 bg-sanctuary-linen rounded-lg">
                        <div className="text-sm font-medium text-sanctuary-purple">
                          {ref.book} {ref.chapter}:{ref.verses}
                        </div>
                        {ref.excerpt && (
                          <p className="text-xs text-sanctuary-brass mt-1 italic">
                            {ref.excerpt.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {compareMode === 'dimensions' && leftData?.dimensions && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Dimensions ({leftData.dimensions.unit})
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(leftData.dimensions.values).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg"
                      >
                        <span className="text-sm text-sanctuary-purple capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-semibold text-sanctuary-brass">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Pane */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
            <div className="bg-gradient-to-r from-sanctuary-blue to-sanctuary-purple text-white p-4">
              <h3 className="text-xl font-semibold">{rightData?.name}</h3>
              <p className="text-sm opacity-90">{rightData?.period}</p>
            </div>

            {/* 3D Viewer */}
            <div className="relative h-96 bg-sanctuary-linen-dark">
              <BabylonScene
                modelId={rightModel}
                onComponentClick={(componentId) => {
                  console.log('Right model component clicked:', componentId);
                }}
                highlightedComponent={null}
                className="w-full h-full"
              />
            </div>

            {/* Comparison Data */}
            <div className="p-6">
              {compareMode === 'components' && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Components ({rightData?.components.length})
                  </h4>
                  <div className="space-y-2">
                    {rightData?.components.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg"
                      >
                        <span className="text-sm text-sanctuary-purple">{comp.name}</span>
                        <span className="text-xs text-sanctuary-brass">{comp.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {compareMode === 'scripture' && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Scripture References
                  </h4>
                  <div className="space-y-2">
                    {rightData?.scripture.map((ref, index) => (
                      <div key={index} className="p-3 bg-sanctuary-linen rounded-lg">
                        <div className="text-sm font-medium text-sanctuary-purple">
                          {ref.book} {ref.chapter}:{ref.verses}
                        </div>
                        {ref.excerpt && (
                          <p className="text-xs text-sanctuary-brass mt-1 italic">
                            {ref.excerpt.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {compareMode === 'dimensions' && rightData?.dimensions && (
                <div>
                  <h4 className="font-semibold text-sanctuary-purple mb-3">
                    Dimensions ({rightData.dimensions.unit})
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(rightData.dimensions.values).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-sanctuary-linen rounded-lg"
                      >
                        <span className="text-sm text-sanctuary-purple capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-semibold text-sanctuary-brass">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-6">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-4 flex items-center space-x-2">
            <ArrowLeftRight className="w-6 h-6" />
            <span>Comparison Summary</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg">
              <p className="text-sm text-sanctuary-brass mb-1">Components</p>
              <p className="text-2xl font-bold text-sanctuary-purple">
                {leftData?.components.length} vs {rightData?.components.length}
              </p>
            </div>
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg">
              <p className="text-sm text-sanctuary-brass mb-1">Scripture References</p>
              <p className="text-2xl font-bold text-sanctuary-purple">
                {leftData?.scripture.length} vs {rightData?.scripture.length}
              </p>
            </div>
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg">
              <p className="text-sm text-sanctuary-brass mb-1">Period</p>
              <p className="text-lg font-bold text-sanctuary-purple">
                {leftData?.period} → {rightData?.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCompareView;
