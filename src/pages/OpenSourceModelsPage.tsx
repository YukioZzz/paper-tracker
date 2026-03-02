import PaperTracker from '../components/PaperTracker';
import { openSourceModelPapers } from '../data/openSourceModelPapers';

const CATEGORIES = ['Ant', 'GLM', 'MiniMax', 'DeepSeek', 'Kimi'];

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
    />
  );
}
