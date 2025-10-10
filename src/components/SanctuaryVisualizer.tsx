import React from 'react';

interface SanctuaryVisualizerProps {
  sanctuaryId: string;
  layer: string;
  showAnnotations: boolean;
  onAnnotationClick?: (annotation: string) => void;
}

const SanctuaryVisualizer: React.FC<SanctuaryVisualizerProps> = ({
  sanctuaryId,
  layer,
  showAnnotations,
  onAnnotationClick
}) => {
  const renderWildernessTabernacle = () => {
    if (layer === 'outer' || layer === 'all') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-400"></div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
            <div className="absolute top-1/3 left-1/4 right-1/4 h-32 bg-gradient-to-b from-gray-100 via-white to-gray-200 border-l-4 border-r-4 border-yellow-700 opacity-90"></div>
            <div className="absolute top-1/3 left-8 h-32 w-24 bg-gradient-to-r from-gray-200 via-white to-gray-100 opacity-70" style={{ transform: 'rotateY(-75deg)' }}></div>
            <div className="absolute top-1/3 right-8 h-32 w-24 bg-gradient-to-l from-gray-200 via-white to-gray-100 opacity-70" style={{ transform: 'rotateY(75deg)' }}></div>
            {(layer === 'furnishings' || layer === 'all') && (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                  <div className="w-20 h-16 bg-gradient-to-br from-yellow-700 via-amber-700 to-yellow-800 rounded shadow-2xl border-2 border-yellow-900" style={{ transform: 'perspective(500px) rotateX(20deg)' }}>
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Bronze Altar: Used for burnt offerings and sacrifices')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Bronze Altar
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute top-2/3 right-1/3 transform translate-x-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-800 rounded-full shadow-xl border-2 border-yellow-900">
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Bronze Laver: For priestly cleansing and purification')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Laver
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-gradient-to-t from-blue-700 via-purple-600 to-red-500 opacity-80"></div>
          </div>
        </div>
      );
    }

    if (layer === 'holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-800">
          <div className="absolute inset-0" style={{ perspective: '600px' }}>
            {(layer === 'furnishings' || layer === 'holy') && (
              <>
                <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
                  <div className="relative w-16 h-24">
                    <div className="absolute left-1/2 bottom-0 w-2 h-24 bg-gradient-to-t from-yellow-600 to-yellow-400 transform -translate-x-1/2"></div>
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Golden Candlestick: Seven-branched menorah representing divine light')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Menorah
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                  <div className="w-20 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-2xl">
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Table of Showbread: 12 loaves representing the 12 tribes')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Showbread
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-20 bg-gradient-to-b from-yellow-400 to-yellow-700 shadow-2xl">
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Altar of Incense: Sweet incense representing prayers of the saints')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Incense
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    if (layer === 'most-holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 via-amber-700 to-yellow-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-radial from-yellow-200 via-yellow-400/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          </div>
          {(layer === 'furnishings' || layer === 'most-holy') && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
              <div className="w-24 h-20 bg-gradient-to-br from-yellow-400 via-amber-600 to-yellow-700 shadow-2xl border-3 border-yellow-800 rounded-sm">
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('Ark of Covenant: Contains Ten Commandments, mercy seat where God meets humanity')}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                  >
                    Ark of Covenant
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderSolomonsTemple = () => {
    if (layer === 'outer' || layer === 'all') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-sky-500 to-blue-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-stone-300 via-stone-400 to-stone-500"></div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '900px' }}>
            <div className="absolute top-1/4 left-1/4 right-1/4 h-40 bg-gradient-to-b from-stone-600 via-stone-500 to-stone-600 border-l-4 border-r-4 border-amber-900" style={{ transform: 'rotateY(0deg) translateZ(-60px)' }}></div>
            <div className="absolute top-1/4 left-6 h-40 w-32 bg-gradient-to-r from-stone-700 to-stone-500 opacity-80" style={{ transform: 'rotateY(-80deg)' }}></div>
            <div className="absolute top-1/4 right-6 h-40 w-32 bg-gradient-to-l from-stone-700 to-stone-500 opacity-80" style={{ transform: 'rotateY(80deg)' }}></div>
            {(layer === 'furnishings' || layer === 'all') && (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                  <div className="w-28 h-24 bg-gradient-to-br from-yellow-700 via-amber-700 to-yellow-800 shadow-2xl border-3 border-yellow-900" style={{ transform: 'perspective(500px) rotateX(20deg)' }}>
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Bronze Altar: Larger than tabernacle, 20x20x10 cubits')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Bronze Altar
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute top-2/3 right-1/4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-2xl">
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Molten Sea: Massive bronze basin held by 12 bronze oxen')}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Molten Sea
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="absolute top-1/3 left-16 w-4 h-40 bg-gradient-to-b from-amber-700 to-yellow-800 shadow-md"></div>
            <div className="absolute top-1/3 right-16 w-4 h-40 bg-gradient-to-b from-amber-700 to-yellow-800 shadow-md">
              {showAnnotations && (
                <button
                  onClick={() => onAnnotationClick?.('Pillars Jachin & Boaz: Massive bronze pillars at entrance')}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                >
                  Jachin & Boaz
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (layer === 'holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-900">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800/80 to-yellow-900/80"></div>
          {(layer === 'furnishings' || layer === 'holy') && (
            <div className="absolute inset-0" style={{ perspective: '700px' }}>
              <div className="absolute top-1/2 left-12 transform -translate-y-1/2">
                <div className="w-20 h-32 bg-gradient-to-t from-yellow-700 to-yellow-400 shadow-2xl">
                  {showAnnotations && (
                    <button
                      onClick={() => onAnnotationClick?.('Ten Golden Candlesticks: Five on each side')}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                    >
                      10 Lamps
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
                <div className="w-24 h-16 bg-gradient-to-br from-yellow-500 to-yellow-800 shadow-2xl">
                  {showAnnotations && (
                    <button
                      onClick={() => onAnnotationClick?.('Table of Showbread: Cedar overlaid with gold')}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                    >
                      Showbread
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (layer === 'most-holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 via-amber-800 to-yellow-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 bg-gradient-radial from-yellow-200 via-yellow-500/50 to-transparent rounded-full blur-3xl"></div>
          </div>
          {(layer === 'furnishings' || layer === 'most-holy') && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
              <div className="w-32 h-24 bg-gradient-to-br from-yellow-400 to-yellow-800 shadow-2xl border-4 border-yellow-900">
                <div className="absolute -top-8 left-4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-600 opacity-90" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute -top-8 right-4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-600 opacity-90" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('Ark of Covenant: Perfect cube room 20x20x20 cubits, overlaid with gold')}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                  >
                    Ark of Covenant
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderZerubbabelTemple = () => {
    if (layer === 'outer' || layer === 'all') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-slate-400 to-gray-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-stone-400 to-stone-600"></div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
            <div className="absolute top-1/3 left-1/4 right-1/4 h-32 bg-gradient-to-b from-stone-500 to-stone-600 border-2 border-stone-700" style={{ transform: 'translateZ(-50px)' }}></div>
            {(layer === 'furnishings' || layer === 'all') && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                <div className="w-24 h-20 bg-gradient-to-br from-yellow-700 to-amber-800 shadow-xl border-2 border-yellow-900">
                  {showAnnotations && (
                    <button
                      onClick={() => onAnnotationClick?.('Rebuilt Altar: Reconstructed on original foundation')}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                    >
                      Rebuilt Altar
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-t from-stone-700 to-stone-600 border-2 border-stone-800"></div>
          </div>
        </div>
      );
    }

    if (layer === 'holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-600 via-slate-700 to-stone-800">
          {(layer === 'furnishings' || layer === 'holy') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-28 bg-gradient-to-t from-yellow-700 to-yellow-500 mx-auto mb-4 shadow-lg"></div>
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('Simpler furnishings: Less ornate than Solomon\'s temple')}
                    className="bg-sanctuary-purple text-white px-2 py-1 rounded text-xs"
                  >
                    Basic Furnishings
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (layer === 'most-holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-stone-600 via-slate-700 to-stone-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sanctuary-gold text-center">
              <div className="text-lg mb-2">Empty</div>
              {showAnnotations && (
                <button
                  onClick={() => onAnnotationClick?.('No Ark: Lost during Babylonian exile, Most Holy Place was empty')}
                  className="bg-sanctuary-purple text-white px-2 py-1 rounded text-xs"
                >
                  Missing Ark
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderHerodsTemple = () => {
    if (layer === 'outer' || layer === 'all') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500 to-sky-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-stone-200 via-white to-stone-300"></div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div className="absolute top-1/5 left-1/6 right-1/6 h-48 bg-gradient-to-b from-white via-stone-100 to-stone-200 border-4 border-yellow-700 shadow-2xl" style={{ transform: 'rotateY(0deg) translateZ(-80px)' }}>
              {showAnnotations && (
                <button
                  onClick={() => onAnnotationClick?.('Expanded Courts: Massive expansion with multiple courts and porticos')}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                >
                  Royal Portico
                </button>
              )}
            </div>
            <div className="absolute top-1/5 left-4 h-48 w-40 bg-gradient-to-r from-stone-300 to-white opacity-90 shadow-xl" style={{ transform: 'rotateY(-85deg)' }}></div>
            <div className="absolute top-1/5 right-4 h-48 w-40 bg-gradient-to-l from-stone-300 to-white opacity-90 shadow-xl" style={{ transform: 'rotateY(85deg)' }}></div>
            {(layer === 'furnishings' || layer === 'all') && (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                  <div className="w-32 h-28 bg-gradient-to-br from-yellow-700 to-amber-900 shadow-2xl border-4 border-yellow-900" style={{ transform: 'perspective(600px) rotateX(20deg)' }}>
                    {showAnnotations && (
                      <button
                        onClick={() => onAnnotationClick?.('Grand Altar: Magnificently decorated and enlarged')}
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Grand Altar
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="absolute top-1/4 left-12 w-6 h-48 bg-gradient-to-b from-white via-stone-100 to-stone-200 shadow-lg border-2 border-yellow-600"></div>
            <div className="absolute top-1/4 right-12 w-6 h-48 bg-gradient-to-b from-white via-stone-100 to-stone-200 shadow-lg border-2 border-yellow-600"></div>
          </div>
        </div>
      );
    }

    if (layer === 'holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 via-amber-700 to-yellow-900">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/90 to-amber-800/90"></div>
          {(layer === 'furnishings' || layer === 'holy') && (
            <div className="absolute inset-0 flex items-center justify-center gap-12">
              <div className="w-24 h-36 bg-gradient-to-t from-yellow-700 to-yellow-400 shadow-2xl">
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('Golden Lampstand: Ornately decorated')}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    Lampstand
                  </button>
                )}
              </div>
              <div className="w-28 h-20 bg-gradient-to-br from-yellow-400 to-yellow-800 shadow-2xl">
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('Table of Showbread: Beautifully crafted')}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    Showbread
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (layer === 'most-holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 via-amber-700 to-yellow-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-radial from-yellow-100 via-yellow-400/40 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sanctuary-gold text-center">
              <div className="text-xl mb-2">Empty Chamber</div>
              {showAnnotations && (
                <button
                  onClick={() => onAnnotationClick?.('Still Empty: Ark never recovered, but chamber prepared')}
                  className="bg-sanctuary-purple text-white px-2 py-1 rounded text-xs"
                >
                  No Ark
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderHeavenlySanctuary = () => {
    if (layer === 'outer' || layer === 'all') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400"></div>
          <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
            <div className="absolute top-1/4 left-1/5 right-1/5 h-56 bg-gradient-to-b from-blue-200/80 via-purple-200/70 to-pink-200/80 backdrop-blur-sm border-4 border-yellow-300 shadow-2xl" style={{ transform: 'rotateY(0deg) translateZ(-100px)' }}>
              {showAnnotations && (
                <button
                  onClick={() => onAnnotationClick?.('Sea of Glass: Crystal clear expanse before God\'s throne')}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                >
                  Sea of Glass
                </button>
              )}
            </div>
            {(layer === 'furnishings' || layer === 'all') && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                <div className="w-32 h-28 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-2xl border-4 border-yellow-200 animate-pulse">
                  {showAnnotations && (
                    <button
                      onClick={() => onAnnotationClick?.('Golden Altar: Where Christ\'s intercession occurs')}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                    >
                      Golden Altar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (layer === 'holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500">
          <div className="absolute inset-0 bg-gradient-radial from-white/50 to-transparent animate-pulse"></div>
          {(layer === 'furnishings' || layer === 'holy') && (
            <div className="absolute inset-0 flex items-center justify-center gap-16">
              <div className="w-28 h-40 bg-gradient-to-t from-yellow-500 to-yellow-200 shadow-2xl animate-pulse">
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('True Lampstand: Source of all divine light')}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    True Light
                  </button>
                )}
              </div>
              <div className="w-32 h-24 bg-gradient-to-br from-yellow-300 to-amber-500 shadow-2xl">
                {showAnnotations && (
                  <button
                    onClick={() => onAnnotationClick?.('True Bread: Christ, the bread of life')}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    Living Bread
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (layer === 'most-holy') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-radial from-white via-yellow-200/70 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-64 h-64 bg-gradient-radial from-yellow-100 to-transparent rounded-full blur-2xl"></div>
          </div>
          {(layer === 'furnishings' || layer === 'most-holy') && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
              <div className="relative">
                <div className="w-40 h-32 bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-300 shadow-2xl border-4 border-yellow-100 animate-pulse">
                  <div className="absolute -top-12 left-8 w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                  <div className="absolute -top-12 right-8 w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                  {showAnnotations && (
                    <button
                      onClick={() => onAnnotationClick?.('Ark in Heaven: Original pattern shown to Moses, God\'s throne room')}
                      className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                    >
                      Heavenly Throne
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderSanctuary = () => {
    switch (sanctuaryId) {
      case 'wilderness':
        return renderWildernessTabernacle();
      case 'solomon':
        return renderSolomonsTemple();
      case 'zerubbabel':
        return renderZerubbabelTemple();
      case 'herod':
        return renderHerodsTemple();
      case 'heavenly':
        return renderHeavenlySanctuary();
      default:
        return <div className="text-center text-sanctuary-brass">Select a sanctuary</div>;
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-sanctuary-linen rounded-lg overflow-hidden">
      {renderSanctuary()}
    </div>
  );
};

export default SanctuaryVisualizer;
