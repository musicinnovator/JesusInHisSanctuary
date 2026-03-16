import React, { useState } from 'react';
import { Book, FileText, Video, Headphones, Mic, ExternalLink, Star, ListFilter as Filter } from 'lucide-react';
import { useLibraryResources, useBookReferences } from '../../hooks/useSymbolismAdvanced';
import type { LibraryResource, LibraryFilters } from '../../types/symbolismAdvanced';

interface LibraryResourcesPanelProps {
  symbolId: string;
}

export function LibraryResourcesPanel({ symbolId }: LibraryResourcesPanelProps) {
  const [filters, setFilters] = useState<LibraryFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null);

  const { resources, loading, error } = useLibraryResources(symbolId, filters);
  const { references } = useBookReferences(selectedResource?.id);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      case 'sermon':
        return <Mic className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < score / 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        Error loading resources: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Library Resources</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resource Type
              </label>
              <select
                value={filters.resource_type || ''}
                onChange={(e) =>
                  setFilters({ ...filters, resource_type: e.target.value as any })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Types</option>
                <option value="book">Books</option>
                <option value="article">Articles</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="sermon">Sermons</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Relevance
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={filters.min_relevance_score || ''}
                onChange={(e) =>
                  setFilters({ ...filters, min_relevance_score: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="1-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={filters.language || ''}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setFilters({})}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedResource(resource)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-lg text-amber-700">
                {getResourceIcon(resource.resource_type)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {resource.title}
                </h4>

                {resource.author && (
                  <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
                )}

                <div className="flex items-center gap-4 mb-3">
                  {renderStars(resource.relevance_score)}
                  <span className="text-xs text-gray-500 uppercase">
                    {resource.resource_type}
                  </span>
                  {resource.publication_year && (
                    <span className="text-xs text-gray-500">
                      {resource.publication_year}
                    </span>
                  )}
                </div>

                {resource.description && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                )}

                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Book className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No library resources found for this symbol.</p>
        </div>
      )}

      {selectedResource && references.length > 0 && (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Specific References in {selectedResource.title}
          </h4>
          <div className="space-y-4">
            {references.map((ref) => (
              <div key={ref.id} className="bg-white p-4 rounded-lg">
                {ref.chapter_title && (
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Chapter {ref.chapter_number}: {ref.chapter_title}
                  </h5>
                )}
                {ref.page_start && (
                  <p className="text-sm text-gray-600 mb-2">
                    Pages {ref.page_start}
                    {ref.page_end && ref.page_end !== ref.page_start && `-${ref.page_end}`}
                  </p>
                )}
                {ref.quote_text && (
                  <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-700 mb-2">
                    {ref.quote_text}
                  </blockquote>
                )}
                {ref.significance && (
                  <p className="text-sm text-gray-700">{ref.significance}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
