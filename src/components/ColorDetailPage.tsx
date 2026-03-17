import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, Sparkles, ChevronRight, Scale, Crown, Heart, Shield, Coins, Moon, BookOpen, CircleCheck as CheckCircle, Circle as XCircle, Loader as Loader2 } from 'lucide-react';
import { useColorBySlug } from '../hooks/useSacredColors';
import { useColorEnhancements } from '../hooks/useColorEnhancements';
import type { ColorSymbolism, ColorQuizQuestion } from '../types/sacredColors';
import SymbolicMeaningAccordion from './colors/SymbolicMeaningAccordion';
import ScriptureViewer from './colors/ScriptureViewer';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Scale,
  Crown,
  Heart,
  Sparkles,
  Shield,
  Coins,
  Moon
};

export default function ColorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { colorData, loading, error } = useColorBySlug(slug);
  const { meanings: symbolicMeanings, scriptures: scriptureReferences } = useColorEnhancements(colorData?.color?.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'symbolism' | 'applications' | 'quiz'>('overview');
  const [selectedTradition, setSelectedTradition] = useState<'jewish' | 'christian' | 'adventist'>('adventist');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
      </div>
    );
  }

  if (error || !colorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Color not found</p>
          <Link to="/colors" className="text-amber-600 hover:text-amber-700">
            Return to Colors
          </Link>
        </div>
      </div>
    );
  }

  const { color, symbolism, applications, quizQuestions } = colorData;
  const Icon = iconMap[color.icon_name] || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div
        className="relative h-80 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color.color_hex} 0%, ${adjustBrightness(color.color_hex, -30)} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

        <div className="relative z-10 text-center text-white px-4">
          <Icon className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-6xl font-bold mb-4 drop-shadow-2xl">{color.color_name}</h1>
          {color.hebrew_name && (
            <p className="text-3xl mb-2 drop-shadow-xl font-serif">{color.hebrew_name}</p>
          )}
          {color.hebrew_transliteration && (
            <p className="text-xl drop-shadow-lg opacity-90">{color.hebrew_transliteration}</p>
          )}
        </div>

        <Link
          to="/colors"
          className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-white/80 transition-colors bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>All Colors</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-stone-200">
            <nav className="flex space-x-8 px-8">
              <TabButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                label="Overview"
              />
              <TabButton
                active={activeTab === 'symbolism'}
                onClick={() => setActiveTab('symbolism')}
                label="Symbolism"
              />
              <TabButton
                active={activeTab === 'applications'}
                onClick={() => setActiveTab('applications')}
                label="Applications"
              />
              <TabButton
                active={activeTab === 'quiz'}
                onClick={() => setActiveTab('quiz')}
                label="Quiz"
              />
            </nav>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'overview' && (
              <OverviewTab
                color={color}
                symbolism={symbolism}
                applications={applications}
                symbolicMeanings={symbolicMeanings}
                scriptureReferences={scriptureReferences}
              />
            )}
            {activeTab === 'symbolism' && (
              <SymbolismTab
                symbolism={symbolism}
                selectedTradition={selectedTradition}
                onTraditionChange={setSelectedTradition}
              />
            )}
            {activeTab === 'applications' && <ApplicationsTab applications={applications} />}
            {activeTab === 'quiz' && <QuizTab questions={quizQuestions} colorName={color.color_name} />}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        py-4 px-2 border-b-2 font-medium text-sm transition-colors
        ${active
          ? 'border-amber-600 text-amber-600'
          : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
        }
      `}
    >
      {label}
    </button>
  );
}

interface OverviewTabProps {
  color: any;
  symbolism: any;
  applications: any;
  symbolicMeanings: any[];
  scriptureReferences: any[];
}

function OverviewTab({ color, symbolism, applications, symbolicMeanings, scriptureReferences }: OverviewTabProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Biblical Significance</h2>
        <p className="text-lg text-stone-700 leading-relaxed">{color.biblical_significance}</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Theological Meaning</h2>
        <p className="text-lg text-stone-700 leading-relaxed">{color.theological_meaning}</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Sanctuary Usage</h2>
        <p className="text-lg text-stone-700 leading-relaxed">{color.sanctuary_usage}</p>
      </div>

      {symbolicMeanings.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Symbolic Representations</h2>
          <SymbolicMeaningAccordion meanings={symbolicMeanings} colorName={color.color_name} />
        </div>
      )}

      {scriptureReferences.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Interactive Scripture References</h2>
          <ScriptureReferenceGrid
            references={scriptureReferences}
            colorName={color.color_name}
            accentColor={color.color_hex}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-stone-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Symbolic Representations
          </h3>
          <ul className="space-y-2">
            {color.symbolic_representations.map((symbol: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-stone-700">
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{symbol}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-stone-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <Book className="w-5 h-5 text-amber-600" />
            Scripture References
          </h3>
          <ul className="space-y-2">
            {color.scripture_references.slice(0, 5).map((verse: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-stone-700">
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{verse}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-amber-900 mb-3">Quick Facts</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-amber-700 mb-1">Traditions</p>
            <p className="text-2xl font-bold text-amber-900">{symbolism.length}</p>
          </div>
          <div>
            <p className="text-sm text-amber-700 mb-1">Applications</p>
            <p className="text-2xl font-bold text-amber-900">{applications.length}</p>
          </div>
          <div>
            <p className="text-sm text-amber-700 mb-1">Views</p>
            <p className="text-2xl font-bold text-amber-900">{color.view_count.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SymbolismTab({ symbolism, selectedTradition, onTraditionChange }: {
  symbolism: ColorSymbolism[];
  selectedTradition: 'jewish' | 'christian' | 'adventist';
  onTraditionChange: (tradition: 'jewish' | 'christian' | 'adventist') => void;
}) {
  const traditionData = symbolism.find(s => s.tradition === selectedTradition);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-6">Multi-Tradition Perspectives</h2>
        <div className="flex flex-wrap gap-4">
          <TraditionButton
            active={selectedTradition === 'jewish'}
            onClick={() => onTraditionChange('jewish')}
            label="Jewish Interpretation"
            color="blue"
          />
          <TraditionButton
            active={selectedTradition === 'christian'}
            onClick={() => onTraditionChange('christian')}
            label="Christian Typology"
            color="amber"
          />
          <TraditionButton
            active={selectedTradition === 'adventist'}
            onClick={() => onTraditionChange('adventist')}
            label="Adventist Theology"
            color="green"
          />
        </div>
      </div>

      {traditionData && (
        <div className="space-y-8">
          <div className="bg-stone-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-stone-900 mb-4">Interpretation</h3>
            <p className="text-lg text-stone-700 leading-relaxed">{traditionData.interpretation}</p>
          </div>

          {traditionData.supporting_verses.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-600" />
                Supporting Scriptures
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {traditionData.supporting_verses.map((verse, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 rounded-lg p-4">
                    <p className="text-stone-700">{verse}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {traditionData.scholar_quotes.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-4">Scholar Insights</h3>
              <div className="space-y-4">
                {traditionData.scholar_quotes.map((quote, idx) => (
                  <div key={idx} className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6">
                    <p className="text-lg text-stone-800 italic mb-3">"{quote.quote}"</p>
                    <p className="text-sm text-stone-600">
                      <strong>{quote.author}</strong>
                      {quote.year && ` (${quote.year})`}
                      {quote.source && ` — ${quote.source}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TraditionButton({ active, onClick, label, color }: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  const colorClasses = {
    blue: active ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    amber: active ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    green: active ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      {label}
    </button>
  );
}

