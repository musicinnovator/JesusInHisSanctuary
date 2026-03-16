import React, { useState } from 'react';
import { Box, Info, Play, Maximize2, Download } from 'lucide-react';
import { use3DModels, use3DHotspots, use3DAnimations } from '../../hooks/useSymbolismAdvanced';

interface Model3DPanelProps {
  symbolId: string;
}

export function Model3DPanel({ symbolId }: Model3DPanelProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const { models, loading: modelsLoading } = use3DModels(symbolId);
  const { hotspots, loading: hotspotsLoading } = use3DHotspots(selectedModelId);
  const { animations, loading: animationsLoading } = use3DAnimations(selectedModelId);

  const selectedModel = models.find((m) => m.id === selectedModelId);

  const getFormatBadge = (format: string) => {
    const colors: Record<string, string> = {
      gltf: 'text-blue-700 bg-blue-50',
      glb: 'text-green-700 bg-green-50',
      babylon: 'text-purple-700 bg-purple-50',
      obj: 'text-gray-700 bg-gray-50',
    };
    return colors[format] || colors.obj;
  };

  if (modelsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">3D Interactive Models</h3>
      </div>

      {models.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Box className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No 3D models available for this symbol yet.</p>
          <p className="text-sm mt-2">Check back soon as we continue adding interactive content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              className={`bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                selectedModelId === model.id ? 'ring-2 ring-amber-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedModelId(model.id)}
            >
              <div className="aspect-video bg-gray-100 relative">
                {model.thumbnail_url ? (
                  <img
                    src={model.thumbnail_url}
                    alt={model.model_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Box className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getFormatBadge(
                      model.model_format
                    )}`}
                  >
                    {model.model_format.toUpperCase()}
                  </span>
                  {model.vr_compatible && (
                    <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded">
                      VR
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{model.model_name}</h4>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  {model.poly_count && (
                    <div>
                      <span className="text-gray-500">Polygons:</span>
                      <span className="ml-1 font-medium">{model.poly_count.toLocaleString()}</span>
                    </div>
                  )}
                  {model.file_size_mb && (
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-1 font-medium">{model.file_size_mb} MB</span>
                    </div>
                  )}
                  {model.texture_resolution && (
                    <div>
                      <span className="text-gray-500">Textures:</span>
                      <span className="ml-1 font-medium">{model.texture_resolution}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Priority:</span>
                    <span className="ml-1 font-medium">{model.load_priority}/10</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {model.pbr_materials && (
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded">
                      PBR Materials
                    </span>
                  )}
                  {model.animation_available && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded">
                      Animated
                    </span>
                  )}
                  {model.mobile_optimized && (
                    <span className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded">
                      Mobile Ready
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={model.model_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Maximize2 className="w-4 h-4" />
                    View 3D Model
                  </a>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="Download Model"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedModel && (
        <div className="space-y-6">
          {hotspots.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-gray-900">Interactive Hotspots</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      {hotspot.hotspot_type && (
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-white rounded">
                          {hotspot.hotspot_type}
                        </span>
                      )}
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1">{hotspot.title}</h5>
                        {hotspot.description && (
                          <p className="text-sm text-gray-700 mb-2">{hotspot.description}</p>
                        )}
                        {hotspot.scripture_reference && (
                          <p className="text-sm font-medium text-blue-600">
                            {hotspot.scripture_reference}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          Position: ({hotspot.position_x.toFixed(2)}, {hotspot.position_y.toFixed(2)},{' '}
                          {hotspot.position_z.toFixed(2)})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {animations.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">Animations</h4>
              </div>

              <div className="space-y-3">
                {animations.map((animation) => (
                  <div
                    key={animation.id}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{animation.animation_name}</h5>
                      <div className="flex items-center gap-2">
                        {animation.animation_type && (
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-white rounded">
                            {animation.animation_type}
                          </span>
                        )}
                        <span className="text-sm text-gray-600">
                          {animation.duration_seconds}s
                        </span>
                      </div>
                    </div>

                    {animation.narration_text && (
                      <p className="text-sm text-gray-700 mb-2 italic">
                        {animation.narration_text}
                      </p>
                    )}

                    <div className="flex gap-2 mt-3">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded">
                        <Play className="w-4 h-4" />
                        Play Animation
                      </button>
                      {animation.narration_audio_url && (
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded">
                          Play Audio
                        </button>
                      )}
                    </div>

                    {animation.auto_play && (
                      <span className="inline-block mt-2 text-xs text-gray-500">
                        Auto-plays on load
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
