import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative bg-sanctuary-navy text-white" style={{ height: '600px' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-sanctuary-navy/95 to-sanctuary-navy/80" />

      <div className="relative h-full container-academic flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
          Jesus in His Sanctuary
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-body">
          Understanding Christ's Ministry in the Heavenly Sanctuary
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/scripture"
            className="btn-primary bg-sanctuary-gold text-white px-8 py-3 rounded font-body font-semibold hover:bg-sanctuary-gold-light transition-all"
          >
            Begin the Study
          </Link>
          <Link
            to="/explorer"
            className="btn-secondary bg-transparent text-white border-2 border-white px-8 py-3 rounded font-body font-semibold hover:bg-white hover:text-sanctuary-navy transition-all"
          >
            Explore Scripture
          </Link>
        </div>

        <p className="text-sm text-gray-300 font-body">
          Interactive Theological Study Platform
        </p>
      </div>
    </section>
  );
};

export default Hero;