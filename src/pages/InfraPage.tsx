import PaperTracker from '../components/PaperTracker';
import { infraPapers } from '../data/infraPapers';

const CATEGORIES = ['Memory Optimization', 'Distributed Training', 'Inference', 'Quantization', 'MoE', 'Communication', 'Mixed Precision', 'RL Training'];

const LEARNING_PATHS = [
  {
    title: 'AI Infra 学习路径',
    levels: [
      {
        name: '🎯 入门阶段 - 训练基础',
        papers: [
          { name: 'Batch Normalization', focus: '批归一化，ICS 解决内部协变量偏移', prerequisite: '深度学习基础' },
          { name: 'Mixed Precision', focus: 'FP16 训练，损失缩放', prerequisite: 'CUDA 基础' },
          { name: 'Gradient Checkpointing', focus: '内存换计算，O(N)→O(√N)', prerequisite: '深度学习基础' },
        ]
      },
      {
        name: '📚 进阶阶段 - 分布式训练',
        papers: [
          { name: 'Horovod', focus: 'Ring-AllReduce，分布式训练入门', prerequisite: '单卡训练基础' },
          { name: 'Megatron-LM', focus: '张量并行 (TP)，层内模型并行', prerequisite: '分布式基础' },
          { name: 'FlashAttention', focus: 'IO 感知注意力，分块计算', prerequisite: '注意力机制' },
          { name: 'FlashAttention-2', focus: '2x 加速，GQA/MQA 支持', prerequisite: 'FlashAttention' },
        ]
      },
      {
        name: '🚀 高级阶段 - 优化进阶',
        papers: [
          { name: 'ZeRO', focus: '优化器状态分片，ZeRO-1/2/3', prerequisite: '分布式训练' },
          { name: 'FSDP', focus: 'PyTorch 原生 ZeRO-3', prerequisite: 'ZeRO' },
          { name: 'GPipe', focus: '流水线并行 (PP)', prerequisite: '分布式基础' },
          { name: 'Colossal-AI', focus: '统一并行 API，异构训练', prerequisite: 'TP, PP 基础' },
        ]
      },
      {
        name: '🏆 专业阶段 - 推理优化',
        papers: [
          { name: 'Orca', focus: '迭代级调度，连续批处理', prerequisite: 'LLM 推理基础' },
          { name: 'vLLM', focus: 'KV Cache 分页管理，2-4x 吞吐', prerequisite: '推理基础' },
          { name: 'PagedAttention', focus: '分页注意力机制', prerequisite: '推理基础' },
          { name: 'Speculative Decoding', focus: '投机解码，2-3x 加速', prerequisite: '推理基础' },
        ]
      },
      {
        name: '💎 量化专题',
        papers: [
          { name: 'LLM.int8()', focus: '混合精度量化，异常值处理', prerequisite: '量化基础' },
          { name: 'GPTQ', focus: 'Hessian-based 4bit 量化', prerequisite: '量化基础' },
          { name: 'AWQ', focus: '激活感知量化，1% 显著权重保护', prerequisite: '量化基础' },
          { name: 'SmoothQuant', focus: 'W8A8，激活难度迁移到权重', prerequisite: '量化基础' },
        ]
      },
    ]
  },
];

export default function InfraPage() {
  return (
    <PaperTracker
      title="AI 训练基础设施"
      subtitle="追踪分布式训练、显存优化、推理框架、量化压缩等 AI Infra 核心技术 · 来源：OSDI / MLSys / SC / NeurIPS"
      emoji="⚡"
      accentFrom="from-emerald-500"
      accentTo="to-teal-500"
      accentText="text-emerald-600"
      accentBorder="border-emerald-200"
      accentBg="bg-emerald-50"
      tagBg="bg-emerald-50"
      tagText="text-emerald-600"
      tagBorder="border-emerald-200"
      papers={infraPapers}
      categories={CATEGORIES}
      learningPaths={LEARNING_PATHS}
    />
  );
}
