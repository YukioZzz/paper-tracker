import PaperTracker from '../components/PaperTracker';
import { embodiedAIPapers } from '../data/embodiedAIPapers';

const CATEGORIES = ['VLA', 'EAI', 'VLA Quantization', 'Manipulation', 'Navigation', 'Benchmark', 'Robotics RL'];

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
    />
  );
}
