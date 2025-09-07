import React, { useState } from 'react';
import { ArrowLeft, Clock, Play, Pause, SkipForward, SkipBack, Book } from 'lucide-react';

const TimelinePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const timelineSteps = [
    {
      step: 1,
      aaron: "Aaron enters the outer court gate in the morning",
      jesus: "Jesus is born on earth (incarnation)",
      aaronRef: "Leviticus 16:3",
      jesusRef: "Matthew 1:21, Luke 1:35",
      description: "The beginning of ministry - Aaron's entrance parallels Christ's entrance into the world"
    },
    {
      step: 2,
      aaron: "Aaron washes at the bronze laver",
      jesus: "Jesus is baptized by John",
      aaronRef: "Leviticus 16:4",
      jesusRef: "Matthew 3:13-17",
      description: "Ceremonial cleansing and preparation for ministry"
    },
    {
      step: 3,
      aaron: "Aaron puts on the holy garments",
      jesus: "Jesus begins His public ministry",
      aaronRef: "Leviticus 16:4",
      jesusRef: "Luke 4:18-19",
      description: "Investiture with authority and beginning of sacred work"
    },
    {
      step: 4,
      aaron: "Aaron offers sacrifice for himself",
      jesus: "Jesus lives a sinless life",
      aaronRef: "Leviticus 16:6",
      jesusRef: "Hebrews 4:15",
      description: "Preparation for intercession - Aaron needs atonement, Jesus provides it"
    },
    {
      step: 5,
      aaron: "Aaron casts lots over the two goats",
      jesus: "Jesus faces temptation and chooses obedience",
      aaronRef: "Leviticus 16:8",
      jesusRef: "Matthew 4:1-11",
      description: "The choice between life and death, obedience and rebellion"
    }
    // Additional steps would continue here up to 24 total
  ];

  const nextStep = () => {
    if (currentStep < timelineSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = timelineSteps[currentStep - 1];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-silver to-gray-600 text-white py-8">
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
            <Clock className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Aaron & Jesus Ministry Timeline</h1>
              <p className="text-gray-100 text-lg">Animated comparison of earthly type and heavenly antitype</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-sanctuary-purple">Timeline Navigation</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sanctuary-brass">Step {currentStep} of {timelineSteps.length}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === timelineSteps.length}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-sanctuary-linen rounded-full h-2 mb-4">
            <div 
              className="bg-sanctuary-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / timelineSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {timelineSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index + 1)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep === index + 1
                    ? 'bg-sanctuary-purple text-white'
                    : currentStep > index + 1
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-silver text-sanctuary-purple'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Timeline Display */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Aaron's Ministry (Type) */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-brass overflow-hidden">
            <div className="bg-sanctuary-brass text-white p-4">
              <h3 className="text-xl font-bold">Aaron's Earthly Ministry (Type)</h3>
              <p className="text-amber-100">Day of Atonement Service</p>
            </div>
            
            <div className="p-6">
              <div className="h-64 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-brass/30">
                <div className="text-center text-sanctuary-brass">
                  <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-brass/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-10 h-10 text-sanctuary-brass" />
                  </div>
                  <p className="text-lg font-medium">Step {currentStep} Animation</p>
                  <p className="text-sm">Aaron's Ministry Visualization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Aaron's Action</h4>
                  <p className="text-sanctuary-brass">{currentStepData?.aaron}</p>
                </div>
                
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2 flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Scripture Reference</span>
                  </h4>
                  <p className="text-sanctuary-blue font-medium">{currentStepData?.aaronRef}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Jesus' Ministry (Antitype) */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold overflow-hidden">
            <div className="bg-sanctuary-gold text-sanctuary-purple p-4">
              <h3 className="text-xl font-bold">Jesus' Heavenly Ministry (Antitype)</h3>
              <p className="text-yellow-800">Eternal Salvation Work</p>
            </div>
            
            <div className="p-6">
              <div className="h-64 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-gold/30">
                <div className="text-center text-sanctuary-gold-dark">
                  <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-gold/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-10 h-10 text-sanctuary-gold-dark" />
                  </div>
                  <p className="text-lg font-medium">Step {currentStep} Animation</p>
                  <p className="text-sm">Jesus' Ministry Visualization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Jesus' Fulfillment</h4>
                  <p className="text-sanctuary-brass">{currentStepData?.jesus}</p>
                </div>
                
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2 flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Scripture Reference</span>
                  </h4>
                  <p className="text-sanctuary-blue font-medium">{currentStepData?.jesusRef}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theological Connection */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Theological Connection</h3>
          <div className="bg-gradient-to-r from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
            <p className="text-sanctuary-brass leading-relaxed text-lg">
              {currentStepData?.description}
            </p>
          </div>
        </div>

        {/* Complete Timeline Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-6">Complete 24-Step Timeline</h3>
          <div className="text-center text-sanctuary-brass mb-4">
            <p>This interactive timeline will eventually contain all 24 parallel steps between Aaron's Day of Atonement service and Jesus' ministry work.</p>
            <p className="text-sm mt-2 italic">Currently showing steps 1-5 as examples. Additional steps will be added in future updates.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelineSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index + 1)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  currentStep === index + 1
                    ? 'bg-sanctuary-purple text-white'
                    : 'bg-sanctuary-linen hover:bg-sanctuary-purple/10 text-sanctuary-purple'
                }`}
              >
                <div className="font-semibold mb-1">Step {step.step}</div>
                <div className="text-sm opacity-90">{step.aaron}</div>
                <div className="text-xs mt-1 opacity-75">↓</div>
                <div className="text-sm opacity-90">{step.jesus}</div>
              </button>
            ))}
            
            {/* Placeholder for remaining steps */}
            {Array.from({ length: 19 }, (_, i) => (
              <div
                key={i + 6}
                className="p-4 rounded-lg bg-sanctuary-silver/20 text-sanctuary-brass border-2 border-dashed border-sanctuary-silver"
              >
                <div className="font-semibold mb-1">Step {i + 6}</div>
                <div className="text-sm">Coming Soon...</div>
                <div className="text-xs mt-1">↓</div>
                <div className="text-sm">Placeholder</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;