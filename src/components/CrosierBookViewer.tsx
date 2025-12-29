/**
 * Main viewer component for Crosier's "The Sanctuary" book
 *
 * Provides comprehensive access to book content, including:
 * - Book overview and historical context
 * - Chapter navigation and reading
 * - Scripture reference index
 * - Theological concept explorer
 * - Interactive diagrams and visualizations
 */

import React, { useState } from 'react';
import { Book, ScrollText, Lightbulb, Map, Search, Calendar } from 'lucide-react';
import { useCrosierMetadata, useCrosierChapters } from '../hooks/useCrosierBook';

type ViewMode = 'overview' | 'chapters' | 'scriptures' | 'concepts' | 'diagrams' | 'timeline';

export function CrosierBookViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const { metadata, loading: metadataLoading } = useCrosierMetadata();
  const { chapters, loading: chaptersLoading } = useCrosierChapters();

  if (metadataLoading || chaptersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading historical sanctuary doctrine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            <div className="hidden sm:block">
              <div className="w-24 h-32 bg-amber-700 rounded-lg shadow-xl flex items-center justify-center">
                <Book className="w-12 h-12 text-amber-200" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{metadata?.title}</h1>
              <p className="text-xl text-amber-200 mb-3">By {metadata?.author}</p>
              <p className="text-sm text-amber-100 mb-2">
                Originally published: February 7, 1846 • Day-Star Extra, Cincinnati
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-amber-700 rounded-full text-xs font-medium">
                  Historical Document
                </span>
                <span className="px-3 py-1 bg-amber-700 rounded-full text-xs font-medium">
                  Sanctuary Doctrine
                </span>
                <span className="px-3 py-1 bg-amber-700 rounded-full text-xs font-medium">
                  1844 Movement
                </span>
                <span className="px-3 py-1 bg-amber-700 rounded-full text-xs font-medium">
                  Ellen G. White Endorsed
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            <TabButton
              active={viewMode === 'overview'}
              onClick={() => setViewMode('overview')}
              icon={<Book className="w-4 h-4" />}
              label="Overview"
            />
            <TabButton
              active={viewMode === 'chapters'}
              onClick={() => setViewMode('chapters')}
              icon={<ScrollText className="w-4 h-4" />}
              label="Chapters"
              badge={chapters.length.toString()}
            />
            <TabButton
              active={viewMode === 'scriptures'}
              onClick={() => setViewMode('scriptures')}
              icon={<Book className="w-4 h-4" />}
              label="Scriptures"
            />
            <TabButton
              active={viewMode === 'concepts'}
              onClick={() => setViewMode('concepts')}
              icon={<Lightbulb className="w-4 h-4" />}
              label="Theological Concepts"
            />
            <TabButton
              active={viewMode === 'diagrams'}
              onClick={() => setViewMode('diagrams')}
              icon={<Map className="w-4 h-4" />}
              label="Diagrams"
            />
            <TabButton
              active={viewMode === 'timeline'}
              onClick={() => setViewMode('timeline')}
              icon={<Calendar className="w-4 h-4" />}
              label="Timeline"
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'overview' && <OverviewView metadata={metadata} chapters={chapters} />}
        {viewMode === 'chapters' && <ChaptersView chapters={chapters} />}
        {viewMode === 'scriptures' && <ScripturesView />}
        {viewMode === 'concepts' && <ConceptsView />}
        {viewMode === 'diagrams' && <DiagramsView />}
        {viewMode === 'timeline' && <TimelineView />}
      </main>
    </div>
  );
}

// Tab Button Component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

function TabButton({ active, onClick, icon, label, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors
        ${active
          ? 'border-amber-600 text-amber-600'
          : 'border-transparent text-gray-600 hover:text-amber-600 hover:border-gray-300'
        }
      `}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
      {badge && (
        <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

// Overview View Component
function OverviewView({ metadata, chapters }: { metadata: any; chapters: any[] }) {
  return (
    <div className="space-y-8">
      {/* Historical Context */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Book className="w-6 h-6 text-amber-600" />
          Historical Context
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {metadata?.historical_context}
        </p>
      </section>

      {/* Theological Significance */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-600" />
          Theological Significance
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {metadata?.theological_significance}
        </p>
      </section>

      {/* Endorsements */}
      {metadata?.endorsements && metadata.endorsements.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Endorsements</h2>
          <div className="space-y-6">
            {metadata.endorsements.map((endorsement: any, index: number) => (
              <div key={index} className="border-l-4 border-amber-600 pl-4">
                <blockquote className="text-gray-700 italic mb-2">
                  "{endorsement.quote}"
                </blockquote>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">{endorsement.endorser}</p>
                  <p>{endorsement.role}</p>
                  <p className="text-xs mt-1">{endorsement.source} • {endorsement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          number={chapters.length}
          label="Chapters"
          icon={<ScrollText className="w-8 h-8 text-amber-600" />}
        />
        <StatCard
          number="100+"
          label="Scripture References"
          icon={<Book className="w-8 h-8 text-amber-600" />}
        />
        <StatCard
          number="10+"
          label="Theological Concepts"
          icon={<Lightbulb className="w-8 h-8 text-amber-600" />}
        />
        <StatCard
          number="1846"
          label="Published"
          icon={<Calendar className="w-8 h-8 text-amber-600" />}
        />
      </section>

      {/* Chapter Grid Preview */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-800 font-bold">{chapter.chapter_number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{chapter.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{chapter.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {chapter.key_themes?.slice(0, 2).map((theme: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({ number, label, icon }: { number: string | number; label: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{number}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

// Placeholder views (to be implemented)
function ChaptersView({ chapters }: { chapters: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Chapter Explorer</h2>
      <p className="text-gray-600">Detailed chapter-by-chapter analysis with expandable sections...</p>
      <div className="mt-4 grid gap-4">
        {chapters.map(chapter => (
          <div key={chapter.id} className="border rounded-lg p-4">
            <h3 className="font-bold">Chapter {chapter.chapter_number}: {chapter.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{chapter.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScripturesView() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Scripture Reference Index</h2>
      <p className="text-gray-600">Browse all 100+ scripture references used by Crosier, organized by Bible book...</p>
    </div>
  );
}

function ConceptsView() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Theological Concepts</h2>
      <p className="text-gray-600">Interactive concept map showing relationships between doctrinal themes...</p>
    </div>
  );
}

function DiagramsView() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Diagrams & Visualizations</h2>
      <p className="text-gray-600">Visual representations of sanctuary structure, ministry phases, and prophetic timelines...</p>
    </div>
  );
}

function TimelineView() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Historical Timeline</h2>
      <p className="text-gray-600">Timeline of events from 1844 Great Disappointment to publication...</p>
    </div>
  );
}
