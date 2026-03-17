import { useState } from 'react';
import { X, BookOpen, Copy, Check, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ScriptureText {
  id: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  translation: string;
  text_content: string;
  context_before?: string;
  context_after?: string;
  key_phrases?: string[];
  theological_notes?: string;
  cross_references?: string[];
}

interface ScriptureViewerProps {
  scripture: ScriptureText;
  onClose: () => void;
  accentColor?: string;
}

export default function ScriptureViewer({
  scripture,
  onClose,
  accentColor = '#3B82F6'
}: ScriptureViewerProps) {
  const [selectedTranslation, setSelectedTranslation] = useState(scripture.translation);
  const [showContext, setShowContext] = useState(false);
  const [copied, setCopied] = useState(false);

  const translations = ['KJV', 'NKJV', 'ESV', 'NIV'];

  const getReference = () => {
    const verseRef = scripture.verse_end
      ? `${scripture.verse_start}-${scripture.verse_end}`
      : `${scripture.verse_start}`;
    return `${scripture.book} ${scripture.chapter}:${verseRef}`;
  };

  const handleCopy = async () => {
    const textToCopy = `${scripture.text_content}\n\n— ${getReference()} (${selectedTranslation})`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightKeyPhrases = (text: string) => {
    if (!scripture.key_phrases || scripture.key_phrases.length === 0) {
      return text;
    }

    let highlightedText = text;
    scripture.key_phrases.forEach(phrase => {
      const regex = new RegExp(`(${phrase})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-yellow-200 px-1 rounded">$1</mark>`
      );
    });

    return highlightedText;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" style={{ color: accentColor }} />
            <div>
              <h3 className="font-bold text-lg text-gray-900">{getReference()}</h3>
              <p className="text-sm text-gray-600">{selectedTranslation} Translation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Translation Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Translation:</span>
            {translations.map(trans => (
              <button
                key={trans}
                onClick={() => setSelectedTranslation(trans)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTranslation === trans
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  selectedTranslation === trans
                    ? { backgroundColor: accentColor }
                    : undefined
                }
              >
                {trans}
              </button>
            ))}
          </div>

          {/* Context Before */}
          {showContext && scripture.context_before && (
            <div className="text-gray-500 italic text-sm leading-relaxed border-l-2 border-gray-300 pl-4">
              ...{scripture.context_before}
            </div>
          )}

          {/* Main Scripture Text */}
          <div className="bg-gray-50 rounded-lg p-6 border-2" style={{ borderColor: accentColor }}>
            <p
              className="text-lg leading-relaxed text-gray-800"
              dangerouslySetInnerHTML={{ __html: highlightKeyPhrases(scripture.text_content) }}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: accentColor }}>
                {getReference()} ({selectedTranslation})
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors text-sm font-medium"
                style={{ color: accentColor }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Context After */}
          {showContext && scripture.context_after && (
            <div className="text-gray-500 italic text-sm leading-relaxed border-l-2 border-gray-300 pl-4">
              {scripture.context_after}...
            </div>
          )}

          {/* Context Toggle */}
          {(scripture.context_before || scripture.context_after) && (
            <button
              onClick={() => setShowContext(!showContext)}
              className="text-sm font-medium hover:underline"
              style={{ color: accentColor }}
            >
              {showContext ? 'Hide' : 'Show'} surrounding context
            </button>
          )}

          {/* Theological Notes */}
          {scripture.theological_notes && (
            <div
              className="rounded-lg p-5 border-l-4"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: accentColor
              }}
            >
              <h4 className="font-semibold text-gray-900 mb-2">Theological Notes</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {scripture.theological_notes}
              </p>
            </div>
          )}

          {/* Cross References */}
          {scripture.cross_references && scripture.cross_references.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" style={{ color: accentColor }} />
                Cross References
              </h4>
              <div className="flex flex-wrap gap-2">
                {scripture.cross_references.map((ref, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              onClick={() => {/* Navigate to previous verse */}}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Verse
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              onClick={() => {/* Navigate to next verse */}}
            >
              Next Verse
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
