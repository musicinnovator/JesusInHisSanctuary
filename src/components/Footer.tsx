import React from 'react';
import { Book, Mail, Globe, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sanctuary-purple-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Book className="w-8 h-8 text-sanctuary-gold" />
              <div>
                <h3 className="text-xl font-bold">Sanctuary Studies</h3>
                <p className="text-sm text-sanctuary-silver">Daniel 8:14 Research Platform</p>
              </div>
            </div>
            <p className="text-sanctuary-linen leading-relaxed max-w-md mb-6">
              Dedicated to the scholarly examination of biblical sanctuary doctrine 
              through comparative analysis and historical investigation.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-sanctuary-purple rounded-full flex items-center justify-center hover:bg-sanctuary-brass transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-sanctuary-linen" />
              </div>
              <div className="w-10 h-10 bg-sanctuary-purple rounded-full flex items-center justify-center hover:bg-sanctuary-brass transition-colors cursor-pointer">
                <Globe className="w-5 h-5 text-sanctuary-linen" />
              </div>
              <div className="w-10 h-10 bg-sanctuary-purple rounded-full flex items-center justify-center hover:bg-sanctuary-brass transition-colors cursor-pointer">
                <Users className="w-5 h-5 text-sanctuary-linen" />
              </div>
            </div>
          </div>

          {/* Study Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sanctuary-gold">Study Areas</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Textual Analysis</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Historical Context</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Prophetic Timeline</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Theological Implications</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Contemporary Relevance</a></li>
            </ul>
          </div>

          {/* Research Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sanctuary-gold">Research Tools</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Bible Translations</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Commentary Library</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Historical Documents</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Comparative Charts</a></li>
              <li><a href="#" className="text-sanctuary-linen hover:text-white transition-colors">Study Notes</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sanctuary-brass pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sanctuary-silver text-sm mb-4 md:mb-0">
              © 2025 Sanctuary Intra Comparative Studies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-sanctuary-silver hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sanctuary-silver hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-sanctuary-silver hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;