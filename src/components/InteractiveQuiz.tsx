import React, { useState, useEffect } from 'react';
import { Brain, Trophy, Star, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface InteractiveQuizProps {
  dynasty: Dynasty;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ dynasty }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const getQuizData = (dynastyId: string): QuizQuestion[] => {
    const quizzes: Record<string, QuizQuestion[]> = {
      qin: [
        {
          id: 'q1',
          question: '秦始皇统一六国是在哪一年？',
          options: ['公元前230年', '公元前221年', '公元前210年', '公元前206年'],
          correctAnswer: 1,
          explanation: '公元前221年，秦王嬴政完成了统一六国的伟业，建立了中国历史上第一个大一统王朝。',
          difficulty: 'easy'
        },
        {
          id: 'q2',
          question: '秦朝的都城是哪里？',
          options: ['洛阳', '长安', '咸阳', '临淄'],
          correctAnswer: 2,
          explanation: '咸阳是秦朝的都城，位于今天的陕西省咸阳市，是当时的政治、经济、文化中心。',
          difficulty: 'easy'
        },
        {
          id: 'q3',
          question: '以下哪项不是秦始皇的统一措施？',
          options: ['统一文字', '统一货币', '统一度量衡', '统一宗教'],
          correctAnswer: 3,
          explanation: '秦始皇统一了文字、货币、度量衡等，但没有统一宗教。秦朝主要推行法家思想。',
          difficulty: 'medium'
        },
        {
          id: 'q4',
          question: '秦朝实行的政治制度是？',
          options: ['分封制', '郡县制', '宗法制', '联邦制'],
          correctAnswer: 1,
          explanation: '秦朝废除分封制，实行郡县制，这是中央集权制度的重要组成部分。',
          difficulty: 'medium'
        },
        {
          id: 'q5',
          question: '秦朝灭亡的直接原因是？',
          options: ['自然灾害', '外族入侵', '农民起义', '宫廷政变'],
          correctAnswer: 2,
          explanation: '陈胜吴广起义等农民起义是秦朝灭亡的直接原因，反映了秦朝严酷统治下民众的反抗。',
          difficulty: 'hard'
        }
      ],
      han: [
        {
          id: 'q1',
          question: '汉朝的开国皇帝是谁？',
          options: ['刘邦', '刘秀', '刘彻', '刘恒'],
          correctAnswer: 0,
          explanation: '刘邦是汉朝的开国皇帝，史称汉高祖，建立了汉朝。',
          difficulty: 'easy'
        },
        {
          id: 'q2',
          question: '丝绸之路是在哪个皇帝时期开辟的？',
          options: ['汉高祖', '汉文帝', '汉武帝', '汉宣帝'],
          correctAnswer: 2,
          explanation: '丝绸之路是在汉武帝时期，由张骞出使西域后逐渐开辟的。',
          difficulty: 'medium'
        },
        {
          id: 'q3',
          question: '《史记》的作者是谁？',
          options: ['司马相如', '司马迁', '班固', '范晔'],
          correctAnswer: 1,
          explanation: '《史记》是由司马迁撰写的，是中国第一部纪传体通史。',
          difficulty: 'easy'
        },
        {
          id: 'q4',
          question: '汉武帝时期"罢黜百家，独尊儒术"的提出者是？',
          options: ['董仲舒', '朱买臣', '公孙弘', '卫青'],
          correctAnswer: 0,
          explanation: '董仲舒提出了"罢黜百家，独尊儒术"的建议，被汉武帝采纳。',
          difficulty: 'medium'
        },
        {
          id: 'q5',
          question: '汉朝分为西汉和东汉，分界的标志性事件是？',
          options: ['王莽篡汉', '黄巾起义', '七国之乱', '巫蛊之祸'],
          correctAnswer: 0,
          explanation: '王莽篡汉建立新朝，后来刘秀重建汉朝（东汉），这是西汉和东汉的分界。',
          difficulty: 'hard'
        }
      ],
      tang: [
        {
          id: 'q1',
          question: '唐朝的开国皇帝是谁？',
          options: ['李世民', '李渊', '李治', '李隆基'],
          correctAnswer: 1,
          explanation: '李渊是唐朝的开国皇帝，史称唐高祖。',
          difficulty: 'easy'
        },
        {
          id: 'q2',
          question: '"贞观之治"是哪位皇帝的政绩？',
          options: ['唐高祖', '唐太宗', '唐高宗', '唐玄宗'],
          correctAnswer: 1,
          explanation: '贞观之治是唐太宗李世民统治时期的盛世局面。',
          difficulty: 'easy'
        },
        {
          id: 'q3',
          question: '中国历史上唯一的女皇帝是？',
          options: ['武则天', '慈禧太后', '吕后', '王政君'],
          correctAnswer: 0,
          explanation: '武则天是中国历史上唯一的女皇帝，建立了武周王朝。',
          difficulty: 'easy'
        },
        {
          id: 'q4',
          question: '被称为"诗仙"的唐代诗人是？',
          options: ['杜甫', '李白', '王维', '白居易'],
          correctAnswer: 1,
          explanation: '李白被称为"诗仙"，是唐代最著名的浪漫主义诗人。',
          difficulty: 'easy'
        },
        {
          id: 'q5',
          question: '安史之乱的主要发动者是？',
          options: ['安禄山和史思明', '黄巢', '朱温', '李克用'],
          correctAnswer: 0,
          explanation: '安史之乱是由安禄山和史思明发动的叛乱，严重削弱了唐朝的国力。',
          difficulty: 'medium'
        }
      ]
    };
    return quizzes[dynastyId] || quizzes.qin;
  };

  const questions = getQuizData(dynasty.id);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-pink-500';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getScoreLevel = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { level: '历史学霸', color: 'from-yellow-400 to-gold-500', icon: '🏆' };
    if (percentage >= 70) return { level: '历史达人', color: 'from-purple-400 to-violet-500', icon: '🎖️' };
    if (percentage >= 50) return { level: '历史爱好者', color: 'from-blue-400 to-cyan-500', icon: '📚' };
    return { level: '历史新手', color: 'from-gray-400 to-gray-500', icon: '🌱' };
  };

  if (quizCompleted) {
    const scoreLevel = getScoreLevel(score, questions.length);
    return (
      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-indigo-400/30">
        <div className="text-center">
          <div className="text-6xl mb-4">{scoreLevel.icon}</div>
          <h3 className="chinese-title text-3xl font-bold text-white mb-2">
            测试完成！
          </h3>
          <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold bg-gradient-to-r ${scoreLevel.color} text-white mb-4`}>
            {scoreLevel.level}
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-white mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-lg text-gray-300">
              正确率: {Math.round((score / questions.length) * 100)}%
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-6">
            {answers.map((isCorrect, index) => (
              <div
                key={index}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                `}
              >
                {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>重新测试</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-indigo-400/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="chinese-title text-2xl font-bold text-indigo-400 flex items-center">
          <Brain className="w-6 h-6 mr-3" />
          {dynasty.name}朝知识测试
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{score}</span>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="space-y-6">
        {/* 题目 */}
        <div className="bg-black/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`
              px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(currentQ.difficulty)} text-white
            `}>
              {currentQ.difficulty === 'easy' ? '简单' : 
               currentQ.difficulty === 'medium' ? '中等' : '困难'}
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: currentQ.difficulty === 'easy' ? 1 : currentQ.difficulty === 'medium' ? 2 : 3 }, (_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <h4 className="text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h4>
        </div>

        {/* 选项 */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-300
                ${selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-green-400 bg-green-400/20 text-white'
                      : 'border-red-400 bg-red-400/20 text-white'
                    : 'border-indigo-400 bg-indigo-400/20 text-white'
                  : showResult && index === currentQ.correctAnswer
                  ? 'border-green-400 bg-green-400/20 text-white'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-indigo-400 hover:bg-indigo-400/10'
                }
                ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                  ${selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-400 bg-green-400 text-white'
                        : 'border-red-400 bg-red-400 text-white'
                      : 'border-indigo-400 bg-indigo-400 text-white'
                    : showResult && index === currentQ.correctAnswer
                    ? 'border-green-400 bg-green-400 text-white'
                    : 'border-gray-400 text-gray-400'
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium">{option}</span>
                {showResult && (
                  <div className="ml-auto">
                    {index === currentQ.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="w-6 h-6 text-red-400" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 解释 */}
        {showResult && (
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-4 border border-blue-400/30 fade-in-up">
            <h5 className="font-bold text-blue-400 mb-2">解释：</h5>
            <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* 下一题按钮 */}
        {!showResult && (
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
              ${selectedAnswer !== null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:scale-105'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentQuestion === questions.length - 1 ? '完成测试' : '下一题'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;