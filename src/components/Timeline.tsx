import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Crown, Scroll } from 'lucide-react';
import { Dynasty, dynasties } from '../data/dynasties';
import DynastyCard from './DynastyCard';
import DynastyDetail from './DynastyDetail';
import ParticleBackground from './ParticleBackground';

const Timeline: React.FC = () => {
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);
  const [hoveredDynasty, setHoveredDynasty] = useState<Dynasty | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 计算时间线比例
  const minYear = Math.min(...dynasties.map(d => d.startYear));
  const maxYear = Math.max(...dynasties.map(d => d.endYear));
  const totalYears = maxYear - minYear;
  const pixelsPerYear = 3;
  const timelineWidth = totalYears * pixelsPerYear;

  const getPositionFromYear = (year: number) => {
    return ((year - minYear) / totalYears) * timelineWidth;
  };

  const checkScrollButtons = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = timelineRef.current.clientWidth * 0.8;
      timelineRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        timeline.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  // 获取当前主题（基于选中或悬停的朝代）
  const currentTheme = selectedDynasty?.id || hoveredDynasty?.id || 'default';

  return (
    <div className="w-full h-screen relative overflow-hidden chinese-pattern">
      {/* 动态粒子背景 */}
      <ParticleBackground theme={currentTheme} />

      {/* 主标题区域 */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
            
            <h1 className="chinese-title text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-shadow-glow slide-in-left">
              华夏千年
            </h1>
            
            <div className="flex items-center justify-center space-x-2 slide-in-right">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <p className="text-xl md:text-2xl text-yellow-100 font-medium tracking-wider">
                中国历代王朝时间线
              </p>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-yellow-200/80 text-lg max-w-2xl mx-auto leading-relaxed fade-in-up">
              穿越时空，感受五千年华夏文明的壮丽画卷
            </p>

            {/* 装饰性元素 */}
            <div className="flex items-center justify-center space-x-8 mt-6 fade-in-up">
              <div className="flex items-center space-x-2 text-yellow-300">
                <Crown className="w-5 h-5" />
                <span className="text-sm">点击探索</span>
              </div>
              <div className="w-px h-6 bg-yellow-400/50"></div>
              <div className="flex items-center space-x-2 text-yellow-300">
                <Scroll className="w-5 h-5" />
                <span className="text-sm">悬停预览</span>
              </div>
            </div>

            {/* 当前选中朝代提示 */}
            {(selectedDynasty || hoveredDynasty) && (
              <div className="mt-4 fade-in-up">
                <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${(selectedDynasty || hoveredDynasty)!.gradient} bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30`}>
                  <div className="text-2xl">{(selectedDynasty || hoveredDynasty)!.symbol}</div>
                  <div className="text-white font-bold">
                    正在浏览：{(selectedDynasty || hoveredDynasty)!.name}朝
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 时间线容器 */}
      <div className="pt-48 pb-12 h-full flex flex-col">
        <div className="flex-1 relative">
          {/* 滚动按钮 */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center hover:scale-110 transition-all duration-300 pulse-glow chinese-border"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center hover:scale-110 transition-all duration-300 pulse-glow chinese-border"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* 时间线主体 */}
          <div
            ref={timelineRef}
            className="h-full overflow-x-auto overflow-y-hidden px-8 md:px-16"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="relative h-full flex items-center" style={{ width: `${timelineWidth + 400}px`, minWidth: '100%' }}>
              {/* 主时间线 */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-500 via-purple-500 via-blue-500 via-green-500 via-orange-500 to-pink-500 rounded-full shadow-lg border-gradient">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-full animate-pulse"></div>
              </div>
              
              {/* 年份标记 */}
              <div className="absolute top-1/2 left-0 right-0">
                {[-200, 0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800].map(year => (
                  <div
                    key={year}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${getPositionFromYear(year)}px` }}
                  >
                    <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 -translate-y-1/2 rounded-full shadow-lg"></div>
                    <div className="text-sm text-yellow-200 mt-4 -translate-x-1/2 whitespace-nowrap font-bold bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                      {year > 0 ? `公元${year}年` : `公元前${Math.abs(year)}年`}
                    </div>
                  </div>
                ))}
              </div>

              {/* 朝代卡片 */}
              {dynasties.map((dynasty, index) => {
                const left = getPositionFromYear(dynasty.startYear);
                const width = getPositionFromYear(dynasty.endYear) - left;
                
                return (
                  <DynastyCard
                    key={dynasty.id}
                    dynasty={dynasty}
                    index={index}
                    style={{
                      position: 'absolute',
                      left: `${left}px`,
                      width: `${Math.max(width, 160)}px`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    isSelected={selectedDynasty?.id === dynasty.id}
                    isHovered={hoveredDynasty?.id === dynasty.id}
                    onClick={() => setSelectedDynasty(dynasty)}
                    onHover={setHoveredDynasty}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-auto px-8 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-black/60 via-black/80 to-black/60 backdrop-blur-lg rounded-3xl border border-yellow-400/30 p-6 chinese-border">
              <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
                <div className="flex items-center space-x-3 text-yellow-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">点击朝代查看详细历史</span>
                </div>
                <div className="w-px h-6 bg-yellow-400/50"></div>
                <div className="flex items-center space-x-3 text-yellow-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">悬停显示朝代简介</span>
                </div>
                <div className="w-px h-6 bg-yellow-400/50"></div>
                <div className="flex items-center space-x-3 text-yellow-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">左右滚动浏览历史</span>
                </div>
                <div className="w-px h-6 bg-yellow-400/50"></div>
                <div className="flex items-center space-x-3 text-yellow-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">背景随朝代变化</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 朝代详情面板 */}
      {selectedDynasty && (
        <DynastyDetail
          dynasty={selectedDynasty}
          onClose={() => setSelectedDynasty(null)}
        />
      )}
    </div>
  );
};

export default Timeline;