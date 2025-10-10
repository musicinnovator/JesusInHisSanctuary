import React, { useState, useRef, useEffect } from 'react';
import DonationBanner from './DonationBanner';
import { RotateCcw, ZoomIn, ZoomOut, Move3d as Move3D, Eye, Layers, Info, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface SanctuaryModel {
  id: string;
  name: string;
  period: string;
  environment: string;
  description: string;
  features: string[];
}

const SanctuaryViewer = () => {
  const [selectedModel, setSelectedModel] = useState('wilderness');
  const [isRotating, setIsRotating] = useState(true);
  const [showLayers, setShowLayers] = useState(false);
  const [activeLayer, setActiveLayer] = useState('all');
  const viewerRef = useRef<HTMLDivElement>(null);

  const sanctuaryModels: SanctuaryModel[] = [
    {
      id: 'wilderness',
      name: 'Wilderness Tabernacle',
      period: '1450-1000 BC',
      environment: 'Desert Encampment',
      description: 'The portable sanctuary built according to the pattern shown to Moses on Mount Sinai',
      features: ['Holy Place', 'Most Holy Place', 'Courtyard', 'Bronze Altar', 'Laver', 'Ark of Covenant']
    },
    {
      id: 'solomon',
      name: "Solomon's Temple",
      period: '1000-586 BC',
      environment: 'Jerusalem Cityscape',
      description: 'The magnificent permanent temple built by King Solomon in Jerusalem',
      features: ['Temple Proper', 'Inner Court', 'Outer Court', 'Pillars Jachin & Boaz', 'Molten Sea']
    },
    {
      id: 'zerubbabel',
      name: "Zerubbabel's Temple",
      period: '516-20 BC',
      environment: 'Post-Exile Jerusalem',
      description: 'The rebuilt temple constructed after the Babylonian exile',
      features: ['Restored Holy Place', 'Rebuilt Altar', 'Reconstructed Courts', 'Persian Influence']
    },
    {
      id: 'herod',
      name: "Herod's Temple",
      period: '20 BC - 70 AD',
      environment: 'Roman-Era Jerusalem',
      description: 'The expanded and beautified temple complex during the time of Christ',
      features: ['Expanded Courts', 'Royal Portico', 'Temple Mount', 'Beautiful Gate']
    },
    {
      id: 'heavenly',
      name: 'Heavenly Sanctuary',
      period: 'Eternal',
      environment: 'Celestial Realm',
      description: 'The true sanctuary in heaven of which earthly sanctuaries were shadows',
      features: ['Throne Room', 'Sea of Glass', 'Golden Altar', 'Ark in Heaven']
    }
  ];

  const layers = [
    { id: 'all', name: 'Complete Structure', icon: <Eye className="w-4 h-4" /> },
    { id: 'outer', name: 'Outer Court', icon: <Layers className="w-4 h-4" /> },
    { id: 'holy', name: 'Holy Place', icon: <Layers className="w-4 h-4" /> },
    { id: 'most-holy', name: 'Most Holy Place', icon: <Layers className="w-4 h-4" /> },
    { id: 'furnishings', name: 'Sacred Furnishings', icon: <Layers className="w-4 h-4" /> }
  ];

  const currentModel = sanctuaryModels.find(model => model.id === selectedModel);

  const getEnvironmentClasses = (modelId: string) => {
    switch (modelId) {
      case 'wilderness':
        return 'bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100';
      case 'solomon':
        return 'bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100';
      case 'zerubbabel':
        return 'bg-gradient-to-b from-gray-100 via-slate-50 to-stone-100';
      case 'herod':
        return 'bg-gradient-to-b from-rose-100 via-pink-50 to-red-100';
      case 'heavenly':
        return 'bg-gradient-to-b from-violet-100 via-purple-50 to-indigo-100';
      default:
        return 'bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100';
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <DonationBanner />
      {/* Dynamic Environment Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${getEnvironmentClasses(selectedModel)}`}>
        {selectedModel === 'wilderness' && (
          <div className="absolute inset-0">
            {/* Desert sand dunes effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-200 via-amber-100 to-transparent opacity-60"></div>
            {/* Desert sky with subtle clouds */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent opacity-40"></div>
            {/* Scattered desert elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-700 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/2 w-3 h-1 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-sanctuary-purple mb-2">Interactive Sanctuary Explorer</h1>
            <p className="text-sanctuary-brass">Journey through sacred spaces across biblical history</p>
          </div>
          
          {/* Model Selector */}
          <div className="flex flex-wrap gap-2">
            {sanctuaryModels.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedModel === model.id
                    ? 'bg-sanctuary-purple text-white shadow-lg'
                    : 'bg-white/80 text-sanctuary-purple hover:bg-sanctuary-purple hover:text-white border border-sanctuary-silver'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-sanctuary-gold/30 overflow-hidden">
              {/* Viewer Header */}
              <div className="bg-sanctuary-purple text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                  <h3 className="font-semibold">{currentModel?.name}</h3>
                  <span className="text-sanctuary-silver text-sm">({currentModel?.period})</span>
                </div>
                
                {/* Viewer Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className="p-2 hover:bg-sanctuary-purple-dark rounded-lg transition-colors"
                    title={isRotating ? 'Pause Rotation' : 'Start Rotation'}
                  >
                    {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 hover:bg-sanctuary-purple-dark rounded-lg transition-colors" title="Reset View">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-sanctuary-purple-dark rounded-lg transition-colors" title="Zoom In">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-sanctuary-purple-dark rounded-lg transition-colors" title="Zoom Out">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Viewer Canvas */}
              <div 
                ref={viewerRef}
                className="relative h-auto min-h-[800px] lg:min-h-[1200px] bg-gradient-to-b from-sanctuary-linen to-sanctuary-linen-dark flex items-center justify-center"
              >
                {selectedModel === 'wilderness' ? (
                  /* Wilderness Tabernacle Reference Images */
                  <div className="w-full h-full p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-8 min-h-full">
                      {/* Outer Court */}
                      <div className="bg-white/90 rounded-lg p-8 shadow-lg border-2 border-sanctuary-brass">
                        <h4 className="text-2xl font-bold text-sanctuary-purple mb-6">Outer Court</h4>
                        <div className="relative h-96 bg-gradient-to-b from-blue-300 via-amber-100 to-yellow-200 rounded-lg overflow-hidden border-2 border-sanctuary-brass/50">
                          {/* Sky */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>

                          {/* Desert Ground with perspective */}
                          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-400" style={{ transform: 'perspective(400px) rotateX(15deg)', transformOrigin: 'bottom' }}></div>

                          {/* Court Walls - White Linen Hangings */}
                          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
                            {/* Back wall */}
                            <div className="absolute top-1/3 left-1/4 right-1/4 h-32 bg-gradient-to-b from-gray-100 via-white to-gray-200 border-l-4 border-r-4 border-sanctuary-brass opacity-90" style={{ transform: 'rotateY(0deg) translateZ(-50px)' }}></div>

                            {/* Side walls */}
                            <div className="absolute top-1/3 left-8 h-32 w-24 bg-gradient-to-r from-gray-200 via-white to-gray-100 border-t-2 border-b-2 border-sanctuary-brass opacity-70" style={{ transform: 'rotateY(-75deg) translateX(-20px)' }}></div>
                            <div className="absolute top-1/3 right-8 h-32 w-24 bg-gradient-to-l from-gray-200 via-white to-gray-100 border-t-2 border-b-2 border-sanctuary-brass opacity-70" style={{ transform: 'rotateY(75deg) translateX(20px)' }}></div>

                            {/* Bronze Altar - center */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                              <div className="w-24 h-20 bg-gradient-to-br from-yellow-700 via-amber-700 to-yellow-800 rounded shadow-2xl border-2 border-yellow-900" style={{ transform: 'perspective(500px) rotateX(20deg)' }}>
                                {/* Horns on corners */}
                                <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
                                {/* Fire/smoke effect */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-t from-orange-500 via-red-400 to-gray-400 opacity-60 rounded-full blur-sm"></div>
                              </div>
                            </div>

                            {/* Bronze Laver - front right */}
                            <div className="absolute top-2/3 right-1/3 transform translate-x-8">
                              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-800 rounded-full shadow-xl border-2 border-yellow-900" style={{ transform: 'perspective(300px) rotateX(30deg)' }}>
                                <div className="absolute inset-2 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-70"></div>
                              </div>
                            </div>

                            {/* Pillars */}
                            <div className="absolute top-1/3 left-12 w-3 h-32 bg-gradient-to-r from-amber-700 to-yellow-700 shadow-md"></div>
                            <div className="absolute top-1/3 left-24 w-3 h-32 bg-gradient-to-r from-amber-700 to-yellow-700 shadow-md"></div>
                            <div className="absolute top-1/3 right-12 w-3 h-32 bg-gradient-to-r from-amber-700 to-yellow-700 shadow-md"></div>
                            <div className="absolute top-1/3 right-24 w-3 h-32 bg-gradient-to-r from-amber-700 to-yellow-700 shadow-md"></div>
                          </div>

                          {/* Gate entrance - front center */}
                          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-gradient-to-t from-blue-700 via-purple-600 to-red-500 opacity-80 shadow-2xl border-4 border-sanctuary-brass"></div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Structure & Dimensions</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Court Size: 100 x 50 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Hanging Height: 5 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Gate Width: 20 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">60 Pillars with Bronze Sockets</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Sacred Furnishings</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Bronze Altar: 5 x 5 x 3 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Bronze Laver for Cleansing</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Linen Hangings (White)</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-brass rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Gate: Blue, Purple, Scarlet</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Holy Place */}
                      <div className="bg-white/90 rounded-lg p-8 shadow-lg border-2 border-sanctuary-silver">
                        <h4 className="text-2xl font-bold text-sanctuary-purple mb-6">Holy Place</h4>
                        <div className="relative h-96 bg-gradient-to-b from-amber-900 via-yellow-800 to-yellow-700 rounded-lg overflow-hidden border-2 border-sanctuary-silver/50">
                          {/* Gold overlay for walls */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-800 opacity-90"></div>

                          {/* Ceiling with tapestry effect */}
                          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-900 via-purple-800 to-red-800 opacity-60"></div>

                          {/* Interior room perspective */}
                          <div className="absolute inset-0" style={{ perspective: '600px' }}>
                            {/* Back wall with veil */}
                            <div className="absolute top-1/4 left-1/4 right-1/4 h-48 bg-gradient-to-b from-purple-900 via-blue-800 to-red-900 shadow-2xl border-4 border-yellow-600" style={{ transform: 'rotateY(0deg) translateZ(-80px)' }}>
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-yellow-600/20"></div>
                            </div>

                            {/* Floor */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900 to-yellow-800 opacity-80" style={{ transform: 'rotateX(60deg) translateY(40px)' }}></div>

                            {/* Golden Candlestick (Menorah) - left/south side */}
                            <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
                              <div className="relative w-20 h-32">
                                {/* Central stem */}
                                <div className="absolute left-1/2 bottom-0 w-3 h-32 bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 transform -translate-x-1/2 shadow-lg"></div>
                                {/* Branches */}
                                <div className="absolute left-1/2 top-8 w-16 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-1/2 shadow-md"></div>
                                <div className="absolute left-1/2 top-16 w-12 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-1/2 shadow-md"></div>
                                {/* Flames */}
                                <div className="absolute top-2 left-1/2 w-6 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-sm transform -translate-x-1/2"></div>
                                <div className="absolute top-6 left-2 w-4 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-sm"></div>
                                <div className="absolute top-6 right-2 w-4 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-sm"></div>
                              </div>
                            </div>

                            {/* Table of Showbread - right/north side */}
                            <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                              <div className="w-24 h-16 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 shadow-2xl border-2 border-yellow-800" style={{ transform: 'perspective(400px) rotateY(-15deg) rotateX(20deg)' }}>
                                {/* Bread loaves */}
                                <div className="absolute -top-3 left-2 w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded shadow-md"></div>
                                <div className="absolute -top-3 left-10 w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded shadow-md"></div>
                                <div className="absolute -top-3 right-2 w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded shadow-md"></div>
                                {/* Table legs */}
                                <div className="absolute -bottom-4 left-2 w-2 h-4 bg-yellow-700"></div>
                                <div className="absolute -bottom-4 right-2 w-2 h-4 bg-yellow-700"></div>
                              </div>
                            </div>

                            {/* Altar of Incense - center front */}
                            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                              <div className="w-16 h-24 bg-gradient-to-b from-yellow-400 via-amber-600 to-yellow-700 shadow-2xl border-2 border-yellow-800" style={{ transform: 'perspective(300px) rotateX(10deg)' }}>
                                {/* Horns */}
                                <div className="absolute -top-2 -left-1 w-3 h-3 bg-yellow-500 rounded-sm"></div>
                                <div className="absolute -top-2 -right-1 w-3 h-3 bg-yellow-500 rounded-sm"></div>
                                {/* Smoke rising */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-white/60 via-gray-300/40 to-transparent blur-md"></div>
                              </div>
                            </div>
                          </div>

                          {/* Ambient golden light effect */}
                          <div className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Structure & Dimensions</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Size: 20 x 10 x 10 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Gold-covered boards</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Veil entrance from court</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Daily priestly service</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Sacred Furnishings</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Table of Showbread (North side)</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Golden Candlestick (South side)</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Altar of Incense (before veil)</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-silver rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Veil to Most Holy Place</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Most Holy Place */}
                      <div className="bg-white/90 rounded-lg p-8 shadow-lg border-2 border-sanctuary-gold">
                        <h4 className="text-2xl font-bold text-sanctuary-purple mb-6">Most Holy Place</h4>
                        <div className="relative h-96 bg-gradient-to-br from-yellow-900 via-amber-800 to-yellow-700 rounded-lg overflow-hidden border-2 border-sanctuary-gold/50">
                          {/* Divine radiant background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-amber-700 to-yellow-900"></div>

                          {/* Shekinah Glory - divine light */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-gradient-radial from-yellow-200 via-yellow-400/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute w-48 h-48 bg-gradient-radial from-white via-yellow-300/40 to-transparent rounded-full blur-2xl"></div>
                          </div>

                          {/* Perfect cube room perspective */}
                          <div className="absolute inset-0" style={{ perspective: '700px' }}>
                            {/* Gold walls */}
                            <div className="absolute inset-8 bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-800 opacity-80" style={{ transform: 'rotateY(0deg) translateZ(-50px)' }}></div>

                            {/* Floor with golden pattern */}
                            <div className="absolute bottom-8 left-8 right-8 h-24 bg-gradient-to-t from-yellow-900 to-amber-700 opacity-70" style={{ transform: 'rotateX(70deg) translateY(20px)' }}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent"></div>
                            </div>

                            {/* Ark of the Covenant - center */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
                              <div className="relative">
                                {/* Ark box */}
                                <div className="w-32 h-24 bg-gradient-to-br from-yellow-400 via-amber-600 to-yellow-700 shadow-2xl border-4 border-yellow-800 rounded-sm" style={{ transform: 'perspective(500px) rotateX(15deg) rotateY(-5deg)' }}>
                                  {/* Gold overlay pattern */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 to-transparent"></div>

                                  {/* Carrying poles */}
                                  <div className="absolute top-1/2 -left-4 w-32 h-2 bg-gradient-to-r from-yellow-600 to-amber-700 transform -translate-y-1/2 shadow-md"></div>
                                  <div className="absolute top-1/2 -right-20 w-32 h-2 bg-gradient-to-r from-amber-700 to-yellow-600 transform -translate-y-1/2 shadow-md"></div>
                                </div>

                                {/* Mercy Seat with Cherubim */}
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-36 h-16">
                                  {/* Mercy Seat */}
                                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 shadow-xl rounded-sm"></div>

                                  {/* Left Cherub */}
                                  <div className="absolute bottom-4 left-2 w-12 h-12 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-400 opacity-90 shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                                    {/* Wing */}
                                    <div className="absolute -top-2 -left-1 w-10 h-8 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-70 rounded-tl-full"></div>
                                  </div>

                                  {/* Right Cherub */}
                                  <div className="absolute bottom-4 right-2 w-12 h-12 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-400 opacity-90 shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                                    {/* Wing */}
                                    <div className="absolute -top-2 -right-1 w-10 h-8 bg-gradient-to-l from-yellow-400 to-amber-600 opacity-70 rounded-tr-full"></div>
                                  </div>

                                  {/* Divine presence between cherubim */}
                                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-radial from-white via-yellow-200 to-transparent rounded-full blur-lg animate-pulse"></div>
                                </div>
                              </div>
                            </div>

                            {/* Veil entrance - multi-colored */}
                            <div className="absolute top-12 left-8 w-2 h-64 bg-gradient-to-b from-blue-700 via-purple-700 to-red-700 opacity-60 shadow-xl"></div>
                            <div className="absolute top-12 right-8 w-2 h-64 bg-gradient-to-b from-blue-700 via-purple-700 to-red-700 opacity-60 shadow-xl"></div>
                          </div>

                          {/* Divine light rays */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-200 via-yellow-400/30 to-transparent blur-sm"></div>
                            <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-white via-yellow-300/40 to-transparent blur-sm"></div>
                            <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-yellow-200 via-yellow-400/30 to-transparent blur-sm"></div>
                          </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Structure & Dimensions</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Perfect Cube: 10 x 10 x 10 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Separated by veil</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">High Priest access only</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Day of Atonement service</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-sanctuary-purple mb-3">Sacred Contents</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Ark of Covenant: 2.5 x 1.5 x 1.5 cubits</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Mercy Seat (pure gold)</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Two golden cherubim</span>
                              </div>
                              <div className="flex items-center space-x-3 text-base">
                                <div className="w-3 h-3 bg-sanctuary-gold rounded-full"></div>
                                <span className="text-sanctuary-purple font-medium">Shekinah glory presence</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Placeholder for other sanctuary models */
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-sanctuary-gold/20 rounded-full flex items-center justify-center border-4 border-sanctuary-gold/40">
                      <Move3D className="w-16 h-16 text-sanctuary-gold" />
                    </div>
                    <h4 className="text-xl font-semibold text-sanctuary-purple mb-2">3D Model Loading...</h4>
                    <p className="text-sanctuary-brass">Interactive {currentModel?.name} will appear here</p>
                    
                    {/* Environment Preview */}
                    <div className="mt-8 p-4 bg-white/60 rounded-lg border border-sanctuary-silver max-w-md mx-auto">
                      <p className="text-sm text-sanctuary-brass">
                        <strong>Environment:</strong> {currentModel?.environment}
                      </p>
                      <p className="text-sm text-sanctuary-brass mt-2">
                        {currentModel?.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Floating Navigation Hints */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs">
                  Click & drag to rotate • Scroll to zoom • Right-click to pan
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-sanctuary-linen border-t border-sanctuary-silver p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLayers(!showLayers)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showLayers ? 'bg-sanctuary-purple text-white' : 'bg-white text-sanctuary-purple border border-sanctuary-silver'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Layers</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 bg-white text-sanctuary-purple border border-sanctuary-silver rounded-lg text-sm font-medium hover:bg-sanctuary-purple hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                    <span>Info</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-sanctuary-blue text-white rounded-lg hover:bg-sanctuary-blue-dark transition-colors" title="Previous Model">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-sanctuary-blue text-white rounded-lg hover:bg-sanctuary-blue-dark transition-colors" title="Next Model">
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Model Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Current Model</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sanctuary-blue">{currentModel?.name}</h4>
                  <p className="text-sm text-sanctuary-brass">{currentModel?.period}</p>
                </div>
                <p className="text-sm text-sanctuary-brass leading-relaxed">
                  {currentModel?.description}
                </p>
                <div className="pt-3 border-t border-sanctuary-silver">
                  <h5 className="font-medium text-sanctuary-purple mb-2">Key Features:</h5>
                  <ul className="space-y-1">
                    {currentModel?.features.map((feature, index) => (
                      <li key={index} className="text-sm text-sanctuary-brass flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-sanctuary-scarlet rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer Controls */}
            {showLayers && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-bold text-sanctuary-purple mb-4">Model Layers</h3>
                <div className="space-y-2">
                  {layers.map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayer(layer.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                        activeLayer === layer.id
                          ? 'bg-sanctuary-purple text-white'
                          : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-sanctuary-purple hover:text-white'
                      }`}
                    >
                      {layer.icon}
                      <span>{layer.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Environment Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-bold text-sanctuary-purple mb-4">Environment</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-sanctuary-brass rounded-full"></div>
                  <span className="text-sm font-medium text-sanctuary-purple">{currentModel?.environment}</span>
                </div>
                
                {selectedModel === 'wilderness' && (
                  <div className="space-y-2 text-sm text-sanctuary-brass">
                    <p>• Desert terrain with sandy ground</p>
                    <p>• Tribal encampment arrangement</p>
                    <p>• Natural lighting conditions</p>
                    <p>• Portable structure emphasis</p>
                  </div>
                )}
                
                <div className="pt-3 border-t border-sanctuary-silver">
                  <button className="text-sm text-sanctuary-blue hover:text-sanctuary-blue-dark transition-colors font-medium">
                    Learn about this environment →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-bold text-sanctuary-purple mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-sanctuary-blue text-white py-2 px-4 rounded-lg hover:bg-sanctuary-blue-dark transition-colors text-sm font-medium">
                  Start Virtual Tour
                </button>
                <button className="w-full bg-sanctuary-gold text-sanctuary-purple py-2 px-4 rounded-lg hover:bg-sanctuary-gold-dark transition-colors text-sm font-medium">
                  Compare Models
                </button>
                <button className="w-full bg-sanctuary-scarlet text-white py-2 px-4 rounded-lg hover:bg-sanctuary-scarlet-dark transition-colors text-sm font-medium">
                  Scripture Navigator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">Explore Biblical Sanctuaries</h3>
              <p className="text-sanctuary-brass">Interactive 3D models based on scriptural descriptions</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-sanctuary-purple">5</div>
                <div className="text-xs text-sanctuary-brass">Sacred Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sanctuary-purple">360°</div>
                <div className="text-xs text-sanctuary-brass">Exploration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sanctuary-purple">4K</div>
                <div className="text-xs text-sanctuary-brass">Detail Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryViewer;