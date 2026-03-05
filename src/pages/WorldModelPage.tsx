import PaperTracker from '../components/PaperTracker';
import { worldModelPapers } from '../data/worldModelPapers';

const CATEGORIES = ['Auto-driving', 'Robotics', 'Gaming', 'General', 'Video Generation'];

const LEARNING_PATHS = [
  {
    title: '世界模型学习路径',
    levels: [
      {
        name: '🎯 基础概念',
        papers: [
          { name: 'World Model Fundamentals', focus: '世界模型基本概念与原理', prerequisite: '深度学习基础' },
          { name: 'Model-Based RL', focus: '基于模型强化学习基础', prerequisite: 'RL 基础' },
        ]
      },
      {
        name: '📚 核心架构',
        papers: [
          { name: 'Dreamer', focus: 'RSSM 循环状态空间模型', prerequisite: 'VAE, RL 基础' },
          { name: ' PlaNet', focus: '基于模型的规划智能体', prerequisite: 'MBRL 基础' },
          { name: 'World Models', focus: 'VAE + MDN-RNN 组合', prerequisite: '生成模型基础' },
        ]
      },
      {
        name: '🚀 前沿进展',
        papers: [
          { name: 'GAIA-1', focus: '自动驾驶世界模型，视频生成', prerequisite: '生成模型基础' },
          { name: 'DriveDreamer', focus: '驾驶场景世界模型', prerequisite: '自动驾驶基础' },
          { name: 'Unified World Model', focus: '统一世界模型框架', prerequisite: '多模态基础' },
        ]
      },
    ]
  },
];

export default function WorldModelPage() {
  return (
    <PaperTracker
      title="世界模型论文追踪"
      subtitle="追踪 World Model 领域最新突破：自动驾驶、机器人规划、游戏智能 · 来源：arXiv / NeurIPS / ICLR / ECCV"
      emoji="🌍"
      accentFrom="from-purple-500"
      accentTo="to-pink-500"
      accentText="text-purple-600"
      accentBorder="border-purple-200"
      accentBg="bg-purple-50"
      tagBg="bg-purple-50"
      tagText="text-purple-600"
      tagBorder="border-purple-200"
      papers={worldModelPapers}
      categories={CATEGORIES}
      learningPaths={LEARNING_PATHS}
    />
  );
}
