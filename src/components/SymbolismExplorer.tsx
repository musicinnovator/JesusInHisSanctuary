import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hop as Home, Search, Book, BookOpen, GitBranch, Languages, Box, GraduationCap, Grid2x2 as Grid, List, X, ListFilter as Filter, Tag } from 'lucide-react';
import DonationBanner from './DonationBanner';
import { LibraryResourcesPanel } from './symbolism/LibraryResourcesPanel';
import { TypologyPanel } from './symbolism/TypologyPanel';
import { LinguisticPanel } from './symbolism/LinguisticPanel';
import { Model3DPanel } from './symbolism/Model3DPanel';
import { LearningPanel } from './symbolism/LearningPanel';
import { useSymbols, useSymbol, useSDACommentary, useSymbolCategories, useRelatedSymbols, type SymbolFilters } from '../hooks/useSymbolismBase';

type ViewTab = 'library' | 'typology' | 'linguistic' | '3d' | 'learning' | 'overview' | 'commentary';

const SymbolismExplorer = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SymbolFilters>({});

  // Fetch data from database
  const { symbols, loading: symbolsLoading } = useSymbols({ ...filters, search: searchQuery });
  const { symbol: selectedSymbol, loading: symbolLoading } = useSymbol(selectedSymbolId);
  const { commentary, loading: commentaryLoading } = useSDACommentary(selectedSymbolId);
  const { categories } = useSymbolCategories();
  const { relatedSymbols } = useRelatedSymbols(selectedSymbolId);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'commentary', label: 'SDA Commentary', icon: BookOpen },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'typology', label: 'Type & Antitype', icon: GitBranch },
    { id: 'linguistic', label: 'Word Studies', icon: Languages },
    { id: '3d', label: '3D Models', icon: Box },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DonationBanner />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-2">Symbolism Explorer</h1>
          <p className="text-amber-100 text-lg">
            Comprehensive sanctuary symbolism with library resources, typology, linguistics, 3D models, and interactive learning
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Symbol Browser */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Symbols</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'text-gray-400'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'text-gray-400'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search symbols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full mb-3 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              {showFilters && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">All Categories</option>
                      <option value="furniture">Furniture</option>
                      <option value="materials">Materials</option>
                      <option value="colors">Colors</option>
                      <option value="rituals">Rituals</option>
                      <option value="garments">Garments</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                    <select
                      value={filters.sanctuary_location || ''}
                      onChange={(e) => setFilters({ ...filters, sanctuary_location: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">All Locations</option>
                      <option value="outer_court">Outer Court</option>
                      <option value="holy_place">Holy Place</option>
                      <option value="most_holy_place">Most Holy Place</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setFilters({})}
                    className="w-full text-xs text-gray-600 hover:text-gray-900"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {symbolsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {symbols.map((symbol) => (
                      <button
                        key={symbol.id}
                        onClick={() => setSelectedSymbolId(symbol.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedSymbolId === symbol.id
                            ? 'bg-amber-50 border-2 border-amber-500 shadow-md'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{symbol.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{symbol.sanctuary_location?.replace('_', ' ') || 'General'}</div>
                            {viewMode === 'list' && (
                              <div className="text-xs text-gray-600 mt-2 line-clamp-2">{symbol.short_description}</div>
                            )}
                          </div>
                          {symbol.tags.length > 0 && (
                            <Tag className="w-3 h-3 text-amber-600 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {symbols.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No symbols found</p>
                      <p className="text-sm mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {!selectedSymbolId ? (
              <div className="bg-white rounded-lg p-12 shadow-lg text-center">
                <Book className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to the Symbolism Explorer
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Select a sanctuary symbol from the sidebar to explore its rich theological meaning,
                  library resources, typological connections, linguistic analysis, 3D models, and
                  interactive learning features.
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Library</h3>
                    <p className="text-sm text-gray-600">
                      Access books, articles, and scholarly resources
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <GitBranch className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Typology</h3>
                    <p className="text-sm text-gray-600">
                      Discover type and antitype relationships
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Languages className="w-8 h-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Linguistics</h3>
                    <p className="text-sm text-gray-600">
                      Study Hebrew and Greek word meanings
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <Box className="w-8 h-8 text-amber-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">3D Models</h3>
                    <p className="text-sm text-gray-600">
                      Explore interactive 3D visualizations
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Learning</h3>
                    <p className="text-sm text-gray-600">
                      Follow guided paths and take quizzes
                    </p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <Book className="w-8 h-8 text-gray-600 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Overview</h3>
                    <p className="text-sm text-gray-600">
                      See comprehensive symbol information
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Symbol Header */}
                {symbolLoading ? (
                  <div className="bg-white rounded-lg p-12 shadow-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  </div>
                ) : selectedSymbol ? (
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedSymbol.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                            {selectedSymbol.category}
                          </span>
                          {selectedSymbol.sanctuary_location && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                              {selectedSymbol.sanctuary_location.replace('_', ' ')}
                            </span>
                          )}
                          {selectedSymbol.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4">{selectedSymbol.short_description}</p>

                        {selectedSymbol.primary_scripture_references.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedSymbol.primary_scripture_references.map((ref) => (
                              <span
                                key={ref}
                                className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm font-medium"
                              >
                                {ref}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {relatedSymbols.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Symbols</h4>
                        <div className="flex flex-wrap gap-2">
                          {relatedSymbols.map((rel) => (
                            <button
                              key={rel.id}
                              onClick={() => setSelectedSymbolId(rel.id)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
                            >
                              {rel.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="border-b border-gray-200 overflow-x-auto">
                    <nav className="flex">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as ViewTab)}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                              activeTab === tab.id
                                ? 'border-amber-600 text-amber-600 bg-amber-50'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && selectedSymbol && (
                      <div className="space-y-6">
                        {selectedSymbol.detailed_description && (
                          <div className="prose max-w-none">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Description</h3>
                            <p className="text-gray-700">{selectedSymbol.detailed_description}</p>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                          {selectedSymbol.symbolic_meaning && (
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <h4 className="font-semibold text-blue-900 mb-2">Symbolic Meaning</h4>
                              <p className="text-sm text-gray-700">{selectedSymbol.symbolic_meaning}</p>
                            </div>
                          )}

                          {selectedSymbol.christological_type && (
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2">Christological Type</h4>
                              <p className="text-sm text-gray-700">{selectedSymbol.christological_type}</p>
                            </div>
                          )}

                          {selectedSymbol.theological_significance && (
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <h4 className="font-semibold text-purple-900 mb-2">Theological Significance</h4>
                              <p className="text-sm text-gray-700">{selectedSymbol.theological_significance}</p>
                            </div>
                          )}

                          {selectedSymbol.practical_application && (
                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                              <h4 className="font-semibold text-amber-900 mb-2">Practical Application</h4>
                              <p className="text-sm text-gray-700">{selectedSymbol.practical_application}</p>
                            </div>
                          )}
                        </div>

                        {(selectedSymbol.hebrew_term || selectedSymbol.greek_term) && (
                          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Original Language Terms</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {selectedSymbol.hebrew_term && (
                                <div>
                                  <span className="text-sm text-gray-500">Hebrew</span>
                                  <div className="text-2xl font-bold text-gray-900 mb-1">{selectedSymbol.hebrew_term}</div>
                                  {selectedSymbol.hebrew_transliteration && (
                                    <div className="text-sm text-gray-600">{selectedSymbol.hebrew_transliteration}</div>
                                  )}
                                </div>
                              )}
                              {selectedSymbol.greek_term && (
                                <div>
                                  <span className="text-sm text-gray-500">Greek</span>
                                  <div className="text-2xl font-bold text-gray-900 mb-1">{selectedSymbol.greek_term}</div>
                                  {selectedSymbol.greek_transliteration && (
                                    <div className="text-sm text-gray-600">{selectedSymbol.greek_transliteration}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedSymbol.historical_context && (
                          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-3">Historical Context</h4>
                            <p className="text-gray-700">{selectedSymbol.historical_context}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'commentary' && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Seventh-day Adventist Commentary</h3>

                        {commentaryLoading ? (
                          <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                          </div>
                        ) : commentary.length > 0 ? (
                          <div className="space-y-4">
                            {commentary.map((item) => (
                              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-lg">{item.author}</h4>
                                    {item.book_title && (
                                      <p className="text-sm text-gray-600">
                                        {item.book_title}
                                        {item.publication_year && ` (${item.publication_year})`}
                                      </p>
                                    )}
                                  </div>
                                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    {item.source_type.replace('_', ' ')}
                                  </span>
                                </div>

                                <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-700 mb-4">
                                  {item.quote_text}
                                </blockquote>

                                {item.page_reference && (
                                  <p className="text-sm text-gray-500 mb-2">Page: {item.page_reference}</p>
                                )}

                                {item.context && (
                                  <div className="mb-3">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Context</h5>
                                    <p className="text-sm text-gray-600">{item.context}</p>
                                  </div>
                                )}

                                {item.theological_emphasis && (
                                  <div className="mb-3">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Theological Emphasis</h5>
                                    <p className="text-sm text-gray-600">{item.theological_emphasis}</p>
                                  </div>
                                )}

                                {item.application_notes && (
                                  <div className="p-3 bg-amber-50 rounded">
                                    <h5 className="text-sm font-semibold text-amber-900 mb-1">Application</h5>
                                    <p className="text-sm text-gray-700">{item.application_notes}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>No SDA commentary available for this symbol yet.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'library' && <LibraryResourcesPanel symbolId={selectedSymbolId} />}
                    {activeTab === 'typology' && <TypologyPanel symbolId={selectedSymbolId} />}
                    {activeTab === 'linguistic' && <LinguisticPanel symbolId={selectedSymbolId} />}
                    {activeTab === '3d' && <Model3DPanel symbolId={selectedSymbolId} />}
                    {activeTab === 'learning' && <LearningPanel symbolId={selectedSymbolId} />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolismExplorer;
