import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hop as Home, Search, Book, BookOpen, GitBranch, Languages, Box, GraduationCap, Grid2x2 as Grid, List, X } from 'lucide-react';
import DonationBanner from './DonationBanner';
import { LibraryResourcesPanel } from './symbolism/LibraryResourcesPanel';
import { TypologyPanel } from './symbolism/TypologyPanel';
import { LinguisticPanel } from './symbolism/LinguisticPanel';
import { Model3DPanel } from './symbolism/Model3DPanel';
import { LearningPanel } from './symbolism/LearningPanel';

type ViewTab = 'library' | 'typology' | 'linguistic' | '3d' | 'learning' | 'overview';

const SymbolismExplorer = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample symbols - in real app, these would come from the database
  const sampleSymbols = [
    {
      id: '1',
      name: 'Ark of the Covenant',
      category: 'furniture',
      location: 'Most Holy Place',
      shortDescription: 'Sacred chest containing the tablets of the law',
      image: '/images/ark.jpg',
    },
    {
      id: '2',
      name: 'Altar of Burnt Offering',
      category: 'furniture',
      location: 'Outer Court',
      shortDescription: 'Bronze altar where sacrifices were offered',
      image: '/images/altar.jpg',
    },
    {
      id: '3',
      name: 'Golden Lampstand',
      category: 'furniture',
      location: 'Holy Place',
      shortDescription: 'Seven-branched menorah providing light',
      image: '/images/lampstand.jpg',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'typology', label: 'Type & Antitype', icon: GitBranch },
    { id: 'linguistic', label: 'Word Studies', icon: Languages },
    { id: '3d', label: '3D Models', icon: Box },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
  ];

  const filteredSymbols = sampleSymbols.filter((symbol) =>
    symbol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    symbol.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredSymbols.map((symbol) => (
                  <button
                    key={symbol.id}
                    onClick={() => setSelectedSymbolId(symbol.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedSymbolId === symbol.id
                        ? 'bg-amber-50 border-2 border-amber-500 shadow-md'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{symbol.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{symbol.location}</div>
                    {viewMode === 'list' && (
                      <div className="text-xs text-gray-600 mt-2">{symbol.shortDescription}</div>
                    )}
                  </button>
                ))}
              </div>

              {filteredSymbols.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No symbols found</p>
                </div>
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
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {sampleSymbols.find((s) => s.id === selectedSymbolId)?.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {sampleSymbols.find((s) => s.id === selectedSymbolId)?.category}
                        </span>
                        <span>
                          {sampleSymbols.find((s) => s.id === selectedSymbolId)?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {sampleSymbols.find((s) => s.id === selectedSymbolId)?.shortDescription}
                  </p>
                </div>

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
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="prose max-w-none">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Symbol Overview
                          </h3>
                          <p className="text-gray-700 mb-4">
                            This symbol has rich theological significance across multiple dimensions.
                            Explore the tabs above to dive deep into library resources, typological
                            connections, linguistic analysis, 3D models, and interactive learning.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <h4 className="font-semibold text-blue-900 mb-2">
                                Biblical Foundation
                              </h4>
                              <p className="text-sm text-gray-700">
                                Rooted in Scripture with extensive Old and New Testament references
                              </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2">
                                Christological Type
                              </h4>
                              <p className="text-sm text-gray-700">
                                Points forward to Christ and His ministry in the heavenly sanctuary
                              </p>
                            </div>
                          </div>
                        </div>
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
