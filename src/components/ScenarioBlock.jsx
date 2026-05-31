import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * ScenarioBlock: a relatable story that opens a lesson.
 *
 * Props:
 *   title   : short scene-setter (e.g. "The Crash That Started Everything")
 *   children: the narrative paragraph(s)
 *   question: the pivotal question the lesson will answer (optional)
 *   color   : accent color key: 'sky' | 'red' | 'blue' | 'emerald' | 'amber' | 'violet' | 'teal'
 */
const COLORS = {
  sky:     { bg: 'bg-sky-50 dark:bg-sky-950/30',     border: 'border-sky-200 dark:border-sky-800/50',     icon: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',     label: 'text-sky-600 dark:text-sky-400',     q: 'bg-sky-500/10 border-sky-300/50 dark:border-sky-700/50 text-sky-800 dark:text-sky-200' },
  red:     { bg: 'bg-red-50 dark:bg-red-950/30',     border: 'border-red-200 dark:border-red-800/50',     icon: 'bg-red-500/15 text-red-600 dark:text-red-400',     label: 'text-red-600 dark:text-red-400',     q: 'bg-red-500/10 border-red-300/50 dark:border-red-700/50 text-red-800 dark:text-red-200' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-950/30',   border: 'border-blue-200 dark:border-blue-800/50',   icon: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',   label: 'text-blue-600 dark:text-blue-400',   q: 'bg-blue-500/10 border-blue-300/50 dark:border-blue-700/50 text-blue-800 dark:text-blue-200' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800/50', icon: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', label: 'text-emerald-600 dark:text-emerald-400', q: 'bg-emerald-500/10 border-emerald-300/50 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-200' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800/50', icon: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', label: 'text-amber-600 dark:text-amber-400', q: 'bg-amber-500/10 border-amber-300/50 dark:border-amber-700/50 text-amber-800 dark:text-amber-200' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800/50', icon: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', label: 'text-violet-600 dark:text-violet-400', q: 'bg-violet-500/10 border-violet-300/50 dark:border-violet-700/50 text-violet-800 dark:text-violet-200' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-950/30',   border: 'border-teal-200 dark:border-teal-800/50',   icon: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',   label: 'text-teal-600 dark:text-teal-400',   q: 'bg-teal-500/10 border-teal-300/50 dark:border-teal-700/50 text-teal-800 dark:text-teal-200' },
}

export default function ScenarioBlock({ title, children, question, color = 'amber' }) {
  const c = COLORS[color] || COLORS.amber

  return (
    <div className={cn('rounded-2xl border p-5 mb-6', c.bg, c.border)}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0', c.icon)}>
          <BookOpen size={15} />
        </div>
        <div>
          <p className={cn('text-[10px] font-bold uppercase tracking-widest', c.label)}>Scenario</p>
          {title && <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 leading-tight">{title}</p>}
        </div>
      </div>

      {/* Story */}
      <div className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed space-y-2">
        {children}
      </div>

      {/* Pivotal question */}
      {question && (
        <div className={cn('mt-4 px-4 py-3 rounded-xl border text-sm font-medium italic', c.q)}>
          {question}
        </div>
      )}
    </div>
  )
}
