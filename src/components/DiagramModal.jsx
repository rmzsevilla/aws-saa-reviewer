import { useEffect, useRef, useState } from 'react'
import { X, ZoomIn, Download } from 'lucide-react'
import mermaid from 'mermaid'

let modalCounter = 0

export default function DiagramModal({ chart, title, caption, isOpen, onClose }) {
  const ref = useRef(null)
  const [id] = useState(() => `modal-diagram-${++modalCounter}`)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !ref.current) return
    let cancelled = false
    async function render() {
      try {
        const old = document.getElementById(id)
        if (old) old.remove()
        const { svg } = await mermaid.render(id, chart.trim())
        if (!cancelled && ref.current) ref.current.innerHTML = svg
      } catch { /* noop */ }
    }
    render()
    return () => { cancelled = true }
  }, [isOpen, chart, id])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ZoomIn size={15} className="text-gray-400 dark:text-slate-500" />
            <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Diagram */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <div ref={ref} className="mermaid-container" />
        </div>

        {/* Footer */}
        {caption && (
          <div className="px-5 py-2.5 border-t border-gray-200 dark:border-slate-700 text-xs text-gray-400 dark:text-slate-500 italic text-center flex-shrink-0">
            {caption}
          </div>
        )}
      </div>
    </div>
  )
}
