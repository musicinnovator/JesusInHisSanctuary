import React, { useState } from 'react';
import { ArrowLeft, Clock, Play, Pause, SkipBack, SkipForward, Calendar, User, Crown } from 'lucide-react';
import DonationBanner from './DonationBanner';

const TimelinePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const timelineSteps = [
    {
      id: 1,
      aaron: "Aaron enters the outer court",
      jesus: "Jesus begins His earthly ministry",
      scripture: "Leviticus 16:3",
      description: "The high priest begins the Day of Atonement service"
    },
    {
      id: 2,
      aaron: "Aaron washes at the bronze laver",
      jesus: "Jesus is baptized by John",
      scripture: "Leviticus 16:4",
      description: "Ceremonial cleansing before sacred service"
    },
    {
      id: 3,
      aaron: "Aaron puts on holy garments",
      jesus: "Jesus receives the Holy Spirit",
      scripture: "Leviticus 16:4",
      description: "Preparation for priestly ministry"
    },
    {
      id: 4,
      aaron: "Aaron offers sacrifice for himself",
      jesus: "Jesus lives a sinless life",
      scripture: "Leviticus 16:6",
      description: "The priest must be without sin"
    },
    {
      id: 5,
      aaron: "Aaron casts lots over two goats",
      jesus: "Jesus chooses to die for humanity",
      scripture: "Leviticus 16:8",
      description: "The choice between life and death"
    }
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

  const currentStepData = timelineSteps.find(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
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
              <p className="text-gray-100 text-lg">24-step animated comparison of earthly and heavenly ministry</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipBack className="w-4 h-4" />
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

            <div className="text-sanctuary-purple">
              <span className="font-semibold">Step {currentStep} of {timelineSteps.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-sanctuary-linen rounded-full h-2">
            <div 
              className="bg-sanctuary-silver h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / timelineSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Timeline Display */}
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
          <div className="bg-sanctuary-silver text-white p-4">
            <h3 className="font-semibold">Step {currentStep}: {currentStepData?.description}</h3>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Aaron's Ministry */}
              <div className="bg-gradient-to-br from-sanctuary-brass/10 to-sanctuary-gold/10 rounded-lg p-6 border border-sanctuary-brass/30">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-8 h-8 text-sanctuary-brass" />
                  <h4 className="text-xl font-bold text-sanctuary-purple">Aaron's Ministry</h4>
                  <span className="text-sm text-sanctuary-brass">(Earthly Type)</span>
                </div>
                <p className="text-sanctuary-purple text-lg leading-relaxed">
                  {currentStepData?.aaron}
                </p>
              </div>

              {/* Jesus' Ministry */}
              <div className="bg-gradient-to-br from-sanctuary-gold/10 to-sanctuary-scarlet/10 rounded-lg p-6 border border-sanctuary-gold/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="w-8 h-8 text-sanctuary-gold" />
                  <h4 className="text-xl font-bold text-sanctuary-purple">Jesus' Ministry</h4>
                  <span className="text-sm text-sanctuary-brass">(Heavenly Antitype)</span>
                </div>
                <p className="text-sanctuary-purple text-lg leading-relaxed">
                  {currentStepData?.jesus}
                </p>
              </div>
            </div>

            {/* Scripture Reference */}
            <div className="mt-8 bg-sanctuary-linen rounded-lg p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Calendar className="w-5 h-5 text-sanctuary-blue" />
                <h5 className="font-semibold text-sanctuary-purple">Scripture Reference</h5>
              </div>
              <p className="text-sanctuary-blue font-medium text-lg">{currentStepData?.scripture}</p>
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Timeline Steps</h3>
          <div className="grid grid-cols-5 gap-2">
            {timelineSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-2 text-center rounded-lg text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? 'bg-sanctuary-silver text-white'
                    : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-sanctuary-silver/20'
                }`}
              >
                {step.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;