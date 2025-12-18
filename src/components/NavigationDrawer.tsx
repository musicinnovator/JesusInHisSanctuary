import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Home } from 'lucide-react';

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

interface NavigationDrawerProps {
  pages: Page[];
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ pages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = searchTerm
    ? pages.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pages;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categories = {
    'Study Tools': ['explorer', 'scripture', 'bible', 'symbolism'],
    'Learning Modules': ['judgment', 'timeline', 'heavenly', 'myths', 'colors'],
    'Resources': ['library', 'educators', 'media', 'compare'],
    'Community': ['forums', 'profiles']
  };

  const getCategoryPages = (categoryIds: string[]) => {
    return filteredPages.filter(page => categoryIds.includes(page.id));
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-sanctuary-purple-dark to-sanctuary-blue-dark text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open Navigation Menu"
      >
        <Menu className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-br from-sanctuary-purple-dark to-sanctuary-blue-dark text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sanctuary-gold rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Navigation</h2>
                  <p className="text-sm text-sanctuary-linen">{pages.length} Features</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sanctuary-brass" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search features..."
                className="w-full pl-10 pr-4 py-2 rounded-lg text-sanctuary-purple placeholder-sanctuary-brass focus:outline-none focus:ring-2 focus:ring-sanctuary-gold"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredPages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sanctuary-brass">No features found</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-sanctuary-blue hover:text-sanctuary-purple transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(categories).map(([categoryName, categoryIds]) => {
                  const categoryPages = getCategoryPages(categoryIds);

                  if (categoryPages.length === 0) return null;

                  return (
                    <div key={categoryName}>
                      <h3 className="text-sm font-bold text-sanctuary-brass uppercase tracking-wide mb-3">
                        {categoryName}
                      </h3>
                      <div className="space-y-2">
                        {categoryPages.map((page) => (
                          <Link
                            key={page.id}
                            to={page.link}
                            onClick={() => setIsOpen(false)}
                            className="block bg-sanctuary-linen rounded-lg p-4 hover:bg-white hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-sanctuary-gold"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${page.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                {page.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-sanctuary-purple truncate">
                                  {page.title}
                                </h4>
                                <p className="text-xs text-sanctuary-brass line-clamp-2 mt-1">
                                  {page.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;
