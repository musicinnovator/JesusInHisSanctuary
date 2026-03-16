import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, X, Hop as Home } from 'lucide-react';

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
        className={`bg-white border border-divider rounded shadow-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? 'mb-8' : ''
        }`}
      >
        <button
          onClick={toggleExpand}
          className="w-full p-8 text-left hover:bg-sanctuary-background transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-sanctuary-gold rounded flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-semibold text-sanctuary-navy mb-2">Master Navigation Hub</h2>
                <p className="text-text-secondary text-base font-body">
                  {isExpanded ? 'All features at your fingertips' : 'Click to explore all sanctuary features'}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-text-tertiary text-sm">
                  <span className="bg-sanctuary-background px-3 py-1 rounded">
                    {pages.length} Features Available
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-sanctuary-gold" />
              ) : (
                <ChevronDown className="w-6 h-6 text-sanctuary-gold" />
              )}
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="bg-sanctuary-background text-text-primary p-8 border-t border-divider">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search features, tools, and resources..."
                  className="w-full pl-12 pr-12 py-4 rounded border border-divider focus:border-sanctuary-gold focus:outline-none text-base font-body"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-sanctuary-gold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="mt-2 text-sm text-text-secondary font-body">
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
                      <h3 className="text-2xl font-heading font-semibold text-sanctuary-navy group-hover:text-sanctuary-gold transition-colors">
                        {categoryName}
                        <span className="ml-3 text-sm font-normal text-text-secondary font-body">
                          ({categoryPages.length})
                        </span>
                      </h3>
                      {activeCategory === categoryName ? (
                        <ChevronUp className="w-6 h-6 text-text-secondary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-text-secondary" />
                      )}
                    </button>

                    {/* Category Pages */}
                    {(activeCategory === categoryName || activeCategory === null || searchTerm) && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryPages.map((page) => (
                          <Link
                            key={page.id}
                            to={page.link}
                            className="card-academic group"
                          >
                            <div className="w-8 h-8 text-sanctuary-gold mb-4">
                              {page.icon}
                            </div>
                            <h4 className="text-lg font-heading font-semibold text-sanctuary-navy mb-2 group-hover:text-sanctuary-gold transition-colors">
                              {page.title}
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed font-body">
                              {page.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {page.features.slice(0, 2).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-sanctuary-background px-2 py-1 rounded text-text-tertiary"
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
                <div className="w-20 h-20 bg-sanctuary-background rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-sanctuary-navy mb-2">No Results Found</h3>
                <p className="text-text-secondary mb-4 font-body">
                  Try searching with different keywords
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-primary"
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
          <p className="text-text-secondary text-base font-body">
            Click the card above to access all sanctuary features from one central location
          </p>
        </div>
      )}
    </div>
  );
};

export default MasterNavigationCard;
