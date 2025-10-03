import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle, XCircle, Lightbulb, Book, Users } from 'lucide-react';
import DonationBanner from './DonationBanner';

const MythsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'judgment', name: 'Investigative Judgment' },
    { id: 'sanctuary', name: 'Sanctuary Doctrine' },
    { id: 'salvation', name: 'Salvation & Works' },
    { id: 'prophecy', name: 'Prophetic Interpretation' },
    { id: 'denominational', name: 'Denominational Views' }
  ];

  const mythsAndFacts = [
    {
      id: 1,
      category: 'judgment',
      myth: "The investigative judgment means God doesn't know who is saved",
      fact: "The investigative judgment demonstrates God's justice to the universe, not His lack of knowledge",
      explanation: "God is omniscient and knows all things. The investigative judgment is not about God learning who is saved, but about demonstrating to the universe the justice of God's decisions. It vindicates God's character and shows that His judgments are fair and righteous.",
      scripture: "Daniel 7:9-10, Revelation 20:12",
      difficulty: "intermediate",
      commonMisconception: true
    },
    {
      id: 2,
      category: 'sanctuary',
      myth: "The sanctuary doctrine is unique to Seventh-day Adventists",
      fact: "The sanctuary has been central to biblical theology throughout Christian history",
      explanation: "While Adventists have developed unique insights about the heavenly sanctuary, the concept of sanctuary theology appears throughout Scripture and has been recognized by many Christian traditions. The book of Hebrews extensively discusses the heavenly sanctuary.",
      scripture: "Hebrews 8:1-2, Hebrews 9:11-12",
      difficulty: "beginner",
      commonMisconception: false
    },
    {
      id: 3,
      category: 'salvation',
      myth: "Adventists believe in salvation by works",
      fact: "Adventists believe in salvation by grace through faith, with works as evidence",
      explanation: "Seventh-day Adventists firmly believe in salvation by grace through faith alone. Good works are seen as the natural result of salvation, not the cause of it. This aligns with biblical teaching that faith without works is dead.",
      scripture: "Ephesians 2:8-9, James 2:17",
      difficulty: "beginner",
      commonMisconception: true
    },
    {
      id: 4,
      category: 'prophecy',
      myth: "The 2300 days of Daniel 8:14 were fulfilled in the Maccabean period",
      fact: "The 2300 days extend from 457 BC to 1844 AD using the day-year principle",
      explanation: "While some interpret the 2300 days as literal days fulfilled during Antiochus Epiphanes' persecution, the prophetic day-year principle and the broader context of Daniel's prophecies point to a longer fulfillment period ending in 1844.",
      scripture: "Daniel 8:14, Numbers 14:34, Ezekiel 4:6",
      difficulty: "advanced",
      commonMisconception: false
    },
    {
      id: 5,
      category: 'denominational',
      myth: "Adventists worship Ellen White as a prophet equal to Scripture",
      fact: "Ellen White's writings are considered inspired counsel that points to Scripture",
      explanation: "Adventists view Ellen White as a messenger of the Lord whose writings provide guidance and insight, but Scripture remains the ultimate authority. Her writings are tested by and point back to the Bible.",
      scripture: "Isaiah 8:20, 1 Thessalonians 5:20-21",
      difficulty: "intermediate",
      commonMisconception: true
    },
    {
      id: 6,
      category: 'sanctuary',
      myth: "The heavenly sanctuary is just symbolic, not literal",
      fact: "Scripture presents the heavenly sanctuary as a real place where Christ ministers",
      explanation: "While the earthly sanctuary contained symbols, the heavenly sanctuary is presented in Scripture as the true tabernacle where Christ serves as our High Priest. It's both real and symbolic.",
      scripture: "Hebrews 8:2, Hebrews 9:24",
      difficulty: "intermediate",
      commonMisconception: false
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "True or False: The investigative judgment means God doesn't know who is saved.",
      type: "true-false",
      correctAnswer: false,
      explanation: "False. The investigative judgment is not about God learning who is saved (He is omniscient), but about demonstrating to the universe the justice of God's decisions.",
      category: "judgment"
    },
    {
      id: 2,
      question: "What is the primary purpose of the investigative judgment?",
      type: "multiple-choice",
      options: [
        "To help God decide who is saved",
        "To demonstrate God's justice to the universe",
        "To punish sinners",
        "To reward the righteous"
      ],
      correctAnswer: 1,
      explanation: "The investigative judgment demonstrates God's justice to the universe, showing that His decisions are fair and righteous.",
      category: "judgment"
    },
    {
      id: 3,
      question: "According to Adventist belief, salvation is by:",
      type: "multiple-choice",
      options: [
        "Works alone",
        "Grace through faith alone",
        "A combination of grace and works",
        "Church membership"
      ],
      correctAnswer: 1,
      explanation: "Adventists believe in salvation by grace through faith alone, with works being the evidence of genuine faith.",
      category: "salvation"
    }
  ];

  const filteredMyths = selectedCategory === 'all' 
    ? mythsAndFacts 
    : mythsAndFacts.filter(item => item.category === selectedCategory);

  const handleQuizAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setCurrentQuiz(null);
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-800 text-white py-8">
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
            <HelpCircle className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Myth vs. Fact</h1>
              <p className="text-pink-100 text-lg">Clarify common doctrinal misconceptions with biblical truth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-pink-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Quiz Section */}
        {!currentQuiz && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-4">Test Your Knowledge</h2>
              <p className="text-sanctuary-brass mb-6">Take our interactive quiz to identify and correct common misconceptions</p>
              <button
                onClick={() => setCurrentQuiz(quizQuestions)}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Quiz Interface */}
        {currentQuiz && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sanctuary-purple">Knowledge Quiz</h2>
              <button
                onClick={resetQuiz}
                className="text-sanctuary-brass hover:text-sanctuary-purple transition-colors"
              >
                Reset Quiz
              </button>
            </div>

            <div className="space-y-8">
              {currentQuiz.map((question, index) => (
                <div key={question.id} className="border border-sanctuary-silver rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">
                    Question {index + 1}: {question.question}
                  </h3>

                  {question.type === 'true-false' && (
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value="true"
                          onChange={() => handleQuizAnswer(question.id, true)}
                          className="text-pink-600"
                        />
                        <span className="text-sanctuary-purple">True</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value="false"
                          onChange={() => handleQuizAnswer(question.id, false)}
                          className="text-pink-600"
                        />
                        <span className="text-sanctuary-purple">False</span>
                      </label>
                    </div>
                  )}

                  {question.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            onChange={() => handleQuizAnswer(question.id, optionIndex)}
                            className="text-pink-600"
                          />
                          <span className="text-sanctuary-purple">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {showResults && (
                    <div className="mt-4 p-4 bg-sanctuary-linen rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {userAnswers[question.id] === question.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className={`font-medium ${
                          userAnswers[question.id] === question.correctAnswer ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {userAnswers[question.id] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-sanctuary-brass text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              {!showResults ? (
                <button
                  onClick={submitQuiz}
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-sanctuary-purple">
                    Your Score: {Object.values(userAnswers).filter((answer, index) => 
                      answer === currentQuiz[index].correctAnswer
                    ).length} / {currentQuiz.length}
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="bg-sanctuary-purple text-white px-8 py-3 rounded-lg hover:bg-sanctuary-purple-dark transition-colors font-semibold"
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Myth vs Fact Cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredMyths.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-6 h-6" />
                  <h3 className="font-bold text-lg">MYTH</h3>
                  {item.commonMisconception && (
                    <span className="bg-red-700 text-xs px-2 py-1 rounded-full">Common</span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-sanctuary-purple font-medium mb-4 italic">"{item.myth}"</p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">FACT</h4>
                  </div>
                  <p className="text-green-700 font-medium">"{item.fact}"</p>
                </div>

                <div className="bg-sanctuary-linen rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-sanctuary-brass" />
                    <h4 className="font-semibold text-sanctuary-purple">Explanation</h4>
                  </div>
                  <p className="text-sanctuary-brass text-sm leading-relaxed">{item.explanation}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 h-4 text-sanctuary-blue" />
                    <span className="text-sanctuary-blue text-sm font-medium">{item.scripture}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      item.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Group Resources */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
          <h2 className="text-2xl font-bold text-sanctuary-purple mb-6 flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>Small Group Study Resources</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Discussion Questions</h3>
              <ul className="space-y-2 text-sanctuary-brass">
                <li>• How do misconceptions about our beliefs affect evangelism?</li>
                <li>• What role does Scripture play in correcting false ideas?</li>
                <li>• How can we address misconceptions with love and patience?</li>
                <li>• What are the most common misconceptions you've encountered?</li>
              </ul>
            </div>
            
            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Leader Guidelines</h3>
              <ul className="space-y-2 text-sanctuary-brass">
                <li>• Create a safe space for questions and doubts</li>
                <li>• Use Scripture as the primary authority</li>
                <li>• Encourage respectful dialogue and listening</li>
                <li>• Focus on understanding rather than winning arguments</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold">
              Download Study Guide (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MythsPage;