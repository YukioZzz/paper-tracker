import { Link } from 'react-router-dom';
import { Brain, Globe, Zap, BookOpen, TrendingUp, RefreshCw, Database } from 'lucide-react';

export default function HomePage() {
  const lastUpdated = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm mb-8">
            <RefreshCw className="w-3 h-3" />
            <span>每日自动更新 · 多平台数据聚合</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            学术论文洞察平台
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
            追踪 arXiv、Papers with Code、Google Scholar 等平台最新研究动态
          </p>
          <p className="text-sm text-gray-500">最后更新：{lastUpdated} · 点击论文标题查看中文洞察分析 ✨</p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '追踪论文总数', value: '85+', icon: BookOpen, color: 'text-blue-400' },
            { label: '覆盖领域', value: '3', icon: Globe, color: 'text-purple-400' },
            { label: '数据来源', value: '10+', icon: TrendingUp, color: 'text-emerald-400' },
            { label: '含洞察分析', value: '30+', icon: Zap, color: 'text-yellow-400' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Cards */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-200">选择研究方向</h2>
        <p className="text-gray-500 text-center mb-12">点击论文标题可查看中文摘要、创新点分析、核心公式等洞察内容</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Embodied AI */}
          <Link to="/embodied" className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">具身智能</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                VLA、EAI、视觉语言动作模型、量化、泛化、操控等具身智能研究
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['VLA', 'EAI', 'VLA Quant', 'Manipulation'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">30+ 篇</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">进入 →</span>
              </div>
            </div>
          </Link>

          {/* World Model */}
          <Link to="/worldmodel" className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">世界模型</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                自动驾驶、机器人规划、游戏智能等方向的 World Model 最新突破
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['World Model', 'Auto-driving', 'Robotics', 'Game AI'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">30+ 篇</span>
                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">进入 →</span>
              </div>
            </div>
          </Link>

          {/* Infra */}
          <Link to="/infra" className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors">AI 训练 Infra</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                分布式训练框架、显存优化、推理加速、模型量化等核心基础设施技术
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['FlashAttn', 'vLLM', 'ZeRO', 'GPTQ', 'MoE'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">25+ 篇</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">进入 →</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-gray-500 text-sm mb-4">数据来源</p>
          <div className="flex flex-wrap justify-center gap-3 text-gray-400">
            {['arXiv', 'Papers with Code', 'Google Scholar', 'Semantic Scholar', 'CVPR', 'NeurIPS', 'ICLR', 'OSDI', 'MLSys', 'SC'].map(src => (
              <span key={src} className="text-xs border border-gray-700 rounded-full px-3 py-1">{src}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
