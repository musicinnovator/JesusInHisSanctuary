import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonationBanner from './DonationBanner';
import ViewToggle from './ViewToggle';
import MasterNavigationCard from './MasterNavigationCard';
import NavigationDrawer from './NavigationDrawer';

const ProfessionalHomePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>(() => {
    try {
      const saved = localStorage.getItem('sanctuary-homepage-view');
      return (saved === 'compact' ? 'compact' : 'grid') as 'grid' | 'compact';
    } catch (error) {
      return 'grid';
    }
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sanctuary-homepage-view', viewMode);
    } catch (error) {
      console.warn('Could not save view preference to localStorage');
    }
  }, [viewMode]);

  const handleViewChange = (mode: 'grid' | 'compact') => {
    setViewMode(mode);
  };

  const pages = [
    {
      id: 'explorer',
      title: 'Interactive 3D Sanctuary Explorer',
      description: 'Immerse yourself in historically accurate 3D models of biblical sanctuaries',
      features: ['Wilderness Tabernacle', 'Solomon\'s Temple', 'Herod\'s Temple', 'Heavenly Sanctuary'],
      label: '3D MODELS',
      color: '#2A4A5C',
      link: '/explorer',
      preview: 'Experience rotating 3D models with zoom, pan, and virtual tours through sacred spaces'
    },
    {
      id: 'compare',
      title: 'Compare Mode Analysis',
      description: 'Side-by-side sanctuary comparisons with synchronized navigation',
      features: ['Historical Timeline', 'Structural Analysis', 'Material Comparisons', 'Export Charts'],
      label: 'COMPARATIVE',
      color: '#6B2C2C',
      link: '/compare',
      preview: 'Compare multiple sanctuaries simultaneously with interactive annotations and analysis tools'
    },
    {
      id: 'scripture',
      title: 'Scripture Navigator',
      description: 'Link biblical texts directly to 3D model components',
      features: ['Text-to-Model Linking', 'Multiple Translations', 'Cross-References', 'Word Studies'],
      label: 'SCRIPTURE',
      color: '#8C6B3C',
      link: '/scripture',
      preview: 'Click any Bible verse to highlight corresponding sanctuary elements in 3D space'
    },
    {
      id: 'symbolism',
      title: 'Explore Symbolism Mode',
      description: 'Discover the theological meaning behind every furnishing',
      features: ['Hebrew Perspectives', 'Adventist Theology', 'Scholar Quotes', 'Comparative Views'],
      label: 'SYMBOLISM',
      color: '#8B3A3A',
      link: '/symbolism',
      preview: 'Hover over sanctuary furnishings to reveal their deep spiritual significance'
    },
    {
      id: 'timeline',
      title: 'Aaron & Jesus Ministry Timeline',
      description: 'Animated comparison of earthly and heavenly ministry',
      features: ['24 Parallel Steps', 'Interactive Animations', 'Scripture Pop-ups', 'Type & Antitype'],
      label: 'TIMELINE',
      color: '#5A5A5A',
      link: '/timeline',
      preview: 'Watch Aaron\'s earthly ministry unfold alongside Jesus\' heavenly intercession'
    },
    {
      id: 'heavenly',
      title: 'Heavenly Sanctuary Portal',
      description: 'Immersive journey from earthly to celestial realms',
      features: ['Progressive Journey', 'Celestial Vision', 'Ambient Sounds', 'Scripture Overlays'],
      label: 'HEAVENLY',
      color: '#3A4A6B',
      link: '/heavenly',
      preview: 'Experience the transition from outer court to the throne room of God'
    },
    {
      id: 'judgment',
      title: 'Investigative Judgment Module',
      description: 'Interactive learning about this cornerstone Adventist doctrine',
      features: ['Daniel 8:14 Timeline', '1844 Context', 'Historical Development', 'Interactive Quizzes'],
      label: 'JUDGMENT',
      color: '#8C6B3C',
      link: '/judgment',
      preview: 'Explore the chronological development from Daniel\'s prophecy to modern understanding'
    },
    {
      id: 'library',
      title: 'Curated Digital Library',
      description: 'Scholarly resources and academic materials',
      features: ['Peer-Reviewed Articles', 'Classic Adventist Texts', 'Citation Tools', 'Advanced Search'],
      label: 'LIBRARY',
      color: '#2D5A3D',
      link: '/library',
      preview: 'Access thousands of scholarly articles and historical documents with citation tools'
    },
    {
      id: 'forums',
      title: 'Secure Discussion Forums',
      description: 'Moderated community dialogue and study groups',
      features: ['Thematic Groups', 'Expert Moderation', 'Secure Login', 'Global Community'],
      label: 'FORUMS',
      color: '#2A5A6B',
      link: '/forums',
      preview: 'Join respectful discussions with scholars and students from around the world'
    },
    {
      id: 'profiles',
      title: 'Personalized Learning',
      description: 'Track progress and customize your learning journey',
      features: ['Progress Tracking', 'Bookmarks', 'Achievements', 'Recommendations'],
      label: 'LEARNING',
      color: '#8B5A2C',
      link: '/profiles',
      preview: 'Save your progress, earn badges, and receive personalized content recommendations'
    },
    {
      id: 'myths',
      title: 'Myth vs. Fact',
      description: 'Clarify common doctrinal misconceptions',
      features: ['Interactive Quizzes', 'Cross-Denominational', 'Biblical Clarity', 'Study Resources'],
      label: 'APOLOGETICS',
      color: '#8B4A6B',
      link: '/myths',
      preview: 'Test your knowledge and clear up misunderstandings about sanctuary doctrine'
    },
    {
      id: 'educators',
      title: 'Educator Resources',
      description: 'Teaching tools and lesson plans for ministry leaders',
      features: ['Lesson Plans', 'Classroom Activities', 'Presentations', 'Licensing Guidelines'],
      label: 'EDUCATION',
      color: '#3A6B5A',
      link: '/educators',
      preview: 'Download ready-to-use lesson plans and teaching materials for your ministry'
    },
    {
      id: 'media',
      title: 'Companion Media',
      description: 'Podcast and video series with expert insights',
      features: ['Weekly Podcasts', 'YouTube Series', 'Expert Interviews', 'Discussion Guides'],
      label: 'MEDIA',
      color: '#4A3A6B',
      link: '/media',
      preview: 'Listen to weekly podcasts and watch video series featuring renowned theologians'
    },
    {
      id: 'bible',
      title: 'KJV Bible Study',
      description: 'Interactive Bible with search and memorization tools',
      features: ['Full KJV Text', 'Advanced Search', 'Memorization Tools', 'Cross-References'],
      label: 'BIBLE',
      color: '#6B5A2C',
      link: '/bible',
      preview: 'Study the King James Version with powerful search tools and memorization strategies'
    },
    {
      id: 'colors',
      title: 'Sacred Colors of the Sanctuary',
      description: 'Explore the eight divine colors and their spiritual significance',
      features: ['Blue - God\'s Law', 'Red - Messiah\'s Blood', 'White - Righteousness', 'Gold - Deity'],
      label: 'COLORS',
      color: '#8C6B3C',
      link: '/colors',
      preview: 'Discover the profound meaning behind each of the eight sacred colors used in the sanctuary'
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-background">
      <DonationBanner />

      {/* Hero Section - Professional */}
      <section className="hero-professional text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6 leading-tight">
              Sanctuary Intra
              <span className="block text-sanctuary-gold-light mt-2">Comparative Studies</span>
            </h1>
            <div className="divider-ornamental max-w-md mx-auto my-6"></div>
            <p className="text-xl md:text-2xl text-stone-200 mb-8 max-w-4xl mx-auto leading-relaxed font-crimson">
              A comprehensive, interactive platform exploring biblical sanctuary doctrine through
              immersive digital experiences, scholarly resources, and comparative learning tools
            </p>
            <div className="border-academic bg-white/5 backdrop-blur-sm p-6 max-w-3xl mx-auto border-sanctuary-gold/50">
              <h3 className="text-lg font-semibold mb-3 text-sanctuary-gold-light uppercase tracking-wider">Our Mission</h3>
              <p className="text-lg text-stone-200 leading-relaxed font-crimson">
                To deepen theological understanding through immersive digital experiences while fostering
                respectful community dialogue and academic discourse within Adventist scholarship
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-4xl mx-auto opacity-90">
            <div className="card-frame bg-white/5 backdrop-blur-sm border-sanctuary-gold/20 hover:bg-white/10 transition-all duration-300">
              <span className="label-icon-replacement bg-sanctuary-gold/20 text-sanctuary-gold-light mb-2">3D</span>
              <h3 className="text-sm font-semibold mb-1">Interactive 3D Models</h3>
              <p className="text-xs text-stone-300">Explore historically accurate sanctuary models with immersive navigation</p>
            </div>

            <div className="card-frame bg-white/5 backdrop-blur-sm border-sanctuary-gold/20 hover:bg-white/10 transition-all duration-300">
              <span className="label-icon-replacement bg-sanctuary-gold/20 text-sanctuary-gold-light mb-2">TEXT</span>
              <h3 className="text-sm font-semibold mb-1">Scripture Integration</h3>
              <p className="text-xs text-stone-300">Link biblical texts directly to 3D model components and furnishings</p>
            </div>

            <div className="card-frame bg-white/5 backdrop-blur-sm border-sanctuary-gold/20 hover:bg-white/10 transition-all duration-300">
              <span className="label-icon-replacement bg-sanctuary-gold/20 text-sanctuary-gold-light mb-2">COMM</span>
              <h3 className="text-sm font-semibold mb-1">Global Community</h3>
              <p className="text-xs text-stone-300">Connect with scholars and students worldwide in moderated discussions</p>
            </div>

            <div className="card-frame bg-white/5 backdrop-blur-sm border-sanctuary-gold/20 hover:bg-white/10 transition-all duration-300">
              <span className="label-icon-replacement bg-sanctuary-gold/20 text-sanctuary-gold-light mb-2">ACAD</span>
              <h3 className="text-sm font-semibold mb-1">Academic Resources</h3>
              <p className="text-xs text-stone-300">Access peer-reviewed articles and classic Adventist theological texts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page Overview Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel font-bold text-sanctuary-navy mb-4">Explore Our Platform</h2>
            <div className="divider-ornamental max-w-md mx-auto"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-crimson">
              Discover 15 specialized sections designed to enhance your understanding of sanctuary doctrine
            </p>
          </div>

          <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />

          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  to={page.link}
                  className="feature-card group"
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-stone-200">
                    <span className="label-icon-replacement text-stone-700" style={{ borderColor: page.color }}>
                      {page.label}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-cinzel font-bold text-sanctuary-navy group-hover:text-sanctuary-gold transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed font-crimson">
                      {page.description}
                    </p>
                    <p className="text-sm text-stone-500 italic font-crimson">
                      {page.preview}
                    </p>

                    {/* Features */}
                    <div className="pt-4 border-t border-stone-200">
                      <h4 className="text-xs font-bold text-sanctuary-navy mb-2 uppercase tracking-wider">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {page.features.map((feature, index) => (
                          <span
                            key={index}
                            className="badge-professional text-stone-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                      <span className="nav-classical text-sm">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {viewMode === 'compact' && (
            <>
              {isMobile ? (
                <NavigationDrawer pages={pages} />
              ) : (
                <MasterNavigationCard pages={pages} />
              )}
            </>
          )}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20 bg-white pattern-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel font-bold text-sanctuary-navy mb-4">Getting Started</h2>
            <div className="divider-ornamental max-w-md mx-auto"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-crimson">
              New to sanctuary studies? Follow this recommended learning path
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: '1',
                title: 'Start with 3D Explorer',
                desc: 'Get familiar with sanctuary layout and structure',
                color: '#2A4A5C'
              },
              {
                num: '2',
                title: 'Use Scripture Navigator',
                desc: 'Connect biblical texts to visual elements',
                color: '#8C6B3C'
              },
              {
                num: '3',
                title: 'Explore Symbolism',
                desc: 'Discover the theological meaning behind furnishings',
                color: '#8B3A3A'
              },
              {
                num: '4',
                title: 'Join Community',
                desc: 'Engage in discussions and deepen understanding',
                color: '#2D5A3D'
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="number-badge mx-auto mb-4" style={{ borderColor: step.color, color: step.color }}>
                  <span className="text-2xl">{step.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-sanctuary-navy mb-2">{step.title}</h3>
                <p className="text-stone-600 text-sm font-crimson">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 hero-professional text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { num: '15', label: 'Interactive Sections' },
              { num: '5', label: '3D Sanctuary Models' },
              { num: '1000+', label: 'Scholarly Resources' },
              { num: '24/7', label: 'Global Access' }
            ].map((stat, idx) => (
              <div key={idx} className="stat-classical border-stone-400">
                <div className="text-4xl font-bold text-sanctuary-gold mb-2 font-cinzel">{stat.num}</div>
                <div className="text-stone-200 font-crimson">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalHomePage;
