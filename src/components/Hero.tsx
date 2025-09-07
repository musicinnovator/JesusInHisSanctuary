import React from 'react';
import { ScrollText, Calendar, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-sanctuary-blue-dark via-sanctuary-purple to-sanctuary-purple-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Sanctuary Intra
            <span className="block text-sanctuary-gold">Comparative Studies</span>
          </h1>
          <p className="text-xl md:text-2xl text-sanctuary-linen mb-8 max-w-4xl mx-auto leading-relaxed">
            A comprehensive examination of Daniel 8:14 and the sanctuary doctrine through 
            comparative theological analysis and historical interpretation
          </p>
          <div className="bg-sanctuary-purple-dark/50 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto border border-sanctuary-brass">
            <h3 className="text-lg font-semibold mb-3 text-sanctuary-gold">Daniel 8:14 (KJV)</h3>
            <blockquote className="text-lg italic text-sanctuary-linen leading-relaxed">
              "And he said unto me, Unto two thousand and three hundred days; 
              then shall the sanctuary be cleansed."
            </blockquote>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
            <ScrollText className="w-12 h-12 text-sanctuary-gold mb-4" />
            <h3 className="text-xl font-semibold mb-3">Textual Analysis</h3>
            <p className="text-sanctuary-linen">In-depth examination of Hebrew and Greek texts with multiple translation comparisons</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
            <Calendar className="w-12 h-12 text-sanctuary-gold mb-4" />
            <h3 className="text-xl font-semibold mb-3">Prophetic Timeline</h3>
            <p className="text-sanctuary-linen">Chronological study of the 2300 days and historical fulfillment patterns</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-sanctuary-gold/30 hover:bg-white/15 transition-all duration-300">
            <Users className="w-12 h-12 text-sanctuary-gold mb-4" />
            <h3 className="text-xl font-semibold mb-3">Intra-Comparative Views</h3>
            <p className="text-sanctuary-linen">Intra-denomination views expressed by various authors throughout the last century</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;