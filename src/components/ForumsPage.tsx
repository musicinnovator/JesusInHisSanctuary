import React, { useState } from 'react';
import { ArrowLeft, Users, MessageSquare, Shield, Plus, Search, Clock, Eye } from 'lucide-react';

const ForumsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Discussions', count: 156 },
    { id: 'sanctuary', name: 'Sanctuary Doctrine', count: 45 },
    { id: 'hebrews', name: 'Hebrews & Sanctuary', count: 28 },
    { id: 'daniel', name: 'Daniel 8:14 Explained', count: 32 },
    { id: 'judgment', name: 'Investigative Judgment', count: 23 },
    { id: 'prophecy', name: 'Prophetic Studies', count: 18 },
    { id: 'general', name: 'General Discussion', count: 10 }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Understanding the Daily in Daniel 8:11-13',
      category: 'daniel',
      author: 'BiblicalScholar',
      authorRole: 'Moderator',
      replies: 24,
      views: 342,
      lastActivity: '2 hours ago',
      isPinned: true,
      tags: ['Daniel', 'Daily', 'Prophecy']
    },
    {
      id: 2,
      title: 'Hebrews 9:23 - Cleansing of Heavenly Things',
      category: 'hebrews',
      author: 'SanctuaryStudent',
      authorRole: 'Member',
      replies: 18,
      views: 256,
      lastActivity: '4 hours ago',
      isPinned: false,
      tags: ['Hebrews', 'Cleansing', 'Heavenly']
    },
    {
      id: 3,
      title: 'The Role of the Scapegoat in Leviticus 16',
      category: 'sanctuary',
      author: 'TheologyProf',
      authorRole: 'Expert',
      replies: 31,
      views: 489,
      lastActivity: '6 hours ago',
      isPinned: true,
      tags: ['Leviticus', 'Scapegoat', 'Atonement']
    },
    {
      id: 4,
      title: 'Questions about the Investigative Judgment Timeline',
      category: 'judgment',
      author: 'NewStudent',
      authorRole: 'Member',
      replies: 12,
      views: 178,
      lastActivity: '1 day ago',
      isPinned: false,
      tags: ['Timeline', '1844', 'Questions']
    },
    {
      id: 5,
      title: 'Comparing Sanctuary Views Across Denominations',
      category: 'general',
      author: 'ComparativeStudy',
      authorRole: 'Member',
      replies: 45,
      views: 623,
      lastActivity: '2 days ago',
      isPinned: false,
      tags: ['Comparative', 'Denominations', 'Discussion']
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Expert': return 'text-sanctuary-gold bg-sanctuary-gold/10';
      case 'Moderator': return 'text-sanctuary-purple bg-sanctuary-purple/10';
      default: return 'text-sanctuary-brass bg-sanctuary-linen';
    }
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-800 text-white py-8">
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
            <Users className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Secure Discussion Forums</h1>
              <p className="text-blue-100 text-lg">Moderated community dialogue and study groups</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Forum Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Discussion</span>
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sanctuary-brass" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-sanctuary-brass" />
              <span className="text-sanctuary-brass text-sm">Moderated Community</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 sticky top-8">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Discussion Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-sanctuary-linen hover:bg-blue-100 text-sanctuary-purple'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Community Guidelines */}
              <div className="mt-8 pt-6 border-t border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-3">Community Guidelines</h4>
                <ul className="space-y-2 text-sm text-sanctuary-brass">
                  <li>• Respectful dialogue only</li>
                  <li>• Stay on topic</li>
                  <li>• Cite sources when possible</li>
                  <li>• No personal attacks</li>
                  <li>• Moderated content</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Discussions List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="font-semibold">
                  {selectedCategory === 'all' ? 'All Discussions' : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
              </div>

              <div className="divide-y divide-sanctuary-silver">
                {filteredDiscussions.map((discussion) => (
                  <div key={discussion.id} className="p-6 hover:bg-sanctuary-linen/50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <span className="bg-sanctuary-gold text-sanctuary-purple px-2 py-1 rounded text-xs font-medium">
                              Pinned
                            </span>
                          )}
                          <h4 className="text-lg font-semibold text-sanctuary-purple hover:text-blue-600 cursor-pointer">
                            {discussion.title}
                          </h4>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-sanctuary-brass mb-3">
                          <span>by <strong>{discussion.author}</strong></span>
                          <span className={`px-2 py-1 rounded text-xs ${getRoleColor(discussion.authorRole)}`}>
                            {discussion.authorRole}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{discussion.lastActivity}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {discussion.tags.map((tag, index) => (
                            <span key={index} className="bg-sanctuary-linen text-sanctuary-purple px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-sanctuary-brass">
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{discussion.replies} replies</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{discussion.views} views</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-sanctuary-linen p-4 flex items-center justify-between">
                <span className="text-sm text-sanctuary-brass">
                  Showing {filteredDiscussions.length} discussions
                </span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-white border border-sanctuary-silver rounded text-sm hover:bg-sanctuary-linen transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                  <button className="px-3 py-1 bg-white border border-sanctuary-silver rounded text-sm hover:bg-sanctuary-linen transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 bg-white border border-sanctuary-silver rounded text-sm hover:bg-sanctuary-linen transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Forum Statistics */}
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-sanctuary-silver text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">1,247</div>
                <div className="text-sanctuary-brass text-sm">Total Posts</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-sanctuary-silver text-center">
                <div className="text-2xl font-bold text-sanctuary-purple mb-2">156</div>
                <div className="text-sanctuary-brass text-sm">Active Topics</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-sanctuary-silver text-center">
                <div className="text-2xl font-bold text-sanctuary-gold-dark mb-2">89</div>
                <div className="text-sanctuary-brass text-sm">Members</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-sanctuary-silver text-center">
                <div className="text-2xl font-bold text-sanctuary-brass mb-2">12</div>
                <div className="text-sanctuary-brass text-sm">Online Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;