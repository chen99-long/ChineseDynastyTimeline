import React from 'react';
import { Dynasty } from '../data/dynasties';

interface DynastyCardProps {
  dynasty: Dynasty;
  index: number;
  style: React.CSSProperties;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (dynasty: Dynasty | null) => void;
}

const DynastyCard: React.FC<DynastyCardProps> = ({
  dynasty,
  index,
  style,
  isSelected,
  isHovered,
  onClick,
  onHover
}) => {
  const formatYear = (year: number) => {
    return year > 0 ? `公元${year}年` : `公元前${Math.abs(year)}年`;
  };

  return (
    <div
      style={style}
      className="relative cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => onHover(dynasty)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 主朝代卡片 */}
      <div
        className={`
          relative h-24 rounded-2xl border-4 transition-all duration-500 overflow-hidden chinese-border
          ${isSelected 
            ? 'border-yellow-400 shadow-2xl scale-125 z-20 pulse-glow' 
            : isHovered 
            ? 'border-yellow-300/70 shadow-xl scale-110 z-10' 
            : 'border-white/40 shadow-lg hover:shadow-xl hover:scale-105'
          }
          bg-gradient-to-br ${dynasty.gradient}
        `}
        style={{
          animationDelay: `${index * 0.2}s`
        }}
      >
        {/* 朝代内容 */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-3">
          <div className="text-2xl mb-1 dragon-fly">
            {dynasty.symbol}
          </div>
          <div className="chinese-title text-2xl font-black text-center leading-tight mb-1 text-shadow-gold">
            {dynasty.name}朝
          </div>
          <div className="text-xs opacity-90 text-center font-medium">
            {formatYear(dynasty.startYear)} - {formatYear(dynasty.endYear)}
          </div>
          <div className="text-xs opacity-75 text-center mt-1 bg-black/30 px-2 py-0.5 rounded-full">
            {dynasty.duration}年
          </div>
        </div>

        {/* 光效动画 */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
          transform -skew-x-12 transition-transform duration-1000
          ${isHovered ? 'translate-x-full' : '-translate-x-full opacity-0'}
        `} />

        {/* 背景纹理 */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
        </div>

        {/* 印章效果 */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-8 h-8 seal-stamp rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">选</span>
          </div>
        )}
      </div>

      {/* 悬停信息卡片 */}
      {isHovered && !isSelected && (
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30 w-96 max-w-sm">
          <div className="bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-yellow-400/50 p-5 chinese-border slide-in-left">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="chinese-title text-2xl font-bold text-yellow-400 mb-1">
                  {dynasty.name}朝 {dynasty.symbol}
                </h3>
                <p className="text-sm text-gray-300 italic">{dynasty.englishName}</p>
              </div>
              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${dynasty.gradient} border-2 border-yellow-400 pulse-glow`} />
            </div>
            
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex items-center justify-between bg-black/40 rounded-lg p-2">
                <span className="text-yellow-300">开国皇帝:</span>
                <span className="font-bold text-white">{dynasty.founder}</span>
              </div>
              <div className="flex items-center justify-between bg-black/40 rounded-lg p-2">
                <span className="text-yellow-300">都城:</span>
                <span className="font-bold text-white">{dynasty.capital}</span>
              </div>
              <div className="flex items-center justify-between bg-black/40 rounded-lg p-2">
                <span className="text-yellow-300">国祚:</span>
                <span className="font-bold text-white">{dynasty.duration}年</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-yellow-400/30">
              <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 italic">
                "{dynasty.poem}"
              </p>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full px-4 py-2 border border-yellow-400/30">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-yellow-300 font-medium">点击查看详细历史</span>
              </div>
            </div>

            {/* 箭头 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-400/50" />
            </div>
          </div>
        </div>
      )}

      {/* 连接线 */}
      <div className={`
        absolute top-full left-1/2 w-1 bg-gradient-to-b transition-all duration-300
        ${isSelected 
          ? 'h-8 from-yellow-400 to-orange-500 shadow-lg' 
          : isHovered 
          ? 'h-6 from-yellow-300 to-orange-400' 
          : 'h-3 from-gray-400 to-gray-500'
        }
      `} />
    </div>
  );
};

export default DynastyCard;