import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface TrueFalseQuestionProps {
  question: string;
  correctAnswer: string;
  explanation: string;
  hint?: string;
  onAnswer: (isCorrect: boolean) => void;
  showFeedback: boolean;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  correctAnswer,
  explanation,
  hint,
  onAnswer,
  showFeedback
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);
    const isCorrect = answer === correctAnswer;
    onAnswer(isCorrect);
  };

  const getButtonClass = (answer: string) => {
    if (!hasAnswered) {
      return selectedAnswer === answer
        ? 'bg-sanctuary-purple text-white border-sanctuary-purple'
        : 'bg-white text-sanctuary-purple border-sanctuary-silver hover:border-sanctuary-purple hover:bg-sanctuary-purple/5';
    }

    if (answer === correctAnswer) {
      return 'bg-green-500 text-white border-green-500';
    }

    if (answer === selectedAnswer && answer !== correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    }

    return 'bg-gray-100 text-gray-400 border-gray-300';
  };

  const getIcon = (answer: string) => {
    if (!hasAnswered) return null;

    if (answer === correctAnswer) {
      return <CheckCircle className="w-5 h-5" />;
    }

    if (answer === selectedAnswer && answer !== correctAnswer) {
      return <XCircle className="w-5 h-5" />;
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-sanctuary-purple mb-6">
        {question}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer('True')}
          disabled={hasAnswered}
          className={`p-6 rounded-lg border-2 transition-all flex items-center justify-center space-x-3 ${getButtonClass('True')}`}
        >
          <span className="text-xl font-semibold">True</span>
          {getIcon('True')}
        </button>
        <button
          onClick={() => handleAnswer('False')}
          disabled={hasAnswered}
          className={`p-6 rounded-lg border-2 transition-all flex items-center justify-center space-x-3 ${getButtonClass('False')}`}
        >
          <span className="text-xl font-semibold">False</span>
          {getIcon('False')}
        </button>
      </div>

      {hint && !hasAnswered && (
        <div className="mt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-brass-dark transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-sanctuary-brass">
              💡 {hint}
            </div>
          )}
        </div>
      )}

      {showFeedback && hasAnswered && (
        <div className={`p-4 rounded-lg ${selectedAnswer === correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="font-semibold mb-2 text-sanctuary-purple">
            {selectedAnswer === correctAnswer ? '✓ Correct!' : `✗ Incorrect - The answer is ${correctAnswer}`}
          </div>
          <div className="text-sanctuary-brass">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};
