import PaperTracker from '../components/PaperTracker';
import { embodiedAIPapers } from '../data/embodiedAIPapers';

const CATEGORIES = ['VLA', 'EAI', 'VLA Quantization', 'Manipulation', 'Navigation', 'Benchmark'];

export default function EmbodiedAIPage() {
  return (
    <PaperTracker
      title="具身智能论文追踪"
      subtitle="追踪 VLA、EAI、视觉语言动作模型等领域最新研究 · 来源：arXiv / CVPR / NeurIPS / ICLR"
      emoji="🤖"
      accentFrom="from-blue-500"
      accentTo="to-cyan-500"
      accentText="text-blue-400"
      accentBorder="border-blue-500/30"
      accentBg="bg-blue-500/10"
      tagBg="bg-blue-500/10"
      tagText="text-blue-400"
      tagBorder="border-blue-500/20"
      papers={embodiedAIPapers}
      categories={CATEGORIES}
    />
  );
}
