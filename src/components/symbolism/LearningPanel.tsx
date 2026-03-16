import React, { useState } from 'react';
import { GraduationCap, Trophy, BookOpen, CircleCheck as CheckCircle, Circle, Clock, Target } from 'lucide-react';
import {
  useLearningPaths,
  useUserProgress,
  useQuizzes,
  useAnnotations,
} from '../../hooks/useSymbolismAdvanced';
import type { Quiz } from '../../types/symbolismAdvanced';

interface LearningPanelProps {
  symbolId: string;
  userId?: string;
}

export function LearningPanel({ symbolId, userId }: LearningPanelProps) {
  const [activeTab, setActiveTab] = useState<'paths' | 'quizzes' | 'notes'>('paths');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const { paths, loading: pathsLoading } = useLearningPaths();
  const { progress, updateProgress } = useUserProgress(userId, symbolId);
  const { quizzes, loading: quizzesLoading } = useQuizzes(symbolId);
  const { annotations, addAnnotation } = useAnnotations(userId, symbolId);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-700 bg-green-50';
      case 'intermediate':
        return 'text-blue-700 bg-blue-50';
      case 'advanced':
        return 'text-purple-700 bg-purple-50';
      case 'scholarly':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  const isCorrectAnswer = (quizId: string, answer: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    return quiz?.correct_answer === answer;
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(quizAnswers).forEach(([quizId, answer]) => {
      if (isCorrectAnswer(quizId, answer)) {
        correct++;
      }
    });
    return {
      correct,
      total: Object.keys(quizAnswers).length,
      percentage: Math.round((correct / Object.keys(quizAnswers).length) * 100),
    };
  };

  const loading = activeTab === 'paths' ? pathsLoading : quizzesLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Learning Features</h3>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('paths')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'paths'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'quizzes'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Notes
          </button>
        </nav>
      </div>

      {activeTab === 'paths' && (
        <div className="space-y-6">
          {paths.map((path) => {
            const pathProgress = progress.find((p) => p.learning_path_id === path.id);

            return (
              <div
                key={path.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{path.path_name}</h4>
                      {path.difficulty_level && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(
                            path.difficulty_level
                          )}`}
                        >
                          {path.difficulty_level}
                        </span>
                      )}
                    </div>

                    {path.path_description && (
                      <p className="text-gray-700 mb-4">{path.path_description}</p>
                    )}

                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                      {path.estimated_duration_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {path.estimated_duration_minutes} min
                        </div>
                      )}
                      {path.symbol_sequence && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {path.symbol_sequence.length} symbols
                        </div>
                      )}
                    </div>

                    {path.learning_objectives.length > 0 && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <h5 className="font-semibold text-green-900">Learning Objectives</h5>
                        </div>
                        <ul className="space-y-1">
                          {path.learning_objectives.map((obj, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pathProgress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-900">
                            {pathProgress.progress_percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${pathProgress.progress_percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg">
                      {pathProgress?.status === 'in_progress' ? 'Continue' : 'Start'} Learning Path
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {paths.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No learning paths available yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          {!selectedQuiz ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-2">{quiz.question_text}</p>
                      <div className="flex items-center gap-2">
                        {quiz.difficulty && (
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        )}
                        {quiz.question_type && (
                          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                            {quiz.question_type.replace('_', ' ')}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{quiz.points} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <button
                onClick={() => {
                  setSelectedQuiz(null);
                  setShowResults(false);
                  setQuizAnswers({});
                }}
                className="mb-6 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ← Back to Quizzes
              </button>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedQuiz.question_text}
                  </h4>
                  {selectedQuiz.scripture_reference && (
                    <p className="text-sm text-blue-600">{selectedQuiz.scripture_reference}</p>
                  )}
                </div>

                {selectedQuiz.question_type === 'multiple_choice' && (
                  <div className="space-y-3">
                    {[selectedQuiz.correct_answer, ...selectedQuiz.wrong_answers]
                      .sort(() => Math.random() - 0.5)
                      .map((option, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            quizAnswers[selectedQuiz.id] === option
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${
                            showResults && option === selectedQuiz.correct_answer
                              ? 'border-green-500 bg-green-50'
                              : ''
                          } ${
                            showResults &&
                            quizAnswers[selectedQuiz.id] === option &&
                            option !== selectedQuiz.correct_answer
                              ? 'border-red-500 bg-red-50'
                              : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name={selectedQuiz.id}
                            value={option}
                            checked={quizAnswers[selectedQuiz.id] === option}
                            onChange={(e) =>
                              setQuizAnswers({...quizAnswers, [selectedQuiz.id]: e.target.value})
                            }
                            disabled={showResults}
                            className="w-4 h-4 text-amber-600"
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                  </div>
                )}

                {!showResults ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!quizAnswers[selectedQuiz.id]}
                    className="w-full px-6 py-3 text-white bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 rounded-lg font-medium"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="space-y-4">
                    {isCorrectAnswer(selectedQuiz.id, quizAnswers[selectedQuiz.id]) ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-900">Correct!</span>
                        </div>
                        {selectedQuiz.explanation && (
                          <p className="text-sm text-gray-700">{selectedQuiz.explanation}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Circle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-900">Incorrect</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          The correct answer is: {selectedQuiz.correct_answer}
                        </p>
                        {selectedQuiz.explanation && (
                          <p className="text-sm text-gray-700">{selectedQuiz.explanation}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {quizzes.length === 0 && !selectedQuiz && (
            <div className="text-center py-12 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No quizzes available for this symbol yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          {userId ? (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Note</h4>
                <textarea
                  placeholder="Write your notes, insights, or questions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 mb-3"
                  rows={4}
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg">
                  Save Note
                </button>
              </div>

              <div className="space-y-4">
                {annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                        {annotation.annotation_type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(annotation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-900">{annotation.content}</p>
                    {annotation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {annotation.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {annotations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No notes yet. Start adding your insights!</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Please sign in to save notes and track your progress.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
