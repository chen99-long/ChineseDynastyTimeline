import React from 'react';
import { MapPin, Mountain, Waves, TreePine } from 'lucide-react';
import { Dynasty } from '../data/dynasties';

interface HistoricalMapProps {
  dynasty: Dynasty;
}

const HistoricalMap: React.FC<HistoricalMapProps> = ({ dynasty }) => {
  const getMapData = (dynastyId: string) => {
    const maps: Record<string, any> = {
      qin: {
        territories: [
          { name: '关中', x: 45, y: 40, type: 'capital' },
          { name: '巴蜀', x: 35, y: 55, type: 'region' },
          { name: '楚地', x: 55, y: 50, type: 'region' },
          { name: '齐地', x: 65, y: 35, type: 'region' },
          { name: '燕地', x: 70, y: 25, type: 'region' },
          { name: '赵地', x: 60, y: 30, type: 'region' }
        ],
        routes: [
          { from: { x: 45, y: 40 }, to: { x: 35, y: 55 }, name: '蜀道' },
          { from: { x: 45, y: 40 }, to: { x: 55, y: 50 }, name: '楚道' },
          { from: { x: 45, y: 40 }, to: { x: 65, y: 35 }, name: '齐道' }
        ]
      },
      han: {
        territories: [
          { name: '长安', x: 45, y: 40, type: 'capital' },
          { name: '洛阳', x: 55, y: 38, type: 'capital' },
          { name: '西域', x: 15, y: 35, type: 'frontier' },
          { name: '朝鲜', x: 80, y: 20, type: 'vassal' },
          { name: '南越', x: 50, y: 75, type: 'vassal' }
        ],
        routes: [
          { from: { x: 45, y: 40 }, to: { x: 15, y: 35 }, name: '丝绸之路' },
          { from: { x: 45, y: 40 }, to: { x: 80, y: 20 }, name: '朝贡路' },
          { from: { x: 45, y: 40 }, to: { x: 50, y: 75 }, name: '南征路' }
        ]
      },
      tang: {
        territories: [
          { name: '长安', x: 45, y: 40, type: 'capital' },
          { name: '洛阳', x: 55, y: 38, type: 'capital' },
          { name: '安西', x: 20, y: 35, type: 'frontier' },
          { name: '安北', x: 50, y: 15, type: 'frontier' },
          { name: '安东', x: 80, y: 25, type: 'frontier' },
          { name: '安南', x: 45, y: 80, type: 'frontier' }
        ],
        routes: [
          { from: { x: 45, y: 40 }, to: { x: 20, y: 35 }, name: '丝路西线' },
          { from: { x: 45, y: 40 }, to: { x: 50, y: 15 }, name: '草原路' },
          { from: { x: 45, y: 40 }, to: { x: 80, y: 25 }, name: '东北路' }
        ]
      }
    };
    return maps[dynastyId] || maps.qin;
  };

  const mapData = getMapData(dynasty.id);

  const getIcon = (type: string) => {
    switch (type) {
      case 'capital': return <MapPin className="w-4 h-4 text-yellow-400" />;
      case 'region': return <Mountain className="w-4 h-4 text-blue-400" />;
      case 'frontier': return <TreePine className="w-4 h-4 text-green-400" />;
      case 'vassal': return <Waves className="w-4 h-4 text-purple-400" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-6 border border-amber-400/30">
      <h3 className="chinese-title text-2xl font-bold text-amber-400 mb-6 flex items-center">
        <MapPin className="w-6 h-6 mr-3" />
        {dynasty.name}朝疆域图
      </h3>
      
      <div className="relative w-full h-96 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl border-2 border-amber-400/20 overflow-hidden">
        {/* 地形背景 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-600 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-600 rounded-full opacity-30"></div>
        </div>

        {/* 路线 */}
        <svg className="absolute inset-0 w-full h-full">
          {mapData.routes?.map((route: any, index: number) => (
            <g key={index}>
              <line
                x1={`${route.from.x}%`}
                y1={`${route.from.y}%`}
                x2={`${route.to.x}%`}
                y2={`${route.to.y}%`}
                stroke="#ffd700"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
              <text
                x={`${(route.from.x + route.to.x) / 2}%`}
                y={`${(route.from.y + route.to.y) / 2}%`}
                fill="#ffd700"
                fontSize="12"
                textAnchor="middle"
                className="font-bold"
              >
                {route.name}
              </text>
            </g>
          ))}
        </svg>

        {/* 城市和地区 */}
        {mapData.territories?.map((territory: any, index: number) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${territory.x}%`, top: `${territory.y}%` }}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
              ${territory.type === 'capital' 
                ? 'bg-yellow-400 border-yellow-600 shadow-lg shadow-yellow-400/50' 
                : territory.type === 'frontier'
                ? 'bg-green-400 border-green-600 shadow-lg shadow-green-400/50'
                : territory.type === 'vassal'
                ? 'bg-purple-400 border-purple-600 shadow-lg shadow-purple-400/50'
                : 'bg-blue-400 border-blue-600 shadow-lg shadow-blue-400/50'
              }
              group-hover:scale-125 group-hover:shadow-xl
            `}>
              {getIcon(territory.type)}
            </div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap border border-yellow-400/50">
                {territory.name}
                <div className="text-xs text-yellow-300 capitalize">{territory.type}</div>
              </div>
            </div>
          </div>
        ))}

        {/* 图例 */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-400/30">
          <div className="text-sm font-bold text-amber-400 mb-2">图例</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white">都城</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-white">重要城市</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white">边疆重镇</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-white">属国</span>
            </div>
          </div>
        </div>

        {/* 指南针 */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full border-2 border-amber-400/50 flex items-center justify-center">
          <div className="text-amber-400 font-bold text-xs">
            <div className="text-center">北</div>
            <div className="w-6 h-0.5 bg-amber-400 mx-auto my-1"></div>
            <div className="text-center">南</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalMap;