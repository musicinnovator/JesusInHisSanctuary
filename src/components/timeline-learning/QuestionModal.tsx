import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, Target, BookOpen, Sparkles } from 'lucide-react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { FillBlankQuestion } from './FillBlankQuestion';
import { TrueFalseQuestion} from './TrueFalseQuestion';
import { useTimelineLearning } from '../../hooks/useTimelineLearning';
import type { TimelineQuestion } from '../../types/questions';

interface QuestionModalProps {
  stepId: number;
  stepTitle: string;
  isOpen: boolean;
  onClose: () => void;
  mode: 'study' | 'challenge';
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  stepId,
  stepTitle,
  isOpen,
  onClose,
  mode
}) => {
  const { questions, progress, stats, loading, submitAnswer, getStepProgress } = useTimelineLearning(stepId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const stepProgress = getStepProgress();

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setHasAnswered(false);
      setSessionCorrect(0);
      setSessionTotal(0);
    }
  }, [isOpen]);

  useEffect(() => {
    // Check if current question was already answered
    if (currentQuestion) {
      const answered = progress.find(p => p.questionId === currentQuestion.questionId);
      setHasAnswered(!!answered);
    }
  }, [currentQuestion, progress]);

  const handleAnswer = async (isCorrect: boolean) => {
    setHasAnswered(true);
    setSessionTotal(prev => prev + 1);
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
    }

    try {
      await submitAnswer(currentQuestion.questionId, isCorrect);

      // Check if step is completed
      if (isCorrect && stepProgress.correct + 1 === stepProgress.total) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnswered(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setHasAnswered(false);
    }
  };

  const renderQuestion = (question: TimelineQuestion) => {
    const commonProps = {
      question: question.question,
      correctAnswer: typeof question.correctAnswer === 'string' ? question.correctAnswer : question.correctAnswer[0],
      explanation: question.explanation,
      hint: question.hint,
      onAnswer: handleAnswer,
      showFeedback: mode === 'study'
    };

    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            {...commonProps}
            options={question.options || []}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankQuestion
            {...commonProps}
            options={question.options || []}
          />
        );
      case 'true-false':
        return (
          <TrueFalseQuestion {...commonProps} />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
          <div className="text-center text-sanctuary-purple">
            <BookOpen className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p>Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
          <div className="text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-sanctuary-brass" />
            <h3 className="text-xl font-bold text-sanctuary-purple mb-2">No Questions Available</h3>
            <p className="text-sanctuary-brass mb-6">
              Questions for this step are being prepared. Check back soon!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-sanctuary-purple to-sanctuary-blue text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${mode === 'study' ? 'bg-sanctuary-gold' : 'bg-sanctuary-scarlet'}`}>
                {mode === 'study' ? <BookOpen className="w-6 h-6" /> : <Target className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{stepTitle}</h2>
                <p className="text-blue-100">
                  {mode === 'study' ? 'Study Mode' : 'Challenge Mode'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>Step Progress: {stepProgress.correct}/{stepProgress.total} ({stepProgress.percentage}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-sanctuary-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          {currentQuestion && (
            <div className="space-y-6">
              {/* Question Type Badge */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sanctuary-linen rounded-full text-sm text-sanctuary-brass">
                  <span className="font-medium">
                    {currentQuestion.type === 'multiple-choice' && 'Multiple Choice'}
                    {currentQuestion.type === 'fill-blank' && 'Fill in the Blank'}
                    {currentQuestion.type === 'true-false' && 'True or False'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>

                {mode === 'challenge' && (
                  <div className="text-sm text-sanctuary-brass">
                    Session: {sessionCorrect}/{sessionTotal} correct
                  </div>
                )}
              </div>

              {/* Question */}
              {renderQuestion(currentQuestion)}

              {/* Scripture References */}
              {currentQuestion.scriptureReferences.length > 0 && (
                <div className="mt-6 p-4 bg-sanctuary-linen rounded-lg border border-sanctuary-silver">
                  <h4 className="font-semibold text-sanctuary-purple mb-2 text-sm">
                    📖 Scripture References:
                  </h4>
                  <div className="space-y-1">
                    {currentQuestion.scriptureReferences.map((ref, index) => (
                      <div key={index} className="text-sm text-sanctuary-brass">
                        {ref.book} {ref.chapter}:{ref.verses}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-sanctuary-silver p-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sanctuary-brass">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">
                {stats?.totalCorrectAnswers || 0} total correct
              </span>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="absolute inset-0 bg-sanctuary-purple/90 rounded-xl flex items-center justify-center">
            <div className="text-center text-white p-8">
              <Sparkles className="w-20 h-20 mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold mb-2">🎉 Step Completed!</h3>
              <p className="text-xl">You've mastered all questions for this step!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
