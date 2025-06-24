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
      three_kingdoms: [
        {
          id: 'yellow_turban',
          year: 184,
          title: '黄巾起义',
          description: '张角领导的农民起义，标志着东汉末年动乱的开始',
          type: 'political',
          importance: 4,
          participants: ['张角', '张宝', '张梁'],
          consequences: ['东汉衰落', '群雄并起', '三国分立']
        },
        {
          id: 'red_cliff',
          year: 208,
          title: '赤壁之战',
          description: '孙刘联军大败曹操，奠定三国鼎立格局',
          type: 'military',
          importance: 5,
          participants: ['周瑜', '诸葛亮', '曹操'],
          consequences: ['三分天下', '曹操南征受挫', '孙刘联盟']
        },
        {
          id: 'guan_du',
          year: 200,
          title: '官渡之战',
          description: '曹操以少胜多，击败袁绍，统一北方',
          type: 'military',
          importance: 4,
          participants: ['曹操', '袁绍', '许攸'],
          consequences: ['曹操称霸北方', '袁绍势力衰落', '统一北方']
        },
        {
          id: 'three_visits',
          year: 207,
          title: '三顾茅庐',
          description: '刘备三次拜访诸葛亮，请其出山辅佐',
          type: 'political',
          importance: 4,
          participants: ['刘备', '诸葛亮', '关羽', '张飞'],
          consequences: ['蜀汉得贤相', '隆中对策', '三国鼎立']
        }
      ],
      jin: [
        {
          id: 'unify_three_kingdoms',
          year: 280,
          title: '灭吴统一',
          description: '晋武帝司马炎灭东吴，结束三国分裂局面',
          type: 'political',
          importance: 5,
          participants: ['司马炎', '王濬', '杜预'],
          consequences: ['重新统一', '结束分裂', '西晋建立']
        },
        {
          id: 'eight_princes',
          year: 291,
          title: '八王之乱',
          description: '司马氏宗室内部争权夺利，导致西晋衰落',
          type: 'political',
          importance: 4,
          participants: ['司马亮', '司马玮', '司马伦'],
          consequences: ['西晋衰落', '五胡乱华', '政治动荡']
        },
        {
          id: 'lantingxu',
          year: 353,
          title: '兰亭雅集',
          description: '王羲之等文人雅集，创作《兰亭序》',
          type: 'cultural',
          importance: 4,
          participants: ['王羲之', '谢安', '孙绰'],
          consequences: ['书法艺术巅峰', '文人雅集传统', '天下第一行书']
        }
      ],
      southern_northern: [
        {
          id: 'liu_yu_usurp',
          year: 420,
          title: '刘裕篡晋',
          description: '刘裕废晋恭帝，建立南朝宋，开启南北朝时代',
          type: 'political',
          importance: 4,
          participants: ['刘裕', '晋恭帝'],
          consequences: ['南朝开始', '东晋结束', '南北对峙']
        },
        {
          id: 'xiaowen_reform',
          year: 494,
          title: '孝文帝改革',
          description: '北魏孝文帝推行汉化改革，促进民族融合',
          type: 'cultural',
          importance: 5,
          participants: ['孝文帝', '冯太后'],
          consequences: ['民族融合', '汉化改革', '文化交流']
        },
        {
          id: 'hou_jing_rebellion',
          year: 548,
          title: '侯景之乱',
          description: '侯景叛乱，导致南朝梁衰落',
          type: 'military',
          importance: 3,
          participants: ['侯景', '梁武帝'],
          consequences: ['南朝衰落', '政治动荡', '人口锐减']
        }
      ],
      sui: [
        {
          id: 'sui_unification',
          year: 589,
          title: '隋统一南北',
          description: '隋文帝杨坚灭陈，结束近300年南北分裂',
          type: 'political',
          importance: 5,
          participants: ['杨坚', '韩擒虎', '贺若弼'],
          consequences: ['重新统一', '结束分裂', '隋朝建立']
        },
        {
          id: 'grand_canal',
          year: 605,
          title: '开凿大运河',
          description: '隋炀帝开凿大运河，连接南北水运',
          type: 'economic',
          importance: 5,
          participants: ['隋炀帝', '宇文恺'],
          consequences: ['南北贯通', '经济发展', '劳民伤财']
        },
        {
          id: 'keju_system',
          year: 605,
          title: '创立科举制',
          description: '隋朝创立科举制度，选拔人才',
          type: 'political',
          importance: 5,
          participants: ['隋炀帝', '杨素'],
          consequences: ['人才选拔', '教育发展', '社会流动']
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
      ],
      five_dynasties: [
        {
          id: 'zhu_wen_usurp',
          year: 907,
          title: '朱温篡唐',
          description: '朱温废唐哀帝，建立后梁，唐朝灭亡',
          type: 'political',
          importance: 4,
          participants: ['朱温', '唐哀帝'],
          consequences: ['唐朝灭亡', '五代开始', '政权更迭']
        },
        {
          id: 'li_cunxu_restore',
          year: 923,
          title: '李存勖灭梁',
          description: '后唐庄宗李存勖灭后梁，统一北方',
          type: 'military',
          importance: 3,
          participants: ['李存勖', '朱友贞'],
          consequences: ['后梁灭亡', '后唐建立', '北方统一']
        },
        {
          id: 'chai_rong_reform',
          year: 954,
          title: '柴荣改革',
          description: '后周世宗柴荣推行改革，为宋朝统一奠基',
          type: 'political',
          importance: 4,
          participants: ['柴荣', '王朴'],
          consequences: ['政治改革', '经济发展', '为宋朝奠基']
        }
      ]
    };
    return events[dynastyId] || [];
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