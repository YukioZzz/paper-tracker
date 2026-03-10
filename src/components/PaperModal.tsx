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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl dark:bg-slate-900 dark:border-slate-700">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between gap-4 dark:bg-slate-900 dark:border-slate-700">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-xs bg-blue-100 text-blue-600 border border-blue-200 font-medium">
                {paper.source}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                {paper.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 dark:text-slate-500">
                <Calendar className="w-3 h-3" />{paper.date}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2 dark:text-slate-100">{paper.title}</h2>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1 flex-wrap dark:text-slate-400">
              <Users className="w-3 h-3 flex-shrink-0" />
              {paper.authors.slice(0, 5).join(', ')}
              {paper.authors.length > 5 && <span className="text-slate-300">+{paper.authors.length - 5}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs hover:bg-blue-100 transition-colors font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              arXiv
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
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
                <SectionHeader icon={BookOpen} title="中文摘要" color="text-blue-600" bgColor="bg-blue-50" borderColor="border-blue-100" />
                <p className="text-slate-600 leading-relaxed text-sm bg-blue-50/60 rounded-xl p-4 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900 dark:text-slate-200">
                  {ins.zhAbstract}
                </p>
              </section>

              {/* 详尽技术报告链接 */}
              {paper.relatedLink && (
                <section>
                  <a
                    href={paper.relatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 hover:from-violet-100 hover:to-indigo-100 transition-all dark:from-violet-950/30 dark:to-indigo-950/30 dark:border-violet-800"
                  >
                    <span className="text-sm font-medium text-violet-700 dark:text-violet-300">📖 查看详尽技术报告</span>
                    <ExternalLink className="w-4 h-4 text-violet-500" />
                  </a>
                </section>
              )}

              {/* 核心创新点 */}
              <section>
                <SectionHeader icon={Lightbulb} title="核心创新点" color="text-amber-600" bgColor="bg-amber-50" borderColor="border-amber-100" />
                <ul className="space-y-2">
                  {ins.innovations.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-200">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 border border-amber-200 text-amber-600 text-xs flex items-center justify-center font-bold mt-0.5">
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
                  <SectionHeader icon={FlaskConical} title="核心数学公式" color="text-purple-600" bgColor="bg-purple-50" borderColor="border-purple-100" />
                  <div className="space-y-3">
                    {ins.keyFormulas.map((f, i) => (
                      <div key={i} className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 dark:bg-purple-950/20 dark:border-purple-900">
                        <p className="text-xs text-purple-600 font-semibold mb-2 uppercase tracking-wider">{f.name}</p>
                        <div className="bg-white rounded-lg p-3 border border-purple-100 shadow-sm dark:bg-slate-900 dark:border-purple-900">
                          <MathFormula formula={f.formula} />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 实验结果 */}
              {ins.experimentHighlights && ins.experimentHighlights.length > 0 && (
                <section>
                  <SectionHeader icon={BarChart3} title="实验结果亮点" color="text-emerald-600" bgColor="bg-emerald-50" borderColor="border-emerald-100" />
                  <ul className="space-y-2">
                    {ins.experimentHighlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-200">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 适用场景 */}
              {ins.useCases && ins.useCases.length > 0 && (
                <section>
                  <SectionHeader icon={Cpu} title="适用场景" color="text-cyan-600" bgColor="bg-cyan-50" borderColor="border-cyan-100" />
                  <div className="flex flex-wrap gap-2">
                    {ins.useCases.map((u, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg text-xs bg-cyan-50 border border-cyan-200 text-cyan-700 font-medium">
                        {u}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <section>
              <SectionHeader icon={BookOpen} title="论文摘要（英文）" color="text-blue-600" bgColor="bg-blue-50" borderColor="border-blue-100" />
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 rounded-xl p-4 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                {paper.abstract}
              </p>
              <div className="mt-4 p-4 rounded-xl border border-dashed border-slate-300 text-center dark:border-slate-600">
                <p className="text-sm text-slate-400 dark:text-slate-500">中文洞察内容生成中，敬请期待…</p>
              </div>
            </section>
          )}

          {/* Tags */}
          <section>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 dark:text-slate-500">
              <Tag className="w-3 h-3" /> 关键词
            </p>
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map(t => (
                <span key={t} className="px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Venue & Citations */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-200 pt-4 dark:border-slate-700 dark:text-slate-500">
            <span>发表于：<span className="text-slate-600 font-medium dark:text-slate-300">{paper.venue}</span></span>
            <span>引用数：<span className="text-slate-700 font-bold dark:text-slate-100">{paper.citations.toLocaleString()}</span></span>
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

function SectionHeader({ icon: Icon, title, color, bgColor, borderColor }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${bgColor} border ${borderColor} w-fit mb-3`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
    </div>
  );
}
