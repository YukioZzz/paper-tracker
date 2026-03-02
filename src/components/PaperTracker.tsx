import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ExternalLink, BookOpen, Users, Calendar, Tag, TrendingUp, Filter, ChevronDown, Sparkles } from 'lucide-react';
import { Paper } from '../data/embodiedAIPapers';
import PaperModal from './PaperModal';

const SOURCE_COLORS: Record<string, string> = {
  arXiv: 'bg-orange-100 text-orange-600 border-orange-200',
  CVPR: 'bg-blue-100 text-blue-600 border-blue-200',
  ICCV: 'bg-cyan-100 text-cyan-600 border-cyan-200',
  NeurIPS: 'bg-purple-100 text-purple-600 border-purple-200',
  ICML: 'bg-green-100 text-green-600 border-green-200',
  ICLR: 'bg-pink-100 text-pink-600 border-pink-200',
  ECCV: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  SC: 'bg-red-100 text-red-600 border-red-200',
  OSDI: 'bg-teal-100 text-teal-600 border-teal-200',
  MLSys: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  SOSP: 'bg-violet-100 text-violet-600 border-violet-200',
  JMLR: 'bg-lime-100 text-lime-700 border-lime-200',
  RSS: 'bg-sky-100 text-sky-600 border-sky-200',
  ICRA: 'bg-rose-100 text-rose-600 border-rose-200',
  CoRL: 'bg-amber-100 text-amber-600 border-amber-200',
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
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* Modal */}
      {modalPaper && <PaperModal paper={modalPaper} onClose={() => setModalPaper(null)} />}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
              {emoji}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">{title}</h1>
              <p className="text-slate-400 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-200 bg-white">
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
                <div className="text-xl font-bold text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索论文标题、作者、关键词..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-slate-400 hover:shadow-sm transition-all shadow-sm"
          >
            <Filter className="w-4 h-4" />
            筛选
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'citations')}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
          >
            <option value="date">按日期排序</option>
            <option value="citations">按引用数排序</option>
          </select>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 space-y-4 shadow-sm">
            <div>
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">研究方向</p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedCategory === cat ? `${accentBg} ${accentText} ${accentBorder} font-medium` : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">数据来源</p>
              <div className="flex flex-wrap gap-2">
                {sources.map(src => (
                  <button key={src} onClick={() => setSelectedSource(src)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedSource === src ? `${accentBg} ${accentText} ${accentBorder} font-medium` : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
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
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm border transition-colors ${selectedCategory === cat ? `${accentBg} ${accentText} ${accentBorder} font-medium shadow-sm` : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-4">
          找到 <span className="text-slate-700 font-medium">{filtered.length}</span> 篇论文
          {search && <span className="ml-1">（搜索："{search}"）</span>}
          <span className="ml-2 text-xs text-slate-300">· 点击论文标题查看洞察分析</span>
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
            <div className="text-center py-20 text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>没有找到匹配的论文</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('全部'); setSelectedSource('全部'); }}
                className="mt-3 text-sm text-blue-500 hover:underline">清除筛选</button>
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
  const srcStyle = SOURCE_COLORS[paper.source] || 'bg-slate-100 text-slate-500 border-slate-200';
  const shortAbstract = paper.abstract.length > 200 ? paper.abstract.slice(0, 200) + '...' : paper.abstract;
  const hasInsights = Boolean(paper.insights);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border font-medium ${srcStyle}`}>{paper.source}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${tagBg} ${tagText} ${tagBorder}`}>{paper.category}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{paper.date}</span>
            {hasInsights && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-amber-50 border border-amber-200 text-amber-600 font-medium">
                <Sparkles className="w-3 h-3" />洞察
              </span>
            )}
          </div>
          <button
            onClick={onOpenModal}
            className="text-left text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors leading-snug block"
          >
            {paper.title}
          </button>
        </div>
        <a href={paper.url} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors" title="在 arXiv 查看">
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </a>
      </div>

      <div className="flex items-center gap-1 mb-3 text-sm text-slate-400 flex-wrap">
        <Users className="w-3 h-3" />
        {paper.authors.slice(0, 4).join(', ')}
        {paper.authors.length > 4 && <span className="text-slate-300"> +{paper.authors.length - 4}</span>}
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-3">
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
            <span key={tag} className={`px-2 py-0.5 rounded-md text-xs border ${tagBg} ${tagText} ${tagBorder}`}>
              <Tag className="w-2.5 h-2.5 inline mr-0.5" />{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <TrendingUp className="w-3 h-3" />{paper.citations} 引用
          </div>
          {hasInsights && (
            <button
              onClick={onOpenModal}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border ${accentBg} ${accentText} ${accentBorder} hover:opacity-80 transition-opacity font-medium`}
            >
              <Sparkles className="w-3 h-3" />洞察分析
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
