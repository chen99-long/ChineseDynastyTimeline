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
      ]
    };
    return characters[dynastyId] || characters.qin;
  };

  const characters = getCharacterData(dynasty.id);

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case '核心': return 'from-yellow-400 to-orange-500';
      case '重臣': return 'from-blue-400 to-cyan-500';
      case '武将': return 'from-red-400 to-pink-500';
      case '文人': return 'from-purple-400 to-indigo-500';
      case '敌对': return 'from-gray-400 to-gray-600';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case '皇帝': return <Crown className="w-4 h-4" />;
      case '将军': return <Sword className="w-4 h-4" />;
      case '丞相': case '史官': return <Scroll className="w-4 h-4" />;
      case '诗人': return <Heart className="w-4 h-4" />;
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {['核心', '重臣', '武将', '文人', '继承者', '敌对'].map(type => (
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