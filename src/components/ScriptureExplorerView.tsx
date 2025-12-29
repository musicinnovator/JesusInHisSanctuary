import React, { useState, useMemo } from 'react';
import { Search, Book, Filter, X } from 'lucide-react';
import { useScriptureTexts, type ScriptureText } from '../hooks/useCrosierEnhancements';

const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
  '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
  'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum',
  'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

export function ScriptureExplorerView() {
  const { scriptures, loading, error, searchScriptures } = useScriptureTexts();
  const [selectedScripture, setSelectedScripture] = useState<ScriptureText | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Get available themes
  const themes = useMemo(() => {
    const themeSet = new Set(scriptures.map(s => s.theme).filter(Boolean));
    return Array.from(themeSet).sort();
  }, [scriptures]);

  // Get books that have scriptures
  const booksWithScriptures = useMemo(() => {
    const bookSet = new Set(scriptures.map(s => s.book));
    return BIBLE_BOOKS.filter(book => bookSet.has(book));
  }, [scriptures]);

  // Filtered scriptures
  const filteredScriptures = useMemo(() => {
    let filtered = scriptures;

    if (selectedBook) {
      filtered = filtered.filter(s => s.book === selectedBook);
    }

    if (selectedTheme) {
      filtered = filtered.filter(s => s.theme === selectedTheme);
    }

    if (searchQuery) {
      filtered = searchScriptures(searchQuery);
    }

    return filtered;
  }, [scriptures, selectedBook, selectedTheme, searchQuery, searchScriptures]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Scripture Explorer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Scriptures</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Scripture Explorer</h1>
          <p className="text-gray-600">
            Explore KJV scripture texts referenced in Crosier's book with context and cross-references
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search scriptures, books, or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedBook && (
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2">
                <Book size={16} />
                <span className="font-medium">{selectedBook}</span>
                <button onClick={() => setSelectedBook(null)} className="hover:bg-blue-200 rounded-full p-1">
                  <X size={14} />
                </button>
              </div>
            )}
            {selectedTheme && (
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full flex items-center gap-2">
                <Filter size={16} />
                <span className="font-medium">{selectedTheme}</span>
                <button onClick={() => setSelectedTheme(null)} className="hover:bg-purple-200 rounded-full p-1">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Three Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Bible Books */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Book className="text-blue-500" />
              Bible Books
            </h2>
            <div className="space-y-1">
              {booksWithScriptures.map((book) => {
                const count = scriptures.filter(s => s.book === book).length;
                const isSelected = selectedBook === book;
                return (
                  <button
                    key={book}
                    onClick={() => setSelectedBook(isSelected ? null : book)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{book}</span>
                      <span className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Themes Filter */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Filter className="text-purple-500" />
                Themes
              </h3>
              <div className="space-y-1">
                {themes.map((theme) => {
                  const isSelected = selectedTheme === theme;
                  return (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(isSelected ? null : theme)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'bg-purple-500 text-white shadow-md'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {theme}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Panel - Scripture List/Details */}
          <div className="lg:col-span-6 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {selectedScripture ? (
              <ScriptureDetailView
                scripture={selectedScripture}
                onClose={() => setSelectedScripture(null)}
              />
            ) : (
              <>
                {filteredScriptures.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">📖</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Scriptures Found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search query</p>
                  </div>
                ) : (
                  filteredScriptures.map((scripture) => (
                    <ScriptureCard
                      key={scripture.id}
                      scripture={scripture}
                      onClick={() => setSelectedScripture(scripture)}
                    />
                  ))
                )}
              </>
            )}
          </div>

          {/* Right Panel - Usage Info */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
            <div className="space-y-4">
              <StatCard
                label="Total Scriptures"
                value={scriptures.length}
                color="blue"
              />
              <StatCard
                label="Books Referenced"
                value={booksWithScriptures.length}
                color="green"
              />
              <StatCard
                label="Theological Themes"
                value={themes.length}
                color="purple"
              />
              <StatCard
                label="Filtered Results"
                value={filteredScriptures.length}
                color="orange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scripture Card Component
function ScriptureCard({ scripture, onClick }: { scripture: ScriptureText; onClick: () => void }) {
  const reference = scripture.verse_end
    ? `${scripture.book} ${scripture.chapter}:${scripture.verse_start}-${scripture.verse_end}`
    : `${scripture.book} ${scripture.chapter}:${scripture.verse_start}`;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-blue-600 group-hover:text-blue-700">
          {reference}
        </h3>
        {scripture.theme && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {scripture.theme}
          </span>
        )}
      </div>
      <p className="text-gray-700 line-clamp-3 mb-3">{scripture.kjv_text}</p>
      {scripture.usage_context && (
        <p className="text-sm text-gray-500 italic line-clamp-2">
          {scripture.usage_context}
        </p>
      )}
    </button>
  );
}

// Scripture Detail View
function ScriptureDetailView({ scripture, onClose }: { scripture: ScriptureText; onClose: () => void }) {
  const reference = scripture.verse_end
    ? `${scripture.book} ${scripture.chapter}:${scripture.verse_start}-${scripture.verse_end}`
    : `${scripture.book} ${scripture.chapter}:${scripture.verse_start}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">{reference}</h2>
          {scripture.theme && (
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              {scripture.theme}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {/* KJV Text */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <h3 className="text-sm font-bold text-blue-700 uppercase mb-2">King James Version</h3>
          <p className="text-lg text-gray-800 leading-relaxed">{scripture.kjv_text}</p>
        </div>

        {/* Crosier's Usage Context */}
        {scripture.usage_context && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h3 className="text-sm font-bold text-amber-700 uppercase mb-2">
              How Crosier Uses This Verse
            </h3>
            <p className="text-gray-800">{scripture.usage_context}</p>
          </div>
        )}

        {/* Cross References */}
        {scripture.cross_references && scripture.cross_references.length > 0 && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-sm font-bold text-green-700 uppercase mb-3">
              Related Scriptures
            </h3>
            <div className="flex flex-wrap gap-2">
              {scripture.cross_references.map((ref, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-green-200 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-green-100 cursor-pointer transition-colors"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} p-4 rounded-lg`}>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
