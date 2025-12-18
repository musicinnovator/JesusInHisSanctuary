import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface FillBlankQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  onAnswer: (isCorrect: boolean) => void;
  showFeedback: boolean;
}

export const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  hint,
  onAnswer,
  showFeedback
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer || hasAnswered) return;

    setHasAnswered(true);
    const isCorrect = selectedAnswer === correctAnswer;
    onAnswer(isCorrect);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-sanctuary-purple mb-4">
        {question}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={hasAnswered}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 border-2 border-sanctuary-silver rounded-lg focus:border-sanctuary-purple focus:outline-none disabled:opacity-50"
          >
            <option value="">Select answer...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || hasAnswered}
            className="px-6 py-3 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        </div>
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
          <div className="flex items-center space-x-2 mb-2">
            {selectedAnswer === correctAnswer ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-700">Incorrect - The correct answer is: {correctAnswer}</span>
              </>
            )}
          </div>
          <div className="text-sanctuary-brass">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};
