import React from 'react';
import { Link } from 'react-router-dom';
import DonationBanner from './DonationBanner';
import { 
  Eye, 
  GitCompare, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Play,
  Users,
  Globe,
  Award,
  Clock,
  Star,
  Shield,
  GraduationCap,
  Headphones,
  HelpCircle,
  Book
} from 'lucide-react';

const HomePage = () => {
  const pages = [
    {
      id: 'explorer',
      title: 'Interactive 3D Sanctuary Explorer',
      description: 'Immerse yourself in historically accurate 3D models of biblical sanctuaries',
      features: ['Wilderness Tabernacle', 'Solomon\'s Temple', 'Herod\'s Temple', 'Heavenly Sanctuary'],
      icon: <Eye className="w-8 h-8" />,
      color: 'from-sanctuary-blue to-sanctuary-blue-dark',
      link: '/explorer',
      preview: 'Experience rotating 3D models with zoom, pan, and virtual tours through sacred spaces'
    },
    {
      id: 'compare',
      title: 'Compare Mode Analysis',
      description: 'Side-by-side sanctuary comparisons with synchronized navigation',
      features: ['Historical Timeline', 'Structural Analysis', 'Material Comparisons', 'Export Charts'],
      icon: <GitCompare className="w-8 h-8" />,
      color: 'from-sanctuary-purple to-sanctuary-purple-dark',
      link: '/compare',
      preview: 'Compare multiple sanctuaries simultaneously with interactive annotations and analysis tools'
    },
    {
      id: 'scripture',
      title: 'Scripture Navigator',
      description: 'Link biblical texts directly to 3D model components',
      features: ['Text-to-Model Linking', 'Multiple Translations', 'Cross-References', 'Word Studies'],
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-sanctuary-gold to-sanctuary-brass',
      link: '/scripture',
      preview: 'Click any Bible verse to highlight corresponding sanctuary elements in 3D space'
    },
    {
      id: 'symbolism',
      title: 'Explore Symbolism Mode',
      description: 'Discover the theological meaning behind every furnishing',
      features: ['Hebrew Perspectives', 'Adventist Theology', 'Scholar Quotes', 'Comparative Views'],
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-sanctuary-scarlet to-red-700',
      link: '/symbolism',
      preview: 'Hover over sanctuary furnishings to reveal their deep spiritual significance'
    },
    {
      id: 'timeline',
      title: 'Aaron & Jesus Ministry Timeline',
      description: 'Animated comparison of earthly and heavenly ministry',
      features: ['24 Parallel Steps', 'Interactive Animations', 'Scripture Pop-ups', 'Type & Antitype'],
      icon: <Clock className="w-8 h-8" />,
      color: 'from-sanctuary-silver to-gray-600',
      link: '/timeline',
      preview: 'Watch Aaron\'s earthly ministry unfold alongside Jesus\' heavenly intercession'
    },
    {
      id: 'heavenly',
      title: 'Heavenly Sanctuary Portal',
      description: 'Immersive journey from earthly to celestial realms',
      features: ['Progressive Journey', 'Celestial Vision', 'Ambient Sounds', 'Scripture Overlays'],
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-600 to-indigo-800',
      link: '/heavenly',
      preview: 'Experience the transition from outer court to the throne room of God'
    },
    {
      id: 'judgment',
      title: 'Investigative Judgment Module',
      description: 'Interactive learning about this cornerstone Adventist doctrine',
      features: ['Daniel 8:14 Timeline', '1844 Context', 'Historical Development', 'Interactive Quizzes'],
      icon: <Shield className="w-8 h-8" />,
      color: 'from-sanctuary-brass to-yellow-700',
      link: '/judgment',
      preview: 'Explore the chronological development from Daniel\'s prophecy to modern understanding'
    },
    {
      id: 'library',
      title: 'Curated Digital Library',
      description: 'Scholarly resources and academic materials',
      features: ['Peer-Reviewed Articles', 'Classic Adventist Texts', 'Citation Tools', 'Advanced Search'],
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-green-600 to-emerald-800',
      link: '/library',
      preview: 'Access thousands of scholarly articles and historical documents with citation tools'
    },
    {
      id: 'forums',
      title: 'Secure Discussion Forums',
      description: 'Moderated community dialogue and study groups',
      features: ['Thematic Groups', 'Expert Moderation', 'Secure Login', 'Global Community'],
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-600 to-cyan-800',
      link: '/forums',
      preview: 'Join respectful discussions with scholars and students from around the world'
    },
    {
      id: 'profiles',
      title: 'Personalized Learning',
      description: 'Track progress and customize your learning journey',
      features: ['Progress Tracking', 'Bookmarks', 'Achievements', 'Recommendations'],
      icon: <Award className="w-8 h-8" />,
      color: 'from-orange-600 to-red-700',
      link: '/profiles',
      preview: 'Save your progress, earn badges, and receive personalized content recommendations'
    },
    {
      id: 'myths',
      title: 'Myth vs. Fact',
      description: 'Clarify common doctrinal misconceptions',
      features: ['Interactive Quizzes', 'Cross-Denominational', 'Biblical Clarity', 'Study Resources'],
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'from-pink-600 to-rose-800',
      link: '/myths',
      preview: 'Test your knowledge and clear up misunderstandings about sanctuary doctrine'
    },
    {
      id: 'educators',
      title: 'Educator Resources',
      description: 'Teaching tools and lesson plans for ministry leaders',
      features: ['Lesson Plans', 'Classroom Activities', 'Presentations', 'Licensing Guidelines'],
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-teal-600 to-cyan-800',
      link: '/educators',
      preview: 'Download ready-to-use lesson plans and teaching materials for your ministry'
    },
    {
      id: 'media',
      title: 'Companion Media',
      description: 'Podcast and video series with expert insights',
      features: ['Weekly Podcasts', 'YouTube Series', 'Expert Interviews', 'Discussion Guides'],
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-indigo-600 to-purple-800',
      link: '/media',
      preview: 'Listen to weekly podcasts and watch video series featuring renowned theologians'
    },
    {
      id: 'bible',
      title: 'KJV Bible Study',
      description: 'Interactive Bible with search and memorization tools',
      features: ['Full KJV Text', 'Advanced Search', 'Memorization Tools', 'Cross-References'],
      icon: <Book className="w-8 h-8" />,
      color: 'from-amber-600 to-orange-800',
      link: '/bible',
      preview: 'Study the King James Version with powerful search tools and memorization strategies'
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sanctuary-blue-dark via-sanctuary-purple to-sanctuary-purple-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Sanctuary Intra
              <span className="block text-sanctuary-gold">Comparative Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-sanctuary-linen mb-8 max-w-4xl mx-auto leading-relaxed">
              A comprehensive, interactive platform exploring biblical sanctuary doctrine through 
              immersive digital experiences, scholarly resources, and comparative learning tools
            </p>
            <div className="bg-sanctuary-purple-dark/50 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto border border-sanctuary-brass">
              <h3 className="text-lg font-semibold mb-3 text-sanctuary-gold">Our Mission</h3>
              <p className="text-lg text-sanctuary-linen leading-relaxed">
                To deepen theological understanding through immersive digital experiences while fostering 
                respectful community dialogue and academic discourse within Adventist scholarship
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
              <Eye className="w-12 h-12 text-sanctuary-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Interactive 3D Models</h3>
              <p className="text-sanctuary-linen">Explore historically accurate sanctuary models with immersive navigation</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-sanctuary-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Scripture Integration</h3>
              <p className="text-sanctuary-linen">Link biblical texts directly to 3D model components and furnishings</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
              <Users className="w-12 h-12 text-sanctuary-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Community</h3>
              <p className="text-sanctuary-linen">Connect with scholars and students worldwide in moderated discussions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-sanctuary-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Academic Resources</h3>
              <p className="text-sanctuary-linen">Access peer-reviewed articles and classic Adventist theological texts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page Overview Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sanctuary-purple mb-4">Explore Our Platform</h2>
            <p className="text-xl text-sanctuary-brass max-w-3xl mx-auto">
              Discover 14 specialized sections designed to enhance your understanding of sanctuary doctrine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                className="group bg-white rounded-xl shadow-lg border border-sanctuary-silver hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Preview Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${page.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-white/80 text-center">
                    {page.icon}
                    <div className="mt-2 text-sm font-medium">Preview</div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-sanctuary-purple mb-3 group-hover:text-sanctuary-blue transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sanctuary-brass mb-4 leading-relaxed">
                    {page.description}
                  </p>
                  <p className="text-sm text-sanctuary-brass/80 mb-4 italic">
                    {page.preview}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-sanctuary-purple mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {page.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-sanctuary-linen text-sanctuary-purple px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sanctuary-blue group-hover:text-sanctuary-purple transition-colors">
                      Explore Now
                    </span>
                    <ArrowRight className="w-4 h-4 text-sanctuary-brass group-hover:text-sanctuary-purple group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sanctuary-purple mb-4">Getting Started</h2>
            <p className="text-xl text-sanctuary-brass max-w-3xl mx-auto">
              New to sanctuary studies? Follow this recommended learning path
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sanctuary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">Start with 3D Explorer</h3>
              <p className="text-sanctuary-brass text-sm">Get familiar with sanctuary layout and structure</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sanctuary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">Use Scripture Navigator</h3>
              <p className="text-sanctuary-brass text-sm">Connect biblical texts to visual elements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sanctuary-scarlet rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">Explore Symbolism</h3>
              <p className="text-sanctuary-brass text-sm">Discover the theological meaning behind furnishings</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sanctuary-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-2">Join Community</h3>
              <p className="text-sanctuary-brass text-sm">Engage in discussions and deepen understanding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-sanctuary-purple-dark to-sanctuary-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sanctuary-gold mb-2">14</div>
              <div className="text-sanctuary-linen">Interactive Sections</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sanctuary-gold mb-2">5</div>
              <div className="text-sanctuary-linen">3D Sanctuary Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sanctuary-gold mb-2">1000+</div>
              <div className="text-sanctuary-linen">Scholarly Resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sanctuary-gold mb-2">24/7</div>
              <div className="text-sanctuary-linen">Global Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;