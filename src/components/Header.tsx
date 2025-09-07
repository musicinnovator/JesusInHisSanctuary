import React, { useState } from 'react';
import { Menu, X, Book, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-sanctuary-linen shadow-sm border-b border-sanctuary-silver sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-sanctuary-blue" />
            <div>
              <h1 className="text-xl font-bold text-sanctuary-purple">Sanctuary Studies</h1>
              <p className="text-xs text-sanctuary-brass">Daniel 8:14 Research</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Home</a>
            <a href="/colors" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Colors</a>
            <a href="#analysis" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Analysis</a>
            <a href="#timeline" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Timeline</a>
            <a href="#resources" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Resources</a>
            <a href="#comparative" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium">Comparative</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-sanctuary-brass hover:text-sanctuary-gold cursor-pointer transition-colors" />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-sanctuary-brass hover:text-sanctuary-gold hover:bg-sanctuary-linen-dark transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sanctuary-silver py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Home</a>
              <a href="/colors" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Colors</a>
              <a href="#analysis" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Analysis</a>
              <a href="#timeline" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Timeline</a>
              <a href="#resources" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Resources</a>
              <a href="#comparative" className="text-sanctuary-purple hover:text-sanctuary-scarlet transition-colors font-medium px-2 py-1">Comparative</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;