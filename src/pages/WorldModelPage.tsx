import PaperTracker from '../components/PaperTracker';
import { worldModelPapers } from '../data/worldModelPapers';

const CATEGORIES = ['Auto-driving', 'Robotics', 'Gaming', 'General', 'Video Generation'];

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
    />
  );
}
