import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home, GraduationCap, Search, Download, ExternalLink, ListFilter as Filter, Star, Book, Loader2 } from 'lucide-react';
import DonationBanner from './DonationBanner';
import { useLibraryResources, useAuthors, useCategories, useFeaturedCollections, useResourceDownload } from '../hooks/useLibraryResources';
import { generateCitations, copyToClipboard } from '../utils/citationGenerator';
import type { ResourceWithAuthor } from '../types/library';

const DigitalLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const { categories: dbCategories, loading: categoriesLoading } = useCategories();
  const { authors: dbAuthors, loading: authorsLoading } = useAuthors();
  const { collections, loading: collectionsLoading } = useFeaturedCollections();
  const { trackDownload, downloading } = useResourceDownload();

  const categories = useMemo(() => [
    { id: 'all', name: 'All Resources', slug: 'all' },
    ...dbCategories
  ], [dbCategories]);

  const authors = useMemo(() => [
    { id: 'all', full_name: 'All Authors' },
    ...dbAuthors
  ], [dbAuthors]);

  const searchParams = useMemo(() => ({
    query: searchQuery || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    author: selectedAuthor !== 'all' ? selectedAuthor : undefined,
    sortBy: 'title' as const,
    sortOrder: 'asc' as const
  }), [searchQuery, selectedCategory, selectedAuthor]);

  const { resources: allResources, loading: resourcesLoading, total } = useLibraryResources(searchParams);

  const filteredResources = allResources;

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Curated Digital Library</h1>
              <p className="text-green-100 text-lg">Scholarly resources and academic materials</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Search Resources</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sanctuary-brass" />
                <input
                  type="text"
                  placeholder="Search by title, author, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={categoriesLoading}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Author</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={authorsLoading}
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.full_name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 pt-6 border-t border-sanctuary-silver">
            {resourcesLoading ? (
              <div className="flex items-center space-x-2 text-sanctuary-brass">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading resources...</span>
              </div>
            ) : (
              <p className="text-sanctuary-brass">
                Showing {filteredResources.length} of {total} resources
              </p>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resourcesLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-sanctuary-brass text-lg">No resources found matching your search criteria.</p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-lg border border-sanctuary-silver hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Book className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-sanctuary-brass bg-sanctuary-linen px-2 py-1 rounded capitalize">
                        {resource.resource_type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(resource.average_rating) ? 'text-sanctuary-gold fill-current' : 'text-sanctuary-silver'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-sanctuary-purple mb-2 leading-tight">{resource.title}</h3>
                  <p className="text-sm font-medium text-green-600 mb-3">{resource.author?.full_name || 'Unknown Author'}</p>
                  <p className="text-sanctuary-brass text-sm leading-relaxed mb-4">{resource.description}</p>

                  {/* Resource Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-sanctuary-brass">
                    <div>
                      <span className="font-medium">Year:</span> {resource.publication_year || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Pages:</span> {resource.total_pages || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Citations:</span> {resource.citation_count}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {resource.category?.name || 'Uncategorized'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => trackDownload(resource.id)}
                      disabled={downloading}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
                    >
                      {downloading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">Download PDF</span>
                    </button>
                    <Link to="#" className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Citation Tools */}
        {filteredResources.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
            <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Citation Tools</h3>
            <p className="text-sanctuary-brass mb-6">Example citation for: <span className="font-semibold">{filteredResources[0].title}</span></p>

            {(() => {
              const citations = generateCitations(filteredResources[0]);
              const handleCopy = async (format: string, text: string) => {
                try {
                  await copyToClipboard(text);
                  setCopiedCitation(format);
                  setTimeout(() => setCopiedCitation(null), 2000);
                } catch (err) {
                  console.error('Failed to copy:', err);
                }
              };

              return (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h4 className="font-semibold text-sanctuary-purple mb-4">APA Format</h4>
                    <div className="bg-white rounded-lg p-4 border border-sanctuary-silver min-h-[80px]">
                      <p className="text-sanctuary-brass text-sm font-mono" dangerouslySetInnerHTML={{ __html: citations.apa }} />
                    </div>
                    <button
                      onClick={() => handleCopy('apa', citations.apa)}
                      className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      {copiedCitation === 'apa' ? 'Copied!' : 'Copy APA Citation'}
                    </button>
                  </div>

                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h4 className="font-semibold text-sanctuary-purple mb-4">MLA Format</h4>
                    <div className="bg-white rounded-lg p-4 border border-sanctuary-silver min-h-[80px]">
                      <p className="text-sanctuary-brass text-sm font-mono" dangerouslySetInnerHTML={{ __html: citations.mla }} />
                    </div>
                    <button
                      onClick={() => handleCopy('mla', citations.mla)}
                      className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      {copiedCitation === 'mla' ? 'Copied!' : 'Copy MLA Citation'}
                    </button>
                  </div>

                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h4 className="font-semibold text-sanctuary-purple mb-4">Chicago Format</h4>
                    <div className="bg-white rounded-lg p-4 border border-sanctuary-silver min-h-[80px]">
                      <p className="text-sanctuary-brass text-sm font-mono" dangerouslySetInnerHTML={{ __html: citations.chicago }} />
                    </div>
                    <button
                      onClick={() => handleCopy('chicago', citations.chicago)}
                      className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      {copiedCitation === 'chicago' ? 'Copied!' : 'Copy Chicago Citation'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Featured Collections */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Featured Collections</h3>

          {collectionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <div key={collection.id} className="bg-gradient-to-br from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
                  <h4 className="text-xl font-semibold text-sanctuary-purple mb-4">{collection.title}</h4>
                  <p className="text-sanctuary-brass mb-4 leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sanctuary-brass">{collection.resource_count} Resource{collection.resource_count !== 1 ? 's' : ''}</span>
                    <Link to="#" className="text-green-600 hover:text-green-700 transition-colors font-medium">
                      Explore Collection →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalLibrary;