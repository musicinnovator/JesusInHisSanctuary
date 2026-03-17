import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hop as Home, Search, Grid2x2 as Grid, List, X, ListFilter as Filter, Tag } from 'lucide-react';
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
    { id: 'overview', label: 'Overview' },
    { id: 'commentary', label: 'SDA Commentary' },
    { id: 'library', label: 'Library Resources' },
    { id: 'typology', label: 'Type & Antitype' },
    { id: 'linguistic', label: 'Linguistic Analysis' },
    { id: '3d', label: '3D Visualization' },
    { id: 'learning', label: 'Learning Paths' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DonationBanner />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sanctuary Symbolism Explorer</h1>
          <p className="text-gray-600">
            Comprehensive biblical and theological research tool for sanctuary symbols, typology, and prophetic interpretation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Symbol Browser */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">Symbol Database</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${
                      viewMode === 'grid' ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${
                      viewMode === 'list' ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
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
                className="w-full mb-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded"
              >
                <Filter className="w-3.5 h-3.5" />
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
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Sanctuary Symbolism Database
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Comprehensive theological analysis and biblical scholarship
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Research Tools Available</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">Symbol Overview:</span>
                          <span className="text-gray-600 ml-1">Detailed descriptions, Hebrew/Greek terms, and scriptural foundations</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">SDA Commentary:</span>
                          <span className="text-gray-600 ml-1">Ellen G. White, historic pioneers, and modern scholars</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">Library Resources:</span>
                          <span className="text-gray-600 ml-1">Books, articles, and academic papers with citations</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">Typological Analysis:</span>
                          <span className="text-gray-600 ml-1">Type and antitype relationships with prophetic fulfillment</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">Linguistic Studies:</span>
                          <span className="text-gray-600 ml-1">Hebrew and Greek word analysis with etymology</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">3D Visualization:</span>
                          <span className="text-gray-600 ml-1">Interactive models with spatial context</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <div>
                          <span className="font-medium text-gray-900">Learning Paths:</span>
                          <span className="text-gray-600 ml-1">Structured study sequences and progress tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600">
                      Select a symbol from the sidebar to begin your research.
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
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        {selectedSymbol.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="text-gray-600">
                          <span className="font-medium">Category:</span> {selectedSymbol.category}
                        </div>
                        {selectedSymbol.sanctuary_location && (
                          <div className="text-gray-600">
                            <span className="font-medium">Location:</span> {selectedSymbol.sanctuary_location.replace('_', ' ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-gray-700 leading-relaxed mb-4">{selectedSymbol.short_description}</p>

                      {selectedSymbol.primary_scripture_references.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Primary Scripture References:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedSymbol.primary_scripture_references.map((ref) => (
                              <span
                                key={ref}
                                className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-300 text-sm"
                              >
                                {ref}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSymbol.tags.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Tags:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedSymbol.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-white text-gray-600 border border-gray-300 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {relatedSymbols.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Symbols:</h4>
                          <div className="flex flex-wrap gap-2">
                            {relatedSymbols.map((rel) => (
                              <button
                                key={rel.id}
                                onClick={() => setSelectedSymbolId(rel.id)}
                                className="px-3 py-1.5 bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-sm transition-colors"
                              >
                                {rel.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50">
                    <nav className="flex overflow-x-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as ViewTab)}
                          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === tab.id
                              ? 'border-gray-900 text-gray-900 bg-white'
                              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && selectedSymbol && (
                      <div className="space-y-6">
                        {selectedSymbol.detailed_description && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Description</h3>
                            <p className="text-gray-700 leading-relaxed">{selectedSymbol.detailed_description}</p>
                          </div>
                        )}

                        <div className="space-y-4">
                          {selectedSymbol.symbolic_meaning && (
                            <div className="border-l-2 border-gray-300 pl-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Symbolic Meaning</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{selectedSymbol.symbolic_meaning}</p>
                            </div>
                          )}

                          {selectedSymbol.christological_type && (
                            <div className="border-l-2 border-gray-300 pl-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Christological Type</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{selectedSymbol.christological_type}</p>
                            </div>
                          )}

                          {selectedSymbol.theological_significance && (
                            <div className="border-l-2 border-gray-300 pl-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Theological Significance</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{selectedSymbol.theological_significance}</p>
                            </div>
                          )}

                          {selectedSymbol.practical_application && (
                            <div className="border-l-2 border-gray-300 pl-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Practical Application</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{selectedSymbol.practical_application}</p>
                            </div>
                          )}
                        </div>

                        {(selectedSymbol.hebrew_term || selectedSymbol.greek_term) && (
                          <div className="border-t border-gray-200 pt-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Original Language Terms</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                              {selectedSymbol.hebrew_term && (
                                <div className="space-y-2">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hebrew</div>
                                  <div className="text-2xl text-gray-900">{selectedSymbol.hebrew_term}</div>
                                  {selectedSymbol.hebrew_transliteration && (
                                    <div className="text-sm text-gray-600 italic">{selectedSymbol.hebrew_transliteration}</div>
                                  )}
                                </div>
                              )}
                              {selectedSymbol.greek_term && (
                                <div className="space-y-2">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Greek</div>
                                  <div className="text-2xl text-gray-900">{selectedSymbol.greek_term}</div>
                                  {selectedSymbol.greek_transliteration && (
                                    <div className="text-sm text-gray-600 italic">{selectedSymbol.greek_transliteration}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedSymbol.historical_context && (
                          <div className="border-t border-gray-200 pt-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Historical Context</h4>
                            <p className="text-gray-700 leading-relaxed">{selectedSymbol.historical_context}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'commentary' && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-3">
                          <h3 className="text-lg font-semibold text-gray-900">Seventh-day Adventist Commentary</h3>
                          <p className="text-sm text-gray-600 mt-1">Selected writings from Adventist scholars and pioneers</p>
                        </div>

                        {commentaryLoading ? (
                          <div className="flex items-center justify-center py-12">
                            <div className="text-sm text-gray-500">Loading commentary...</div>
                          </div>
                        ) : commentary.length > 0 ? (
                          <div className="space-y-6">
                            {commentary.map((item) => (
                              <div key={item.id} className="border-l-2 border-gray-300 pl-6">
                                <div className="mb-3">
                                  <h4 className="font-semibold text-gray-900">{item.author}</h4>
                                  {item.book_title && (
                                    <p className="text-sm text-gray-600">
                                      <span className="italic">{item.book_title}</span>
                                      {item.publication_year && ` (${item.publication_year})`}
                                      {item.page_reference && `, p. ${item.page_reference}`}
                                    </p>
                                  )}
                                  <div className="text-xs text-gray-500 mt-1">
                                    Source: {item.source_type.replace('_', ' ')}
                                  </div>
                                </div>

                                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                                  "{item.quote_text}"
                                </blockquote>

                                {item.context && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Context</h5>
                                    <p className="text-sm text-gray-600">{item.context}</p>
                                  </div>
                                )}

                                {item.theological_emphasis && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Theological Emphasis</h5>
                                    <p className="text-sm text-gray-600">{item.theological_emphasis}</p>
                                  </div>
                                )}

                                {item.application_notes && (
                                  <div className="bg-gray-50 border border-gray-200 p-3 mt-3">
                                    <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Application</h5>
                                    <p className="text-sm text-gray-700">{item.application_notes}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-gray-500">No SDA commentary available for this symbol yet.</p>
                            <p className="text-sm text-gray-400 mt-2">Commentary will be added as content is curated.</p>
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
