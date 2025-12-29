import React, { useState } from 'react';
import { useAndreasenBook } from '../hooks/useAndreasenBook';
import {
  Book,
  BookOpen,
  ScrollText,
  Network,
  Clock,
  ImageIcon,
  Search,
  ChevronRight,
  ExternalLink,
  Filter,
  Star
} from 'lucide-react';
import type { AndreasenViewMode } from '../types/andreasenBook';

export default function AndreasenBookViewer() {
  const {
    bookInfo,
    chapters,
    selectedChapter,
    sections,
    scriptures,
    concepts,
    illustrations,
    timelineEvents,
    studyQuestions,
    viewMode,
    searchQuery,
    loading,
    error,
    selectChapter,
    setViewMode,
    searchContent,
    getScripturesByTheme,
    getConceptsByCategory,
    getChapterIllustrations,
    getTimelineEventsByCategory
  } = useAndreasenBook();

  const [searchResults, setSearchResults] = useState<any>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedScripture, setSelectedScripture] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Andreasen's Sanctuary Service...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading book</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      const results = await searchContent(query);
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  const viewModes: Array<{ mode: AndreasenViewMode; icon: any; label: string }> = [
    { mode: 'chapters', icon: BookOpen, label: 'Chapter View' },
    { mode: 'scriptures', icon: ScrollText, label: 'Scripture Explorer' },
    { mode: 'concepts', icon: Network, label: 'Concepts Map' },
    { mode: 'timeline', icon: Clock, label: 'Timeline' },
    { mode: 'illustrations', icon: ImageIcon, label: 'Illustrations' },
    { mode: 'study', icon: Search, label: 'Study Tools' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Book className="w-8 h-8 text-amber-600" />
                  <h1 className="text-3xl font-bold text-gray-900">
                    {bookInfo?.title || 'The Sanctuary Service'}
                  </h1>
                </div>
                <p className="text-xl text-gray-700 mb-2">
                  by {bookInfo?.author || 'M.L. Andreasen'} ({bookInfo?.publication_year || 1947})
                </p>
                <p className="text-gray-600 mb-3">{bookInfo?.publisher}</p>
                <p className="text-gray-700 leading-relaxed">{bookInfo?.description}</p>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-700">
                    <strong>Theological Context:</strong> {bookInfo?.theological_context}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap gap-2">
              {viewModes.map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {viewMode === 'chapters' && (
            <ChapterView
              chapters={chapters}
              selectedChapter={selectedChapter}
              sections={sections}
              studyQuestions={studyQuestions}
              onSelectChapter={selectChapter}
            />
          )}

          {viewMode === 'scriptures' && (
            <ScriptureExplorerView
              scriptures={scriptures}
              selectedScripture={selectedScripture}
              onSelectScripture={setSelectedScripture}
              getScripturesByTheme={getScripturesByTheme}
            />
          )}

          {viewMode === 'concepts' && (
            <ConceptsMapView
              concepts={concepts}
              selectedConcept={selectedConcept}
              onSelectConcept={setSelectedConcept}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              getConceptsByCategory={getConceptsByCategory}
            />
          )}

          {viewMode === 'timeline' && (
            <TimelineView
              events={timelineEvents}
              getEventsByCategory={getTimelineEventsByCategory}
            />
          )}

          {viewMode === 'illustrations' && (
            <IllustrationsView
              illustrations={illustrations}
              chapters={chapters}
            />
          )}

          {viewMode === 'study' && (
            <StudyToolsView
              onSearch={handleSearch}
              searchResults={searchResults}
              chapters={chapters}
              scriptures={scriptures}
              concepts={concepts}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterView({ chapters, selectedChapter, sections, studyQuestions, onSelectChapter }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Chapters</h2>
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {chapters.map((chapter: any) => (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedChapter?.id === chapter.id
                  ? 'bg-amber-100 border-2 border-amber-600'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded">
                      Ch. {chapter.chapter_number}
                    </span>
                    <span className="text-xs text-gray-500">{chapter.word_count} words</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{chapter.summary}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedChapter ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded">
                  Chapter {selectedChapter.chapter_number}
                </span>
                <span className="text-sm text-gray-500">{selectedChapter.word_count} words</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedChapter.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{selectedChapter.summary}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Theological Focus</h3>
                  <p className="text-sm text-blue-800">{selectedChapter.theological_focus}</p>
                </div>
                {selectedChapter.practical_application && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Practical Application</h3>
                    <p className="text-sm text-green-800">{selectedChapter.practical_application}</p>
                  </div>
                )}
              </div>

              {selectedChapter.memorable_quote && (
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600 mb-4">
                  <p className="text-gray-800 italic">"{selectedChapter.memorable_quote}"</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Key Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedChapter.key_themes.map((theme: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Main Scripture References</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedChapter.main_scripture_references.map((ref: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {sections.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Sections</h3>
                <div className="space-y-3">
                  {sections.map((section: any) => (
                    <div key={section.id} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {section.section_number}. {section.title}
                      </h4>
                      {section.summary && (
                        <p className="text-sm text-gray-700 mb-2">{section.summary}</p>
                      )}
                      {section.key_points.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {section.key_points.map((point: string, idx: number) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {studyQuestions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Study Questions</h3>
                <div className="space-y-3">
                  {studyQuestions.map((question: any) => (
                    <div key={question.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                            ?
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium mb-2">{question.question_text}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="px-2 py-1 bg-blue-100 rounded">{question.question_type}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded">{question.difficulty_level}</span>
                            {question.discussion_prompt && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                Discussion
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Select a chapter to view its details</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ScriptureExplorerView({ scriptures, selectedScripture, onSelectScripture, getScripturesByTheme }: any) {
  const [themeFilter, setThemeFilter] = useState<string>('all');

  const allThemes = Array.from(new Set(scriptures.flatMap((s: any) => s.theme_tags))).sort();
  const filteredScriptures = themeFilter === 'all'
    ? scriptures
    : getScripturesByTheme(themeFilter);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Scripture Explorer</h2>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Themes</option>
            {allThemes.map((theme: string) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
          <span className="text-sm text-gray-600">{filteredScriptures.length} references</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScriptures.map((scripture: any) => (
          <div
            key={scripture.id}
            className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectScripture(scripture.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-amber-900">{scripture.reference}</h3>
              {scripture.primary_usage && (
                <Star className="w-4 h-4 text-amber-600 fill-amber-600 flex-shrink-0" />
              )}
            </div>
            {scripture.text_kjv && (
              <p className="text-sm text-gray-700 italic mb-3 line-clamp-3">"{scripture.text_kjv}"</p>
            )}
            <p className="text-sm text-gray-600 mb-3">{scripture.context_in_book}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {scripture.theme_tags.slice(0, 3).map((tag: string, idx: number) => (
                <span key={idx} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Cited {scripture.citation_count} times</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptsMapView({ concepts, selectedConcept, onSelectConcept, filterCategory, setFilterCategory, getConceptsByCategory }: any) {
  const categories = Array.from(new Set(concepts.map((c: any) => c.category))).sort();
  const filteredConcepts = filterCategory === 'all' ? concepts : getConceptsByCategory(filterCategory);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Theological Concepts</h2>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category: string) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="text-sm text-gray-600">{filteredConcepts.length} concepts</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredConcepts.map((concept: any) => (
          <div
            key={concept.id}
            className="p-5 bg-white rounded-lg border-2 border-gray-200 hover:border-amber-400 transition-colors cursor-pointer"
            onClick={() => onSelectConcept(concept.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{concept.name}</h3>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {concept.category}
                </span>
              </div>
              {concept.adventist_distinctive && (
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded flex-shrink-0 ml-2">
                  SDA Distinctive
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-3 leading-relaxed">{concept.definition}</p>
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Biblical Foundation:</h4>
              <div className="flex flex-wrap gap-1">
                {concept.biblical_foundation.slice(0, 4).map((ref: string, idx: number) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                    {ref}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">{concept.significance}</p>
            {concept.controversy_level !== 'low' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className={`text-xs px-2 py-1 rounded ${
                  concept.controversy_level === 'high'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Controversy Level: {concept.controversy_level}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineView({ events, getEventsByCategory }: any) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'historical', 'prophetic', 'typological', 'eschatological'];
  const filteredEvents = categoryFilter === 'all' ? events : getEventsByCategory(categoryFilter);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prophetic Timeline</h2>
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-400"></div>

        <div className="space-y-8">
          {filteredEvents.map((event: any) => (
            <div key={event.id} className="relative pl-20">
              <div className="absolute left-4 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-lg z-10">
                {event.timeline_position}
              </div>

              <div className={`p-5 rounded-lg border-2 ${
                event.is_present
                  ? 'bg-blue-50 border-blue-500'
                  : event.is_future
                    ? 'bg-purple-50 border-purple-400'
                    : 'bg-white border-gray-300'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{event.event_name}</h3>
                    <p className="text-sm font-semibold text-amber-600">{event.date_or_year}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
                    {event.category}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{event.description}</p>

                {event.prophetic_significance && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 mb-3">
                    <p className="text-sm text-amber-900">
                      <strong>Prophetic Significance:</strong> {event.prophetic_significance}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {event.scripture_references.map((ref: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                      {ref}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {event.is_past && <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">Past</span>}
                  {event.is_present && <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">Present</span>}
                  {event.is_future && <span className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded">Future</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IllustrationsView({ illustrations, chapters }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Illustrations & Diagrams</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {illustrations.map((illustration: any) => {
          const chapter = chapters.find((c: any) => c.id === illustration.chapter_id);
          return (
            <div key={illustration.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{illustration.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize flex-shrink-0 ml-2">
                    {illustration.type}
                  </span>
                </div>

                {chapter && (
                  <p className="text-sm text-amber-600 font-medium mb-2">
                    From Chapter {chapter.chapter_number}: {chapter.title}
                  </p>
                )}

                <p className="text-gray-700 mb-3">{illustration.description}</p>

                {illustration.caption && (
                  <p className="text-sm text-gray-600 italic mb-3">"{illustration.caption}"</p>
                )}

                {illustration.theological_purpose && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Purpose:</strong> {illustration.theological_purpose}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudyToolsView({ onSearch, searchResults, chapters, scriptures, concepts }: any) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Tools</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, scriptures, concepts..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {searchResults ? (
        <div className="space-y-6">
          {searchResults.chapters.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Chapters ({searchResults.chapters.length})</h3>
              <div className="space-y-2">
                {searchResults.chapters.map((chapter: any) => (
                  <div key={chapter.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">
                      Chapter {chapter.chapter_number}: {chapter.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{chapter.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.scriptures.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Scriptures ({searchResults.scriptures.length})</h3>
              <div className="space-y-2">
                {searchResults.scriptures.map((scripture: any) => (
                  <div key={scripture.id} className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-900">{scripture.reference}</h4>
                    <p className="text-sm text-gray-700 mt-1">{scripture.context_in_book}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.concepts.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Concepts ({searchResults.concepts.length})</h3>
              <div className="space-y-2">
                {searchResults.concepts.map((concept: any) => (
                  <div key={concept.id} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">{concept.name}</h4>
                    <p className="text-sm text-gray-700 mt-1">{concept.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.chapters.length === 0 &&
           searchResults.scriptures.length === 0 &&
           searchResults.concepts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Enter a search query to explore the book</p>
        </div>
      )}
    </div>
  );
}
