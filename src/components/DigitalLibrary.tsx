import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Search, Download, ExternalLink, ListFilter as Filter, Star, Book } from 'lucide-react';
import DonationBanner from './DonationBanner';

const DigitalLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'sanctuary', name: 'Sanctuary Doctrine' },
    { id: 'prophecy', name: 'Prophetic Studies' },
    { id: 'judgment', name: 'Investigative Judgment' },
    { id: 'historical', name: 'Historical Studies' },
    { id: 'commentary', name: 'Biblical Commentary' }
  ];

  const authors = [
    { id: 'all', name: 'All Authors' },
    { id: 'white', name: 'Ellen G. White' },
    { id: 'andreasen', name: 'M.L. Andreasen' },
    { id: 'haskell', name: 'S.N. Haskell' },
    { id: 'evans', name: 'Merrill Evans' },
    { id: 'gilbert', name: 'F.C. Gilbert' },
    { id: 'hardinge', name: 'Leslie Hardinge' },
    { id: 'frazee', name: 'W.D. Frazee' }
  ];

  const resources = [
    {
      id: 1,
      title: 'The Sanctuary Service',
      author: 'M.L. Andreasen',
      category: 'sanctuary',
      type: 'Book',
      year: 1947,
      pages: 350,
      rating: 5,
      description: 'A comprehensive study of the sanctuary and its services, showing the plan of salvation.',
      downloadUrl: '#',
      citations: 1250
    },
    {
      id: 2,
      title: 'The Cross and Its Shadow',
      author: 'S.N. Haskell',
      category: 'sanctuary',
      type: 'Book',
      year: 1914,
      pages: 400,
      rating: 5,
      description: 'Types and shadows of the Old Testament pointing to Christ and His work.',
      downloadUrl: '#',
      citations: 890
    },
    {
      id: 3,
      title: 'Patriarchs and Prophets',
      author: 'Ellen G. White',
      category: 'historical',
      type: 'Book',
      year: 1890,
      pages: 756,
      rating: 5,
      description: 'The story of the great conflict between good and evil from creation to King David.',
      downloadUrl: '#',
      citations: 2100
    },
    {
      id: 4,
      title: 'The Great Controversy',
      author: 'Ellen G. White',
      category: 'prophecy',
      type: 'Book',
      year: 1888,
      pages: 678,
      rating: 5,
      description: 'The final conflict between Christ and Satan, including the investigative judgment.',
      downloadUrl: '#',
      citations: 1800
    },
    {
      id: 5,
      title: 'Daniel and the Revelation',
      author: 'Uriah Smith',
      category: 'prophecy',
      type: 'Commentary',
      year: 1897,
      pages: 800,
      rating: 4,
      description: 'Verse-by-verse commentary on the prophetic books of Daniel and Revelation.',
      downloadUrl: '#',
      citations: 650
    },
    {
      id: 6,
      title: 'The Atonement',
      author: 'Leslie Hardinge',
      category: 'judgment',
      type: 'Academic Paper',
      year: 1980,
      pages: 120,
      rating: 4,
      description: 'Scholarly examination of the doctrine of atonement in Adventist theology.',
      downloadUrl: '#',
      citations: 340
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesAuthor = selectedAuthor === 'all' || resource.author.toLowerCase().includes(authors.find(a => a.id === selectedAuthor)?.name.toLowerCase() || '');
    
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Curated Digital Library</h1>
              <p className="text-green-100 text-lg">Scholarly resources and academic materials</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Search Resources</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sanctuary-brass" />
                <input
                  type="text"
                  placeholder="Search by title, author, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-sanctuary-purple mb-2">Author</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 pt-6 border-t border-sanctuary-silver">
            <p className="text-sanctuary-brass">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-lg border border-sanctuary-silver hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-green-600" />
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
                <p className="text-sm font-medium text-green-600 mb-3">{resource.author}</p>
                <p className="text-sanctuary-brass text-sm leading-relaxed mb-4">{resource.description}</p>

                {/* Resource Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-sanctuary-brass">
                  <div>
                    <span className="font-medium">Year:</span> {resource.year}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {resource.pages}
                  </div>
                  <div>
                    <span className="font-medium">Citations:</span> {resource.citations}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {categories.find(c => c.id === resource.category)?.name}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download PDF</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Citation Tools */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Citation Tools</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h4 className="font-semibold text-sanctuary-purple mb-4">APA Format</h4>
              <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                <p className="text-sanctuary-brass text-sm font-mono">
                  Andreasen, M. L. (1947). <em>The Sanctuary Service</em>. Review and Herald Publishing Association.
                </p>
              </div>
              <button className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors">
                Copy APA Citation
              </button>
            </div>

            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h4 className="font-semibold text-sanctuary-purple mb-4">MLA Format</h4>
              <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                <p className="text-sanctuary-brass text-sm font-mono">
                  Andreasen, M. L. <em>The Sanctuary Service</em>. Review and Herald Publishing Association, 1947.
                </p>
              </div>
              <button className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors">
                Copy MLA Citation
              </button>
            </div>

            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h4 className="font-semibold text-sanctuary-purple mb-4">Chicago Format</h4>
              <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                <p className="text-sanctuary-brass text-sm font-mono">
                  Andreasen, M. L. <em>The Sanctuary Service</em>. Takoma Park, MD: Review and Herald Publishing Association, 1947.
                </p>
              </div>
              <button className="mt-3 text-sm text-green-600 hover:text-green-700 transition-colors">
                Copy Chicago Citation
              </button>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Featured Collections</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
              <h4 className="text-xl font-semibold text-sanctuary-purple mb-4">Ellen G. White Estate</h4>
              <p className="text-sanctuary-brass mb-4 leading-relaxed">
                Complete collection of Ellen G. White's published works, including books, 
                articles, and manuscripts related to sanctuary doctrine.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sanctuary-brass">120+ Resources</span>
                <button className="text-green-600 hover:text-green-700 transition-colors font-medium">
                  Explore Collection →
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
              <h4 className="text-xl font-semibold text-sanctuary-purple mb-4">Adventist Pioneers</h4>
              <p className="text-sanctuary-brass mb-4 leading-relaxed">
                Historical works by early Adventist theologians who developed 
                sanctuary doctrine, including Andreasen, Haskell, and others.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sanctuary-brass">85+ Resources</span>
                <button className="text-green-600 hover:text-green-700 transition-colors font-medium">
                  Explore Collection →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalLibrary;