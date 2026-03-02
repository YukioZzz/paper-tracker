import { useEffect, useRef } from 'react';
import { X, BookOpen, Lightbulb, FlaskConical, BarChart3, Cpu, ExternalLink, Users, Calendar, Tag } from 'lucide-react';
import { Paper } from '../data/embodiedAIPapers';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface PaperModalProps {
  paper: Paper;
  onClose: () => void;
}

export default function PaperModal({ paper, onClose }: PaperModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const ins = paper.insights;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {paper.source}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs bg-gray-700 text-gray-300">
                {paper.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />{paper.date}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white leading-snug line-clamp-2">{paper.title}</h2>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1 flex-wrap">
              <Users className="w-3 h-3 flex-shrink-0" />
              {paper.authors.slice(0, 5).join(', ')}
              {paper.authors.length > 5 && <span className="text-gray-500">+{paper.authors.length - 5}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              arXiv
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {ins ? (
            <>
              {/* 中文摘要 */}
              <section>
                <SectionHeader icon={BookOpen} title="中文摘要" color="text-blue-400" />
                <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                  {ins.zhAbstract}
                </p>
              </section>

              {/* 核心创新点 */}
              <section>
                <SectionHeader icon={Lightbulb} title="核心创新点" color="text-yellow-400" />
                <ul className="space-y-2">
                  {ins.innovations.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs flex items-center justify-center font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 核心数学公式 */}
              {ins.keyFormulas && ins.keyFormulas.length > 0 && (
                <section>
                  <SectionHeader icon={FlaskConical} title="核心数学公式" color="text-purple-400" />
                  <div className="space-y-3">
                    {ins.keyFormulas.map((f, i) => (
                      <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4">
                        <p className="text-xs text-purple-400 font-semibold mb-2 uppercase tracking-wider">{f.name}</p>
                        <div className="bg-gray-900/80 rounded-lg p-3 border border-gray-700/50">
                          <MathFormula formula={f.formula} />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 实验结果 */}
              {ins.experimentHighlights && ins.experimentHighlights.length > 0 && (
                <section>
                  <SectionHeader icon={BarChart3} title="实验结果亮点" color="text-emerald-400" />
                  <ul className="space-y-2">
                    {ins.experimentHighlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 适用场景 */}
              {ins.useCases && ins.useCases.length > 0 && (
                <section>
                  <SectionHeader icon={Cpu} title="适用场景" color="text-cyan-400" />
                  <div className="flex flex-wrap gap-2">
                    {ins.useCases.map((u, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        {u}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            /* Fallback for papers without insights */
            <section>
              <SectionHeader icon={BookOpen} title="论文摘要（英文）" color="text-blue-400" />
              <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                {paper.abstract}
              </p>
              <div className="mt-4 p-4 rounded-xl border border-dashed border-gray-600 text-center">
                <p className="text-sm text-gray-500">中文洞察内容生成中，敬请期待…</p>
              </div>
            </section>
          )}

          {/* Tags */}
          <section>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3 h-3" /> 关键词
            </p>
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map(t => (
                <span key={t} className="px-2 py-1 rounded-md text-xs bg-gray-800 text-gray-400 border border-gray-700">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Venue & Citations */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
            <span>发表于：<span className="text-gray-300">{paper.venue}</span></span>
            <span>引用数：<span className="text-gray-300 font-medium">{paper.citations.toLocaleString()}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MathFormula({ formula }: { formula: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(formula, ref.current, {
        displayMode: true,
        throwOnError: false,
        trust: false,
        strict: false,
      });
    } catch {
      if (ref.current) ref.current.textContent = formula;
    }
  }, [formula]);
  return <div ref={ref} className="overflow-x-auto py-1" />;
}

function SectionHeader({ icon: Icon, title, color }: { icon: React.ComponentType<{ className?: string }>, title: string, color: string }) {
  return (
    <h3 className={`flex items-center gap-2 text-sm font-semibold mb-3 ${color}`}>
      <Icon className="w-4 h-4" />
      {title}
    </h3>
  );
}
