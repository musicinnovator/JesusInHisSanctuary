import React from 'react';
import { Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sanctuary-navy text-white">
      <div className="container-academic py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Book className="w-6 h-6 text-sanctuary-gold-light" />
              <div>
                <h3 className="text-lg font-heading font-semibold">Sanctuary Study Platform</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              An academic resource for biblical scholarship exploring Christ's ministry
              in the heavenly sanctuary through Scripture, historical analysis, and interactive learning tools.
            </p>
          </div>

          {/* Study Topics */}
          <div>
            <h4 className="text-base font-body font-semibold mb-4 text-white">Study Topics</h4>
            <ul className="space-y-2">
              <li><a href="/explorer" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Earthly Sanctuary</a></li>
              <li><a href="/heavenly" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Heavenly Sanctuary</a></li>
              <li><a href="/scripture" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Priesthood of Christ</a></li>
              <li><a href="/judgment" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Day of Atonement</a></li>
              <li><a href="/symbolism" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Symbolism</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-body font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/library" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Digital Library</a></li>
              <li><a href="/timeline" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Timeline</a></li>
              <li><a href="/colors" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Sacred Colors</a></li>
              <li><a href="/educators" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Educators</a></li>
              <li><a href="/forums" className="text-sm text-gray-300 hover:text-sanctuary-gold-light transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2026 Digital Sanctuary Network. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-sanctuary-gold-light transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-sanctuary-gold-light transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-sanctuary-gold-light transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;