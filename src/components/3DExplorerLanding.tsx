import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Map, Play, Eye, TrendingUp } from 'lucide-react';
import { useSanctuary3DModels } from '../hooks/useSanctuary3D';

export function ThreeDExplorerLanding() {
  const navigate = useNavigate();
  const { models, loading, error } = useSanctuary3DModels();
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Models...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Models</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-blue-600/20 backdrop-blur-sm rounded-2xl mb-6">
              <Map className="w-12 h-12 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              3D Sanctuary Explorer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Journey through time and explore four biblical sanctuaries in stunning 3D.
              Discover the sacred furniture, learn their symbolism, and experience guided tours
              that bring Scripture to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {models.map((model) => (
              <div
                key={model.id}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-300"></div>

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {model.title}
                      </h2>
                      <p className="text-sm text-gray-400 mb-4">{model.time_period}</p>
                    </div>
                    {model.featured && (
                      <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/50 text-yellow-200 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {model.description}
                  </p>

                  {model.dimensions_cubits && (
                    <div className="mb-6 p-4 bg-black/30 rounded-lg border border-white/5">
                      <div className="text-sm text-gray-400 mb-2">Dimensions (cubits)</div>
                      <div className="flex items-center space-x-4 text-white font-mono">
                        {model.dimensions_cubits.length && (
                          <div>
                            <span className="text-gray-500">L:</span> {model.dimensions_cubits.length}
                          </div>
                        )}
                        {model.dimensions_cubits.width && (
                          <div>
                            <span className="text-gray-500">W:</span> {model.dimensions_cubits.width}
                          </div>
                        )}
                        {model.dimensions_cubits.height && (
                          <div>
                            <span className="text-gray-500">H:</span> {model.dimensions_cubits.height}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Eye className="w-4 h-4 mr-1" />
                        {model.total_views.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Map className="w-4 h-4 mr-1" />
                        Hotspots
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Play className="w-4 h-4 mr-1" />
                        Tours
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {model.biblical_references.slice(0, 3).map((ref, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-indigo-600/20 border border-indigo-400/30 text-indigo-200 text-xs rounded"
                      >
                        {ref}
                      </span>
                    ))}
                    {model.biblical_references.length > 3 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{model.biblical_references.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/explorer/${model.name}`)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <span>Explore in 3D</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Map className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Interactive Hotspots</h3>
                <p className="text-gray-400">
                  Click on sacred furniture and locations to discover their biblical significance
                  and spiritual symbolism.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Guided Tours</h3>
                <p className="text-gray-400">
                  Experience curated journeys through each sanctuary with narrated explanations
                  and scripture overlays.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Biblical Context</h3>
                <p className="text-gray-400">
                  Every element is connected to Scripture references, scholarly articles,
                  and theological insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
