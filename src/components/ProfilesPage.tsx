import React, { useState } from 'react';
import { ArrowLeft, Award, BookOpen, Clock, Star, Trophy, User, Settings, Download, Share2 } from 'lucide-react';
import DonationBanner from './DonationBanner';

const ProfilesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    totalTime: '47 hours',
    modulesCompleted: 8,
    totalModules: 14,
    bookmarksCount: 23,
    achievementsCount: 12,
    forumPosts: 15,
    level: 'Advanced Scholar'
  };

  const achievements = [
    { id: 1, name: 'Sanctuary Explorer', description: 'Completed all 3D model tours', icon: '🏛️', earned: true },
    { id: 2, name: 'Scripture Scholar', description: 'Linked 50+ verses to models', icon: '📖', earned: true },
    { id: 3, name: 'Timeline Master', description: 'Completed Aaron & Jesus timeline', icon: '⏰', earned: true },
    { id: 4, name: 'Symbolism Expert', description: 'Explored all furnishing meanings', icon: '✨', earned: true },
    { id: 5, name: 'Judgment Student', description: 'Completed investigative judgment module', icon: '⚖️', earned: true },
    { id: 6, name: 'Community Contributor', description: 'Made 10+ forum posts', icon: '💬', earned: true },
    { id: 7, name: 'Heavenly Visitor', description: 'Completed heavenly sanctuary portal', icon: '👑', earned: false },
    { id: 8, name: 'Library Researcher', description: 'Downloaded 20+ resources', icon: '📚', earned: false },
    { id: 9, name: 'Comparison Analyst', description: 'Used compare mode 25+ times', icon: '🔍', earned: false },
    { id: 10, name: 'Bible Memorizer', description: 'Memorized 10+ verses', icon: '🧠', earned: false },
    { id: 11, name: 'Color Theologian', description: 'Studied all 8 sacred colors', icon: '🎨', earned: true },
    { id: 12, name: 'Myth Buster', description: 'Completed all myth vs fact quizzes', icon: '🎯', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Investigative Judgment Quiz', time: '2 hours ago', type: 'quiz' },
    { action: 'Bookmarked', item: 'Exodus 25:10-22 - Ark of Covenant', time: '1 day ago', type: 'bookmark' },
    { action: 'Posted in', item: 'Daniel 8:14 Discussion Forum', time: '2 days ago', type: 'forum' },
    { action: 'Downloaded', item: 'The Sanctuary Service by M.L. Andreasen', time: '3 days ago', type: 'download' },
    { action: 'Explored', item: 'Solomon\'s Temple 3D Model', time: '5 days ago', type: 'exploration' }
  ];

  const bookmarks = [
    { title: 'Exodus 25:10-22', description: 'Ark of the Covenant instructions', type: 'scripture' },
    { title: 'Hebrews 9:23-24', description: 'Heavenly sanctuary cleansing', type: 'scripture' },
    { title: 'The Sanctuary Service', description: 'M.L. Andreasen classic work', type: 'resource' },
    { title: 'Golden Lampstand Symbolism', description: 'Christ as light of the world', type: 'symbolism' },
    { title: 'Aaron Step 5: Casting Lots', description: 'Choice between life and death', type: 'timeline' }
  ];

  const learningPath = [
    { module: 'Interactive 3D Explorer', progress: 100, completed: true },
    { module: 'Scripture Navigator', progress: 100, completed: true },
    { module: 'Symbolism Mode', progress: 100, completed: true },
    { module: 'Aaron & Jesus Timeline', progress: 85, completed: false },
    { module: 'Compare Mode', progress: 75, completed: false },
    { module: 'Investigative Judgment', progress: 100, completed: true },
    { module: 'Heavenly Portal', progress: 60, completed: false },
    { module: 'Digital Library', progress: 45, completed: false }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-8">
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
            <Award className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Personalized Learning Profile</h1>
              <p className="text-orange-100 text-lg">Track progress and customize your learning journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-2">John Scholar</h2>
              <p className="text-sanctuary-brass text-lg mb-4">{userStats.level} • Member since January 2024</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.totalTime}</div>
                  <div className="text-sm text-sanctuary-brass">Study Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.modulesCompleted}/{userStats.totalModules}</div>
                  <div className="text-sm text-sanctuary-brass">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.achievementsCount}</div>
                  <div className="text-sm text-sanctuary-brass">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.bookmarksCount}</div>
                  <div className="text-sm text-sanctuary-brass">Bookmarks</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden mb-8">
          <div className="flex border-b border-sanctuary-silver">
            {[
              { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
              { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
              { id: 'bookmarks', label: 'Bookmarks', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'progress', label: 'Learning Path', icon: <Clock className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white border-b-2 border-orange-600'
                    : 'text-sanctuary-purple hover:bg-sanctuary-linen'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-sanctuary-linen rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                          activity.type === 'bookmark' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'forum' ? 'bg-purple-100 text-purple-600' :
                          activity.type === 'download' ? 'bg-orange-100 text-orange-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.type === 'quiz' && <Award className="w-5 h-5" />}
                          {activity.type === 'bookmark' && <BookOpen className="w-5 h-5" />}
                          {activity.type === 'forum' && <User className="w-5 h-5" />}
                          {activity.type === 'download' && <Download className="w-5 h-5" />}
                          {activity.type === 'exploration' && <Star className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sanctuary-purple">
                            <span className="font-medium">{activity.action}</span> {activity.item}
                          </p>
                          <p className="text-sm text-sanctuary-brass">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Recommended for You</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-2">Complete Heavenly Portal</h4>
                      <p className="text-sanctuary-brass text-sm mb-4">Experience the immersive journey from earthly to celestial realms</p>
                      <button className="text-orange-600 hover:text-orange-700 font-medium">Continue Journey →</button>
                    </div>
                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-2">Explore Library Resources</h4>
                      <p className="text-sanctuary-brass text-sm mb-4">Discover scholarly articles by M.L. Andreasen and other experts</p>
                      <button className="text-orange-600 hover:text-orange-700 font-medium">Browse Library →</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Your Achievements</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-6 rounded-lg border-2 transition-all ${
                      achievement.earned 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}>
                      <div className="text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h4 className={`font-semibold mb-2 ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <div className="mt-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Earned
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div>
                <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Your Bookmarks</h3>
                <div className="space-y-4">
                  {bookmarks.map((bookmark, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-sanctuary-linen rounded-lg hover:bg-sanctuary-linen-dark transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        bookmark.type === 'scripture' ? 'bg-blue-100 text-blue-600' :
                        bookmark.type === 'resource' ? 'bg-green-100 text-green-600' :
                        bookmark.type === 'symbolism' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sanctuary-purple">{bookmark.title}</h4>
                        <p className="text-sm text-sanctuary-brass">{bookmark.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-orange-600 hover:text-orange-700">
                          <Star className="w-4 h-4" />
                        </button>
                        <button className="text-sanctuary-brass hover:text-sanctuary-purple">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div>
                <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Learning Path Progress</h3>
                <div className="space-y-6">
                  {learningPath.map((module, index) => (
                    <div key={index} className="bg-sanctuary-linen rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-sanctuary-purple">{module.module}</h4>
                        <div className="flex items-center space-x-2">
                          {module.completed && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          )}
                          <span className="text-sanctuary-brass font-medium">{module.progress}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-sanctuary-silver rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            module.completed ? 'bg-green-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white rounded-lg p-6 border border-sanctuary-gold/30">
                  <h4 className="font-semibold text-sanctuary-purple mb-4">Next Recommended Steps</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sanctuary-brass">Complete Aaron & Jesus Timeline (15% remaining)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sanctuary-brass">Finish Compare Mode exercises (25% remaining)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sanctuary-brass">Explore Heavenly Portal experience (40% remaining)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;