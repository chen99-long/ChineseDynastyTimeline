import React from 'react';
import { X, Calendar, MapPin, Crown, Users, Award, Scroll, Sparkles, Heart } from 'lucide-react';
import { Dynasty } from '../data/dynasties';
import HistoricalMap from './HistoricalMap';
import CharacterNetwork from './CharacterNetwork';
import HistoricalEvents from './HistoricalEvents';
import CulturalArtifacts from './CulturalArtifacts';
import InteractiveQuiz from './InteractiveQuiz';

interface DynastyDetailProps {
  dynasty: Dynasty;
  onClose: () => void;
}

const DynastyDetail: React.FC<DynastyDetailProps> = ({ dynasty, onClose }) => {
  const formatYear = (year: number) => {
    return year > 0 ? `公元${year}年` : `公元前${Math.abs(year)}年`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="relative w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* 主面板 */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400/50 chinese-border">
          {/* 头部 */}
          <div className={`relative h-40 bg-gradient-to-r ${dynasty.gradient} text-white overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
            
            <div className="relative z-10 h-full flex items-center justify-between p-8">
              <div className="flex items-center space-x-6">
                <div className="text-6xl dragon-fly">
                  {dynasty.symbol}
                </div>
                <div>
                  <h2 className="chinese-title text-5xl font-black mb-2 text-shadow-glow">
                    {dynasty.name}朝
                  </h2>
                  <p className="text-white/90 text-xl italic mb-2">{dynasty.englishName}</p>
                  <p className="text-white/80 text-lg font-medium">
                    {formatYear(dynasty.startYear)} - {formatYear(dynasty.endYear)} · 
                    <span className="ml-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                      国祚{dynasty.duration}年
                    </span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:scale-110 chinese-border"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* 装饰纹理 */}
            <div className="absolute right-0 top-0 w-80 h-full opacity-20">
              <div className="w-full h-full bg-gradient-to-l from-white/40 via-white/20 to-transparent transform skew-x-12" />
            </div>
          </div>

          {/* 内容区域 */}
          <div className="max-h-[calc(95vh-10rem)] overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* 诗词引用 */}
              <div className="text-center bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-yellow-400/30">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <p className="chinese-title text-2xl text-yellow-400 font-bold leading-relaxed">
                  {dynasty.poem}
                </p>
              </div>

              {/* 快速信息网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl p-6 text-center border border-amber-400/30 hover:scale-105 transition-transform duration-300">
                  <Crown className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-sm text-amber-300 mb-2">开国皇帝</p>
                  <p className="font-bold text-white text-lg">{dynasty.founder}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-2xl p-6 text-center border border-blue-400/30 hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-blue-300 mb-2">都城</p>
                  <p className="font-bold text-white text-lg">{dynasty.capital}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl p-6 text-center border border-green-400/30 hover:scale-105 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-green-300 mb-2">存续时间</p>
                  <p className="font-bold text-white text-lg">{dynasty.duration}年</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl p-6 text-center border border-purple-400/30 hover:scale-105 transition-transform duration-300">
                  <Scroll className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm text-purple-300 mb-2">历史地位</p>
                  <p className="font-bold text-white text-lg">重要朝代</p>
                </div>
              </div>

              {/* 朝代简介 */}
              <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-indigo-400/30">
                <h3 className="chinese-title text-2xl font-bold text-indigo-400 mb-6 flex items-center">
                  <Scroll className="w-6 h-6 mr-3" />
                  朝代简介
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {dynasty.description}
                </p>
              </div>

              {/* 历史地图 */}
              <HistoricalMap dynasty={dynasty} />

              {/* 人物关系图 */}
              <CharacterNetwork dynasty={dynasty} />

              {/* 重大历史事件 */}
              <HistoricalEvents dynasty={dynasty} />

              {/* 文化瑰宝 */}
              <CulturalArtifacts dynasty={dynasty} />

              {/* 知识测试 */}
              <InteractiveQuiz dynasty={dynasty} />

              {/* 传奇故事 */}
              <div className="bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-red-500/10 rounded-2xl p-8 border border-rose-400/30">
                <h3 className="chinese-title text-2xl font-bold text-rose-400 mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-3" />
                  传奇故事
                </h3>
                <div className="bg-black/30 rounded-xl p-6 border border-rose-400/20">
                  <p className="text-gray-200 leading-relaxed text-lg italic">
                    {dynasty.legendaryStory}
                  </p>
                </div>
              </div>

              {/* 重要人物 */}
              <div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-400/30">
                <h3 className="chinese-title text-2xl font-bold text-amber-400 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3" />
                  重要人物
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dynasty.notableFigures.map((figure, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-4 border border-amber-400/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-105 text-center group"
                    >
                      <p className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors duration-300">{figure}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 主要成就 */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-400/30">
                <h3 className="chinese-title text-2xl font-bold text-emerald-400 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  主要成就
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dynasty.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-5 border border-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${dynasty.gradient} pulse-glow`} />
                        <p className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors duration-300">{achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 文化元素 */}
              <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-cyan-400/30">
                <h3 className="chinese-title text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 mr-3" />
                  文化特色
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {dynasty.culturalElements.map((element, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-4 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-center group"
                    >
                      <p className="font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{element}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 时间线位置 */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-600/30">
                <h3 className="chinese-title text-2xl font-bold text-gray-300 mb-6">历史时间线位置</h3>
                <div className="relative">
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full">
                    <div
                      className={`h-full bg-gradient-to-r ${dynasty.gradient} rounded-full relative pulse-glow`}
                      style={{ width: '70%' }}
                    >
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-current rounded-full pulse-glow" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-4">
                    <span>中华文明起源</span>
                    <span className="font-bold text-white">{dynasty.name}朝时期</span>
                    <span>现代中国</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynastyDetail;