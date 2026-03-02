import PaperTracker from '../components/PaperTracker';
import { infraPapers } from '../data/infraPapers';

const CATEGORIES = ['Memory Optimization', 'Distributed Training', 'Inference', 'Quantization', 'MoE', 'Communication', 'Mixed Precision'];

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
    />
  );
}
