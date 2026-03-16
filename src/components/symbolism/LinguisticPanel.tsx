import React, { useState } from 'react';
import { Languages, Book, TrendingUp, Globe } from 'lucide-react';
import {
  useWordStudies,
  useEtymology,
  useSemanticRanges,
} from '../../hooks/useSymbolismAdvanced';
import type { BiblicalLanguage } from '../../types/symbolismAdvanced';

interface LinguisticPanelProps {
  symbolId: string;
}

export function LinguisticPanel({ symbolId }: LinguisticPanelProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<BiblicalLanguage | ''>('');
  const [selectedWordStudyId, setSelectedWordStudyId] = useState<string>('');

  const { wordStudies, loading: wordsLoading } = useWordStudies(symbolId, {
    language: selectedLanguage || undefined,
  });
  const { etymology, loading: etymologyLoading } = useEtymology(selectedWordStudyId);
  const { ranges, loading: rangesLoading } = useSemanticRanges(selectedWordStudyId);

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'hebrew':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'aramaic':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'greek':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (wordsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Linguistic Deep Dive</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Language
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as any)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        >
          <option value="">All Languages</option>
          <option value="hebrew">Hebrew</option>
          <option value="aramaic">Aramaic</option>
          <option value="greek">Greek</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {wordStudies.map((word) => (
          <div
            key={word.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedWordStudyId === word.id
                ? 'ring-2 ring-amber-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedWordStudyId(word.id)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg text-amber-700">
                <Languages className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded uppercase ${getLanguageColor(
                      word.language
                    )}`}
                  >
                    {word.language}
                  </span>
                  {word.testament && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                      {word.testament}
                    </span>
                  )}
                  {word.strongs_number && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                      Strong's {word.strongs_number}
                    </span>
                  )}
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-2">{word.original_word}</h4>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Transliteration</div>
                    <div className="text-lg font-medium text-gray-900">
                      {word.transliteration}
                    </div>
                  </div>
                  {word.pronunciation_ipa && (
                    <div>
                      <div className="text-sm text-gray-500">Pronunciation (IPA)</div>
                      <div className="text-lg font-medium text-gray-900">
                        {word.pronunciation_ipa}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  {word.root_word && (
                    <div>
                      <div className="text-sm text-gray-500">Root</div>
                      <div className="font-medium text-gray-900">{word.root_word}</div>
                    </div>
                  )}
                  {word.part_of_speech && (
                    <div>
                      <div className="text-sm text-gray-500">Part of Speech</div>
                      <div className="font-medium text-gray-900">{word.part_of_speech}</div>
                    </div>
                  )}
                  {word.total_occurrences && (
                    <div>
                      <div className="text-sm text-gray-500">Total Occurrences</div>
                      <div className="font-medium text-gray-900">{word.total_occurrences}</div>
                    </div>
                  )}
                </div>

                {(word.first_occurrence || word.last_occurrence) && (
                  <div className="grid md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                    {word.first_occurrence && (
                      <div>
                        <div className="text-sm text-gray-500">First Occurrence</div>
                        <div className="text-sm font-medium text-blue-600">
                          {word.first_occurrence}
                        </div>
                      </div>
                    )}
                    {word.last_occurrence && (
                      <div>
                        <div className="text-sm text-gray-500">Last Occurrence</div>
                        <div className="text-sm font-medium text-blue-600">
                          {word.last_occurrence}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedWordStudyId === word.id && (
              <div className="mt-6 space-y-6 border-t pt-6">
                {etymologyLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                  </div>
                ) : etymology ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h5 className="text-lg font-semibold text-gray-900">Etymology</h5>
                    </div>

                    {etymology.etymological_origin && (
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h6 className="font-semibold text-purple-900 mb-2">Origin</h6>
                        <p className="text-gray-700">{etymology.etymological_origin}</p>
                      </div>
                    )}

                    {etymology.cognate_languages && etymology.cognate_languages.length > 0 && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h6 className="font-semibold text-blue-900 mb-3">Cognate Languages</h6>
                        <div className="space-y-2">
                          {etymology.cognate_languages.map((cognate: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Globe className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {cognate.language}: {cognate.word}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {cognate.transliteration} - {cognate.meaning}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {etymology.historical_development && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h6 className="font-semibold text-green-900 mb-2">
                          Historical Development
                        </h6>
                        <p className="text-gray-700">{etymology.historical_development}</p>
                      </div>
                    )}

                    {etymology.cultural_context && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h6 className="font-semibold text-amber-900 mb-2">Cultural Context</h6>
                        <p className="text-gray-700">{etymology.cultural_context}</p>
                      </div>
                    )}

                    {etymology.meaning_evolution && (
                      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <h6 className="font-semibold text-indigo-900 mb-2">Meaning Evolution</h6>
                        <p className="text-gray-700">{etymology.meaning_evolution}</p>
                      </div>
                    )}
                  </div>
                ) : null}

                {rangesLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                  </div>
                ) : ranges.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Book className="w-5 h-5 text-green-600" />
                      <h5 className="text-lg font-semibold text-gray-900">Semantic Ranges</h5>
                    </div>

                    {ranges.map((range, idx) => (
                      <div key={range.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                            Context {idx + 1}
                          </span>
                          <h6 className="font-semibold text-gray-900">{range.meaning_category}</h6>
                        </div>

                        <p className="text-gray-900 mb-3">{range.definition}</p>

                        {range.usage_context && (
                          <p className="text-sm text-gray-600 mb-3 italic">
                            Usage: {range.usage_context}
                          </p>
                        )}

                        {range.example_verses && range.example_verses.length > 0 && (
                          <div className="mb-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              Example Verses:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {range.example_verses.map((verse) => (
                                <span
                                  key={verse}
                                  className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded"
                                >
                                  {verse}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {range.theological_significance && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                            <div className="text-sm font-medium text-amber-900 mb-1">
                              Theological Significance
                            </div>
                            <p className="text-sm text-gray-700">
                              {range.theological_significance}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {wordStudies.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Languages className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No word studies found for this symbol.</p>
        </div>
      )}
    </div>
  );
}
