import PaperTracker from '../components/PaperTracker';
import { openSourceModelPapers } from '../data/openSourceModelPapers';

const CATEGORIES = ['Ant', 'GLM', 'MiniMax', 'DeepSeek', 'Kimi'];

const LEARNING_PATHS = [
  {
    title: '开源模型学习路径',
    levels: [
      {
        name: '🎯 基础模型系列',
        papers: [
          { name: 'DeepSeek-V3', focus: 'MoE 架构，MLA 注意力，训练稳定性', prerequisite: '大模型基础' },
          { name: 'DeepSeek-R1', focus: 'GRPO 推理涌现，纯 RL 训练', prerequisite: 'RL, VLM' },
          { name: 'DeepSeek-V2', focus: 'MoE 结构创新，负载均衡', prerequisite: 'Transformer 基础' },
        ]
      },
      {
        name: '📚 应用模型系列',
        papers: [
          { name: 'GLM-4.5', focus: 'ARC 统一能力，混合推理', prerequisite: 'VLM 基础' },
          { name: 'GLM-4V', focus: '视觉语言模型，多模态理解', prerequisite: 'LLM 基础' },
          { name: 'MiniMax-M1', focus: 'Lightning Attention, CISPO', prerequisite: '长上下文' },
          { name: 'MiniMax-M2', focus: 'MoE 架构创新', prerequisite: 'MoE 基础' },
        ]
      },
      {
        name: '🚀 前沿探索',
        papers: [
          { name: 'Kimi K2', focus: 'MuonClip 优化器，Agent 能力', prerequisite: '大模型训练' },
          { name: 'Kimi K1.5', focus: '长上下文强化学习', prerequisite: 'RL 基础' },
          { name: 'Ling', focus: 'MoE 效率杠杆，缩放律', prerequisite: 'MoE 架构' },
        ]
      },
    ]
  },
];

export default function OpenSourceModelsPage() {
  return (
    <PaperTracker
      title="最新开源模型洞察"
      subtitle="聚焦蚂蚁 Ling、GLM、MiniMax、DeepSeek、Kimi 等团队最新开源模型技术报告"
      emoji="🧠"
      accentFrom="from-slate-700"
      accentTo="to-blue-700"
      accentText="text-slate-700"
      accentBorder="border-slate-300"
      accentBg="bg-slate-100"
      tagBg="bg-slate-100"
      tagText="text-slate-700"
      tagBorder="border-slate-300"
      papers={openSourceModelPapers}
      categories={CATEGORIES}
      learningPaths={LEARNING_PATHS}
    />
  );
}
