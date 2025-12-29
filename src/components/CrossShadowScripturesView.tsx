import React, { useState } from 'react';
import { Book, Filter, Search, BookOpen, Cross } from 'lucide-react';
import { useCrossShadowBook } from '../hooks/useCrossShadowBook';

export function CrossShadowScripturesView() {
  const { scriptures, chapters, loading } = useCrossShadowBook();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTestament, setFilterTestament] = useState<'All' | 'Old' | 'New'>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scriptures...</p>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(scriptures.map(s => s.category))).filter(Boolean);

  // Filter scriptures
  const filteredScriptures = scriptures.filter(scripture => {
    const matchesSearch =
      scripture.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scripture.context_in_book?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scripture.quote_text?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTestament = filterTestament === 'All' || scripture.testament === filterTestament;
    const matchesCategory = filterCategory === 'All' || scripture.category === filterCategory;

    return matchesSearch && matchesTestament && matchesCategory;
  });

  // Group by book name
  const scripturesByBook: { [book: string]: typeof scriptures } = {};
  filteredScriptures.forEach(scripture => {
    if (!scripturesByBook[scripture.book_name]) {
      scripturesByBook[scripture.book_name] = [];
    }
    scripturesByBook[scripture.book_name].push(scripture);
  });

  // Get chapter title helper
  const getChapterTitle = (chapterId: string) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    return chapter ? `Chapter ${chapter.chapter_number}: ${chapter.chapter_title}` : 'Unknown Chapter';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Scripture References</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the biblical foundation of sanctuary typology. {scriptures.length} scripture references connecting Old Testament shadows to New Testament realities.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-blue-100">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search scriptures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Testament Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterTestament}
                onChange={(e) => setFilterTestament(e.target.value as 'All' | 'Old' | 'New')}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="All">All Testaments</option>
                <option value="Old">Old Testament</option>
                <option value="New">New Testament</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <Book className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t-2 border-gray-100">
            <div className="bg-blue-100 px-4 py-2 rounded-full">
              <span className="text-blue-800 font-semibold">{filteredScriptures.length} references shown</span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-full">
              <span className="text-green-800 font-semibold">
                {Object.keys(scripturesByBook).length} Bible books
              </span>
            </div>
          </div>
        </div>

        {/* Scripture Groups */}
        {Object.entries(scripturesByBook).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(scripturesByBook).map(([bookName, bookScriptures]) => {
              const oldTestamentCount = bookScriptures.filter(s => s.testament === 'Old').length;
              const newTestamentCount = bookScriptures.filter(s => s.testament === 'New').length;

              return (
                <div key={bookName} className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
                  {/* Book Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">{bookName}</h2>
                      <div className="flex gap-2">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                          {bookScriptures.length} references
                        </span>
                        {oldTestamentCount > 0 && (
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                            OT
                          </span>
                        )}
                        {newTestamentCount > 0 && (
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                            NT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scripture List */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {bookScriptures
                        .sort((a, b) => a.footnote_number - b.footnote_number)
                        .map((scripture, idx) => (
                          <div
                            key={scripture.id || idx}
                            className="border-l-4 border-blue-400 bg-gradient-to-r from-blue-50 to-white p-5 rounded-r-xl hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-start gap-4">
                              {/* Footnote Number */}
                              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                {scripture.footnote_number}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-bold text-gray-900">{scripture.reference}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    scripture.testament === 'Old'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}>
                                    {scripture.testament === 'Old' ? 'Old Testament' : 'New Testament'}
                                  </span>
                                  {scripture.category && (
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                      {scripture.category}
                                    </span>
                                  )}
                                </div>

                                {scripture.context_in_book && (
                                  <p className="text-gray-700 mb-3 leading-relaxed">
                                    {scripture.context_in_book}
                                  </p>
                                )}

                                {scripture.quote_text && (
                                  <div className="bg-white border-l-4 border-blue-300 pl-4 py-3 italic text-gray-600">
                                    "{scripture.quote_text}"
                                  </div>
                                )}

                                {scripture.chapter_id && (
                                  <div className="mt-3 text-sm text-gray-500">
                                    Referenced in: {getChapterTitle(scripture.chapter_id)}
                                  </div>
                                )}
                              </div>

                              {/* Type Icon */}
                              <div className="flex-shrink-0">
                                {scripture.testament === 'Old' ? (
                                  <div className="bg-amber-100 p-3 rounded-xl" title="Old Testament Type">
                                    <Book className="w-6 h-6 text-amber-600" />
                                  </div>
                                ) : (
                                  <div className="bg-purple-100 p-3 rounded-xl" title="New Testament Antitype">
                                    <Cross className="w-6 h-6 text-purple-600" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No scriptures found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
