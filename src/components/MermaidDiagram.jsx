import { useEffect, useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import mermaid from 'mermaid'
import clsx from 'clsx'
import DiagramModal from './DiagramModal'
import { useTheme } from '../contexts/ThemeContext'

let currentThemeKey = null
let diagCounter = 0

function initMermaid(isDark) {
  const key = isDark ? 'dark' : 'light'
  if (currentThemeKey === key) return
  currentThemeKey = key

  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'base',
    themeVariables: isDark
      ? {
          primaryColor: '#1e293b',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#475569',
          lineColor: '#94a3b8',
          secondaryColor: '#0f172a',
          tertiaryColor: '#1e293b',
          background: '#0f172a',
          mainBkg: '#1e293b',
          nodeBorder: '#475569',
          titleColor: '#f1f5f9',
          edgeLabelBackground: '#1e293b',
          clusterBkg: '#1e293b',
          fontSize: '13px',
        }
      : {
          primaryColor: '#f1f5f9',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#cbd5e1',
          lineColor: '#64748b',
          secondaryColor: '#f8fafc',
          tertiaryColor: '#f1f5f9',
          background: '#ffffff',
          mainBkg: '#f1f5f9',
          nodeBorder: '#cbd5e1',
          titleColor: '#1e293b',
          edgeLabelBackground: '#ffffff',
          clusterBkg: '#f8fafc',
          fontSize: '13px',
        },
    flowchart: { curve: 'basis', htmlLabels: true, padding: 20 },
    sequence: { actorFontFamily: 'Inter', messageFontFamily: 'Inter', noteFontFamily: 'Inter' },
    securityLevel: 'loose',
  })
}

export default function MermaidDiagram({ chart, title, caption, nodeDescriptions }) {
  const { isDark } = useTheme()
  const containerRef = useRef(null)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [id] = useState(() => `diag-${++diagCounter}`)

  useEffect(() => {
    initMermaid(isDark)
    let cancelled = false

    async function render() {
      try {
        const old = document.getElementById(id)
        if (old) old.remove()
        const { svg } = await mermaid.render(id, chart.trim())
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (!cancelled) setError(String(err))
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id, isDark])

  return (
    <>
      <figure className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-gray-200 dark:border-slate-700 bg-gray-100/80 dark:bg-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">Diagram</span>
            {title && <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{title}</span>}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
            title="Expand diagram"
          >
            <Maximize2 size={12} /> Expand
          </button>
        </div>

        {/* Diagram */}
        <div className="p-4 sm:p-6 flex justify-center overflow-x-auto mermaid-container min-h-[120px]">
          {error
            ? <p className="text-red-500 dark:text-red-400 text-sm font-mono self-center">Diagram error: {error}</p>
            : <div ref={containerRef} />
          }
        </div>

        {/* Caption */}
        {caption && (
          <figcaption className="px-4 py-2 border-t border-gray-200 dark:border-slate-700/50 text-xs text-gray-400 dark:text-slate-500 text-center italic">
            {caption}
          </figcaption>
        )}

        {/* Node descriptions (optional legend) */}
        {nodeDescriptions?.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40">
            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Node Guide</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {nodeDescriptions.map((n, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="font-mono text-aws-orange bg-aws-orange/10 px-1.5 py-0.5 rounded text-[10px] flex-shrink-0">{n.node}</span>
                  <span className="text-gray-600 dark:text-slate-400">{n.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </figure>

      {/* Fullscreen modal */}
      <DiagramModal
        chart={chart}
        title={title}
        caption={caption}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
