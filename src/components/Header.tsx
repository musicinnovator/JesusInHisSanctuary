import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Search, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsExploreOpen(false);
    setIsStudyOpen(false);
  };

  return (
    <header className="bg-sanctuary-linen shadow-sm border-b border-sanctuary-silver sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenus}>
            <Book className="w-8 h-8 text-sanctuary-blue" />
            <div>
              <h1 className="text-xl font-bold text-sanctuary-purple">Sanctuary Studies</h1>
              <p className="text-xs text-sanctuary-brass">Daniel 8:14 Research</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium ${isActive('/') ? 'text-sanctuary-scarlet' : ''}`}
            >
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">
                <span>Explore</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-sanctuary-gold/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/explorer" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  3D Sanctuary Explorer
                </Link>
                <Link to="/compare" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Compare Mode
                </Link>
                <Link to="/symbolism" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Symbolism Explorer
                </Link>
                <Link to="/colors" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Sacred Colors
                </Link>
                <Link to="/heavenly" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Heavenly Portal
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">
                <span>Study</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-sanctuary-gold/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/bible" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Bible Reading
                </Link>
                <Link to="/scripture" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Scripture Navigator
                </Link>
                <Link to="/timeline" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Ministry Timeline
                </Link>
                <Link to="/judgment" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Investigative Judgment
                </Link>
                <Link to="/library" className="block px-4 py-3 text-sanctuary-purple hover:bg-sanctuary-linen transition-colors" onClick={closeMenus}>
                  Digital Library
                </Link>
              </div>
            </div>

            <Link
              to="/media"
              className={`text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium ${isActive('/media') ? 'text-sanctuary-scarlet' : ''}`}
            >
              Media
            </Link>

            <Link
              to="/educators"
              className={`text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium ${isActive('/educators') ? 'text-sanctuary-scarlet' : ''}`}
            >
              Educators
            </Link>

            <Link
              to="/forums"
              className={`text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium ${isActive('/forums') ? 'text-sanctuary-scarlet' : ''}`}
            >
              Forums
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-sanctuary-brass hover:text-sanctuary-gold cursor-pointer transition-colors" />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-sanctuary-brass hover:text-sanctuary-gold hover:bg-sanctuary-linen-dark transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-sanctuary-silver py-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2" onClick={closeMenus}>
                Home
              </Link>

              <div className="border-t border-sanctuary-silver pt-2 mt-2">
                <button
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
                  className="w-full flex items-center justify-between text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2"
                >
                  <span>Explore</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isExploreOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link to="/explorer" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      3D Sanctuary Explorer
                    </Link>
                    <Link to="/compare" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Compare Mode
                    </Link>
                    <Link to="/symbolism" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Symbolism Explorer
                    </Link>
                    <Link to="/colors" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Sacred Colors
                    </Link>
                    <Link to="/heavenly" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Heavenly Portal
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-sanctuary-silver pt-2 mt-2">
                <button
                  onClick={() => setIsStudyOpen(!isStudyOpen)}
                  className="w-full flex items-center justify-between text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2"
                >
                  <span>Study</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isStudyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isStudyOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link to="/bible" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Bible Reading
                    </Link>
                    <Link to="/scripture" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Scripture Navigator
                    </Link>
                    <Link to="/timeline" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Ministry Timeline
                    </Link>
                    <Link to="/judgment" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Investigative Judgment
                    </Link>
                    <Link to="/library" className="block text-sanctuary-brass hover:text-sanctuary-scarlet transition-colors px-2 py-1" onClick={closeMenus}>
                      Digital Library
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/media" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2" onClick={closeMenus}>
                Media
              </Link>
              <Link to="/educators" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2" onClick={closeMenus}>
                Educators
              </Link>
              <Link to="/forums" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-2" onClick={closeMenus}>
                Forums
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;