function ApplicationsTab({ applications }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Sanctuary Applications</h2>
        <p className="text-lg text-stone-700 mb-8">
          Discover how this sacred color was used throughout the tabernacle and temple, and the spiritual
          lessons each application reveals.
        </p>
      </div>

      <div className="grid gap-6">
        {applications.map((app: any) => (
          <div key={app.id} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-semibold text-stone-900">{app.element_name}</h3>
              {app.scripture_reference && (
                <span className="text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  {app.scripture_reference}
                </span>
              )}
            </div>

            {app.location && (
              <p className="text-stone-600 mb-3">
                <strong>Location:</strong> {app.location}
              </p>
            )}

            {app.material && (
              <p className="text-stone-700 mb-3">
                <strong>Material:</strong> {app.material}
              </p>
            )}

            {app.manufacturing_process && (
              <p className="text-stone-700 mb-3">
                <strong>Manufacturing:</strong> {app.manufacturing_process}
              </p>
            )}

            {app.spiritual_lesson && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <p className="text-amber-900 bg-amber-50 p-4 rounded-lg">
                  <strong>Spiritual Lesson:</strong> {app.spiritual_lesson}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizTab({ questions, colorName }: { questions: ColorQuizQuestion[]; colorName: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-stone-600">No quiz questions available for this color yet.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const allAnswers = [question.correct_answer, ...question.wrong_answers].sort(() => Math.random() - 0.5);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === question.correct_answer) {
      setScore(score + question.points);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.reduce((sum, q) => sum + q.points, 0)) * 100);

    return (
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-stone-900 mb-4">Quiz Complete!</h2>
        <p className="text-6xl font-bold text-amber-600 mb-4">{percentage}%</p>
        <p className="text-xl text-stone-700 mb-8">
          You scored {score} out of {questions.reduce((sum, q) => sum + q.points, 0)} points
        </p>
        <button
          onClick={handleRestart}
          className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-stone-900">Test Your Knowledge: {colorName}</h2>
        <div className="text-right">
          <p className="text-sm text-stone-600">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-lg font-semibold text-amber-600">Score: {score}</p>
        </div>
      </div>

      <div className="bg-stone-50 rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <p className="text-xl text-stone-900 font-medium flex-1">{question.question_text}</p>
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold ml-4
            ${question.difficulty === 'easy' ? 'bg-green-100 text-green-700' : ''}
            ${question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : ''}
            ${question.difficulty === 'hard' ? 'bg-red-100 text-red-700' : ''}
          `}>
            {question.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          {allAnswers.map((answer, idx) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === question.correct_answer;
            const showResult = showExplanation && isSelected;

            return (
              <button
                key={idx}
                onClick={() => !showExplanation && handleAnswerSelect(answer)}
                disabled={showExplanation}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${!showExplanation ? 'hover:border-amber-500 hover:bg-amber-50' : ''}
                  ${isSelected && !showExplanation ? 'border-amber-500 bg-amber-50' : 'border-stone-200 bg-white'}
                  ${showResult && isCorrect ? 'border-green-500 bg-green-50' : ''}
                  ${showResult && !isCorrect ? 'border-red-500 bg-red-50' : ''}
                  ${showExplanation && isCorrect && !isSelected ? 'border-green-500 bg-green-50' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-stone-900">{answer}</span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {showResult && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  {showExplanation && isCorrect && !isSelected && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Explanation:</p>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}
      </div>

      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}

interface ScriptureReferenceGridProps {
  references: any[];
  colorName: string;
  accentColor: string;
}

function ScriptureReferenceGrid({ references, colorName, accentColor }: ScriptureReferenceGridProps) {
  const [selectedScripture, setSelectedScripture] = useState<any | null>(null);

  const getReference = (ref: any) => {
    const verseRef = ref.verse_end
      ? `${ref.verse_start}-${ref.verse_end}`
      : `${ref.verse_start}`;
    return `${ref.book} ${ref.chapter}:${verseRef}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {references.map((ref) => (
          <button
            key={ref.id}
            onClick={() => setSelectedScripture(ref)}
            className="bg-white border-2 border-stone-200 hover:border-amber-500 rounded-lg p-4 text-left transition-all hover:shadow-lg group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
                {getReference(ref)}
              </h3>
              <BookOpen className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <p className="text-sm text-stone-600 line-clamp-2">
              {ref.text_content.substring(0, 100)}...
            </p>
            {ref.is_primary_reference && (
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                Primary Reference
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedScripture && (
        <ScriptureViewer
          scripture={selectedScripture}
          onClose={() => setSelectedScripture(null)}
          accentColor={accentColor}
        />
      )}
    </>
  );
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}
