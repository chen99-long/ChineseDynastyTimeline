import React, { useState } from 'react';
import { Users, Crown, Sword, Scroll, Heart } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface Character {
  id: string;
  name: string;
  role: string;
  relationship: string;
  description: string;
  icon: string;
}

interface CharacterNetworkProps {
  dynasty: Dynasty;
}

const CharacterNetwork: React.FC<CharacterNetworkProps> = ({ dynasty }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const getCharacterData = (dynastyId: string): Character[] => {
    const characters: Record<string, Character[]> = {
      qin: [
        {
          id: 'qinshihuang',
          name: '秦始皇',
          role: '皇帝',
          relationship: '核心',
          description: '千古一帝，统一六国，建立中央集权制度',
          icon: '👑'
        },
        {
          id: 'lisi',
          name: '李斯',
          role: '丞相',
          relationship: '重臣',
          description: '法家代表，协助统一文字和度量衡',
          icon: '📜'
        },
        {
          id: 'mengtian',
          name: '蒙恬',
          role: '将军',
          relationship: '武将',
          description: '北击匈奴，修筑长城的主要负责人',
          icon: '⚔️'
        },
        {
          id: 'fusu',
          name: '扶苏',
          role: '太子',
          relationship: '皇子',
          description: '秦始皇长子，主张仁政，最终被赐死',
          icon: '👤'
        }
      ],
      han: [
        {
          id: 'liubang',
          name: '刘邦',
          role: '皇帝',
          relationship: '核心',
          description: '汉朝开国皇帝，平民出身的传奇人物',
          icon: '👑'
        },
        {
          id: 'xiangyu',
          name: '项羽',
          role: '对手',
          relationship: '敌对',
          description: '西楚霸王，刘邦的主要对手',
          icon: '⚔️'
        },
        {
          id: 'zhangqian',
          name: '张骞',
          role: '使者',
          relationship: '功臣',
          description: '出使西域，开辟丝绸之路',
          icon: '🐪'
        },
        {
          id: 'simaqian',
          name: '司马迁',
          role: '史官',
          relationship: '文臣',
          description: '撰写《史记》，中国史学之父',
          icon: '📚'
        }
      ],
      three_kingdoms: [
        {
          id: 'liubei',
          name: '刘备',
          role: '皇帝',
          relationship: '核心',
          description: '蜀汉昭烈帝，仁德之君，桃园三结义之首',
          icon: '👑'
        },
        {
          id: 'guanyu',
          name: '关羽',
          role: '将军',
          relationship: '义兄',
          description: '武圣关公，忠义无双，千里走单骑',
          icon: '🗡️'
        },
        {
          id: 'zhangfei',
          name: '张飞',
          role: '将军',
          relationship: '义兄',
          description: '燕人张翼德，勇猛无敌，长坂坡喝退曹军',
          icon: '🛡️'
        },
        {
          id: 'zhugeliang',
          name: '诸葛亮',
          role: '丞相',
          relationship: '军师',
          description: '卧龙先生，智慧化身，鞠躬尽瘁死而后已',
          icon: '🪶'
        },
        {
          id: 'caocao',
          name: '曹操',
          role: '丞相',
          relationship: '对手',
          description: '魏武帝，一代枭雄，挟天子以令诸侯',
          icon: '👹'
        },
        {
          id: 'sunquan',
          name: '孙权',
          role: '皇帝',
          relationship: '对手',
          description: '东吴大帝，江东之主，赤壁之战的胜利者',
          icon: '🌊'
        }
      ],
      jin: [
        {
          id: 'simayan',
          name: '司马炎',
          role: '皇帝',
          relationship: '核心',
          description: '晋武帝，统一三国，建立西晋王朝',
          icon: '👑'
        },
        {
          id: 'wangxizhi',
          name: '王羲之',
          role: '书法家',
          relationship: '文人',
          description: '书圣，《兰亭序》作者，天下第一行书',
          icon: '🖋️'
        },
        {
          id: 'taoyuanming',
          name: '陶渊明',
          role: '诗人',
          relationship: '文人',
          description: '田园诗人，不为五斗米折腰，采菊东篱下',
          icon: '🌾'
        },
        {
          id: 'zuti',
          name: '祖逖',
          role: '将军',
          relationship: '武将',
          description: '闻鸡起舞，北伐中原的英雄',
          icon: '🐓'
        }
      ],
      southern_northern: [
        {
          id: 'liuyu',
          name: '刘裕',
          role: '皇帝',
          relationship: '核心',
          description: '南朝宋武帝，结束东晋，开创南朝',
          icon: '👑'
        },
        {
          id: 'xiaowendi',
          name: '孝文帝',
          role: '皇帝',
          relationship: '改革者',
          description: '北魏孝文帝，推行汉化改革，促进民族融合',
          icon: '🤝'
        },
        {
          id: 'gaohuang',
          name: '高欢',
          role: '权臣',
          relationship: '重臣',
          description: '东魏权臣，实际统治者',
          icon: '⚖️'
        },
        {
          id: 'yuwentai',
          name: '宇文泰',
          role: '权臣',
          relationship: '重臣',
          description: '西魏权臣，府兵制创立者',
          icon: '🛡️'
        }
      ],
      sui: [
        {
          id: 'yangjiang',
          name: '杨坚',
          role: '皇帝',
          relationship: '核心',
          description: '隋文帝，结束分裂，重新统一中国',
          icon: '👑'
        },
        {
          id: 'yangguang',
          name: '杨广',
          role: '皇帝',
          relationship: '继承者',
          description: '隋炀帝，开凿大运河，但最终导致隋朝灭亡',
          icon: '🚢'
        },
        {
          id: 'yangsu',
          name: '杨素',
          role: '将军',
          relationship: '重臣',
          description: '隋朝名将，协助统一南北',
          icon: '⚔️'
        },
        {
          id: 'hanqinhu',
          name: '韩擒虎',
          role: '将军',
          relationship: '武将',
          description: '隋朝名将，灭陈统一的功臣',
          icon: '🐅'
        }
      ],
      tang: [
        {
          id: 'lishimin',
          name: '李世民',
          role: '皇帝',
          relationship: '核心',
          description: '唐太宗，开创贞观之治',
          icon: '👑'
        },
        {
          id: 'wuzetian',
          name: '武则天',
          role: '皇帝',
          relationship: '继承者',
          description: '中国历史上唯一的女皇帝',
          icon: '👸'
        },
        {
          id: 'libai',
          name: '李白',
          role: '诗人',
          relationship: '文人',
          description: '诗仙，盛唐诗歌的代表人物',
          icon: '🍷'
        },
        {
          id: 'dufu',
          name: '杜甫',
          role: '诗人',
          relationship: '文人',
          description: '诗圣，现实主义诗歌大师',
          icon: '✍️'
        }
      ],
      five_dynasties: [
        {
          id: 'zhuwen',
          name: '朱温',
          role: '皇帝',
          relationship: '核心',
          description: '后梁太祖，结束唐朝，开启五代十国',
          icon: '👑'
        },
        {
          id: 'liyue',
          name: '李煜',
          role: '皇帝',
          relationship: '词人',
          description: '南唐后主，千古词帝，亡国之君',
          icon: '📝'
        },
        {
          id: 'chaiRong',
          name: '柴荣',
          role: '皇帝',
          relationship: '明君',
          description: '后周世宗，英明君主，为宋朝统一奠基',
          icon: '⭐'
        },
        {
          id: 'lixuanke',
          name: '李存勖',
          role: '皇帝',
          relationship: '武将',
          description: '后唐庄宗，灭后梁，统一北方',
          icon: '⚔️'
        }
      ]
    };
    return characters[dynastyId] || [];
  };

  const characters = getCharacterData(dynasty.id);

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case '核心': return 'from-yellow-400 to-orange-500';
      case '重臣': return 'from-blue-400 to-cyan-500';
      case '武将': return 'from-red-400 to-pink-500';
      case '文人': return 'from-purple-400 to-indigo-500';
      case '敌对': return 'from-gray-400 to-gray-600';
      case '义兄': return 'from-green-400 to-emerald-500';
      case '军师': return 'from-indigo-400 to-purple-500';
      case '对手': return 'from-orange-400 to-red-500';
      case '改革者': return 'from-cyan-400 to-blue-500';
      case '继承者': return 'from-pink-400 to-rose-500';
      case '词人': return 'from-violet-400 to-purple-500';
      case '明君': return 'from-amber-400 to-yellow-500';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case '皇帝': return <Crown className="w-4 h-4" />;
      case '将军': return <Sword className="w-4 h-4" />;
      case '丞相': case '史官': case '书法家': case '诗人': return <Scroll className="w-4 h-4" />;
      case '使者': return <Heart className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-indigo-400/30">
      <h3 className="chinese-title text-2xl font-bold text-indigo-400 mb-6 flex items-center">
        <Users className="w-6 h-6 mr-3" />
        {dynasty.name}朝人物关系图
      </h3>

      <div className="relative">
        {/* 中心节点 */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl border-4 border-yellow-300 shadow-2xl pulse-glow">
              {dynasty.symbol}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="chinese-title text-xl font-bold text-yellow-400">{dynasty.name}朝</div>
            </div>
          </div>
        </div>

        {/* 人物节点网络 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedCharacter(character)}
            >
              {/* 连接线 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  stroke="#ffd700"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  className="animate-pulse opacity-50"
                />
              </svg>

              <div className={`
                relative bg-gradient-to-br ${getRelationshipColor(character.relationship)} 
                rounded-2xl p-4 border-2 border-white/20 transition-all duration-300
                hover:scale-105 hover:shadow-xl hover:border-white/40
                ${selectedCharacter?.id === character.id ? 'scale-105 shadow-2xl border-white/60' : ''}
              `}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{character.icon}</div>
                  <div className="chinese-title text-lg font-bold text-white mb-1">
                    {character.name}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {getRoleIcon(character.role)}
                    <span className="text-sm text-white/90">{character.role}</span>
                  </div>
                  <div className="text-xs bg-black/30 rounded-full px-2 py-1 text-white/80">
                    {character.relationship}
                  </div>
                </div>

                {/* 悬停详情 */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-black/95 backdrop-blur-sm rounded-lg p-3 border border-white/20 w-64">
                    <p className="text-sm text-white leading-relaxed">
                      {character.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 关系说明 */}
        <div className="mt-8 bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-indigo-400/20">
          <h4 className="text-lg font-bold text-indigo-400 mb-3">关系类型</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {['核心', '重臣', '武将', '文人', '义兄', '军师', '对手', '敌对'].map(type => (
              <div key={type} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getRelationshipColor(type)}`}></div>
                <span className="text-white">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 详细信息面板 */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-md w-full border-2 border-indigo-400/50">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{selectedCharacter.icon}</div>
              <h3 className="chinese-title text-2xl font-bold text-white mb-2">
                {selectedCharacter.name}
              </h3>
              <div className="flex items-center justify-center space-x-2 mb-3">
                {getRoleIcon(selectedCharacter.role)}
                <span className="text-indigo-400 font-medium">{selectedCharacter.role}</span>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRelationshipColor(selectedCharacter.relationship)} text-white`}>
                {selectedCharacter.relationship}
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              {selectedCharacter.description}
            </p>
            
            <button
              onClick={() => setSelectedCharacter(null)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterNetwork;