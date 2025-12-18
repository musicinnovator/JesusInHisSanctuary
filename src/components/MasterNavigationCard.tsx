import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, X, Home } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  link: string;
  preview: string;
}

interface MasterNavigationCardProps {
  pages: Page[];
}

const MasterNavigationCard: React.FC<MasterNavigationCardProps> = ({ pages }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return {
      'Study Tools': ['explorer', 'scripture', 'bible', 'symbolism'],
      'Learning Modules': ['judgment', 'timeline', 'heavenly', 'myths', 'colors'],
      'Resources': ['library', 'educators', 'media', 'compare'],
      'Community': ['forums', 'profiles']
    };
  }, []);

  const filteredPages = useMemo(() => {
    if (!searchTerm) return pages;

    const term = searchTerm.toLowerCase();
    return pages.filter(page =>
      page.title.toLowerCase().includes(term) ||
      page.description.toLowerCase().includes(term) ||
      page.features.some(f => f.toLowerCase().includes(term))
    );
  }, [pages, searchTerm]);

  const getCategoryPages = (categoryIds: string[]) => {
    return filteredPages.filter(page => categoryIds.includes(page.id));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm('');
      setActiveCategory(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Master Card Header */}
      <div
        className={`bg-gradient-to-br from-sanctuary-purple-dark via-sanctuary-blue-dark to-sanctuary-purple text-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isExpanded ? 'mb-8' : ''
        }`}
      >
        <button
          onClick={toggleExpand}
          className="w-full p-8 text-left hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-sanctuary-gold rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">Master Navigation Hub</h2>
                <p className="text-sanctuary-linen text-xl">
                  {isExpanded ? 'All 15 features at your fingertips' : 'Click to explore all sanctuary features'}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-sanctuary-gold text-sm">
                  <span className="bg-sanctuary-gold/20 px-3 py-1 rounded-full">
                    {pages.length} Features Available
                  </span>
                  <span className="bg-sanctuary-gold/20 px-3 py-1 rounded-full">
                    4 Categories
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-sanctuary-gold animate-pulse" />
              ) : (
                <ChevronDown className="w-8 h-8 text-sanctuary-gold animate-bounce" />
              )}
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="bg-white text-sanctuary-purple p-8 border-t-4 border-sanctuary-gold">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sanctuary-brass" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search features, tools, and resources..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-sanctuary-silver focus:border-sanctuary-blue focus:outline-none text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="mt-2 text-sm text-sanctuary-brass">
                  Found {filteredPages.length} result{filteredPages.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-8">
              {Object.entries(categories).map(([categoryName, categoryIds]) => {
                const categoryPages = getCategoryPages(categoryIds);

                if (categoryPages.length === 0 && searchTerm) return null;

                return (
                  <div key={categoryName}>
                    <button
                      onClick={() => setActiveCategory(activeCategory === categoryName ? null : categoryName)}
                      className="flex items-center justify-between w-full mb-4 group"
                    >
                      <h3 className="text-2xl font-bold text-sanctuary-purple group-hover:text-sanctuary-blue transition-colors">
                        {categoryName}
                        <span className="ml-3 text-sm font-normal text-sanctuary-brass">
                          ({categoryPages.length})
                        </span>
                      </h3>
                      {activeCategory === categoryName ? (
                        <ChevronUp className="w-6 h-6 text-sanctuary-brass" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-sanctuary-brass" />
                      )}
                    </button>

                    {/* Category Pages */}
                    {(activeCategory === categoryName || activeCategory === null || searchTerm) && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryPages.map((page) => (
                          <Link
                            key={page.id}
                            to={page.link}
                            className="group bg-sanctuary-linen rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-sanctuary-gold"
                          >
                            <div className={`w-12 h-12 bg-gradient-to-r ${page.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                              {page.icon}
                            </div>
                            <h4 className="text-lg font-bold text-sanctuary-purple mb-2 group-hover:text-sanctuary-blue transition-colors">
                              {page.title}
                            </h4>
                            <p className="text-sm text-sanctuary-brass leading-relaxed">
                              {page.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {page.features.slice(0, 2).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-white px-2 py-1 rounded-full text-sanctuary-brass"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredPages.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-sanctuary-linen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-sanctuary-brass" />
                </div>
                <h3 className="text-xl font-bold text-sanctuary-purple mb-2">No Results Found</h3>
                <p className="text-sanctuary-brass mb-4">
                  Try searching with different keywords
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 bg-sanctuary-blue text-white rounded-lg hover:bg-sanctuary-blue-dark transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helpful Tip */}
      {!isExpanded && (
        <div className="text-center mt-8">
          <p className="text-sanctuary-brass text-lg">
            Click the card above to access all sanctuary features from one central location
          </p>
        </div>
      )}
    </div>
  );
};

export default MasterNavigationCard;
