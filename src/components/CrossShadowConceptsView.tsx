import React, { useState } from 'react';
import { Network, Filter, Lightbulb, ArrowRight, Book, Cross, Sparkles } from 'lucide-react';
import { useCrossShadowConcepts } from '../hooks/useCrossShadowBook';

export function CrossShadowConceptsView() {
  const { concepts, relationships, loading } = useCrossShadowConcepts();
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading theological concepts...</p>
        </div>
      </div>
    );
  }

  // Get unique concept types
  const conceptTypes = Array.from(new Set(concepts.map(c => c.concept_type)));

  // Filter concepts
  const filteredConcepts = concepts.filter(concept => {
    return filterType === 'All' || concept.concept_type === filterType;
  });

  // Get selected concept details
  const selected = concepts.find(c => c.id === selectedConcept);

  // Get relationships for selected concept
  const relatedConcepts = selected
    ? relationships
        .filter(r => r.concept_from_id === selected.id || r.concept_to_id === selected.id)
        .map(r => {
          const isSource = r.concept_from_id === selected.id;
          const targetId = isSource ? r.concept_to_id : r.concept_from_id;
          const targetConcept = concepts.find(c => c.id === targetId);
          return {
            ...r,
            targetConcept,
            direction: isSource ? 'outgoing' : 'incoming'
          };
        })
    : [];

  // Get concept icon and color
  const getConceptStyle = (type: string) => {
    switch (type) {
      case 'type':
        return { icon: Book, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-100', text: 'text-amber-800' };
      case 'antitype':
        return { icon: Cross, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-100', text: 'text-purple-800' };
      case 'doctrine':
        return { icon: Lightbulb, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'symbol':
        return { icon: Sparkles, color: 'from-green-500 to-emerald-500', bg: 'bg-green-100', text: 'text-green-800' };
      case 'prophecy':
        return { icon: Book, color: 'from-red-500 to-rose-500', bg: 'bg-red-100', text: 'text-red-800' };
      case 'teaching':
        return { icon: Lightbulb, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-100', text: 'text-indigo-800' };
      default:
        return { icon: Sparkles, color: 'from-gray-500 to-gray-600', bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl">
              <Network className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Theological Concepts</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the typological relationships between Old Testament shadows and New Testament realities. {concepts.length} interconnected concepts revealing God's plan of redemption.
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-100">
          <div className="flex items-center gap-4">
            <Filter className="text-purple-500 w-6 h-6 flex-shrink-0" />
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setFilterType('All')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === 'All'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({concepts.length})
              </button>
              {conceptTypes.map(type => {
                const count = concepts.filter(c => c.concept_type === type).length;
                const style = getConceptStyle(type);
                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      filterType === type
                        ? `bg-gradient-to-r ${style.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Concepts List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Concepts</h2>
            <div className="space-y-3">
              {filteredConcepts.map(concept => {
                const style = getConceptStyle(concept.concept_type);
                const Icon = style.icon;
                const isSelected = selectedConcept === concept.id;

                return (
                  <div
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept.id)}
                    className={`bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'border-purple-500 shadow-2xl'
                        : 'border-transparent hover:border-purple-200 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`bg-gradient-to-br ${style.color} p-3 rounded-xl flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{concept.concept_name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
                            {concept.concept_type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{concept.description}</p>
                        {concept.old_testament_type && concept.new_testament_antitype && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">
                              Type: {concept.old_testament_type}
                            </span>
                            <ArrowRight className="w-3 h-3" />
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              Antitype: {concept.new_testament_antitype}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Concept Details */}
          <div className="lg:sticky lg:top-8 h-fit">
            {selected ? (
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${getConceptStyle(selected.concept_type).color} px-6 py-6`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {React.createElement(getConceptStyle(selected.concept_type).icon, {
                        className: 'w-8 h-8 text-white'
                      })}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{selected.concept_name}</h2>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium capitalize">
                        {selected.concept_type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selected.description}</p>
                  </div>

                  {/* Typology */}
                  {selected.old_testament_type && selected.new_testament_antitype && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Typological Relationship</h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-amber-400 bg-amber-50 p-4 rounded-r-xl">
                          <div className="text-sm font-semibold text-amber-800 mb-1">Old Testament Type</div>
                          <div className="text-gray-700">{selected.old_testament_type}</div>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="border-l-4 border-purple-400 bg-purple-50 p-4 rounded-r-xl">
                          <div className="text-sm font-semibold text-purple-800 mb-1">New Testament Antitype</div>
                          <div className="text-gray-700">{selected.new_testament_antitype}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Significance */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Significance</h3>
                    <p className="text-gray-700 leading-relaxed">{selected.significance}</p>
                  </div>

                  {/* Scripture Foundation */}
                  {selected.scripture_foundation && selected.scripture_foundation.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Scripture Foundation</h3>
                      <div className="flex flex-wrap gap-2">
                        {selected.scripture_foundation.map((ref, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Chapters */}
                  {selected.related_chapters && selected.related_chapters.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Related Chapters</h3>
                      <div className="flex flex-wrap gap-2">
                        {selected.related_chapters.map((ch, idx) => (
                          <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Chapter {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Relationships */}
                  {relatedConcepts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Relationships</h3>
                      <div className="space-y-3">
                        {relatedConcepts.map((rel, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-100">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                                {rel.relationship_type}
                              </span>
                              <ArrowRight className="w-4 h-4 text-purple-500" />
                              <span className="font-semibold text-gray-900">{rel.targetConcept?.concept_name}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{rel.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-purple-100">
                <Network className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a concept to view details and relationships</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
