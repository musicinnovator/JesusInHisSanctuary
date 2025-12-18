import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  onAnswer: (isCorrect: boolean) => void;
  showFeedback: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  hint,
  onAnswer,
  showFeedback
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionClick = (option: string) => {
    if (hasAnswered) return;

    setSelectedOption(option);
    setHasAnswered(true);
    const isCorrect = option === correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionClass = (option: string) => {
    if (!hasAnswered) {
      return 'hover:border-sanctuary-purple hover:bg-sanctuary-purple/5 cursor-pointer';
    }

    if (option === correctAnswer) {
      return 'border-green-500 bg-green-50';
    }

    if (option === selectedOption && option !== correctAnswer) {
      return 'border-red-500 bg-red-50';
    }

    return 'opacity-50';
  };

  const getIcon = (option: string) => {
    if (!hasAnswered) return null;

    if (option === correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }

    if (option === selectedOption && option !== correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-sanctuary-purple mb-4">
        {question}
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={hasAnswered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${getOptionClass(option)}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex-1">{option}</span>
              {getIcon(option)}
            </div>
          </button>
        ))}
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
        <div className={`p-4 rounded-lg ${selectedOption === correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="font-semibold mb-2 text-sanctuary-purple">
            {selectedOption === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div className="text-sanctuary-brass">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};
