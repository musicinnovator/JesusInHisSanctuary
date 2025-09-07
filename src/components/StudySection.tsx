import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Search, FileText } from 'lucide-react';

const StudySection = () => {
  const [activeSection, setActiveSection] = useState<string | null>('textual');

  const studySections = [
    {
      id: 'textual',
      title: 'Textual Analysis',
      icon: <BookOpen className="w-6 h-6" />,
      content: {
        hebrew: 'נִצְדַּק קֹדֶשׁ - "the sanctuary shall be cleansed/vindicated"',
        greek: 'καθαρισθήσεται τὸ ἅγιον - "the holy place shall be cleansed"',
        analysis: 'The Hebrew term "nitsdaq" carries connotations of vindication, justification, and restoration rather than merely cleansing.'
      }
    },
    {
      id: 'historical',
      title: 'Historical Context',
      icon: <Search className="w-6 h-6" />,
      content: {
        period: 'Medo-Persian and Grecian Empires',
        setting: 'Antiochus Epiphanes\' persecution and temple defilement',
        significance: 'The prophecy addresses both immediate and eschatological sanctuary concerns'
      }
    },
    {
      id: 'comparative',
      title: 'Interpretive Approaches',
      icon: <FileText className="w-6 h-6" />,
      content: {
        preterist: 'Fulfilled in Maccabean period (168-165 BC)',
        historicist: 'Spans from 457 BC to 1844 AD',
        futurist: 'Points to end-time temple restoration'
      }
    }
  ];

  return (
    <section id="analysis" className="py-20 bg-sanctuary-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sanctuary-purple mb-4">Comprehensive Analysis</h2>
          <p className="text-xl text-sanctuary-brass max-w-3xl mx-auto">
            Exploring the multifaceted dimensions of Daniel 8:14 through linguistic, 
            historical, and theological perspectives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Study Navigation */}
          <div className="space-y-4">
            {studySections.map((section) => (
              <div key={section.id} className="border border-sanctuary-silver rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-sanctuary-linen-dark transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sanctuary-blue">{section.icon}</div>
                    <h3 className="text-lg font-semibold text-sanctuary-purple">{section.title}</h3>
                  </div>
                  {activeSection === section.id ? 
                    <ChevronDown className="w-5 h-5 text-sanctuary-brass" /> : 
                    <ChevronRight className="w-5 h-5 text-sanctuary-brass" />
                  }
                </button>
                
                {activeSection === section.id && (
                  <div className="p-6 bg-white border-t border-sanctuary-silver">
                    <div className="space-y-4">
                      {Object.entries(section.content).map(([key, value]) => (
                        <div key={key}>
                          <h4 className="font-semibold text-sanctuary-purple capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <p className="text-sanctuary-brass leading-relaxed">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Featured Study */}
          <div className="bg-gradient-to-br from-sanctuary-linen to-white rounded-lg p-8 border border-sanctuary-gold">
            <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Featured Study: The 2300 Days</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-3">Prophetic Calculation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-sanctuary-purple">Starting Point:</span>
                    <p className="text-sanctuary-brass">457 BC - Artaxerxes' Decree</p>
                  </div>
                  <div>
                    <span className="font-medium text-sanctuary-purple">Ending Point:</span>
                    <p className="text-sanctuary-brass">1844 AD - Sanctuary Cleansing</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-sanctuary-silver">
                <h4 className="font-semibold text-sanctuary-purple mb-3">Key Interpretive Questions</h4>
                <ul className="space-y-2 text-sanctuary-brass">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                    <span>What constitutes the "sanctuary" in prophecy?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                    <span>How does "cleansing" relate to vindication?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2 flex-shrink-0"></span>
                    <span>What is the relationship to other prophetic periods?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudySection;