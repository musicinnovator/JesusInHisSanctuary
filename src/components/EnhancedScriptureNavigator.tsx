import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Search, Link2, Languages, Maximize, RotateCcw, AlertCircle } from 'lucide-react';
import DonationBanner from './DonationBanner';
import BabylonScene from './BabylonScene';
import SanctuaryImagePanel from './SanctuaryImagePanel';
import { errorHandler, withErrorHandling, getErrorMessage } from '../utils/errorHandling';

const EnhancedScriptureNavigator = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('KJV');
  const [selectedPassage, setSelectedPassage] = useState('');
  const [highlightedElement, setHighlightedElement] = useState('');
  const [currentModelId, setCurrentModelId] = useState('tabernacle');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const babylonContainerRef = useRef<HTMLDivElement>(null);
  const babylonSceneRef = useRef<any>(null);

  const translations = ['KJV', 'NIV', 'ESV', 'NASB', 'NKJV'];

  const sanctuaryPassages = [
    { ref: 'Exodus 25:10-22', title: 'The Ark of the Covenant', element: 'ark', modelId: 'tabernacle' },
    { ref: 'Exodus 25:23-30', title: 'Table of Showbread', element: 'table_showbread', modelId: 'tabernacle' },
    { ref: 'Exodus 25:31-40', title: 'Golden Lampstand', element: 'lampstand', modelId: 'tabernacle' },
    { ref: 'Exodus 27:1-8', title: 'Bronze Altar', element: 'altar_burnt', modelId: 'tabernacle' },
    { ref: 'Exodus 30:1-10', title: 'Altar of Incense', element: 'incense_altar', modelId: 'tabernacle' },
    { ref: 'Exodus 30:17-21', title: 'Bronze Laver', element: 'laver', modelId: 'tabernacle' },
    { ref: 'Exodus 26:1-37', title: 'Tabernacle Structure', element: 'curtains', modelId: 'tabernacle' },
    { ref: 'Exodus 27:9-19', title: 'The Courtyard', element: 'courtyard', modelId: 'tabernacle' },
    { ref: '1 Kings 6:1-38', title: 'Solomon\'s Temple', element: 'jachin_boaz', modelId: 'solomon' },
    { ref: '1 Kings 7:15-51', title: 'Temple Furnishings', element: 'sea', modelId: 'solomon' },
    { ref: 'Hebrews 9:1-28', title: 'Heavenly Sanctuary', element: 'throne', modelId: 'heavenly' },
    { ref: 'Revelation 4:1-11', title: 'Throne Room Vision', element: 'throne', modelId: 'heavenly' }
  ];

  const handleResetView = useCallback(withErrorHandling(() => {
    try {
      setSelectedPassage('');
      setHighlightedElement('');
      setCurrentModelId('tabernacle');
      setError(null);

      if (babylonSceneRef.current && typeof babylonSceneRef.current.resetCamera === 'function') {
        babylonSceneRef.current.resetCamera();
      }
    } catch (err) {
      const error = errorHandler.handleCameraResetError(err as Error);
      setError(error.userMessage || error.message);
    }
  }, 'Reset View'), []);

  const handleFullScreen = useCallback(withErrorHandling(async () => {
    try {
      const container = babylonContainerRef.current;
      if (!container) {
        throw new Error('3D container not found');
      }

      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
          setIsFullscreen(true);
        } else {
          throw errorHandler.handleFullscreenError();
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      errorHandler.logError(err as Error, 'Fullscreen');
    }
  }, 'Fullscreen Toggle'), []);

  const handlePassageSelect = useCallback(withErrorHandling((passage: typeof sanctuaryPassages[0]) => {
    try {
      setIsLoading(true);
      setError(null);

      setSelectedPassage(passage.ref);
      setHighlightedElement(passage.element);
      setCurrentModelId(passage.modelId);
    } catch (err) {
      setError(getErrorMessage(err));
      errorHandler.logError(err as Error, 'Passage Select');
    } finally {
      setIsLoading(false);
    }
  }, 'Passage Selection'), []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start space-x-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="text-red-800 font-semibold mb-1">Error</h4>
        <p className="text-red-700 text-sm">{message}</p>
        <button
          onClick={() => setError(null)}
          className="text-red-600 text-sm underline mt-2 hover:text-red-800"
        >
          Dismiss
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      <div className="bg-sanctuary-gold text-sanctuary-purple py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpen className="w-12 h-12 text-sanctuary-brass" />
            <div>
              <h1 className="text-4xl font-bold">Scripture Navigator</h1>
              <p className="text-sanctuary-brass text-lg">Linking Biblical Texts to 3D Sanctuary Models</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorDisplay message={error} />}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span>Bible Translation</span>
              </h3>
              <select
                value={selectedTranslation}
                onChange={(e) => setSelectedTranslation(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-gold focus:outline-none"
                aria-label="Select Bible translation"
              >
                {translations.map((translation) => (
                  <option key={translation} value={translation}>{translation}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Select Passage</span>
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sanctuaryPassages.map((passage) => (
                  <button
                    key={passage.ref}
                    onClick={() => handlePassageSelect(passage)}
                    disabled={isLoading}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPassage === passage.ref
                        ? 'bg-sanctuary-gold text-sanctuary-purple'
                        : 'bg-sanctuary-linen hover:bg-sanctuary-gold/20 text-sanctuary-purple'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Select ${passage.title}`}
                  >
                    <div className="font-medium">{passage.ref}</div>
                    <div className="text-sm opacity-80">{passage.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedPassage && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">
                  {selectedPassage} ({selectedTranslation})
                </h3>
                <div className="bg-sanctuary-linen rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-sanctuary-purple text-sm leading-relaxed">
                    Scripture text will be dynamically loaded from the database in future updates.
                    Full text integration with all 44+ passages is part of the expansion roadmap.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-sanctuary-silver">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Cross References</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Hebrews 9:4</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Revelation 11:19</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">1 Kings 8:9</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-sanctuary-purple text-white p-4 flex items-center justify-between">
                <h3 className="font-semibold">Interactive Sanctuary Model</h3>
                <div className="flex items-center space-x-2">
                  <Link2 className="w-5 h-5" />
                  <span className="text-sm">Scripture-Linked Elements</span>
                </div>
              </div>

              <div
                ref={babylonContainerRef}
                className="relative h-96 lg:h-[600px] bg-sanctuary-linen-dark"
              >
                <BabylonScene
                  modelId={currentModelId}
                  onComponentClick={(componentId) => {
                    const passage = sanctuaryPassages.find(p => p.element === componentId);
                    if (passage) {
                      handlePassageSelect(passage);
                    }
                  }}
                  highlightedComponent={highlightedElement}
                  className="w-full h-full"
                />

                {highlightedElement && (
                  <div className="absolute top-4 left-4 bg-sanctuary-gold/95 text-sanctuary-purple px-4 py-2 rounded-lg shadow-lg max-w-xs">
                    <p className="font-semibold">
                      {sanctuaryPassages.find(p => p.element === highlightedElement)?.title}
                    </p>
                    <p className="text-xs opacity-90">
                      {sanctuaryPassages.find(p => p.element === highlightedElement)?.ref}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-sanctuary-linen p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleResetView}
                    className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-blue text-white rounded-lg text-sm hover:bg-sanctuary-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-sanctuary-blue"
                    aria-label="Reset camera view"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset View</span>
                  </button>
                  <button
                    onClick={handleFullScreen}
                    className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-gold text-sanctuary-purple rounded-lg text-sm hover:bg-sanctuary-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-sanctuary-gold"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    <Maximize className="w-4 h-4" />
                    <span>{isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}</span>
                  </button>
                </div>
                <div className="text-sm text-sanctuary-brass">
                  Use mouse to rotate • Scroll to zoom • Click elements for details
                </div>
              </div>
            </div>

            {selectedPassage && (
              <>
                <SanctuaryImagePanel
                  passageRef={selectedPassage}
                  title={sanctuaryPassages.find(p => p.ref === selectedPassage)?.title || ''}
                />

                <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                  <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Hebrew/Greek Word Study</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-sanctuary-linen rounded-lg p-4">
                      <h4 className="font-semibold text-sanctuary-purple mb-2">Key Hebrew Words</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-sanctuary-blue">אָרוֹן (aron)</span>
                          <p className="text-sm text-sanctuary-brass">Ark, chest, coffin - Strong's H727</p>
                        </div>
                        <div>
                          <span className="font-medium text-sanctuary-blue">כַּפֹּרֶת (kapporet)</span>
                          <p className="text-sm text-sanctuary-brass">Mercy seat, atonement cover - Strong's H3727</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-sanctuary-linen rounded-lg p-4">
                      <h4 className="font-semibold text-sanctuary-purple mb-2">Theological Significance</h4>
                      <p className="text-sm text-sanctuary-brass">
                        The ark represents God's throne on earth, where His presence dwells among His people.
                        The mercy seat symbolizes the place where divine justice and mercy meet.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedScriptureNavigator;
