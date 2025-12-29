import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, Search, Filter, BookOpen, Grid, List, FileText, Link as LinkIcon } from 'lucide-react';
import { useCrossShadowBook } from '../hooks/useCrossShadowBook';

interface ViewMode {
  type: 'overview' | 'chapters' | 'sections' | 'scriptures' | 'concepts';
  selectedId?: string;
}

export function CrossShadowBookViewer() {
  const {
    book,
    sections,
    chapters,
    scriptures,
    concepts,
    loading,
    error
  } = useCrossShadowBook();

  const [viewMode, setViewMode] = useState<ViewMode>({ type: 'overview' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState<number | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading The Cross and Its Shadow...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error Loading Book</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">No book data available</p>
      </div>
    );
  }

  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.chapter_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chapter.chapter_overview?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterSection === null || chapter.section_id === sections.find(s => s.section_number === filterSection)?.id;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <Book className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-amber-100 text-lg">by {book.author} • {book.year_published}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {book.total_sections} Sections
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {book.total_chapters} Chapters
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {scriptures.length}+ Scripture References
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b-2 border-amber-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { type: 'overview' as const, label: 'Overview', icon: BookOpen },
              { type: 'sections' as const, label: 'Sections', icon: Grid },
              { type: 'chapters' as const, label: 'Chapters', icon: List },
              { type: 'scriptures' as const, label: 'Scriptures', icon: FileText },
              { type: 'concepts' as const, label: 'Concepts', icon: LinkIcon }
            ].map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setViewMode({ type })}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap min-w-fit ${
                  viewMode.type === type
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode.type === 'overview' && (
          <div className="space-y-8">
            {/* Overview Analysis */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                Book Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                {book.overview_analysis.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Key Themes */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Themes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {book.key_themes.map((theme: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-md border-l-4 border-amber-500 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{theme}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Stats */}
            <section className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Grid className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{sections.length}</h3>
                <p className="text-gray-600 font-medium">Major Sections</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <List className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-green-600 mb-2">{chapters.length}</h3>
                <p className="text-gray-600 font-medium">Detailed Chapters</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold text-purple-600 mb-2">{scriptures.length}+</h3>
                <p className="text-gray-600 font-medium">Scripture References</p>
              </div>
            </section>
          </div>
        )}

        {viewMode.type === 'sections' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Sections</h2>
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100 hover:shadow-2xl transition-all hover:border-amber-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl w-14 h-14 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {section.section_number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.section_title}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{section.section_overview}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {section.key_themes.map((theme: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 font-medium">{section.chapter_range}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode.type === 'chapters' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100 sticky top-24 z-30">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search chapters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterSection ?? ''}
                    onChange={(e) => setFilterSection(e.target.value ? Number(e.target.value) : null)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">All Sections</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.section_number}>
                        Section {section.section_number}: {section.section_title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      displayMode === 'grid'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDisplayMode('list')}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      displayMode === 'list'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chapters Display */}
            {displayMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all cursor-pointer"
                    onClick={() => setViewMode({ type: 'chapters', selectedId: chapter.id })}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold">
                        {chapter.chapter_number}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 flex-1 leading-tight">
                        {chapter.chapter_title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {chapter.chapter_overview}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {chapter.key_points?.length || 0} key points
                      </span>
                      <ChevronRight className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all cursor-pointer"
                    onClick={() => setViewMode({ type: 'chapters', selectedId: chapter.id })}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg w-14 h-14 flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {chapter.chapter_number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{chapter.chapter_title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-3">{chapter.chapter_overview}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{chapter.key_points?.length || 0} key points</span>
                          <span>•</span>
                          <span>{chapter.scripture_references?.length || 0} scripture references</span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredChapters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No chapters found matching your search criteria</p>
              </div>
            )}
          </div>
        )}

        {viewMode.type === 'scriptures' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Scripture References</h2>
            <p className="text-gray-600">Scripture catalog coming soon...</p>
          </div>
        )}

        {viewMode.type === 'concepts' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Theological Concepts</h2>
            <p className="text-gray-600">Concept exploration coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
