import React, { useState } from 'react';
import { ArrowLeft, Shield, Calendar, Book, Users, CheckCircle, Clock } from 'lucide-react';

const JudgmentModule = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState(new Set());

  const sections = [
    { id: 'overview', title: 'Overview', icon: <Shield className="w-5 h-5" /> },
    { id: 'timeline', title: 'Prophetic Timeline', icon: <Calendar className="w-5 h-5" /> },
    { id: 'biblical', title: 'Biblical Foundation', icon: <Book className="w-5 h-5" /> },
    { id: 'historical', title: 'Historical Development', icon: <Clock className="w-5 h-5" /> },
    { id: 'quiz', title: 'Knowledge Check', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-brass to-yellow-700 text-white py-8">
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
            <Shield className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Investigative Judgment Module</h1>
              <p className="text-yellow-100 text-lg">Interactive learning about this cornerstone Adventist doctrine</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 sticky top-8">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Learning Modules</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-sanctuary-brass text-white'
                        : 'bg-sanctuary-linen hover:bg-sanctuary-brass/10 text-sanctuary-purple'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                    {completedSections.has(section.id) && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-2">Progress</h4>
                <div className="w-full bg-sanctuary-linen rounded-full h-2">
                  <div 
                    className="bg-sanctuary-brass h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-sanctuary-brass mt-2">
                  {completedSections.size} of {sections.length} sections completed
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'overview' && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
                <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">The Investigative Judgment</h2>
                
                <div className="space-y-6">
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">What is the Investigative Judgment?</h3>
                    <p className="text-sanctuary-brass leading-relaxed mb-4">
                      The investigative judgment is a distinctive Seventh-day Adventist doctrine that teaches 
                      Christ began a special phase of His heavenly ministry in 1844, examining the records 
                      of all who have professed faith in God throughout history.
                    </p>
                    <p className="text-sanctuary-brass leading-relaxed">
                      This doctrine is based on the prophecy of Daniel 8:14: "And he said unto me, 
                      Unto two thousand and three hundred days; then shall the sanctuary be cleansed."
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-sanctuary-blue/10 to-sanctuary-purple/10 rounded-lg p-6 border border-sanctuary-blue/30">
                      <h4 className="font-semibold text-sanctuary-blue mb-3">Key Scripture: Daniel 8:14</h4>
                      <blockquote className="text-sanctuary-purple italic mb-4">
                        "And he said unto me, Unto two thousand and three hundred days; 
                        then shall the sanctuary be cleansed."
                      </blockquote>
                      <p className="text-sanctuary-brass text-sm">
                        This prophecy points to 1844 AD when Christ began His final work 
                        of judgment in the heavenly sanctuary.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sanctuary-gold/10 to-sanctuary-brass/10 rounded-lg p-6 border border-sanctuary-gold/30">
                      <h4 className="font-semibold text-sanctuary-brass mb-3">Historical Context</h4>
                      <p className="text-sanctuary-purple text-sm leading-relaxed">
                        The doctrine emerged from the Millerite movement and the Great Disappointment 
                        of 1844, when William Miller's prediction of Christ's Second Coming did not 
                        occur as expected. Adventist pioneers understood that the event was not 
                        Christ's return to earth, but His movement into the Most Holy Place of 
                        the heavenly sanctuary.
                      </p>
                    </div>
                  </div>

                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">Three Phases of Christ's Ministry</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg border border-sanctuary-silver">
                        <div className="w-12 h-12 bg-sanctuary-scarlet rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <h5 className="font-semibold text-sanctuary-purple mb-2">Earthly Ministry</h5>
                        <p className="text-sanctuary-brass text-sm">31-34 AD: Christ's life, death, and resurrection</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-sanctuary-silver">
                        <div className="w-12 h-12 bg-sanctuary-blue rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <h5 className="font-semibold text-sanctuary-purple mb-2">Holy Place Ministry</h5>
                        <p className="text-sanctuary-brass text-sm">34-1844 AD: Daily intercession in heaven</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-sanctuary-silver">
                        <div className="w-12 h-12 bg-sanctuary-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <h5 className="font-semibold text-sanctuary-purple mb-2">Most Holy Place</h5>
                        <p className="text-sanctuary-brass text-sm">1844-Second Coming: Investigative judgment</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => markSectionComplete('overview')}
                      className="bg-sanctuary-brass text-white px-6 py-2 rounded-lg hover:bg-sanctuary-brass-dark transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'timeline' && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
                <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Prophetic Timeline: Daniel 8:14</h2>
                
                <div className="space-y-8">
                  {/* Interactive Timeline */}
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-6">2300 Day Prophecy Timeline</h3>
                    
                    <div className="relative">
                      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-sanctuary-brass"></div>
                      
                      <div className="space-y-8">
                        <div className="relative flex items-center justify-start">
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sanctuary-blue rounded-full border-4 border-white z-10"></div>
                          <div className="w-5/12 pr-8 text-right">
                            <div className="bg-white rounded-lg p-4 shadow-md border border-sanctuary-silver">
                              <h4 className="font-semibold text-sanctuary-purple">457 BC</h4>
                              <h5 className="text-sanctuary-blue mb-2">Artaxerxes' Decree</h5>
                              <p className="text-sanctuary-brass text-sm">
                                The decree to restore and rebuild Jerusalem (Ezra 7:11-26)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-end">
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sanctuary-gold rounded-full border-4 border-white z-10"></div>
                          <div className="w-5/12 pl-8 text-left">
                            <div className="bg-white rounded-lg p-4 shadow-md border border-sanctuary-silver">
                              <h4 className="font-semibold text-sanctuary-purple">1844 AD</h4>
                              <h5 className="text-sanctuary-gold-dark mb-2">Sanctuary Cleansed</h5>
                              <p className="text-sanctuary-brass text-sm">
                                Christ enters the Most Holy Place to begin investigative judgment
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-4">Day-Year Principle</h4>
                      <p className="text-sanctuary-brass mb-4 leading-relaxed">
                        In biblical prophecy, a prophetic day represents one literal year 
                        (Numbers 14:34, Ezekiel 4:6).
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                        <p className="text-sanctuary-purple font-medium">2300 prophetic days = 2300 literal years</p>
                        <p className="text-sanctuary-brass text-sm mt-2">457 BC + 2300 years = 1844 AD</p>
                      </div>
                    </div>

                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-4">The 70 Weeks Connection</h4>
                      <p className="text-sanctuary-brass mb-4 leading-relaxed">
                        Daniel 9:24-27 provides the starting point for the 2300 days, 
                        with both prophecies beginning in 457 BC.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                        <p className="text-sanctuary-purple font-medium">70 weeks = 490 years</p>
                        <p className="text-sanctuary-brass text-sm mt-2">Cut off from the 2300 days</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => markSectionComplete('timeline')}
                      className="bg-sanctuary-brass text-white px-6 py-2 rounded-lg hover:bg-sanctuary-brass-dark transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'biblical' && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
                <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical Foundation</h2>
                
                <div className="space-y-6">
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">Key Scripture Passages</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-blue">
                        <h4 className="font-semibold text-sanctuary-blue mb-2">Daniel 8:14 (KJV)</h4>
                        <blockquote className="text-sanctuary-purple italic mb-2">
                          "And he said unto me, Unto two thousand and three hundred days; 
                          then shall the sanctuary be cleansed."
                        </blockquote>
                        <p className="text-sanctuary-brass text-sm">
                          The foundational prophecy pointing to the cleansing of the sanctuary in 1844.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-gold">
                        <h4 className="font-semibold text-sanctuary-gold-dark mb-2">Hebrews 9:23-24 (KJV)</h4>
                        <blockquote className="text-sanctuary-purple italic mb-2">
                          "It was therefore necessary that the patterns of things in the heavens should be 
                          purified with these; but the heavenly things themselves with better sacrifices than these. 
                          For Christ is not entered into the holy places made with hands, which are the figures 
                          of the true; but into heaven itself, now to appear in the presence of God for us."
                        </blockquote>
                        <p className="text-sanctuary-brass text-sm">
                          Shows that the heavenly sanctuary requires cleansing, just as the earthly did.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-scarlet">
                        <h4 className="font-semibold text-sanctuary-scarlet mb-2">Leviticus 16:29-30 (KJV)</h4>
                        <blockquote className="text-sanctuary-purple italic mb-2">
                          "And this shall be a statute for ever unto you: that in the seventh month, 
                          on the tenth day of the month, ye shall afflict your souls, and do no work at all... 
                          For on that day shall the priest make an atonement for you, to cleanse you, 
                          that ye may be clean from all your sins before the LORD."
                        </blockquote>
                        <p className="text-sanctuary-brass text-sm">
                          The Day of Atonement service provides the type for the investigative judgment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-4">Type and Antitype</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="text-sanctuary-purple font-medium">Earthly Sanctuary</span>
                          <span className="text-sanctuary-brass">→</span>
                          <span className="text-sanctuary-blue font-medium">Heavenly Sanctuary</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="text-sanctuary-purple font-medium">Day of Atonement</span>
                          <span className="text-sanctuary-brass">→</span>
                          <span className="text-sanctuary-blue font-medium">Investigative Judgment</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="text-sanctuary-purple font-medium">High Priest</span>
                          <span className="text-sanctuary-brass">→</span>
                          <span className="text-sanctuary-blue font-medium">Jesus Christ</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-sanctuary-linen rounded-lg p-6">
                      <h4 className="font-semibold text-sanctuary-purple mb-4">Judgment Themes in Scripture</h4>
                      <ul className="space-y-2 text-sanctuary-brass">
                        <li className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                          <span>Books of record (Daniel 7:10, Revelation 20:12)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                          <span>Pre-advent judgment (Daniel 7:9-14)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                          <span>Blotting out of sins (Acts 3:19)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                          <span>Sealing of God's people (Revelation 7:1-4)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => markSectionComplete('biblical')}
                      className="bg-sanctuary-brass text-white px-6 py-2 rounded-lg hover:bg-sanctuary-brass-dark transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'historical' && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
                <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Historical Development</h2>
                
                <div className="space-y-6">
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">The Millerite Movement</h3>
                    <p className="text-sanctuary-brass leading-relaxed mb-4">
                      William Miller (1782-1849) began preaching about Christ's Second Coming based on 
                      his study of Daniel 8:14. He calculated that the 2300 days would end around 1843-1844, 
                      expecting Christ to return to earth to cleanse the sanctuary by fire.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                        <h4 className="font-semibold text-sanctuary-blue mb-2">Miller's Calculation</h4>
                        <p className="text-sanctuary-brass text-sm">
                          Using the day-year principle, Miller calculated 2300 years from 457 BC, 
                          arriving at 1843 (later refined to October 22, 1844).
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-sanctuary-silver">
                        <h4 className="font-semibold text-sanctuary-blue mb-2">The Great Disappointment</h4>
                        <p className="text-sanctuary-brass text-sm">
                          When Christ did not return on October 22, 1844, thousands of believers 
                          experienced profound disappointment and confusion.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">Adventist Understanding</h3>
                    <p className="text-sanctuary-brass leading-relaxed mb-4">
                      Following the disappointment, Adventist pioneers studied further and concluded 
                      that Miller was correct about the date but wrong about the event. Instead of 
                      Christ coming to earth, He moved from the Holy Place to the Most Holy Place 
                      in the heavenly sanctuary.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-gold">
                        <h4 className="font-semibold text-sanctuary-gold-dark mb-2">Key Pioneers</h4>
                        <ul className="text-sanctuary-brass text-sm space-y-1">
                          <li>• Hiram Edson - Vision of Christ in heavenly sanctuary</li>
                          <li>• O.R.L. Crosier - Detailed sanctuary articles</li>
                          <li>• Ellen G. White - Prophetic confirmation and elaboration</li>
                          <li>• Joseph Bates - Sabbath and sanctuary connection</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 border-l-4 border-sanctuary-purple">
                        <h4 className="font-semibold text-sanctuary-purple mb-2">Doctrinal Development</h4>
                        <p className="text-sanctuary-brass text-sm">
                          The doctrine was further developed through Bible conferences, 
                          publications, and the writings of Ellen G. White, becoming a 
                          fundamental belief of the Seventh-day Adventist Church.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => markSectionComplete('historical')}
                      className="bg-sanctuary-brass text-white px-6 py-2 rounded-lg hover:bg-sanctuary-brass-dark transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'quiz' && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
                <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Knowledge Check</h2>
                
                <div className="space-y-6">
                  <div className="bg-sanctuary-linen rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-sanctuary-purple mb-4">Test Your Understanding</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-white rounded-lg p-6 border border-sanctuary-silver">
                        <h4 className="font-semibold text-sanctuary-purple mb-4">
                          Question 1: What year did the investigative judgment begin?
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q1" value="1843" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">1843 AD</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q1" value="1844" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">1844 AD</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q1" value="1845" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">1845 AD</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 border border-sanctuary-silver">
                        <h4 className="font-semibold text-sanctuary-purple mb-4">
                          Question 2: The 2300 days prophecy is found in which book?
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q2" value="daniel" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">Daniel</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q2" value="revelation" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">Revelation</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q2" value="leviticus" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">Leviticus</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 border border-sanctuary-silver">
                        <h4 className="font-semibold text-sanctuary-purple mb-4">
                          Question 3: True or False: The investigative judgment means God doesn't know who is saved.
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q3" value="true" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">True</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="radio" name="q3" value="false" className="text-sanctuary-purple" />
                            <span className="text-sanctuary-brass">False</span>
                          </label>
                        </div>
                        <div className="mt-4 p-4 bg-sanctuary-linen rounded-lg">
                          <p className="text-sanctuary-brass text-sm">
                            <strong>Explanation:</strong> The investigative judgment is not about God learning 
                            who is saved, but about demonstrating to the universe the justice of God's decisions. 
                            It vindicates God's character and shows that His judgments are fair and righteous.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button className="bg-sanctuary-silver text-sanctuary-purple px-6 py-2 rounded-lg hover:bg-sanctuary-silver-dark transition-colors">
                        Reset Quiz
                      </button>
                      <button
                        onClick={() => markSectionComplete('quiz')}
                        className="bg-sanctuary-brass text-white px-6 py-2 rounded-lg hover:bg-sanctuary-brass-dark transition-colors"
                      >
                        Submit & Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgmentModule;