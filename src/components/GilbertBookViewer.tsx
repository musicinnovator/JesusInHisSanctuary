import React, { useState } from 'react';
import { Book, ChevronLeft, ChevronRight, BookOpen, Search, Tag } from 'lucide-react';
import { useGilbertBook } from '../hooks/useGilbertBook';
import { GilbertChapter } from '../types/gilbertBook';

export function GilbertBookViewer() {
  const { chapters, concepts, loading, error } = useGilbertBook();
  const [selectedChapter, setSelectedChapter] = useState<GilbertChapter | null>(null);
  const [view, setView] = useState<'chapters' | 'reading' | 'concepts'>('chapters');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Book className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">Error loading book: {error}</p>
        </div>
      </div>
    );
  }

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousChapter = () => {
    if (!selectedChapter) return;
    const currentIndex = chapters.findIndex(c => c.id === selectedChapter.id);
    if (currentIndex > 0) {
      setSelectedChapter(chapters[currentIndex - 1]);
    }
  };

  const handleNextChapter = () => {
    if (!selectedChapter) return;
    const currentIndex = chapters.findIndex(c => c.id === selectedChapter.id);
    if (currentIndex < chapters.length - 1) {
      setSelectedChapter(chapters[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {view === 'chapters' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Messiah in His Sanctuary
              </h1>
              <p className="text-xl text-gray-600 mb-2">by F.C. Gilbert</p>
              <p className="text-gray-500 max-w-2xl mx-auto">
                A Biblical Study of the Sanctuary and Its Services
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setView('chapters')}
                className="flex-1 py-3 px-6 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                <BookOpen className="inline-block w-5 h-5 mr-2" />
                Chapters
              </button>
              <button
                onClick={() => setView('concepts')}
                className="flex-1 py-3 px-6 bg-white text-amber-600 border-2 border-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                <Tag className="inline-block w-5 h-5 mr-2" />
                Key Concepts
              </button>
            </div>

            <div className="space-y-4">
              {filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    setView('reading');
                  }}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-amber-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                          {chapter.chapter_number === 0 ? 'Introduction' : `Chapter ${chapter.chapter_number}`}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {chapter.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{chapter.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {chapter.key_themes.slice(0, 3).map((theme, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'reading' && selectedChapter && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setView('chapters')}
              className="mb-6 flex items-center text-amber-600 hover:text-amber-700 font-semibold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Chapters
            </button>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <div className="mb-6">
                <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  {selectedChapter.chapter_number === 0 ? 'Introduction' : `Chapter ${selectedChapter.chapter_number}`}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedChapter.title}
              </h1>

              {selectedChapter.subtitle && (
                <h2 className="text-xl text-gray-600 mb-6">
                  {selectedChapter.subtitle}
                </h2>
              )}

              <div className="prose prose-lg max-w-none">
                {selectedChapter.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Themes</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedChapter.key_themes.map((theme, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scripture References</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedChapter.scripture_references.map((ref, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousChapter}
                disabled={selectedChapter.chapter_number === 0}
                className="flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <button
                onClick={handleNextChapter}
                disabled={selectedChapter.chapter_number === chapters.length - 1}
                className="flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'concepts' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setView('chapters')}
              className="mb-6 flex items-center text-amber-600 hover:text-amber-700 font-semibold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Chapters
            </button>

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Key Theological Concepts
              </h1>
              <p className="text-gray-600">
                Essential concepts from Messiah in His Sanctuary
              </p>
            </div>

            <div className="space-y-6">
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-600"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {concept.concept_name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {concept.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
