/**
 * Main viewer component for Stephen N. Haskell's "The Cross and Its Shadow" book
 *
 * Provides comprehensive access to book content, including:
 * - Book overview and historical context
 * - Chapter navigation and reading
 * - Scripture reference index
 * - Theological concept explorer
 * - Interactive diagrams and visualizations
 */

import React, { useState } from 'react';
import { Book, ScrollText, Lightbulb, Map, Calendar, Search } from 'lucide-react';
import { useHaskellMetadata, useHaskellChapters } from '../hooks/useHaskellBook';
import { ScriptureExplorerView } from './ScriptureExplorerView';
import { ConceptsMapView } from './ConceptsMapView';
import { DiagramsView as DiagramsViewComponent } from './DiagramsView';
import { TimelineView as TimelineViewComponent } from './TimelineView';

type ViewMode = 'overview' | 'chapters' | 'scriptures' | 'concepts' | 'diagrams' | 'timeline';

export function HaskellBookViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const { metadata, loading: metadataLoading } = useHaskellMetadata();
  const { chapters, loading: chaptersLoading } = useHaskellChapters();

  if (metadataLoading || chaptersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sanctuary doctrine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="hidden sm:block flex-shrink-0">
              <div className="w-20 h-28 sm:w-24 sm:h-32 bg-blue-700 rounded-lg shadow-xl flex items-center justify-center">
                <Book className="w-10 h-10 sm:w-12 sm:h-12 text-blue-200" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 break-words">{metadata?.title || 'The Cross and Its Shadow'}</h1>
              <p className="text-lg sm:text-xl text-blue-200 mb-3">By {metadata?.author || 'Stephen N. Haskell'}</p>
              <p className="text-xs sm:text-sm text-blue-100 mb-2">
                Originally published: 1896-1914 • Comprehensive Sanctuary Study
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-2 sm:px-3 py-1 bg-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                  Historical Document
                </span>
                <span className="px-2 sm:px-3 py-1 bg-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                  Sanctuary Doctrine
                </span>
                <span className="px-2 sm:px-3 py-1 bg-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                  Type & Antitype
                </span>
                <span className="px-2 sm:px-3 py-1 bg-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                  Levitical Services
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-thin">
            <TabButton
              active={viewMode === 'overview'}
              onClick={() => setViewMode('overview')}
              icon={<Book className="w-4 h-4 flex-shrink-0" />}
              label="Overview"
            />
            <TabButton
              active={viewMode === 'chapters'}
              onClick={() => setViewMode('chapters')}
              icon={<ScrollText className="w-4 h-4 flex-shrink-0" />}
              label="Chapters"
              badge={chapters.length.toString()}
            />
            <TabButton
              active={viewMode === 'scriptures'}
              onClick={() => setViewMode('scriptures')}
              icon={<Book className="w-4 h-4 flex-shrink-0" />}
              label="Scriptures"
            />
            <TabButton
              active={viewMode === 'concepts'}
              onClick={() => setViewMode('concepts')}
              icon={<Lightbulb className="w-4 h-4 flex-shrink-0" />}
              label="Concepts"
            />
            <TabButton
              active={viewMode === 'diagrams'}
              onClick={() => setViewMode('diagrams')}
              icon={<Map className="w-4 h-4 flex-shrink-0" />}
              label="Diagrams"
            />
            <TabButton
              active={viewMode === 'timeline'}
              onClick={() => setViewMode('timeline')}
              icon={<Calendar className="w-4 h-4 flex-shrink-0" />}
              label="Timeline"
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={viewMode === 'overview' || viewMode === 'chapters' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}>
        {viewMode === 'overview' && <OverviewView metadata={metadata} chapters={chapters} />}
        {viewMode === 'chapters' && <ChaptersView chapters={chapters} />}
        {viewMode === 'scriptures' && <ScriptureExplorerView />}
        {viewMode === 'concepts' && <ConceptsMapView />}
        {viewMode === 'diagrams' && <DiagramsViewComponent />}
        {viewMode === 'timeline' && <TimelineViewComponent />}
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
        flex items-center gap-2 px-3 sm:px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
        ${active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
        }
      `}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
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
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Book className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          <span>Historical Context</span>
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {metadata?.historical_context || `Stephen N. Haskell's "The Cross and Its Shadow" is a comprehensive study of the Old Testament sanctuary and its services, demonstrating how they prefigured Christ's ministry. Written between 1896-1914, this work became one of the most influential sanctuary studies in Seventh-day Adventist literature. Haskell, a pioneer minister and close associate of Ellen G. White, meticulously examined each aspect of the Levitical system, revealing the gospel in types and shadows. His work has educated generations of Bible students on the profound connections between the earthly sanctuary services and Christ's heavenly ministry.`}
        </p>
      </section>

      {/* Theological Significance */}
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          <span>Theological Significance</span>
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {metadata?.theological_significance || `This work represents a detailed typological study showing how every element of the sanctuary—from the court to the Most Holy Place—points to Christ and His redemptive work. Haskell systematically explores: (1) The sanctuary structure and its heavenly counterpart; (2) The priesthood and Christ's high priestly ministry; (3) The offerings and their fulfillment in Christ's sacrifice; (4) The feasts and their prophetic significance; (5) The furniture and its symbolic meaning. The book emphasizes that the entire Levitical system was designed by God as a visual gospel, teaching Israel (and us) about salvation, sanctification, and the plan of redemption.`}
        </p>
      </section>

      {/* Endorsements */}
      {metadata?.endorsements && metadata.endorsements.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Endorsements</h2>
          <div className="space-y-6">
            {metadata.endorsements.map((endorsement: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <blockquote className="text-gray-700 italic mb-2 text-sm sm:text-base">
                  "{endorsement.quote}"
                </blockquote>
                <div className="text-xs sm:text-sm text-gray-600">
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
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          number={chapters.length}
          label="Chapters"
          icon={<ScrollText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
        />
        <StatCard
          number="200+"
          label="Scripture References"
          icon={<Book className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
        />
        <StatCard
          number="15+"
          label="Theological Concepts"
          icon={<Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
        />
        <StatCard
          number="1896"
          label="Published"
          icon={<Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
        />
      </section>

      {/* Chapter Grid Preview */}
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-800 font-bold text-sm sm:text-base">{chapter.chapter_number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base break-words">{chapter.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{chapter.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {chapter.key_themes?.slice(0, 2).map((theme: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded whitespace-nowrap">
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
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900">{number}</div>
      <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

// Chapters View Component
function ChaptersView({ chapters }: { chapters: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Chapter Explorer</h2>
      <p className="text-gray-600 mb-4 text-sm sm:text-base">Detailed chapter-by-chapter analysis with expandable sections...</p>
      <div className="mt-4 grid gap-3 sm:gap-4">
        {chapters.map(chapter => (
          <div key={chapter.id} className="border rounded-lg p-3 sm:p-4 hover:border-blue-600 hover:shadow-sm transition-all">
            <h3 className="font-bold text-sm sm:text-base">Chapter {chapter.chapter_number}: {chapter.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">{chapter.summary}</p>
            {chapter.key_themes && chapter.key_themes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {chapter.key_themes.map((theme: string, i: number) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
