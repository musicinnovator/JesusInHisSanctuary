import React, { useState } from 'react';
import { X, ZoomIn, Maximize2, Info, ExternalLink } from 'lucide-react';

interface HistoricalImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  photographer?: string;
  date?: string;
  source: string;
  sourceUrl?: string;
  license: string;
  type: 'photograph' | 'reconstruction' | 'artifact' | 'excavation';
}

interface HistoricalImageGalleryProps {
  modelName: string;
  images: HistoricalImage[];
}

export function HistoricalImageGallery({ modelName, images }: HistoricalImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<HistoricalImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.type === filter);

  const openLightbox = (image: HistoricalImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      photograph: 'Historical Photo',
      reconstruction: 'Reconstruction',
      artifact: 'Museum Artifact',
      excavation: 'Excavation'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      photograph: 'bg-blue-600/30 text-blue-200 border-blue-500/50',
      reconstruction: 'bg-purple-600/30 text-purple-200 border-purple-500/50',
      artifact: 'bg-yellow-600/30 text-yellow-200 border-yellow-500/50',
      excavation: 'bg-green-600/30 text-green-200 border-green-500/50'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-600/30 text-gray-200 border-gray-500/50';
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Historical Images & Reconstructions</h3>
          <div className="text-sm text-gray-400">
            {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Images
          </button>
          <button
            onClick={() => setFilter('photograph')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'photograph'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Historical Photos
          </button>
          <button
            onClick={() => setFilter('reconstruction')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'reconstruction'
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Reconstructions
          </button>
          <button
            onClick={() => setFilter('artifact')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'artifact'
                ? 'bg-yellow-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Artifacts
          </button>
          <button
            onClick={() => setFilter('excavation')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'excavation'
                ? 'bg-green-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Excavations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative bg-black/40 rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={image.thumbnailUrl || image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>

              <div className="absolute top-2 left-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getTypeColor(image.type)}`}>
                  {getTypeLabel(image.type)}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-white font-semibold mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
                {image.title}
              </h4>
              <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                {image.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{image.date || 'Historical'}</span>
                <span className="flex items-center">
                  <ZoomIn className="w-3 h-3 mr-1" />
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images found for this filter.</p>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-slate-900/90 rounded-xl overflow-hidden border border-white/20">
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border ${getTypeColor(selectedImage.type)}`}>
                    {getTypeLabel(selectedImage.type)}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {selectedImage.title}
                </h2>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedImage.photographer && (
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Photographer</div>
                      <div className="text-white font-medium">{selectedImage.photographer}</div>
                    </div>
                  )}

                  {selectedImage.date && (
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-gray-400 mb-1">Date</div>
                      <div className="text-white font-medium">{selectedImage.date}</div>
                    </div>
                  )}

                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Source</div>
                    <div className="text-white font-medium flex items-center">
                      {selectedImage.source}
                      {selectedImage.sourceUrl && (
                        <a
                          href={selectedImage.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">License</div>
                    <div className="text-white font-medium">{selectedImage.license}</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-blue-200 font-semibold mb-1">Historical Note</div>
                      <div className="text-gray-300 text-sm">
                        This image is part of a public domain collection and represents historical
                        documentation of biblical archaeology and sanctuary studies. All images are used
                        for educational purposes in accordance with their respective licenses.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
