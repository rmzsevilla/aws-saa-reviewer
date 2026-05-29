import { useLocation, Link } from 'react-router-dom'
import { Home, ExternalLink } from 'lucide-react'
import { getLessonMeta } from '../data/curriculum'

export default function Header() {
  const location = useLocation()
  const match = location.pathname.match(/^\/lessons\/(.+)$/)
  const lessonId = match?.[1]
  const lessonMeta = lessonId ? getLessonMeta(lessonId) : null
  const isDictionary = location.pathname === '/dictionary'

  return (
    <header className="h-12 flex items-center justify-between px-5 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">
          <Home size={14} />
        </Link>
        {isDictionary && (
          <>
            <span className="text-gray-300 dark:text-slate-700">/</span>
            <span className="text-gray-700 dark:text-slate-200 text-xs font-medium">AWS Services Dictionary</span>
          </>
        )}
        {lessonMeta && (
          <>
            <span className="text-gray-300 dark:text-slate-700">/</span>
            <span className="text-gray-400 dark:text-slate-500 text-xs">Domain {lessonMeta.domain.number}</span>
            <span className="text-gray-300 dark:text-slate-700">/</span>
            <span className="text-gray-700 dark:text-slate-200 text-xs font-medium truncate max-w-[260px]">{lessonMeta.title}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 dark:text-slate-600 hidden sm:block">SAA-C03 · 2026</span>
        <a
          href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 flex items-center gap-1 transition-colors"
        >
          Exam info <ExternalLink size={11} />
        </a>
      </div>
    </header>
  )
}
