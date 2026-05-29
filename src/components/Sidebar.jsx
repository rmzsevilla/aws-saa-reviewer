import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, CheckCircle2, Lock, Clock, Moon, Sun, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import { DOMAINS, TOTAL_LESSONS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../contexts/ThemeContext'

export default function Sidebar() {
  const [expanded, setExpanded] = useState({ 'domain-1': true })
  const { isCompleted, completedCount } = useProgress()
  const { isDark, toggle } = useTheme()

  const toggle_ = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
          alt="AWS"
          className="h-6 w-auto flex-shrink-0"
          style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 leading-tight">SAA-C03</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 leading-tight">Study Guide · 2026</p>
        </div>
      </Link>

      {/* Overall progress */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500 dark:text-slate-400">Overall Progress</span>
          <span className="text-gray-700 dark:text-slate-300 font-medium">{completedCount}/{TOTAL_LESSONS}</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-aws-orange rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / TOTAL_LESSONS) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {/* Dictionary link */}
        <NavLink
          to="/dictionary"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium mb-2 transition-colors',
              isActive
                ? 'bg-aws-orange/10 text-aws-orange border border-aws-orange/20'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
            )
          }
        >
          <BookOpen size={13} className="flex-shrink-0" />
          AWS Services Dictionary
        </NavLink>

        <div className="border-t border-gray-200 dark:border-slate-800 mb-2" />

        {DOMAINS.map((domain) => {
          const isOpen = expanded[domain.id]
          const domainCompleted = domain.lessons.filter((l) => isCompleted(l.id)).length

          return (
            <div key={domain.id} className="mb-1">
              <button
                onClick={() => toggle_(domain.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className={clsx('w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold', domain.bgClass, domain.colorClass)}>
                  {domain.number}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-semibold text-gray-700 dark:text-slate-300 truncate">{domain.title}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">{domain.percentage}% · {domainCompleted}/{domain.lessons.length}</p>
                </div>
                {isOpen
                  ? <ChevronDown size={14} className="text-gray-400 dark:text-slate-500 flex-shrink-0" />
                  : <ChevronRight size={14} className="text-gray-400 dark:text-slate-500 flex-shrink-0" />}
              </button>

              {isOpen && (
                <div className="ml-2 pl-3 border-l border-gray-200 dark:border-slate-800 mt-0.5 space-y-0.5">
                  {domain.lessons.map((lesson) => {
                    const done = isCompleted(lesson.id)
                    if (!lesson.available) {
                      return (
                        <div key={lesson.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-gray-400 dark:text-slate-600 cursor-not-allowed">
                          <Lock size={11} className="flex-shrink-0" />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                      )
                    }
                    return (
                      <NavLink
                        key={lesson.id}
                        to={`/lessons/${lesson.id}`}
                        className={({ isActive }) =>
                          clsx(
                            'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors',
                            isActive
                              ? 'bg-gray-100 dark:bg-slate-800 text-aws-orange'
                              : done
                              ? 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/60'
                              : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800/60'
                          )
                        }
                      >
                        {done
                          ? <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
                          : <Clock size={11} className="flex-shrink-0 opacity-40" />}
                        <span className="truncate flex-1">{lesson.title}</span>
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer: theme toggle */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-slate-600">Updated 2026</span>
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </aside>
  )
}
