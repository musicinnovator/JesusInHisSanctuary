import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCw, ZoomIn, ZoomOut, Info, Map, BookOpen, Image } from 'lucide-react';
import { useModelByName, trackModelView } from '../hooks/useSanctuary3D';
import type { ModelHotspot, GuidedTour } from '../types/sanctuary3d';
import { HistoricalImageGallery } from './HistoricalImageGallery';
import { sampleHistoricalImages } from '../data/sampleHistoricalImages';

export function Enhanced3DSanctuaryViewer() {
  const { modelName } = useParams<{ modelName: string }>();
  const navigate = useNavigate();
  const { modelData, loading, error } = useModelByName(modelName);

  const [selectedHotspot, setSelectedHotspot] = useState<ModelHotspot | null>(null);
  const [selectedTour, setSelectedTour] = useState<GuidedTour | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'images'>('3d');

  useEffect(() => {
    if (modelData) {
      trackModelView(modelData.id);
    }
  }, [modelData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Sanctuary Model...</p>
        </div>
      </div>
    );
  }

  if (error || !modelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Model Not Found</h2>
          <p className="text-gray-300 mb-6">The requested sanctuary model could not be loaded.</p>
          <button
            onClick={() => navigate('/explorer')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  const handleHotspotClick = (hotspot: ModelHotspot) => {
    setSelectedHotspot(hotspot);
    setShowInfo(true);
  };

  const handleTourSelect = (tour: GuidedTour) => {
    setSelectedTour(tour);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/explorer')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{modelData.title}</h1>
                <p className="text-sm text-gray-300">{modelData.time_period}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                    viewMode === '3d' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  3D View
                </button>
                <button
                  onClick={() => setViewMode('images')}
                  className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                    viewMode === 'images' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Images
                </button>
              </div>

              {viewMode === '3d' && (
                <>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-2 rounded-lg transition-colors ${
                      showInfo ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title="Toggle Info Panel"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowHotspots(!showHotspots)}
                    className={`p-2 rounded-lg transition-colors ${
                      showHotspots ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title="Toggle Hotspots"
                  >
                    <Map className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative" style={{ height: 'calc(100vh - 88px)' }}>
        {viewMode === '3d' ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-6">
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">3D Model Coming Soon</h2>
                    <p className="text-lg text-gray-300 mb-8">
                      The interactive 3D model for {modelData.title} is currently in development.
                      Explore the hotspots and guided tours below, or switch to the Images view to see real historical photographs and reconstructions.
                    </p>
                  </div>

                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 text-left">
                    <h3 className="text-xl font-semibold mb-3">About This Sanctuary</h3>
                    <p className="text-gray-300 mb-4">{modelData.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {modelData.biblical_references.map((ref, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-600/30 border border-blue-400/50 rounded-full text-sm text-blue-200"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>

                    {modelData.dimensions_cubits && (
                      <div className="text-sm text-gray-400">
                        <span className="font-semibold">Dimensions: </span>
                        {modelData.dimensions_cubits.length && `${modelData.dimensions_cubits.length} × `}
                        {modelData.dimensions_cubits.width && `${modelData.dimensions_cubits.width} × `}
                        {modelData.dimensions_cubits.height && `${modelData.dimensions_cubits.height}`}
                        {' cubits'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {showInfo && selectedHotspot && (
          <div className="absolute right-4 top-4 w-96 bg-black/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white pr-4">{selectedHotspot.title}</h3>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    selectedHotspot.category === 'furniture' ? 'bg-yellow-600/30 text-yellow-200 border border-yellow-500/50' :
                    selectedHotspot.category === 'structure' ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50' :
                    selectedHotspot.category === 'location' ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50' :
                    'bg-gray-600/30 text-gray-200 border border-gray-500/50'
                  }`}>
                    {selectedHotspot.category.charAt(0).toUpperCase() + selectedHotspot.category.slice(1)}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{selectedHotspot.description}</p>

                {selectedHotspot.symbolism_summary && (
                  <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-200 mb-2">Symbolism</h4>
                    <p className="text-gray-300 text-sm">{selectedHotspot.symbolism_summary}</p>
                  </div>
                )}

                {selectedHotspot.scripture_references.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Scripture References</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotspot.scripture_references.map((ref, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-indigo-600/30 border border-indigo-400/50 rounded text-xs text-indigo-200"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
          </>
        ) : (
          <div className="absolute inset-0 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <HistoricalImageGallery
                modelName={modelData.name}
                images={sampleHistoricalImages[modelData.name as keyof typeof sampleHistoricalImages] || []}
              />
            </div>
          </div>
        )}
      </div>

      {viewMode === '3d' && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Map className="w-5 h-5 mr-2" />
                Interactive Hotspots ({modelData.hotspots.length})
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {modelData.hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => handleHotspotClick(hotspot)}
                    className={`text-left p-3 rounded-lg transition-all ${
                      selectedHotspot?.id === hotspot.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm line-clamp-1">{hotspot.title}</div>
                    <div className="text-xs opacity-75 mt-1">{hotspot.category}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Guided Tours ({modelData.tours.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {modelData.tours.map((tour) => (
                  <button
                    key={tour.id}
                    onClick={() => handleTourSelect(tour)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTour?.id === tour.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{tour.tour_name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        tour.difficulty_level === 'beginner' ? 'bg-green-600/30 text-green-200' :
                        tour.difficulty_level === 'intermediate' ? 'bg-yellow-600/30 text-yellow-200' :
                        'bg-red-600/30 text-red-200'
                      }`}>
                        {tour.difficulty_level}
                      </span>
                    </div>
                    <div className="text-xs opacity-75">
                      {Math.floor(tour.total_duration_seconds / 60)} minutes
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
