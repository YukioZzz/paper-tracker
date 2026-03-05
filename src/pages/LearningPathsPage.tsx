import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, GraduationCap, Rocket, Brain, Cpu, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PathSection {
  title: string;
  icon: React.ElementType;
  color: string;
  levels: {
    name: string;
    papers: {
      name: string;
      focus: string;
      prerequisite: string;
    }[];
  }[];
}

const LEARNING_PATHS: PathSection[] = [
  {
    title: '具身智能 (Embodied AI)',
    icon: Robot,
    color: 'from-blue-500 to-cyan-500',
    levels: [
      {
        name: '🎯 入门阶段 - 基础概念',
        papers: [
          { name: 'Decision Transformer', focus: '将 RL 转化为序列建模问题，理解回报条件化策略', prerequisite: '基础 RL 概念' },
          { name: 'PPO (Proximal Policy Optimization)', focus: '策略梯度核心算法，理解 on-policy RL', prerequisite: '深度学习基础' },
          { name: 'SAC (Soft Actor-Critic)', focus: '离线策略最大化熵的 RL，理解 actor-critic', prerequisite: '基础 RL' },
        ]
      },
      {
        name: '📚 进阶阶段 - 核心方法',
        papers: [
          { name: 'ACT (Action Chunking)', focus: '动作分块预测，减少时序抖动', prerequisite: '基础 RL' },
          { name: 'RoboFlamingo', focus: 'VLM 基础上的 in-context learning 操控', prerequisite: 'Transformer, VLM' },
          { name: 'RT-2', focus: '首个大规模 VLA，互联网规模预训练 + 零样本泛化', prerequisite: 'VLM 基础' },
        ]
      },
      {
        name: '🚀 高级阶段 - 前沿进展',
        papers: [
          { name: 'π0', focus: 'Flow Matching 动作生成，50Hz 高频控制', prerequisite: 'VLA 基础' },
          { name: 'π0.5 / π0.6', focus: '互联网规模预训练，从经验学习 (Recap)', prerequisite: 'π0, RL 基础' },
          { name: 'MEM', focus: '多尺度具身记忆，15分钟长任务', prerequisite: 'VLA 基础' },
          { name: 'Open X-Embodiment', focus: '97万+ 轨迹，22种机器人形态数据集', prerequisite: '基础' },
        ]
      },
    ]
  },
  {
    title: 'AI 训练基础设施 (AI Infra)',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-500',
    levels: [
      {
        name: '🎯 入门阶段 - 训练基础',
        papers: [
          { name: 'Batch Normalization', focus: '批归一化，ICS 解决内部协变量偏移', prerequisite: '深度学习基础' },
          { name: 'Mixed Precision Training', focus: 'FP16 训练，损失缩放', prerequisite: 'CUDA 基础' },
          { name: 'Gradient Checkpointing', focus: '内存换计算，O(N)→O(√N)', prerequisite: '深度学习基础' },
        ]
      },
      {
        name: '📚 进阶阶段 - 分布式训练',
        papers: [
          { name: 'Horovod', focus: 'Ring-AllReduce，分布式训练入门', prerequisite: '单卡训练基础' },
          { name: 'Megatron-LM', focus: '张量并行 (TP)，层内模型并行', prerequisite: '分布式基础' },
          { name: 'FlashAttention', focus: 'IO 感知注意力，分块计算', prerequisite: '注意力机制' },
        ]
      },
      {
        name: '🚀 高级阶段 - 优化进阶',
        papers: [
          { name: 'ZeRO', focus: '优化器状态分片，ZeRO-1/2/3', prerequisite: '分布式训练' },
          { name: 'vLLM / PagedAttention', focus: 'KV Cache 分页管理，2-4x 吞吐', prerequisite: '推理基础' },
          { name: 'GPTQ / AWQ / SmoothQuant', focus: '模型量化，4bit 部署', prerequisite: '量化基础' },
        ]
      },
    ]
  },
  {
    title: '开源大模型 (Open Source Models)',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    levels: [
      {
        name: '🎯 基础模型系列',
        papers: [
          { name: 'DeepSeek-V3', focus: 'MoE 架构，MLA 注意力，训练稳定性', prerequisite: '大模型基础' },
          { name: 'DeepSeek-R1', focus: 'GRPO 推理涌现，纯 RL 训练', prerequisite: 'RL, VLM' },
        ]
      },
      {
        name: '📚 应用模型系列',
        papers: [
          { name: 'GLM-4.5', focus: 'ARC 统一能力，混合推理', prerequisite: 'VLM 基础' },
          { name: 'MiniMax-M1', focus: 'Lightning Attention, CISPO', prerequisite: '长上下文' },
          { name: 'Kimi K2', focus: 'MuonClip 优化器，Agent 能力', prerequisite: '大模型训练' },
        ]
      },
    ]
  },
  {
    title: '世界模型 (World Models)',
    icon: Brain,
    color: 'from-violet-500 to-purple-500',
    levels: [
      {
        name: '🎯 基础概念',
        papers: [
          { name: 'World Model Fundamentals', focus: '世界模型基本概念与原理', prerequisite: '深度学习基础' },
        ]
      },
      {
        name: '📚 前沿进展',
        papers: [
          { name: '最新的世界模型研究', focus: '视频生成、动作预测、Sim2Real', prerequisite: '生成模型基础' },
        ]
      },
    ]
  },
];

export default function LearningPathsPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleLevel = (level: string) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">论文学习路径</h1>
              <p className="text-slate-400">从入门到专家的系统性成长指南</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">4</span>
            <span className="text-slate-500 dark:text-slate-500">学习方向</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">30+</span>
            <span className="text-slate-500 dark:text-slate-500">核心论文</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">3</span>
            <span className="text-slate-500 dark:text-slate-500">成长阶段</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {LEARNING_PATHS.map((section, sectionIdx) => (
          <div key={section.title} className="mb-8">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{section.levels.length} 个学习阶段 · {section.levels.reduce((acc, l) => acc + l.papers.length, 0)} 篇论文</p>
              </div>
              {expandedSections[section.title] ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {/* Levels */}
            {expandedSections[section.title] !== false && (
              <div className="mt-4 space-y-3 ml-4 border-l-2 border-slate-200 dark:border-slate-800 pl-6">
                {section.levels.map((level, levelIdx) => (
                  <div key={level.name} className="relative">
                    {/* Level Header */}
                    <button
                      onClick={() => toggleLevel(section.title + level.name)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{level.name}</span>
                      <span className="ml-auto text-xs text-slate-400">{level.papers.length} 篇</span>
                      {expandedLevels[section.title + level.name] ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {/* Papers */}
                    {expandedLevels[section.title + level.name] !== false && (
                      <div className="mt-2 space-y-2">
                        {level.papers.map((paper) => (
                          <div
                            key={paper.name}
                            className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-slate-900 dark:text-white">{paper.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{paper.focus}</p>
                              </div>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-700 dark:text-amber-400">
                              <span className="font-medium">前置:</span> {paper.prerequisite}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Learning Order Tips */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-4">💡 学习建议</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">1. 先看核心公式</h4>
              <p className="text-amber-700 dark:text-amber-400">每篇论文的 keyFormulas 是精髓，理解公式背后的直觉</p>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">2. 结合开源代码</h4>
              <p className="text-amber-700 dark:text-amber-400">配合官方代码实现理解，GitHub 上有完整开源</p>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">3. 实践复现</h4>
              <p className="text-amber-700 dark:text-amber-400">在小规模数据上验证，在实际项目中应用</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Robot icon fallback if not imported
function Robot({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
      <path d="M8 14h8" />
    </svg>
  );
}
