export interface Dynasty {
  id: string;
  name: string;
  englishName: string;
  startYear: number;
  endYear: number;
  duration: number;
  capital: string;
  founder: string;
  notableFigures: string[];
  achievements: string[];
  description: string;
  color: string;
  gradient: string;
  symbol: string;
  poem: string;
  culturalElements: string[];
  legendaryStory: string;
}

export const dynasties: Dynasty[] = [
  {
    id: "qin",
    name: "秦",
    englishName: "Qin Dynasty",
    startYear: -221,
    endYear: -206,
    duration: 15,
    capital: "咸阳",
    founder: "嬴政",
    notableFigures: ["秦始皇", "李斯", "蒙恬", "扶苏"],
    achievements: ["统一六国", "修筑长城", "统一文字", "车同轨"],
    description: "千古一帝，横扫六合，建立了中国历史上第一个大一统王朝。虽短暂如流星，却照亮了华夏统一的道路。",
    color: "#8B4513",
    gradient: "from-amber-600 via-orange-600 to-red-700",
    symbol: "🐉",
    poem: "秦王扫六合，虎视何雄哉！挥剑决浮云，诸侯尽西来。",
    culturalElements: ["兵马俑", "阿房宫", "焚书坑儒", "郡县制"],
    legendaryStory: "传说秦始皇派徐福东渡寻找不老仙药，三千童男童女从此杳无音信，成为千古之谜。"
  },
  {
    id: "han",
    name: "汉",
    englishName: "Han Dynasty", 
    startYear: -202,
    endYear: 220,
    duration: 422,
    capital: "长安/洛阳",
    founder: "刘邦",
    notableFigures: ["汉高祖", "汉武帝", "张骞", "司马迁", "霍去病"],
    achievements: ["开辟丝绸之路", "独尊儒术", "史记问世", "犯我强汉者虽远必诛"],
    description: "大风起兮云飞扬，威加海内兮归故乡。汉家天下四百年，奠定了中华民族的根基，汉人、汉字、汉语皆源于此。",
    color: "#FFD700",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    symbol: "🏮",
    poem: "大风起兮云飞扬，威加海内兮归故乡。安得猛士兮守四方！",
    culturalElements: ["丝绸之路", "太学", "察举制", "汉赋"],
    legendaryStory: "张骞出使西域，历经十三年艰险，开辟了连接东西方的丝绸之路，被誉为'凿空西域'的英雄。"
  },
  {
    id: "tang",
    name: "唐",
    englishName: "Tang Dynasty",
    startYear: 618,
    endYear: 907,
    duration: 289,
    capital: "长安",
    founder: "李渊",
    notableFigures: ["李世民", "武则天", "李白", "杜甫", "玄奘"],
    achievements: ["贞观之治", "开元盛世", "诗歌巅峰", "万国来朝"],
    description: "盛唐气象，诗酒风流。长安城中胡姬酒肆，丝路驼铃声声。这是中华文明最辉煌的时代，诗仙李白醉酒作诗，诗圣杜甫忧国忧民。",
    color: "#8A2BE2",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    symbol: "🌸",
    poem: "云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。",
    culturalElements: ["唐诗", "胡旋舞", "茶道", "科举制"],
    legendaryStory: "杨贵妃一笑倾城，唐玄宗为博红颜一笑，不惜千里快马运送荔枝，'一骑红尘妃子笑，无人知是荔枝来'。"
  },
  {
    id: "song",
    name: "宋",
    englishName: "Song Dynasty",
    startYear: 960,
    endYear: 1279,
    duration: 319,
    capital: "开封/临安",
    founder: "赵匡胤",
    notableFigures: ["赵匡胤", "包拯", "苏轼", "李清照", "岳飞"],
    achievements: ["四大发明", "理学兴起", "词的黄金时代", "商业繁荣"],
    description: "文治武功，理学昌明。虽然武力不及汉唐，但文化艺术达到了前所未有的高度。苏轼的豪放，李清照的婉约，都是这个时代的绝唱。",
    color: "#20B2AA",
    gradient: "from-teal-400 via-cyan-500 to-blue-600",
    symbol: "🎋",
    poem: "明月几时有？把酒问青天。不知天上宫阙，今夕是何年。",
    culturalElements: ["宋词", "理学", "书院", "瓷器"],
    legendaryStory: "岳飞精忠报国，背刺'精忠报国'四字，最终却死于风波亭。临终前仰天长叹：'天日昭昭，天日昭昭！'"
  },
  {
    id: "yuan",
    name: "元",
    englishName: "Yuan Dynasty",
    startYear: 1271,
    endYear: 1368,
    duration: 97,
    capital: "大都",
    founder: "忽必烈",
    notableFigures: ["忽必烈", "马可·波罗", "关汉卿", "郭守敬"],
    achievements: ["疆域辽阔", "元曲兴起", "天文历法", "东西交流"],
    description: "马背上的王朝，草原的雄鹰。蒙古铁骑横扫欧亚，建立了人类历史上疆域最大的帝国。虽是异族统治，却促进了多元文化的交融。",
    color: "#4682B4",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    symbol: "🏹",
    poem: "天苍苍，野茫茫，风吹草低见牛羊。",
    culturalElements: ["元曲", "马头琴", "蒙古包", "那达慕"],
    legendaryStory: "马可·波罗游历中国十七年，回到威尼斯后写下《马可·波罗游记》，让欧洲人第一次了解到东方的繁华。"
  },
  {
    id: "ming",
    name: "明", 
    englishName: "Ming Dynasty",
    startYear: 1368,
    endYear: 1644,
    duration: 276,
    capital: "南京/北京",
    founder: "朱元璋",
    notableFigures: ["朱元璋", "朱棣", "郑和", "李时珍", "徐霞客"],
    achievements: ["郑和下西洋", "紫禁城", "本草纲目", "永乐大典"],
    description: "从乞丐到皇帝，朱元璋演绎了最传奇的人生。明朝是最后一个汉人王朝，郑和七下西洋，展现了中华的海上雄风。",
    color: "#DC143C",
    gradient: "from-red-500 via-rose-600 to-pink-700",
    symbol: "🌅",
    poem: "大明天子，威德远播。日月所照，皆为汉土。",
    culturalElements: ["紫禁城", "青花瓷", "京剧", "太极拳"],
    legendaryStory: "郑和率领两万七千人的庞大船队七下西洋，最远到达非洲东海岸，比哥伦布发现新大陆早了近一个世纪。"
  },
  {
    id: "qing",
    name: "清",
    englishName: "Qing Dynasty",
    startYear: 1644,
    endYear: 1912,
    duration: 268,
    capital: "北京",
    founder: "努尔哈赤",
    notableFigures: ["康熙", "乾隆", "纪晓岚", "林则徐", "慈禧"],
    achievements: ["康乾盛世", "《四库全书》", "疆域巩固", "人口增长"],
    description: "最后的王朝，满族入关。康乾盛世时国力强盛，但后期闭关锁国，错失了工业革命的机遇，最终在列强入侵中走向衰落。",
    color: "#4B0082",
    gradient: "from-indigo-600 via-purple-700 to-violet-800",
    symbol: "🦅",
    poem: "江山如此多娇，引无数英雄竞折腰。",
    culturalElements: ["满汉全席", "京剧", "红楼梦", "辫子"],
    legendaryStory: "康熙皇帝八岁登基，十四岁亲政，在位六十一年，是中国历史上在位时间最长的皇帝，被誉为'千古一帝'。"
  }
];