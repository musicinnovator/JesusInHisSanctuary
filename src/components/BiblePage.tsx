import React, { useState } from 'react';
import { ArrowLeft, Book, Search, Bookmark, Brain, Eye, Volume2 } from 'lucide-react';

const BiblePage = () => {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [memorizationMode, setMemorizationMode] = useState(false);

  const bibleBooks = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
    'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
    'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
    '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
    'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
    'Jude', 'Revelation'
  ];

  const sampleVerses = {
    'Genesis': {
      1: [
        { verse: 1, text: "In the beginning God created the heaven and the earth." },
        { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        { verse: 3, text: "And God said, Let there be light: and there was light." },
        { verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
        { verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." }
      ]
    },
    'Exodus': {
      25: [
        { verse: 8, text: "And let them make me a sanctuary; that I may dwell among them." },
        { verse: 9, text: "According to all that I shew thee, after the pattern of the tabernacle, and the pattern of all the instruments thereof, even so shall ye make it." },
        { verse: 10, text: "And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof." }
      ]
    }
  };

  const getCurrentVerses = () => {
    return sampleVerses[selectedBook]?.[selectedChapter] || [
      { verse: 1, text: "Sample verse text will appear here when you select a book and chapter." }
    ];
  };

  const memorizationStrategies = [
    {
      name: "Verse Repetition",
      description: "Read the verse multiple times, focusing on key words and phrases"
    },
    {
      name: "Write It Out",
      description: "Write the verse by hand several times to engage muscle memory"
    },
    {
      name: "Break Into Phrases",
      description: "Divide long verses into smaller, manageable phrases"
    },
    {
      name: "Create Associations",
      description: "Link verses to personal experiences or visual imagery"
    },
    {
      name: "Use Rhythm and Melody",
      description: "Set verses to music or create rhythmic patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-800 text-white py-8">
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
            <Book className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">KJV Bible Study</h1>
              <p className="text-orange-100 text-lg">Interactive Bible with search and memorization tools</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Scripture</span>
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search for words or phrases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                  Search Bible
                </button>
              </div>
            </div>

            {/* Book Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Select Book</h3>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-amber-500 mb-3"
              >
                {bibleBooks.map((book) => (
                  <option key={book} value={book}>{book}</option>
                ))}
              </select>
              
              <h4 className="font-semibold text-sanctuary-purple mb-2">Chapter</h4>
              <input
                type="number"
                min="1"
                max="150"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(parseInt(e.target.value) || 1)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Study Tools */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Study Tools</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setMemorizationMode(!memorizationMode)}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    memorizationMode
                      ? 'bg-amber-600 text-white'
                      : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-amber-100'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>Memorization Mode</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 bg-sanctuary-linen text-sanctuary-purple rounded-lg hover:bg-amber-100 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmarks</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 bg-sanctuary-linen text-sanctuary-purple rounded-lg hover:bg-amber-100 transition-colors">
                  <Volume2 className="w-4 h-4" />
                  <span>Audio Reading</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Bible Text */}
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-amber-600 text-white p-4">
                <h3 className="text-xl font-bold">{selectedBook} Chapter {selectedChapter} (KJV)</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {getCurrentVerses().map((verseData) => (
                    <div key={verseData.verse} className="flex space-x-4 group">
                      <span className="text-amber-600 font-bold text-lg min-w-[2rem]">
                        {verseData.verse}
                      </span>
                      <div className="flex-1">
                        <p className="text-sanctuary-purple leading-relaxed text-lg">
                          {memorizationMode ? (
                            <span className="bg-yellow-100 px-1 rounded">
                              {verseData.text}
                            </span>
                          ) : (
                            verseData.text
                          )}
                        </p>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center space-x-2">
                            <button className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded hover:bg-sanctuary-blue-dark transition-colors">
                              Cross-Ref
                            </button>
                            <button className="text-xs bg-sanctuary-gold text-sanctuary-purple px-2 py-1 rounded hover:bg-sanctuary-gold-dark transition-colors">
                              Commentary
                            </button>
                            <button className="text-xs bg-sanctuary-silver text-sanctuary-purple px-2 py-1 rounded hover:bg-sanctuary-silver-dark transition-colors">
                              Bookmark
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Memorization Tools */}
            {memorizationMode && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-xl font-bold text-sanctuary-purple mb-6 flex items-center space-x-2">
                  <Brain className="w-6 h-6" />
                  <span>Memorization Strategies</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {memorizationStrategies.map((strategy, index) => (
                    <div key={index} className="bg-sanctuary-linen rounded-lg p-4">
                      <h4 className="font-semibold text-sanctuary-purple mb-2">{strategy.name}</h4>
                      <p className="text-sanctuary-brass text-sm">{strategy.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-3">Memory Verse Practice</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                      Hide Random Words
                    </button>
                    <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                      Show First Letter Only
                    </button>
                    <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                      Test Recall
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cross References */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Cross References & Commentary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-3">Related Passages</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sanctuary-blue font-medium">John 1:1</span>
                      <button className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">View</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sanctuary-blue font-medium">Hebrews 11:3</span>
                      <button className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">View</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sanctuary-blue font-medium">Colossians 1:16</span>
                      <button className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">View</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-3">Study Notes</h4>
                  <p className="text-sanctuary-brass text-sm leading-relaxed">
                    The opening verse of Genesis establishes God as the eternal Creator, 
                    existing before time and matter. The Hebrew word "bara" indicates 
                    creation ex nihilo (out of nothing), demonstrating God's absolute power.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Quick Access</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="p-4 bg-sanctuary-linen rounded-lg text-left hover:bg-amber-100 transition-colors">
                  <h4 className="font-semibold text-sanctuary-purple">Sanctuary Passages</h4>
                  <p className="text-sm text-sanctuary-brass">Key verses about the sanctuary</p>
                </button>
                <button className="p-4 bg-sanctuary-linen rounded-lg text-left hover:bg-amber-100 transition-colors">
                  <h4 className="font-semibold text-sanctuary-purple">Prophecy Study</h4>
                  <p className="text-sm text-sanctuary-brass">Daniel and Revelation</p>
                </button>
                <button className="p-4 bg-sanctuary-linen rounded-lg text-left hover:bg-amber-100 transition-colors">
                  <h4 className="font-semibold text-sanctuary-purple">Memory Verses</h4>
                  <p className="text-sm text-sanctuary-brass">Popular verses to memorize</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiblePage;