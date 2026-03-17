import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, Link as LinkIcon } from 'lucide-react';

interface SymbolicMeaning {
  id: string;
  meaning_title: string;
  short_description: string;
  detailed_explanation: string;
  sda_theological_perspective?: string;
  eg_white_quote?: string;
  eg_white_reference?: string;
  related_sanctuary_concept?: string;
  practical_application?: string;
  tags?: string[];
}

interface SymbolicMeaningAccordionProps {
  meanings: SymbolicMeaning[];
  colorName: string;
  accentColor?: string;
}

export default function SymbolicMeaningAccordion({
  meanings,
  colorName,
  accentColor = '#3B82F6'
}: SymbolicMeaningAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleMeaning = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (!meanings || meanings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {meanings.map((meaning) => {
        const isExpanded = expandedIds.has(meaning.id);

        return (
          <div
            key={meaning.id}
            className="bg-white rounded-lg border-2 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            style={{ borderColor: isExpanded ? accentColor : '#E5E7EB' }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleMeaning(meaning.id)}
              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                {isExpanded ? (
                  <ChevronDown
                    className="w-5 h-5 mt-0.5 flex-shrink-0 transition-transform"
                    style={{ color: accentColor }}
                  />
                ) : (
                  <ChevronRight
                    className="w-5 h-5 mt-0.5 flex-shrink-0 transition-transform"
                    style={{ color: accentColor }}
                  />
                )}
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: accentColor }}
                  >
                    {meaning.meaning_title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {meaning.short_description}
                  </p>
                </div>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 space-y-6">
                {/* Detailed Explanation */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
                    <h4 className="font-semibold text-gray-900">Detailed Explanation</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {meaning.detailed_explanation}
                  </p>
                </div>

                {/* SDA Theological Perspective */}
                {meaning.sda_theological_perspective && (
                  <div
                    className="rounded-lg p-5 border-l-4"
                    style={{
                      backgroundColor: `${accentColor}10`,
                      borderColor: accentColor
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5" style={{ color: accentColor }} />
                      <h4 className="font-semibold text-gray-900">SDA Theological Perspective</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {meaning.sda_theological_perspective}
                    </p>
                  </div>
                )}

                {/* Ellen G. White Quote */}
                {meaning.eg_white_quote && (
                  <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-3">Ellen G. White</h4>
                    <blockquote className="text-gray-700 italic leading-relaxed mb-2">
                      "{meaning.eg_white_quote}"
                    </blockquote>
                    {meaning.eg_white_reference && (
                      <p className="text-sm text-amber-800 font-medium">
                        — {meaning.eg_white_reference}
                      </p>
                    )}
                  </div>
                )}

                {/* Related Sanctuary Concept */}
                {meaning.related_sanctuary_concept && (
                  <div className="flex items-start gap-3">
                    <LinkIcon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Related Sanctuary Concept</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {meaning.related_sanctuary_concept}
                      </p>
                    </div>
                  </div>
                )}

                {/* Practical Application */}
                {meaning.practical_application && (
                  <div
                    className="rounded-lg p-5"
                    style={{ backgroundColor: `${accentColor}08` }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">Practical Application</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {meaning.practical_application}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {meaning.tags && meaning.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {meaning.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
