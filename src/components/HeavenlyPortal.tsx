import React, { useState } from 'react';
import { ArrowLeft, Star, Eye, Volume2, Play, Pause, SkipForward } from 'lucide-react';
import DonationBanner from './DonationBanner';

const HeavenlyPortal = () => {
  const [currentStage, setCurrentStage] = useState('outer-court');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const stages = [
    {
      id: 'outer-court',
      name: 'Outer Court',
      description: 'Begin your journey in the earthly outer court',
      environment: 'earthly'
    },
    {
      id: 'holy-place',
      name: 'Holy Place',
      description: 'Enter the sacred space of daily ministry',
      environment: 'transitional'
    },
    {
      id: 'most-holy',
      name: 'Most Holy Place',
      description: 'Approach the presence of the Divine',
      environment: 'divine'
    },
    {
      id: 'heavenly-throne',
      name: 'Heavenly Throne Room',
      description: 'Behold the throne of God in celestial glory',
      environment: 'celestial'
    }
  ];

  const getEnvironmentClasses = (stage) => {
    switch (stage) {
      case 'outer-court':
        return 'bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100';
      case 'holy-place':
        return 'bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100';
      case 'most-holy':
        return 'bg-gradient-to-b from-purple-100 via-violet-50 to-indigo-100';
      case 'heavenly-throne':
        return 'bg-gradient-to-b from-violet-200 via-purple-100 to-indigo-200';
      default:
        return 'bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100';
    }
  };

  const currentStageData = stages.find(s => s.id === currentStage);

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Star className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Heavenly Sanctuary Portal</h1>
              <p className="text-purple-100 text-lg">Immersive journey from earthly to celestial realms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Environment Background */}
      <div className={`min-h-screen transition-all duration-1000 ${getEnvironmentClasses(currentStage)}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stage Navigation */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Journey Stages</h3>
            <div className="flex flex-wrap gap-3">
              {stages.map((stage, index) => (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentStage === stage.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-sanctuary-purple hover:bg-purple-600 hover:text-white border border-sanctuary-silver'
                  }`}
                >
                  <span className="mr-2">{index + 1}.</span>
                  {stage.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Portal Experience */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-sanctuary-gold/30 overflow-hidden">
            {/* Portal Header */}
            <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-sanctuary-gold rounded-full animate-pulse"></div>
                <h3 className="font-semibold">{currentStageData?.name}</h3>
                <span className="text-purple-100 text-sm">({currentStageData?.environment})</span>
              </div>
              
              {/* Portal Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                  title={audioEnabled ? 'Mute Audio' : 'Enable Audio'}
                >
                  <Volume2 className={`w-4 h-4 ${audioEnabled ? 'text-sanctuary-gold' : 'text-purple-300'}`} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                  title={isPlaying ? 'Pause Experience' : 'Start Experience'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Immersive Portal Canvas */}
            <div className="relative h-auto min-h-[600px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
              {/* Stage-Specific Content */}
              {currentStage === 'outer-court' && (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-amber-200/50 rounded-full flex items-center justify-center border-4 border-sanctuary-brass animate-pulse">
                    <Eye className="w-16 h-16 text-sanctuary-brass" />
                  </div>
                  <h4 className="text-2xl font-bold text-sanctuary-purple mb-4">Outer Court Experience</h4>
                  <p className="text-sanctuary-brass text-lg mb-6 max-w-2xl">
                    Begin your sacred journey in the outer court, where the bronze altar and laver 
                    represent the beginning of our approach to God through sacrifice and cleansing.
                  </p>
                  <div className="bg-white/60 rounded-lg p-6 max-w-md mx-auto">
                    <h5 className="font-semibold text-sanctuary-purple mb-3">Scripture Overlay</h5>
                    <blockquote className="text-sanctuary-brass italic">
                      "And let them make me a sanctuary; that I may dwell among them." - Exodus 25:8
                    </blockquote>
                  </div>
                </div>
              )}

              {currentStage === 'holy-place' && (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-200/50 rounded-full flex items-center justify-center border-4 border-sanctuary-silver animate-pulse">
                    <Star className="w-16 h-16 text-sanctuary-silver" />
                  </div>
                  <h4 className="text-2xl font-bold text-sanctuary-purple mb-4">Holy Place Experience</h4>
                  <p className="text-sanctuary-brass text-lg mb-6 max-w-2xl">
                    Enter the sacred space where the golden lampstand, table of showbread, and 
                    altar of incense represent Christ's ministry of light, provision, and intercession.
                  </p>
                  <div className="bg-white/60 rounded-lg p-6 max-w-md mx-auto">
                    <h5 className="font-semibold text-sanctuary-purple mb-3">Scripture Overlay</h5>
                    <blockquote className="text-sanctuary-brass italic">
                      "I am the light of the world: he that followeth me shall not walk in darkness, 
                      but shall have the light of life." - John 8:12
                    </blockquote>
                  </div>
                </div>
              )}

              {currentStage === 'most-holy' && (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-purple-200/50 rounded-full flex items-center justify-center border-4 border-sanctuary-gold animate-pulse">
                    <Star className="w-16 h-16 text-sanctuary-gold" />
                  </div>
                  <h4 className="text-2xl font-bold text-sanctuary-purple mb-4">Most Holy Place Experience</h4>
                  <p className="text-sanctuary-brass text-lg mb-6 max-w-2xl">
                    Approach the sacred presence where the Ark of the Covenant and mercy seat 
                    represent God's throne of grace and the place of divine judgment and mercy.
                  </p>
                  <div className="bg-white/60 rounded-lg p-6 max-w-md mx-auto">
                    <h5 className="font-semibold text-sanctuary-purple mb-3">Scripture Overlay</h5>
                    <blockquote className="text-sanctuary-brass italic">
                      "And there I will meet with thee, and I will commune with thee from above 
                      the mercy seat..." - Exodus 25:22
                    </blockquote>
                  </div>
                </div>
              )}

              {currentStage === 'heavenly-throne' && (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-violet-200/50 rounded-full flex items-center justify-center border-4 border-sanctuary-gold animate-pulse shadow-2xl">
                    <Star className="w-16 h-16 text-sanctuary-gold animate-spin" style={{animationDuration: '8s'}} />
                  </div>
                  <h4 className="text-2xl font-bold text-sanctuary-purple mb-4">Heavenly Throne Room</h4>
                  <p className="text-sanctuary-brass text-lg mb-6 max-w-2xl">
                    Behold the throne of God in celestial glory, where Christ ministers as our 
                    High Priest in the true sanctuary made without hands.
                  </p>
                  <div className="bg-white/60 rounded-lg p-6 max-w-md mx-auto">
                    <h5 className="font-semibold text-sanctuary-purple mb-3">Prophetic Vision</h5>
                    <blockquote className="text-sanctuary-brass italic">
                      "And immediately I was in the spirit: and, behold, a throne was set in heaven, 
                      and one sat on the throne." - Revelation 4:2
                    </blockquote>
                  </div>
                </div>
              )}

              {/* Ambient Effects */}
              <div className="absolute inset-0 pointer-events-none">
                {currentStage === 'heavenly-throne' && (
                  <>
                    <div className="absolute top-10 left-10 w-2 h-2 bg-sanctuary-gold rounded-full animate-ping"></div>
                    <div className="absolute top-20 right-20 w-1 h-1 bg-sanctuary-silver rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-3 h-3 bg-sanctuary-gold rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 w-1 h-1 bg-sanctuary-silver rounded-full animate-ping"></div>
                  </>
                )}
              </div>
            </div>

            {/* Experience Controls */}
            <div className="bg-sanctuary-linen p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-sanctuary-brass">
                  {currentStageData?.description}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    const currentIndex = stages.findIndex(s => s.id === currentStage);
                    if (currentIndex > 0) {
                      setCurrentStage(stages[currentIndex - 1].id);
                    }
                  }}
                  disabled={stages.findIndex(s => s.id === currentStage) === 0}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    const currentIndex = stages.findIndex(s => s.id === currentStage);
                    if (currentIndex < stages.length - 1) {
                      setCurrentStage(stages[currentIndex + 1].id);
                    }
                  }}
                  disabled={stages.findIndex(s => s.id === currentStage) === stages.length - 1}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Theological Context */}
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Theological Significance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-semibold text-sanctuary-purple mb-3">Biblical Foundation</h4>
                <p className="text-sanctuary-brass text-sm leading-relaxed">
                  The heavenly sanctuary represents the true tabernacle which the Lord pitched, 
                  not man (Hebrews 8:2). This portal experience helps visualize the progressive 
                  journey from earthly types to heavenly realities.
                </p>
              </div>
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-semibold text-sanctuary-purple mb-3">Spiritual Application</h4>
                <p className="text-sanctuary-brass text-sm leading-relaxed">
                  Each stage represents our spiritual journey: justification (outer court), 
                  sanctification (holy place), and glorification (most holy place), 
                  culminating in the throne room of grace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeavenlyPortal;