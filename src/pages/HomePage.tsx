import { Link } from 'react-router-dom';
import { Brain, Globe, Zap, BookOpen, TrendingUp, RefreshCw, Database, Moon, Sun, FlaskConical } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function HomePage() {
  const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-b border-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-transparent to-transparent dark:from-slate-700/30" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <button
            onClick={toggleTheme}
            title={isDark ? '切换到白色模式' : '切换到黑色模式'}
            aria-label={isDark ? '切换到白色模式' : '切换到黑色模式'}
            className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 text-blue-600 text-sm mb-8 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
            <RefreshCw className="w-3 h-3" />
            <span>每日自动更新 · 多平台数据聚合</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            学术论文洞察平台
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4 dark:text-slate-300">
            追踪 arXiv、Papers with Code、Google Scholar 等平台最新研究动态
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">最后更新：{lastUpdated} · 点击论文标题查看中文洞察分析 ✨</p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '追踪论文总数', value: '90+', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '覆盖领域', value: '4', icon: Globe, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: '数据来源', value: '10+', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: '含洞察分析', value: '89+', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Cards */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-3 text-slate-800 dark:text-slate-100">选择研究方向</h2>
        <p className="text-slate-400 text-center mb-12 dark:text-slate-500">点击论文标题可查看中文摘要、创新点分析、核心公式等洞察内容</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Embodied AI */}
          <Link to="/embodied" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:shadow-blue-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-slate-800 dark:to-slate-700" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-blue-200">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors dark:text-slate-100 dark:group-hover:text-blue-400">具身智能</h3>
              <p className="text-slate-400 mb-5 text-sm leading-relaxed dark:text-slate-400">
                VLA、EAI、视觉语言动作模型、量化、泛化、操控等具身智能研究
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['VLA', 'EAI', 'VLA Quant', 'Manipulation'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-600 text-xs font-medium">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500">30+ 篇</span>
                <span className="text-blue-500 group-hover:translate-x-1 transition-transform font-medium">进入 →</span>
              </div>
            </div>
          </Link>

          {/* World Model */}
          <Link to="/worldmodel" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-500 dark:hover:shadow-purple-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-slate-800 dark:to-slate-700" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-purple-200">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-purple-600 transition-colors dark:text-slate-100 dark:group-hover:text-purple-400">世界模型</h3>
              <p className="text-slate-400 mb-5 text-sm leading-relaxed dark:text-slate-400">
                自动驾驶、机器人规划、游戏智能等方向的 World Model 最新突破
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['World Model', 'Auto-driving', 'Robotics', 'Game AI'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-600 text-xs font-medium">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500">30+ 篇</span>
                <span className="text-purple-500 group-hover:translate-x-1 transition-transform font-medium">进入 →</span>
              </div>
            </div>
          </Link>

          {/* Infra */}
          <Link to="/infra" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:shadow-emerald-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-slate-800 dark:to-slate-700" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-emerald-200">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-emerald-600 transition-colors dark:text-slate-100 dark:group-hover:text-emerald-400">AI 训练 Infra</h3>
              <p className="text-slate-400 mb-5 text-sm leading-relaxed dark:text-slate-400">
                分布式训练框架、显存优化、推理加速、模型量化等核心基础设施技术
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['FlashAttn', 'vLLM', 'ZeRO', 'GPTQ', 'MoE'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-600 text-xs font-medium">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500">25+ 篇</span>
                <span className="text-emerald-500 group-hover:translate-x-1 transition-transform font-medium">进入 →</span>
              </div>
            </div>
          </Link>

          {/* Open Models */}
          <Link to="/open-models" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-500 dark:hover:shadow-slate-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-slate-800 dark:to-slate-700" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-slate-300">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-slate-700 transition-colors dark:text-slate-100 dark:group-hover:text-slate-300">开源模型洞察</h3>
              <p className="text-slate-400 mb-5 text-sm leading-relaxed dark:text-slate-400">
                聚焦蚂蚁、GLM、MiniMax、DeepSeek、Kimi 等最新开源模型技术报告
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Ant', 'GLM', 'MiniMax', 'DeepSeek', 'Kimi'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium dark:bg-slate-800 dark:text-slate-200">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-slate-500">6+ 篇</span>
                <span className="text-slate-600 group-hover:translate-x-1 transition-transform font-medium dark:text-slate-300">进入 →</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-slate-400 text-sm mb-4 dark:text-slate-500">数据来源</p>
          <div className="flex flex-wrap justify-center gap-3 text-slate-500 dark:text-slate-300">
            {['arXiv', 'Papers with Code', 'Google Scholar', 'Semantic Scholar', 'CVPR', 'NeurIPS', 'ICLR', 'OSDI', 'MLSys', 'SC'].map(src => (
              <span key={src} className="text-xs border border-slate-200 bg-slate-50 rounded-full px-3 py-1 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">{src}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
