import React, { useState } from 'react';
import { Palette, Camera, Music, BookOpen, Gem, Award } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface Artifact {
  id: string;
  name: string;
  category: 'art' | 'literature' | 'music' | 'architecture' | 'technology' | 'treasure';
  description: string;
  significance: string;
  imageUrl: string;
  discoveryInfo: string;
  currentLocation: string;
}

interface CulturalArtifactsProps {
  dynasty: Dynasty;
}

const CulturalArtifacts: React.FC<CulturalArtifactsProps> = ({ dynasty }) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getArtifactsData = (dynastyId: string): Artifact[] => {
    const artifacts: Record<string, Artifact[]> = {
      qin: [
        {
          id: 'terracotta_army',
          name: '兵马俑',
          category: 'art',
          description: '秦始皇陵的陪葬品，数千个真人大小的陶制士兵',
          significance: '展现了秦朝的军事实力和工艺水平，被誉为世界第八大奇迹',
          imageUrl: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg',
          discoveryInfo: '1974年被当地农民发现',
          currentLocation: '西安秦始皇兵马俑博物馆'
        },
        {
          id: 'qin_bronze',
          name: '秦代青铜器',
          category: 'treasure',
          description: '精美的青铜礼器和兵器，工艺精湛',
          significance: '反映了秦朝的青铜铸造技术和礼制文化',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '各地考古发现',
          currentLocation: '各大博物馆收藏'
        }
      ],
      han: [
        {
          id: 'silk_road_artifacts',
          name: '丝路文物',
          category: 'treasure',
          description: '丝绸之路上的各种贸易品和文化交流物品',
          significance: '见证了汉朝与西域的文化交流和商贸往来',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '丝绸之路沿线发现',
          currentLocation: '敦煌研究院等'
        },
        {
          id: 'han_poetry',
          name: '汉赋经典',
          category: 'literature',
          description: '司马相如、扬雄等人的辞赋作品',
          significance: '开创了中国古代文学的新体裁',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '文献传承',
          currentLocation: '各大图书馆'
        }
      ],
      three_kingdoms: [
        {
          id: 'three_kingdoms_novel',
          name: '三国演义',
          category: 'literature',
          description: '罗贯中创作的历史小说，描述三国时期的英雄故事',
          significance: '中国古典四大名著之一，影响深远的历史小说',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '明代文学创作',
          currentLocation: '全世界图书馆'
        },
        {
          id: 'guan_dao',
          name: '青龙偃月刀',
          category: 'treasure',
          description: '传说中关羽使用的兵器，象征忠义',
          significance: '武圣关公的象征，忠义精神的代表',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '历史传说',
          currentLocation: '各地关帝庙'
        },
        {
          id: 'zhuge_fan',
          name: '诸葛亮羽扇',
          category: 'art',
          description: '诸葛亮的标志性物品，智慧的象征',
          significance: '代表了古代军师的智慧和风度',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '历史传说',
          currentLocation: '文化传承'
        }
      ],
      jin: [
        {
          id: 'lantingxu',
          name: '兰亭序',
          category: 'art',
          description: '王羲之的书法杰作，被誉为天下第一行书',
          significance: '中国书法艺术的巅峰之作，影响后世千年',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '东晋永和九年创作',
          currentLocation: '故宫博物院（摹本）'
        },
        {
          id: 'tao_poetry',
          name: '陶渊明诗集',
          category: 'literature',
          description: '田园诗人陶渊明的诗歌作品',
          significance: '开创了田园诗派，影响后世文人',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '文献传承',
          currentLocation: '各大图书馆'
        }
      ],
      southern_northern: [
        {
          id: 'buddhist_caves',
          name: '佛教石窟',
          category: 'architecture',
          description: '云冈石窟、龙门石窟等佛教艺术瑰宝',
          significance: '展现了南北朝时期佛教艺术的繁荣',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '南北朝时期开凿',
          currentLocation: '山西云冈、河南龙门等'
        },
        {
          id: 'folk_songs',
          name: '南北朝民歌',
          category: 'music',
          description: '《木兰辞》等优秀民歌作品',
          significance: '反映了南北朝时期的社会生活和民族融合',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '文献记载',
          currentLocation: '文学史研究'
        }
      ],
      sui: [
        {
          id: 'grand_canal',
          name: '大运河',
          category: 'architecture',
          description: '连接南北的伟大水利工程',
          significance: '促进了南北经济文化交流，影响至今',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '隋朝开凿',
          currentLocation: '中国大运河沿线'
        },
        {
          id: 'sui_porcelain',
          name: '隋代瓷器',
          category: 'art',
          description: '隋朝时期的陶瓷工艺品',
          significance: '展现了隋朝的手工业发展水平',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '考古发掘',
          currentLocation: '各大博物馆'
        }
      ],
      tang: [
        {
          id: 'tang_poetry',
          name: '唐诗三百首',
          category: 'literature',
          description: '李白、杜甫等诗人的经典作品集',
          significance: '中国古典诗歌的巅峰之作，影响深远',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '文献传承',
          currentLocation: '全世界图书馆'
        },
        {
          id: 'tang_painting',
          name: '唐代壁画',
          category: 'art',
          description: '敦煌莫高窟和各地寺庙的精美壁画',
          significance: '展现了唐代的艺术成就和宗教文化',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '石窟寺庙保存',
          currentLocation: '敦煌莫高窟等'
        }
      ],
      five_dynasties: [
        {
          id: 'li_yu_ci',
          name: '李煜词集',
          category: 'literature',
          description: '南唐后主李煜的词作，情真意切',
          significance: '词的发展史上的重要作品，影响后世词人',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '文献传承',
          currentLocation: '各大图书馆'
        },
        {
          id: 'five_dynasties_painting',
          name: '五代绘画',
          category: 'art',
          description: '五代时期的山水画和花鸟画',
          significance: '承上启下，为宋代绘画艺术奠定基础',
          imageUrl: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
          discoveryInfo: '历代传承',
          currentLocation: '故宫博物院等'
        }
      ]
    };
    return artifacts[dynastyId] || [];
  };

  const artifacts = getArtifactsData(dynasty.id);
  const filteredArtifacts = filter === 'all' ? artifacts : artifacts.filter(a => a.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'art': return <Palette className="w-5 h-5" />;
      case 'literature': return <BookOpen className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'architecture': return <Award className="w-5 h-5" />;
      case 'technology': return <Gem className="w-5 h-5" />;
      case 'treasure': return <Camera className="w-5 h-5" />;
      default: return <Palette className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'art': return 'from-pink-400 to-rose-500';
      case 'literature': return 'from-blue-400 to-indigo-500';
      case 'music': return 'from-purple-400 to-violet-500';
      case 'architecture': return 'from-amber-400 to-orange-500';
      case 'technology': return 'from-green-400 to-emerald-500';
      case 'treasure': return 'from-yellow-400 to-gold-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-2xl p-6 border border-rose-400/30">
      <h3 className="chinese-title text-2xl font-bold text-rose-400 mb-6 flex items-center">
        <Palette className="w-6 h-6 mr-3" />
        {dynasty.name}朝文化瑰宝
      </h3>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'art', 'literature', 'music', 'architecture', 'technology', 'treasure'].map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2
              ${filter === category 
                ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg' 
                : 'bg-rose-800/50 text-rose-300 hover:bg-rose-700/50'
              }
            `}
          >
            {getCategoryIcon(category)}
            <span>
              {category === 'all' ? '全部' : 
               category === 'art' ? '艺术' :
               category === 'literature' ? '文学' :
               category === 'music' ? '音乐' :
               category === 'architecture' ? '建筑' :
               category === 'technology' ? '技术' : '珍宝'}
            </span>
          </button>
        ))}
      </div>

      {/* 文物网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtifacts.map(artifact => (
          <div
            key={artifact.id}
            className="group cursor-pointer"
            onClick={() => setSelectedArtifact(artifact)}
          >
            <div className={`
              bg-gradient-to-br ${getCategoryColor(artifact.category)} bg-opacity-20 backdrop-blur-sm
              rounded-xl overflow-hidden border border-white/20 transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:border-white/40
              ${selectedArtifact?.id === artifact.id ? 'scale-105 shadow-2xl border-white/60' : ''}
            `}>
              {/* 图片区域 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`
                  absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r ${getCategoryColor(artifact.category)}
                  flex items-center justify-center text-white shadow-lg
                `}>
                  {getCategoryIcon(artifact.category)}
                </div>
              </div>
              
              {/* 内容区域 */}
              <div className="p-4">
                <h4 className="chinese-title text-lg font-bold text-white mb-2">
                  {artifact.name}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2">
                  {artifact.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white
                  `}>
                    {artifact.category === 'art' ? '艺术品' :
                     artifact.category === 'literature' ? '文学作品' :
                     artifact.category === 'music' ? '音乐作品' :
                     artifact.category === 'architecture' ? '建筑' :
                     artifact.category === 'technology' ? '技术' : '珍宝'}
                  </div>
                  <div className="text-xs text-gray-400">
                    点击查看详情
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 文物详情弹窗 */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden max-w-4xl w-full border-2 border-rose-400/50 max-h-[90vh] overflow-y-auto">
            {/* 图片头部 */}
            <div className="relative h-64">
              <img
                src={selectedArtifact.imageUrl}
                alt={selectedArtifact.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <button
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 flex items-center justify-center text-white"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(selectedArtifact.category)}
                    flex items-center justify-center text-white shadow-lg
                  `}>
                    {getCategoryIcon(selectedArtifact.category)}
                  </div>
                  <div>
                    <h3 className="chinese-title text-2xl font-bold text-white mb-1">
                      {selectedArtifact.name}
                    </h3>
                    <div className={`
                      inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(selectedArtifact.category)} text-white
                    `}>
                      {selectedArtifact.category === 'art' ? '艺术品' :
                       selectedArtifact.category === 'literature' ? '文学作品' :
                       selectedArtifact.category === 'music' ? '音乐作品' :
                       selectedArtifact.category === 'architecture' ? '建筑' :
                       selectedArtifact.category === 'technology' ? '技术' : '珍宝'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 详细信息 */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-rose-400 mb-3">文物描述</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedArtifact.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-rose-400 mb-3">历史意义</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedArtifact.significance}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-rose-400 mb-3">发现信息</h4>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-gray-300">{selectedArtifact.discoveryInfo}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-rose-400 mb-3">现存位置</h4>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-gray-300">{selectedArtifact.currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalArtifacts;