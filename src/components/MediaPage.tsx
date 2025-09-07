import React, { useState } from 'react';
import { ArrowLeft, Headphones, Video, Download, Play, Clock, Calendar, Star, Users } from 'lucide-react';

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState('podcasts');
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const podcastEpisodes = [
    {
      id: 1,
      title: 'Understanding the Investigative Judgment',
      description: 'Dr. Frank Holbrook discusses the biblical foundation of the investigative judgment doctrine',
      duration: '45:32',
      date: '2024-01-15',
      guest: 'Dr. Frank Holbrook',
      guestTitle: 'Biblical Research Institute',
      topics: ['Daniel 8:14', 'Investigative Judgment', 'Sanctuary Doctrine'],
      downloads: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'The Colors of the Sanctuary',
      description: 'Exploring the eight sacred colors and their deep spiritual significance',
      duration: '38:15',
      date: '2024-01-08',
      guest: 'Dr. Leslie Hardinge',
      guestTitle: 'Andrews University',
      topics: ['Sanctuary Colors', 'Symbolism', 'Biblical Typology'],
      downloads: 980,
      rating: 4.9
    },
    {
      id: 3,
      title: 'From Tabernacle to Temple: Architectural Evolution',
      description: 'Tracing the development of sacred spaces from Moses to Solomon',
      duration: '52:18',
      date: '2024-01-01',
      guest: 'Dr. William Shea',
      guestTitle: 'Biblical Archaeology',
      topics: ['Architecture', 'Historical Development', 'Biblical History'],
      downloads: 1100,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Hebrews and the Heavenly Sanctuary',
      description: 'Unpacking the book of Hebrews and its sanctuary theology',
      duration: '41:27',
      date: '2023-12-25',
      guest: 'Dr. Jiří Moskala',
      guestTitle: 'Andrews University Seminary',
      topics: ['Book of Hebrews', 'Heavenly Sanctuary', 'New Testament'],
      downloads: 1350,
      rating: 4.9
    },
    {
      id: 5,
      title: 'The Day of Atonement: Type and Antitype',
      description: 'Examining Leviticus 16 and its fulfillment in Christ\'s ministry',
      duration: '47:03',
      date: '2023-12-18',
      guest: 'Dr. Ángel Manuel Rodríguez',
      guestTitle: 'Former BRI Director',
      topics: ['Day of Atonement', 'Leviticus 16', 'Christ\'s Ministry'],
      downloads: 1180,
      rating: 4.8
    }
  ];

  const videoSeries = [
    {
      id: 1,
      title: 'Sanctuary Foundations',
      description: 'A comprehensive 10-part series covering sanctuary basics',
      episodes: 10,
      totalDuration: '8 hours 32 minutes',
      thumbnail: 'sanctuary-foundations.jpg',
      views: 15420,
      rating: 4.7,
      topics: ['Sanctuary Basics', 'Biblical Foundation', 'Historical Context']
    },
    {
      id: 2,
      title: 'Prophetic Timelines Explained',
      description: 'Visual explanations of Daniel and Revelation prophecies',
      episodes: 8,
      totalDuration: '6 hours 15 minutes',
      thumbnail: 'prophetic-timelines.jpg',
      views: 12350,
      rating: 4.8,
      topics: ['Daniel', 'Revelation', 'Prophecy', '2300 Days']
    },
    {
      id: 3,
      title: 'Sanctuary Symbolism Deep Dive',
      description: 'Detailed exploration of furnishings and their meanings',
      episodes: 12,
      totalDuration: '9 hours 45 minutes',
      thumbnail: 'symbolism-deep-dive.jpg',
      views: 9870,
      rating: 4.9,
      topics: ['Symbolism', 'Furnishings', 'Theological Meaning']
    },
    {
      id: 4,
      title: 'Comparative Sanctuary Studies',
      description: 'Examining different perspectives on sanctuary doctrine',
      episodes: 6,
      totalDuration: '5 hours 20 minutes',
      thumbnail: 'comparative-studies.jpg',
      views: 8650,
      rating: 4.6,
      topics: ['Comparative Theology', 'Different Views', 'Scholarly Analysis']
    }
  ];

  const upcomingEpisodes = [
    {
      title: 'The Scapegoat: Azazel and Atonement',
      guest: 'Dr. Roy Gane',
      date: '2024-02-05',
      description: 'Exploring the controversial scapegoat ritual and its meaning'
    },
    {
      title: 'Ellen White and the Sanctuary',
      guest: 'Dr. Merlin Burt',
      date: '2024-02-12',
      description: 'Understanding Ellen White\'s contributions to sanctuary theology'
    },
    {
      title: 'Archaeological Evidence for Biblical Sanctuaries',
      guest: 'Dr. Michael Hasel',
      date: '2024-02-19',
      description: 'What archaeology tells us about ancient sacred spaces'
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-8">
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
            <Headphones className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Companion Media</h1>
              <p className="text-indigo-100 text-lg">Podcast and video series with expert insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden mb-8">
          <div className="flex border-b border-sanctuary-silver">
            <button
              onClick={() => setActiveTab('podcasts')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'podcasts'
                  ? 'bg-indigo-600 text-white border-b-2 border-indigo-600'
                  : 'text-sanctuary-purple hover:bg-sanctuary-linen'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Sanctuary Insights Podcast</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'videos'
                  ? 'bg-indigo-600 text-white border-b-2 border-indigo-600'
                  : 'text-sanctuary-purple hover:bg-sanctuary-linen'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Series</span>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-indigo-600 text-white border-b-2 border-indigo-600'
                  : 'text-sanctuary-purple hover:bg-sanctuary-linen'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming</span>
            </button>
          </div>
        </div>

        {/* Podcast Episodes */}
        {activeTab === 'podcasts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h2 className="text-2xl font-bold text-sanctuary-purple mb-4">Latest Episodes</h2>
              <p className="text-sanctuary-brass mb-6">
                Weekly conversations with theologians, historians, and Bible scholars exploring sanctuary doctrine and its implications.
              </p>
              
              <div className="grid gap-6">
                {podcastEpisodes.map((episode) => (
                  <div key={episode.id} className="border border-sanctuary-silver rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-sanctuary-purple mb-2">{episode.title}</h3>
                        <p className="text-sanctuary-brass mb-3 leading-relaxed">{episode.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-sanctuary-brass mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{episode.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(episode.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{episode.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-sanctuary-gold fill-current" />
                            <span>{episode.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sanctuary-purple">{episode.guest}</p>
                            <p className="text-sm text-sanctuary-brass">{episode.guestTitle}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                              <Play className="w-4 h-4" />
                              <span>Play</span>
                            </button>
                            <button className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {episode.topics.map((topic, index) => (
                            <span key={index} className="bg-sanctuary-linen text-sanctuary-purple px-2 py-1 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Subscribe to Sanctuary Insights</h3>
              <p className="text-sanctuary-brass mb-4">
                Get new episodes delivered automatically to your favorite podcast app.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Apple Podcasts
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Spotify
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Google Podcasts
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  RSS Feed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Series */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h2 className="text-2xl font-bold text-sanctuary-purple mb-4">Video Series</h2>
              <p className="text-sanctuary-brass mb-6">
                In-depth video explorations of sanctuary doctrine with visual explanations and expert interviews.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {videoSeries.map((series) => (
                  <div key={series.id} className="border border-sanctuary-silver rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm">Video Thumbnail</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-sanctuary-purple mb-2">{series.title}</h3>
                      <p className="text-sanctuary-brass mb-4 leading-relaxed">{series.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-sanctuary-brass mb-4">
                        <div>
                          <span className="font-medium">Episodes:</span> {series.episodes}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {series.totalDuration}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{series.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-sanctuary-gold fill-current" />
                          <span>{series.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {series.topics.map((topic, index) => (
                          <span key={index} className="bg-sanctuary-linen text-sanctuary-purple px-2 py-1 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                        Watch Series
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Channel Info */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">YouTube Channel</h3>
              <p className="text-sanctuary-brass mb-4">
                Subscribe to our YouTube channel for the latest video content and live streams.
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Subscribe on YouTube
                </button>
                <div className="text-sanctuary-brass">
                  <span className="font-medium">12.5K subscribers</span> • <span>150+ videos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Episodes */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h2 className="text-2xl font-bold text-sanctuary-purple mb-4">Upcoming Episodes</h2>
              <p className="text-sanctuary-brass mb-6">
                Mark your calendar for these upcoming podcast episodes and video releases.
              </p>
              
              <div className="space-y-4">
                {upcomingEpisodes.map((episode, index) => (
                  <div key={index} className="border border-sanctuary-silver rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-sanctuary-gold rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-sanctuary-purple" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-sanctuary-purple mb-2">{episode.title}</h3>
                        <p className="text-sanctuary-brass mb-3">{episode.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="font-medium text-sanctuary-purple">Guest: </span>
                            <span className="text-sanctuary-brass">{episode.guest}</span>
                          </div>
                          <div>
                            <span className="font-medium text-sanctuary-purple">Release: </span>
                            <span className="text-sanctuary-brass">{new Date(episode.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggest Topics */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Suggest a Topic</h3>
              <p className="text-sanctuary-brass mb-4">
                Have a sanctuary-related topic you'd like us to explore? We'd love to hear your suggestions!
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Suggested topic or question"
                  className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Additional details or specific aspects you'd like covered"
                  rows={3}
                  className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-indigo-500"
                ></textarea>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Submit Suggestion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;