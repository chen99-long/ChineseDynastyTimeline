import React, { useState } from 'react';
import { Calendar, Zap, Sword, Crown, Scroll, Star } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface HistoricalEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  type: 'political' | 'military' | 'cultural' | 'economic' | 'disaster';
  importance: 1 | 2 | 3 | 4 | 5;
  participants: string[];
  consequences: string[];
}

interface HistoricalEventsProps {
  dynasty: Dynasty;
}

const HistoricalEvents: React.FC<HistoricalEventsProps> = ({ dynasty }) => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getEventsData = (dynastyId: string): HistoricalEvent[] => {
    const events: Record<string, HistoricalEvent[]> = {
      qin: [
        {
          id: 'unification',
          year: -221,
          title: '秦统一六国',
          description: '秦王嬴政完成统一大业，建立中国历史上第一个大一统王朝',
          type: 'political',
          importance: 5,
          participants: ['秦始皇', '李斯', '王翦'],
          consequences: ['建立中央集权制', '统一文字货币', '修筑长城']
        },
        {
          id: 'burning_books',
          year: -213,
          title: '焚书坑儒',
          description: '为统一思想，下令焚烧诸子百家典籍，坑杀儒生',
          type: 'cultural',
          importance: 4,
          participants: ['秦始皇', '李斯'],
          consequences: ['思想统一', '文化损失', '民怨积累']
        },
        {
          id: 'great_wall',
          year: -214,
          title: '修筑长城',
          description: '连接各国长城，修筑万里长城抵御匈奴',
          type: 'military',
          importance: 5,
          participants: ['蒙恬', '扶苏'],
          consequences: ['边防巩固', '劳民伤财', '千古奇迹']
        }
      ],
      han: [
        {
          id: 'silk_road',
          year: -138,
          title: '张骞出使西域',
          description: '开辟丝绸之路，促进东西方文化交流',
          type: 'economic',
          importance: 5,
          participants: ['张骞', '汉武帝'],
          consequences: ['开辟丝路', '文化交流', '商贸繁荣']
        },
        {
          id: 'confucianism',
          year: -136,
          title: '独尊儒术',
          description: '汉武帝采纳董仲舒建议，罢黜百家，独尊儒术',
          type: 'cultural',
          importance: 4,
          participants: ['汉武帝', '董仲舒'],
          consequences: ['儒学正统', '思想统一', '教育发展']
        },
        {
          id: 'records',
          year: -91,
          title: '史记完成',
          description: '司马迁完成《史记》，开创纪传体史书先河',
          type: 'cultural',
          importance: 5,
          participants: ['司马迁'],
          consequences: ['史学奠基', '文学典范', '史官传统']
        }
      ],
      tang: [
        {
          id: 'zhenguan',
          year: 627,
          title: '贞观之治',
          description: '唐太宗励精图治，开创盛世局面',
          type: 'political',
          importance: 5,
          participants: ['李世民', '魏征', '房玄龄'],
          consequences: ['政治清明', '经济繁荣', '文化昌盛']
        },
        {
          id: 'wu_zetian',
          year: 690,
          title: '武则天称帝',
          description: '中国历史上唯一的女皇帝正式登基',
          type: 'political',
          importance: 4,
          participants: ['武则天'],
          consequences: ['女性执政', '政治变革', '社会震动']
        },
        {
          id: 'poetry_peak',
          year: 742,
          title: '诗歌黄金时代',
          description: '李白、杜甫等诗人活跃，唐诗达到巅峰',
          type: 'cultural',
          importance: 5,
          participants: ['李白', '杜甫', '王维'],
          consequences: ['诗歌繁荣', '文化高峰', '艺术传承']
        }
      ]
    };
    return events[dynastyId] || events.qin;
  };

  const events = getEventsData(dynasty.id);
  const filteredEvents = filter === 'all' ? events : events.filter(e => e.type === filter);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'political': return <Crown className="w-5 h-5" />;
      case 'military': return <Sword className="w-5 h-5" />;
      case 'cultural': return <Scroll className="w-5 h-5" />;
      case 'economic': return <Star className="w-5 h-5" />;
      case 'disaster': return <Zap className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'political': return 'from-yellow-400 to-orange-500';
      case 'military': return 'from-red-400 to-pink-500';
      case 'cultural': return 'from-purple-400 to-indigo-500';
      case 'economic': return 'from-green-400 to-emerald-500';
      case 'disaster': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const formatYear = (year: number) => {
    return year > 0 ? `公元${year}年` : `公元前${Math.abs(year)}年`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/20 to-gray-900/20 rounded-2xl p-6 border border-slate-400/30">
      <h3 className="chinese-title text-2xl font-bold text-slate-400 mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-3" />
        {dynasty.name}朝重大历史事件
      </h3>

      {/* 事件类型筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'political', 'military', 'cultural', 'economic', 'disaster'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${filter === type 
                ? 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-lg' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }
            `}
          >
            {type === 'all' ? '全部' : 
             type === 'political' ? '政治' :
             type === 'military' ? '军事' :
             type === 'cultural' ? '文化' :
             type === 'economic' ? '经济' : '灾难'}
          </button>
        ))}
      </div>

      {/* 事件时间线 */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className={`
              bg-gradient-to-r ${getEventColor(event.type)} bg-opacity-20 backdrop-blur-sm
              rounded-xl p-4 border border-white/20 transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:border-white/40
              ${selectedEvent?.id === event.id ? 'scale-105 shadow-2xl border-white/60' : ''}
            `}>
              <div className="flex items-start space-x-4">
                <div className={`
                  w-12 h-12 rounded-full bg-gradient-to-r ${getEventColor(event.type)}
                  flex items-center justify-center text-white shadow-lg
                `}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="chinese-title text-lg font-bold text-white">
                      {event.title}
                    </h4>
                    <div className="text-sm text-gray-200 bg-black/40 px-3 py-1 rounded-full font-medium">
                      {formatYear(event.year)}
                    </div>
                  </div>
                  
                  <p className="text-gray-100 text-sm leading-relaxed mb-3 font-medium">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-300 font-medium">重要程度:</span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < event.importance ? 'text-yellow-400 fill-current' : 'text-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-200 font-medium">
                      参与者: {event.participants.slice(0, 2).join(', ')}
                      {event.participants.length > 2 && '...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 事件详情弹窗 */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-2xl w-full border-2 border-slate-400/50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`
                  w-16 h-16 rounded-full bg-gradient-to-r ${getEventColor(selectedEvent.type)}
                  flex items-center justify-center text-white shadow-lg
                `}>
                  {getEventIcon(selectedEvent.type)}
                </div>
                <div>
                  <h3 className="chinese-title text-2xl font-bold text-white mb-2">
                    {selectedEvent.title}
                  </h3>
                  <div className="text-slate-300 font-medium">
                    {formatYear(selectedEvent.year)}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-400 mb-3">事件详情</h4>
                <p className="text-gray-200 leading-relaxed font-medium">
                  {selectedEvent.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-400 mb-3">主要参与者</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.participants.map(participant => (
                    <div
                      key={participant}
                      className="bg-gradient-to-r from-slate-600 to-slate-700 px-3 py-1 rounded-full text-white text-sm font-medium"
                    >
                      {participant}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-400 mb-3">历史影响</h4>
                <div className="space-y-2">
                  {selectedEvent.consequences.map((consequence, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-black/30 rounded-lg p-3"
                    >
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <span className="text-gray-200 font-medium">{consequence}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">重要程度:</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < selectedEvent.importance ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className={`
                  px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getEventColor(selectedEvent.type)} text-white
                `}>
                  {selectedEvent.type === 'political' ? '政治事件' :
                   selectedEvent.type === 'military' ? '军事事件' :
                   selectedEvent.type === 'cultural' ? '文化事件' :
                   selectedEvent.type === 'economic' ? '经济事件' : '灾难事件'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalEvents;