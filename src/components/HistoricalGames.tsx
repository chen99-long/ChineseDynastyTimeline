import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Star, Clock, Target, Shuffle, CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface HistoricalGamesProps {
  dynasty: Dynasty;
}

interface GameScore {
  correct: number;
  total: number;
  timeSpent: number;
}

// 游戏类型定义
type GameType = 'timeline' | 'matching' | 'puzzle' | 'memory';

const HistoricalGames: React.FC<HistoricalGamesProps> = ({ dynasty }) => {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [gameScore, setGameScore] = useState<GameScore>({ correct: 0, total: 0, timeSpent: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    {
      id: 'timeline' as GameType,
      name: '时间线排序',
      description: '将历史事件按正确的时间顺序排列',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500',
      difficulty: '简单'
    },
    {
      id: 'matching' as GameType,
      name: '人物配对',
      description: '将历史人物与其成就正确配对',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500',
      difficulty: '中等'
    },
    {
      id: 'puzzle' as GameType,
      name: '诗词拼图',
      description: '重新组合打乱的古诗词句',
      icon: <Shuffle className="w-6 h-6" />,
      color: 'from-purple-400 to-violet-500',
      difficulty: '困难'
    },
    {
      id: 'memory' as GameType,
      name: '记忆翻牌',
      description: '记住并配对历史元素卡片',
      icon: <Star className="w-6 h-6" />,
      color: 'from-pink-400 to-rose-500',
      difficulty: '中等'
    }
  ];

  const startGame = (gameType: GameType) => {
    setSelectedGame(gameType);
    setIsPlaying(true);
    setGameScore({ correct: 0, total: 0, timeSpent: 0 });
  };

  const endGame = (score: GameScore) => {
    setGameScore(score);
    setIsPlaying(false);
  };

  const resetGame = () => {
    setSelectedGame(null);
    setIsPlaying(false);
    setGameScore({ correct: 0, total: 0, timeSpent: 0 });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 border border-emerald-400/30">
      <h3 className="chinese-title text-2xl font-bold text-emerald-400 mb-6 flex items-center">
        <Gamepad2 className="w-6 h-6 mr-3" />
        {dynasty.name}朝历史小游戏
      </h3>

      {!selectedGame ? (
        // 游戏选择界面
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map(game => (
            <div
              key={game.id}
              className="group cursor-pointer"
              onClick={() => startGame(game.id)}
            >
              <div className={`
                bg-gradient-to-br ${game.color} bg-opacity-20 backdrop-blur-sm
                rounded-xl p-6 border border-white/20 transition-all duration-300
                hover:scale-105 hover:shadow-xl hover:border-white/40
                group-hover:bg-opacity-30
              `}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`
                    w-12 h-12 rounded-full bg-gradient-to-r ${game.color}
                    flex items-center justify-center text-white shadow-lg
                  `}>
                    {game.icon}
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${game.color} text-white
                  `}>
                    {game.difficulty}
                  </div>
                </div>
                
                <h4 className="chinese-title text-xl font-bold text-white mb-2">
                  {game.name}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-300">
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">开始游戏</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    预计用时: 3-5分钟
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 游戏界面
        <div>
          {selectedGame === 'timeline' && (
            <TimelineGame dynasty={dynasty} onGameEnd={endGame} isPlaying={isPlaying} />
          )}
          {selectedGame === 'matching' && (
            <MatchingGame dynasty={dynasty} onGameEnd={endGame} isPlaying={isPlaying} />
          )}
          {selectedGame === 'puzzle' && (
            <PuzzleGame dynasty={dynasty} onGameEnd={endGame} isPlaying={isPlaying} />
          )}
          {selectedGame === 'memory' && (
            <MemoryGame dynasty={dynasty} onGameEnd={endGame} isPlaying={isPlaying} />
          )}
          
          {/* 游戏控制按钮 */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>返回选择</span>
            </button>
          </div>
        </div>
      )}

      {/* 游戏结果显示 */}
      {!isPlaying && gameScore.total > 0 && (
        <div className="mt-6 bg-black/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">
            {gameScore.correct / gameScore.total >= 0.8 ? '🏆' : 
             gameScore.correct / gameScore.total >= 0.6 ? '🎖️' : '📚'}
          </div>
          <h4 className="text-2xl font-bold text-white mb-2">游戏完成！</h4>
          <div className="text-lg text-emerald-400 mb-4">
            得分: {gameScore.correct} / {gameScore.total} 
            ({Math.round((gameScore.correct / gameScore.total) * 100)}%)
          </div>
          <div className="text-sm text-gray-300">
            用时: {Math.floor(gameScore.timeSpent / 60)}分{gameScore.timeSpent % 60}秒
          </div>
        </div>
      )}
    </div>
  );
};

// 时间线排序游戏
const TimelineGame: React.FC<{
  dynasty: Dynasty;
  onGameEnd: (score: GameScore) => void;
  isPlaying: boolean;
}> = ({ dynasty, onGameEnd, isPlaying }) => {
  const [events, setEvents] = useState<Array<{id: string, text: string, year: number}>>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const getTimelineEvents = (dynastyId: string) => {
    const timelineData: Record<string, Array<{id: string, text: string, year: number}>> = {
      qin: [
        { id: '1', text: '秦王嬴政即位', year: -246 },
        { id: '2', text: '统一六国', year: -221 },
        { id: '3', text: '焚书坑儒', year: -213 },
        { id: '4', text: '修筑长城', year: -214 },
        { id: '5', text: '秦始皇去世', year: -210 }
      ],
      han: [
        { id: '1', text: '刘邦建立汉朝', year: -202 },
        { id: '2', text: '文景之治开始', year: -180 },
        { id: '3', text: '汉武帝即位', year: -141 },
        { id: '4', text: '张骞出使西域', year: -138 },
        { id: '5', text: '司马迁完成史记', year: -91 }
      ],
      three_kingdoms: [
        { id: '1', text: '黄巾起义爆发', year: 184 },
        { id: '2', text: '官渡之战', year: 200 },
        { id: '3', text: '赤壁之战', year: 208 },
        { id: '4', text: '三顾茅庐', year: 207 },
        { id: '5', text: '蜀汉建立', year: 221 }
      ],
      jin: [
        { id: '1', text: '司马炎建立西晋', year: 266 },
        { id: '2', text: '灭吴统一天下', year: 280 },
        { id: '3', text: '八王之乱开始', year: 291 },
        { id: '4', text: '兰亭雅集', year: 353 },
        { id: '5', text: '淝水之战', year: 383 }
      ],
      southern_northern: [
        { id: '1', text: '刘裕篡晋建宋', year: 420 },
        { id: '2', text: '北魏统一北方', year: 439 },
        { id: '3', text: '孝文帝迁都洛阳', year: 494 },
        { id: '4', text: '侯景之乱', year: 548 },
        { id: '5', text: '北周灭北齐', year: 577 }
      ],
      sui: [
        { id: '1', text: '杨坚建立隋朝', year: 581 },
        { id: '2', text: '隋灭陈统一', year: 589 },
        { id: '3', text: '开凿大运河', year: 605 },
        { id: '4', text: '创立科举制', year: 605 },
        { id: '5', text: '隋炀帝被杀', year: 618 }
      ],
      tang: [
        { id: '1', text: '李渊建立唐朝', year: 618 },
        { id: '2', text: '贞观之治开始', year: 627 },
        { id: '3', text: '武则天称帝', year: 690 },
        { id: '4', text: '开元盛世', year: 713 },
        { id: '5', text: '安史之乱爆发', year: 755 }
      ],
      five_dynasties: [
        { id: '1', text: '朱温篡唐建梁', year: 907 },
        { id: '2', text: '李存勖灭后梁', year: 923 },
        { id: '3', text: '石敬瑭建后晋', year: 936 },
        { id: '4', text: '柴荣改革', year: 954 },
        { id: '5', text: '赵匡胤陈桥兵变', year: 960 }
      ],
      song: [
        { id: '1', text: '赵匡胤建立宋朝', year: 960 },
        { id: '2', text: '杯酒释兵权', year: 961 },
        { id: '3', text: '王安石变法', year: 1069 },
        { id: '4', text: '靖康之变', year: 1127 },
        { id: '5', text: '岳飞抗金', year: 1140 }
      ],
      yuan: [
        { id: '1', text: '忽必烈建立元朝', year: 1271 },
        { id: '2', text: '元灭南宋', year: 1279 },
        { id: '3', text: '马可波罗来华', year: 1275 },
        { id: '4', text: '元曲兴起', year: 1300 },
        { id: '5', text: '红巾军起义', year: 1351 }
      ],
      ming: [
        { id: '1', text: '朱元璋建立明朝', year: 1368 },
        { id: '2', text: '朱棣迁都北京', year: 1421 },
        { id: '3', text: '郑和下西洋', year: 1405 },
        { id: '4', text: '李时珍著本草纲目', year: 1578 },
        { id: '5', text: '李自成攻入北京', year: 1644 }
      ],
      qing: [
        { id: '1', text: '努尔哈赤建后金', year: 1616 },
        { id: '2', text: '清军入关', year: 1644 },
        { id: '3', text: '康熙亲政', year: 1669 },
        { id: '4', text: '乾隆盛世', year: 1735 },
        { id: '5', text: '鸦片战争', year: 1840 }
      ]
    };
    return timelineData[dynastyId] || [];
  };

  useEffect(() => {
    if (isPlaying) {
      const timelineEvents = getTimelineEvents(dynasty.id);
      if (timelineEvents.length > 0) {
        const shuffled = [...timelineEvents].sort(() => Math.random() - 0.5);
        setEvents(shuffled);
        setUserOrder(shuffled.map(e => e.id));
        setStartTime(Date.now());
      }
    }
  }, [dynasty.id, isPlaying]);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newOrder = [...userOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setUserOrder(newOrder);
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    const correctOrder = events.sort((a, b) => a.year - b.year).map(e => e.id);
    const correct = userOrder.every((id, index) => id === correctOrder[index]) ? events.length : 0;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    onGameEnd({ correct, total: events.length, timeSpent });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-xl text-gray-300 mb-4">该朝代的时间线游戏正在准备中...</p>
        <p className="text-gray-400">敬请期待更多精彩内容！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-white mb-2">将以下{dynasty.name}朝历史事件按时间顺序排列</h4>
        <p className="text-gray-300">拖拽事件卡片来重新排序</p>
      </div>

      <div className="space-y-3">
        {userOrder.map((id, index) => {
          const event = events.find(e => e.id === id)!;
          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id)}
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30 cursor-move hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 text-white font-medium">
                  {event.text}
                </div>
                <div className="text-blue-300 text-sm">
                  拖拽排序
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={checkAnswer}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-300"
        >
          提交答案
        </button>
      </div>
    </div>
  );
};

// 人物配对游戏
const MatchingGame: React.FC<{
  dynasty: Dynasty;
  onGameEnd: (score: GameScore) => void;
  isPlaying: boolean;
}> = ({ dynasty, onGameEnd, isPlaying }) => {
  const [pairs, setPairs] = useState<Array<{person: string, achievement: string}>>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [matches, setMatches] = useState<Array<{person: string, achievement: string}>>([]);
  const [startTime, setStartTime] = useState<number>(0);

  const getMatchingPairs = (dynastyId: string) => {
    const pairData: Record<string, Array<{person: string, achievement: string}>> = {
      qin: [
        { person: '秦始皇', achievement: '统一六国' },
        { person: '李斯', achievement: '统一文字' },
        { person: '蒙恬', achievement: '修筑长城' },
        { person: '扶苏', achievement: '主张仁政' }
      ],
      han: [
        { person: '刘邦', achievement: '建立汉朝' },
        { person: '张骞', achievement: '出使西域' },
        { person: '司马迁', achievement: '撰写史记' },
        { person: '霍去病', achievement: '征战匈奴' }
      ],
      three_kingdoms: [
        { person: '刘备', achievement: '建立蜀汉' },
        { person: '诸葛亮', achievement: '隆中对策' },
        { person: '关羽', achievement: '千里走单骑' },
        { person: '曹操', achievement: '挟天子以令诸侯' }
      ],
      jin: [
        { person: '司马炎', achievement: '统一三国' },
        { person: '王羲之', achievement: '兰亭序' },
        { person: '陶渊明', achievement: '田园诗' },
        { person: '祖逖', achievement: '闻鸡起舞' }
      ],
      southern_northern: [
        { person: '刘裕', achievement: '建立南朝宋' },
        { person: '孝文帝', achievement: '汉化改革' },
        { person: '高欢', achievement: '东魏实权' },
        { person: '宇文泰', achievement: '府兵制' }
      ],
      sui: [
        { person: '杨坚', achievement: '重新统一' },
        { person: '杨广', achievement: '开凿大运河' },
        { person: '杨素', achievement: '灭陈统一' },
        { person: '韩擒虎', achievement: '攻克建康' }
      ],
      tang: [
        { person: '李世民', achievement: '贞观之治' },
        { person: '武则天', achievement: '女皇称帝' },
        { person: '李白', achievement: '诗仙美誉' },
        { person: '杜甫', achievement: '诗圣称号' }
      ],
      five_dynasties: [
        { person: '朱温', achievement: '建立后梁' },
        { person: '李煜', achievement: '千古词帝' },
        { person: '柴荣', achievement: '后周改革' },
        { person: '李存勖', achievement: '灭后梁' }
      ],
      song: [
        { person: '赵匡胤', achievement: '陈桥兵变' },
        { person: '包拯', achievement: '包青天' },
        { person: '苏轼', achievement: '豪放词派' },
        { person: '岳飞', achievement: '精忠报国' }
      ],
      yuan: [
        { person: '忽必烈', achievement: '建立元朝' },
        { person: '马可波罗', achievement: '东方游记' },
        { person: '关汉卿', achievement: '元曲大家' },
        { person: '郭守敬', achievement: '授时历' }
      ],
      ming: [
        { person: '朱元璋', achievement: '建立明朝' },
        { person: '郑和', achievement: '七下西洋' },
        { person: '李时珍', achievement: '本草纲目' },
        { person: '徐霞客', achievement: '地理游记' }
      ],
      qing: [
        { person: '康熙', achievement: '康熙盛世' },
        { person: '乾隆', achievement: '四库全书' },
        { person: '纪晓岚', achievement: '学者文人' },
        { person: '林则徐', achievement: '虎门销烟' }
      ]
    };
    return pairData[dynastyId] || [];
  };

  useEffect(() => {
    if (isPlaying) {
      const matchingPairs = getMatchingPairs(dynasty.id);
      setPairs(matchingPairs);
      setMatches([]);
      setStartTime(Date.now());
    }
  }, [dynasty.id, isPlaying]);

  const handlePersonClick = (person: string) => {
    if (matches.some(m => m.person === person)) return;
    setSelectedPerson(selectedPerson === person ? null : person);
  };

  const handleAchievementClick = (achievement: string) => {
    if (matches.some(m => m.achievement === achievement)) return;
    setSelectedAchievement(selectedAchievement === achievement ? null : achievement);
    
    if (selectedPerson) {
      const correctPair = pairs.find(p => p.person === selectedPerson && p.achievement === achievement);
      if (correctPair) {
        setMatches([...matches, correctPair]);
        setSelectedPerson(null);
        setSelectedAchievement(null);
        
        if (matches.length + 1 === pairs.length) {
          const timeSpent = Math.floor((Date.now() - startTime) / 1000);
          onGameEnd({ correct: pairs.length, total: pairs.length, timeSpent });
        }
      } else {
        setTimeout(() => {
          setSelectedPerson(null);
          setSelectedAchievement(null);
        }, 1000);
      }
    }
  };

  if (pairs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-xl text-gray-300 mb-4">该朝代的配对游戏正在准备中...</p>
        <p className="text-gray-400">敬请期待更多精彩内容！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-white mb-2">将{dynasty.name}朝历史人物与其成就正确配对</h4>
        <p className="text-gray-300">先点击人物，再点击对应的成就</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 人物列表 */}
        <div className="space-y-3">
          <h5 className="text-lg font-bold text-green-400 text-center">历史人物</h5>
          {pairs.map(pair => (
            <button
              key={pair.person}
              onClick={() => handlePersonClick(pair.person)}
              disabled={matches.some(m => m.person === pair.person)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${matches.some(m => m.person === pair.person)
                  ? 'border-green-400 bg-green-400/20 text-green-300 cursor-not-allowed'
                  : selectedPerson === pair.person
                  ? 'border-green-400 bg-green-400/20 text-white'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                  ${matches.some(m => m.person === pair.person)
                    ? 'border-green-400 bg-green-400 text-white'
                    : selectedPerson === pair.person
                    ? 'border-green-400 bg-green-400 text-white'
                    : 'border-gray-400 text-gray-400'
                  }
                `}>
                  {matches.some(m => m.person === pair.person) ? '✓' : '?'}
                </div>
                <span className="font-medium">{pair.person}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 成就列表 */}
        <div className="space-y-3">
          <h5 className="text-lg font-bold text-green-400 text-center">主要成就</h5>
          {pairs.map(pair => (
            <button
              key={pair.achievement}
              onClick={() => handleAchievementClick(pair.achievement)}
              disabled={matches.some(m => m.achievement === pair.achievement)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${matches.some(m => m.achievement === pair.achievement)
                  ? 'border-green-400 bg-green-400/20 text-green-300 cursor-not-allowed'
                  : selectedAchievement === pair.achievement
                  ? 'border-green-400 bg-green-400/20 text-white'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                  ${matches.some(m => m.achievement === pair.achievement)
                    ? 'border-green-400 bg-green-400 text-white'
                    : selectedAchievement === pair.achievement
                    ? 'border-green-400 bg-green-400 text-white'
                    : 'border-gray-400 text-gray-400'
                  }
                `}>
                  {matches.some(m => m.achievement === pair.achievement) ? '✓' : '?'}
                </div>
                <span className="font-medium">{pair.achievement}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="text-green-400 font-bold">
          已配对: {matches.length} / {pairs.length}
        </div>
      </div>
    </div>
  );
};

// 诗词拼图游戏
const PuzzleGame: React.FC<{
  dynasty: Dynasty;
  onGameEnd: (score: GameScore) => void;
  isPlaying: boolean;
}> = ({ dynasty, onGameEnd, isPlaying }) => {
  const [poem, setPoem] = useState<{original: string[], shuffled: string[]}>({ original: [], shuffled: [] });
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  const getPoemData = (dynastyId: string) => {
    const poems: Record<string, string[]> = {
      qin: ['秦王', '扫六合', '虎视', '何雄哉'],
      han: ['大风', '起兮', '云飞扬', '威加海内'],
      three_kingdoms: ['滚滚', '长江', '东逝水', '浪花淘尽英雄'],
      jin: ['采菊', '东篱下', '悠然', '见南山'],
      southern_northern: ['南朝', '四百八十寺', '多少', '楼台烟雨中'],
      sui: ['尽道', '隋亡', '为此河', '至今千里赖通波'],
      tang: ['云想', '衣裳', '花想容', '春风拂槛'],
      five_dynasties: ['问君', '能有', '几多愁', '恰似一江春水向东流'],
      song: ['明月', '几时有', '把酒', '问青天'],
      yuan: ['天苍苍', '野茫茫', '风吹草低', '见牛羊'],
      ming: ['大明', '天子', '威德', '远播'],
      qing: ['江山', '如此', '多娇', '引无数英雄竞折腰']
    };
    return poems[dynastyId] || [];
  };

  useEffect(() => {
    if (isPlaying) {
      const original = getPoemData(dynasty.id);
      if (original.length > 0) {
        const shuffled = [...original].sort(() => Math.random() - 0.5);
        setPoem({ original, shuffled });
        setUserOrder(shuffled);
        setStartTime(Date.now());
      }
    }
  }, [dynasty.id, isPlaying]);

  const moveWord = (fromIndex: number, toIndex: number) => {
    const newOrder = [...userOrder];
    const [movedWord] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedWord);
    setUserOrder(newOrder);
  };

  const checkAnswer = () => {
    const correct = userOrder.every((word, index) => word === poem.original[index]) ? 1 : 0;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onGameEnd({ correct, total: 1, timeSpent });
  };

  if (poem.original.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-xl text-gray-300 mb-4">该朝代的诗词拼图正在准备中...</p>
        <p className="text-gray-400">敬请期待更多精彩内容！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-white mb-2">重新组合打乱的{dynasty.name}朝诗词</h4>
        <p className="text-gray-300">点击词语来重新排列顺序</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {userOrder.map((word, index) => (
          <button
            key={`${word}-${index}`}
            onClick={() => {
              if (index > 0) moveWord(index, index - 1);
            }}
            className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl px-6 py-3 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 text-white font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={checkAnswer}
          className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-8 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-violet-700 transition-all duration-300"
        >
          提交答案
        </button>
      </div>
    </div>
  );
};

// 记忆翻牌游戏
const MemoryGame: React.FC<{
  dynasty: Dynasty;
  onGameEnd: (score: GameScore) => void;
  isPlaying: boolean;
}> = ({ dynasty, onGameEnd, isPlaying }) => {
  const [cards, setCards] = useState<Array<{id: string, content: string, isFlipped: boolean, isMatched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const getMemoryCards = (dynastyId: string) => {
    const cardData: Record<string, string[]> = {
      qin: ['🐉', '⚔️', '🏯', '📜'],
      han: ['🏮', '🐪', '📚', '🗡️'],
      three_kingdoms: ['⚔️', '🛡️', '🏹', '🎭'],
      jin: ['🖋️', '🌾', '🐓', '📖'],
      southern_northern: ['🌺', '🏛️', '🤝', '⚖️'],
      sui: ['🌉', '🚢', '📏', '🏛️'],
      tang: ['🌸', '🍷', '🎭', '🏛️'],
      five_dynasties: ['🍂', '📝', '⭐', '⚔️'],
      song: ['🎋', '📚', '🎨', '⚖️'],
      yuan: ['🏹', '🐎', '🎪', '📊'],
      ming: ['🌅', '🚢', '🏯', '📖'],
      qing: ['🦅', '👑', '📚', '🎭']
    };
    return cardData[dynastyId] || [];
  };

  useEffect(() => {
    if (isPlaying) {
      const cardContents = getMemoryCards(dynasty.id);
      if (cardContents.length > 0) {
        const duplicatedCards = [...cardContents, ...cardContents];
        const shuffledCards = duplicatedCards
          .map((content, index) => ({
            id: `card-${index}`,
            content,
            isFlipped: false,
            isMatched: false
          }))
          .sort(() => Math.random() - 0.5);
        
        setCards(shuffledCards);
        setMatches(0);
        setFlippedCards([]);
        setStartTime(Date.now());
      }
    }
  }, [dynasty.id, isPlaying]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.content === secondCard?.content) {
        setTimeout(() => {
          setCards(cards.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(matches + 1);
          setFlippedCards([]);

          if (matches + 1 === cards.length / 2) {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            onGameEnd({ correct: cards.length / 2, total: cards.length / 2, timeSpent });
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(cards.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-xl text-gray-300 mb-4">该朝代的记忆翻牌正在准备中...</p>
        <p className="text-gray-400">敬请期待更多精彩内容！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-white mb-2">记住并配对相同的{dynasty.name}朝元素卡片</h4>
        <p className="text-gray-300">点击卡片翻开，找到相同的配对</p>
        <div className="text-pink-400 font-bold mt-2">
          已配对: {matches} / {cards.length / 2}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square rounded-xl border-2 transition-all duration-300 text-2xl font-bold
              ${card.isMatched
                ? 'border-green-400 bg-green-400/20 text-green-300 cursor-not-allowed'
                : card.isFlipped
                ? 'border-pink-400 bg-pink-400/20 text-white'
                : 'border-gray-600 bg-gray-800/50 text-transparent hover:border-pink-400'
              }
            `}
          >
            {card.isFlipped || card.isMatched ? card.content : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoricalGames;