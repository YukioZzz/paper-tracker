import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ExternalLink, BookOpen, Users, Calendar, Tag, TrendingUp, Filter, ChevronDown, Sparkles } from 'lucide-react';
import { Paper } from '../data/embodiedAIPapers';
import PaperModal from './PaperModal';

const SOURCE_COLORS: Record<string, string> = {
  arXiv: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  CVPR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ICCV: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  NeurIPS: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  ICML: 'bg-green-500/10 text-green-400 border-green-500/20',
  ICLR: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  ECCV: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  SC: 'bg-red-500/10 text-red-400 border-red-500/20',
  OSDI: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  MLSys: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  SOSP: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  JMLR: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
};

interface PaperTrackerProps {
  title: string;
  subtitle: string;
  emoji: string;
  accentFrom: string;
  accentTo: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  papers: Paper[];
  categories: string[];
}

export default function PaperTracker({
  title, subtitle, emoji, accentFrom, accentTo, accentText, accentBorder, accentBg,
  tagBg, tagText, tagBorder, papers, categories,
}: PaperTrackerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedSource, setSelectedSource] = useState('全部');
  const [sortBy, setSortBy] = useState<'date' | 'citations'>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [modalPaper, setModalPaper] = useState<Paper | null>(null);

  const sources = useMemo(() => ['全部', ...Array.from(new Set(papers.map(p => p.source)))], [papers]);
  const allCategories = ['全部', ...categories];

  const filtered = useMemo(() => {
    return papers
      .filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.authors.some(a => a.toLowerCase().includes(q)) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = selectedCategory === '全部' || p.category === selectedCategory;
        const matchSrc = selectedSource === '全部' || p.source === selectedSource;
        return matchSearch && matchCat && matchSrc;
      })
      .sort((a, b) => sortBy === 'citations' ? b.citations - a.citations : b.date.localeCompare(a.date));
  }, [papers, search, selectedCategory, selectedSource, sortBy]);

  const stats = useMemo(() => {
    const thisYear = new Date().getFullYear();
    const recentCount = papers.filter(p => p.year >= thisYear - 1).length;
    const topVenue = (() => {
      const counts: Record<string, number> = {};
      papers.forEach(p => { counts[p.source] = (counts[p.source] || 0) + 1; });
      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'arXiv';
    })();
    const totalCites = papers.reduce((s, p) => s + p.citations, 0);
    return { total: papers.length, recent: recentCount, topVenue, totalCites };
  }, [papers]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Modal */}
      {modalPaper && <PaperModal paper={modalPaper} onClose={() => setModalPaper(null)} />}

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} flex items-center justify-center text-2xl flex-shrink-0`}>
              {emoji}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
              <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '论文总数', value: stats.total, icon: BookOpen },
            { label: '近两年新增', value: stats.recent, icon: TrendingUp },
            { label: '主要来源', value: stats.topVenue, icon: ExternalLink },
            { label: '总引用数', value: stats.totalCites.toLocaleString(), icon: Users },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${accentBg} border ${accentBorder} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${accentText}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索论文标题、作者、关键词..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 hover:border-gray-500 transition-colors"
          >
            <Filter className="w-4 h-4" />
            筛选
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'citations')}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
          >
            <option value="date">按日期排序</option>
            <option value="citations">按引用数排序</option>
          </select>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">研究方向</p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedCategory === cat ? `${accentBg} ${accentText} ${accentBorder}` : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">数据来源</p>
              <div className="flex flex-wrap gap-2">
                {sources.map(src => (
                  <button key={src} onClick={() => setSelectedSource(src)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedSource === src ? `${accentBg} ${accentText} ${accentBorder}` : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                    {src}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm border transition-colors ${selectedCategory === cat ? `${accentBg} ${accentText} ${accentBorder} font-medium` : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-4">
          找到 <span className="text-white font-medium">{filtered.length}</span> 篇论文
          {search && <span className="ml-1">（搜索："{search}"）</span>}
          <span className="ml-2 text-xs text-gray-600">· 点击论文标题查看洞察分析</span>
        </p>

        {/* Paper List */}
        <div className="space-y-4">
          {filtered.map(paper => (
            <PaperCard
              key={paper.id}
              paper={paper}
              tagBg={tagBg} tagText={tagText} tagBorder={tagBorder}
              accentText={accentText} accentBg={accentBg} accentBorder={accentBorder}
              onOpenModal={() => setModalPaper(paper)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>没有找到匹配的论文</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('全部'); setSelectedSource('全部'); }}
                className="mt-3 text-sm text-blue-400 hover:underline">清除筛选</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaperCard({ paper, tagBg, tagText, tagBorder, accentText, accentBg, accentBorder, onOpenModal }: {
  paper: Paper; tagBg: string; tagText: string; tagBorder: string; accentText: string;
  accentBg: string; accentBorder: string;
  onOpenModal: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const srcStyle = SOURCE_COLORS[paper.source] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  const shortAbstract = paper.abstract.length > 200 ? paper.abstract.slice(0, 200) + '...' : paper.abstract;
  const hasInsights = Boolean(paper.insights);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${srcStyle}`}>{paper.source}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${tagBg} ${tagText} ${tagBorder}`}>{paper.category}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{paper.date}</span>
            {hasInsights && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sparkles className="w-3 h-3" />洞察
              </span>
            )}
          </div>
          <button
            onClick={onOpenModal}
            className="text-left text-base font-semibold text-white hover:text-blue-300 transition-colors leading-snug block"
          >
            {paper.title}
          </button>
        </div>
        <a href={paper.url} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors" title="在 arXiv 查看">
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </a>
      </div>

      <div className="flex items-center gap-1 mb-3 text-sm text-gray-400 flex-wrap">
        <Users className="w-3 h-3" />
        {paper.authors.slice(0, 4).join(', ')}
        {paper.authors.length > 4 && <span className="text-gray-500"> +{paper.authors.length - 4}</span>}
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-3">
        {expanded ? paper.abstract : shortAbstract}
        {paper.abstract.length > 200 && (
          <button onClick={() => setExpanded(!expanded)} className={`ml-1 ${accentText} text-xs hover:underline`}>
            {expanded ? '收起' : '展开'}
          </button>
        )}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {paper.tags.slice(0, 5).map(tag => (
            <span key={tag} className={`px-2 py-0.5 rounded-md text-xs border ${tagBg} ${tagText} ${tagBorder} opacity-80`}>
              <Tag className="w-2.5 h-2.5 inline mr-0.5" />{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <TrendingUp className="w-3 h-3" />{paper.citations} 引用
          </div>
          <button
            onClick={onOpenModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border ${accentBg} ${accentText} ${accentBorder} hover:opacity-80 transition-opacity`}
          >
            <Sparkles className="w-3 h-3" />洞察分析
          </button>
        </div>
      </div>
    </div>
  );
}
