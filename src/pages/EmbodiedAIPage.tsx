import PaperTracker from '../components/PaperTracker';
import { embodiedAIPapers } from '../data/embodiedAIPapers';

const CATEGORIES = ['VLA', 'EAI', 'VLA Quantization', 'Manipulation', 'Navigation', 'Benchmark', 'Robotics RL'];

const LEARNING_PATHS = [
  {
    title: '具身智能学习路径',
    levels: [
      {
        name: '🎯 入门阶段 - 基础概念',
        papers: [
          { name: 'Decision Transformer', focus: '将 RL 转化为序列建模问题，理解回报条件化策略', prerequisite: '基础 RL 概念' },
          { name: 'PPO', focus: '策略梯度核心算法，理解 on-policy RL', prerequisite: '深度学习基础' },
          { name: 'SAC', focus: '离线策略最大化熵的 RL，理解 actor-critic', prerequisite: '基础 RL' },
        ]
      },
      {
        name: '📚 进阶阶段 - 核心方法',
        papers: [
          { name: 'ACT', focus: '动作分块预测，减少时序抖动', prerequisite: '基础 RL' },
          { name: 'RoboFlamingo', focus: 'VLM 基础上的 in-context learning 操控', prerequisite: 'Transformer, VLM' },
          { name: 'RT-2', focus: '首个大规模 VLA，互联网规模预训练 + 零样本泛化', prerequisite: 'VLM 基础' },
          { name: 'OpenVLA', focus: '开源 7B VLA，LoRA 高效微调', prerequisite: 'RT-2 基础' },
        ]
      },
      {
        name: '🚀 高级阶段 - 前沿进展',
        papers: [
          { name: 'π0', focus: 'Flow Matching 动作生成，50Hz 高频控制', prerequisite: 'VLA 基础' },
          { name: 'π0.5', focus: '预训练 VLA 规模化', prerequisite: 'π0 基础' },
          { name: 'π0.6', focus: '从经验学习 (Recap)，三阶段学习', prerequisite: 'π0, RL 基础' },
          { name: 'MEM', focus: '多尺度具身记忆，15分钟长任务', prerequisite: 'VLA 基础' },
          { name: 'Kai0', focus: '模型算术 + 阶段优势，衣物处理', prerequisite: 'VLA, 模仿学习' },
        ]
      },
      {
        name: '🏆 实践项目',
        papers: [
          { name: 'Open X-Embodiment', focus: '97万+ 轨迹，22种机器人形态数据集', prerequisite: '基础' },
          { name: 'ALOHA 2', focus: '低成本双臂遥操作系统 + ACT', prerequisite: '模仿学习' },
          { name: 'DexGraspNet', focus: '灵巧抓取大规模合成数据', prerequisite: '抓取基础' },
        ]
      },
    ]
  },
];

export default function EmbodiedAIPage() {
  return (
    <PaperTracker
      title="具身智能论文追踪"
      subtitle="追踪 VLA、EAI、视觉语言动作模型等领域最新研究 · 来源：arXiv / CVPR / NeurIPS / ICLR"
      emoji="🤖"
      accentFrom="from-blue-500"
      accentTo="to-cyan-500"
      accentText="text-blue-600"
      accentBorder="border-blue-200"
      accentBg="bg-blue-50"
      tagBg="bg-blue-50"
      tagText="text-blue-600"
      tagBorder="border-blue-200"
      papers={embodiedAIPapers}
      categories={CATEGORIES}
      learningPaths={LEARNING_PATHS}
    />
  );
}
