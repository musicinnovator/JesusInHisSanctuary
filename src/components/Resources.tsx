import React, { useState } from 'react';
import { Book, Download, ExternalLink, Filter, Star } from 'lucide-react';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'The Sanctuary and the 2300 Days',
      author: 'William H. Shea',
      category: 'academic',
      type: 'Research Paper',
      rating: 5,
      description: 'Comprehensive analysis of the prophetic timeline and sanctuary symbolism'
    },
    {
      id: 2,
      title: 'Daniel and Revelation Committee Series',
      author: 'Frank B. Holbrook',
      category: 'commentary',
      type: 'Commentary',
      rating: 5,
      description: 'Multi-volume scholarly commentary on apocalyptic literature'
    },
    {
      id: 3,
      title: 'The Day-Year Principle in Prophecy',
      author: 'LeRoy Edwin Froom',
      category: 'academic',
      type: 'Historical Study',
      rating: 4,
      description: 'Historical development of prophetic interpretation principles'
    },
    {
      id: 4,
      title: 'Comparative Sanctuary Studies',
      author: 'Various Authors',
      category: 'comparative',
      type: 'Compilation',
      rating: 4,
      description: 'Cross-denominational perspectives on sanctuary doctrine'
    },
    {
      id: 5,
      title: 'Hebrew Text Analysis Tools',
      author: 'BibleWorks Consortium',
      category: 'tools',
      type: 'Software',
      rating: 5,
      description: 'Digital tools for Hebrew and Greek text analysis'
    },
    {
      id: 6,
      title: 'Chronological Charts',
      author: 'Prophetic Research Institute',
      category: 'visual',
      type: 'Charts',
      rating: 4,
      description: 'Visual representations of prophetic timelines and fulfillments'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'academic', label: 'Academic Papers' },
    { id: 'commentary', label: 'Commentaries' },
    { id: 'comparative', label: 'Comparative Studies' },
    { id: 'tools', label: 'Study Tools' },
    { id: 'visual', label: 'Visual Aids' }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sanctuary-purple mb-4">Research Resources</h2>
          <p className="text-xl text-sanctuary-brass max-w-3xl mx-auto">
            Curated collection of scholarly works, commentaries, and study tools 
            for comprehensive sanctuary research
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-sanctuary-purple text-white shadow-md'
                  : 'bg-sanctuary-silver text-sanctuary-purple hover:bg-sanctuary-silver-dark'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg border border-sanctuary-silver shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-sanctuary-blue" />
                    <span className="text-sm font-medium text-sanctuary-brass bg-sanctuary-linen px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < resource.rating ? 'text-sanctuary-gold fill-current' : 'text-sanctuary-silver'}`} 
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-sanctuary-purple mb-2 leading-tight">{resource.title}</h3>
                <p className="text-sm font-medium text-sanctuary-blue mb-3">{resource.author}</p>
                <p className="text-sanctuary-brass text-sm leading-relaxed mb-6">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-sanctuary-blue hover:text-sanctuary-blue-dark transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Guidelines */}
        <div className="mt-16 bg-gradient-to-r from-sanctuary-purple-dark to-sanctuary-blue-dark rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Research Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-sanctuary-gold">Methodology</h4>
              <ul className="space-y-2 text-sanctuary-linen">
                <li>• Comparative textual analysis across translations</li>
                <li>• Historical-grammatical interpretation</li>
                <li>• Cross-referential biblical study</li>
                <li>• Denominational perspective comparison</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sanctuary-gold">Objectives</h4>
              <ul className="space-y-2 text-sanctuary-linen">
                <li>• Understanding prophetic symbolism</li>
                <li>• Chronological accuracy in interpretation</li>
                <li>• Theological implications assessment</li>
                <li>• Contemporary application relevance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;