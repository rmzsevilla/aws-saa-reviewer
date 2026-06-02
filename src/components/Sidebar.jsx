import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, CheckCircle2, Lock, Clock, Moon, Sun, BookOpen, GraduationCap, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { DOMAINS, TOTAL_LESSONS } from '../data/courses/aws/saa/curriculum'
import { CLF_DOMAINS, CLF_TOTAL_LESSONS } from '../data/courses/aws/clf/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../contexts/ThemeContext'

const CERT_CONFIG = {
  saa: {
    domains: DOMAINS,
    total: TOTAL_LESSONS,
    label: 'SAA-C03',
    progressClass: '[&_[data-slot=progress-indicator]]:bg-aws-orange',
    activeLesson: 'text-aws-orange',
    activeLessonBg: 'bg-slate-800 text-aws-orange',
    homeHref: '/saa',
    defaultExpanded: { 'domain-1': true },
  },
  clf: {
    domains: CLF_DOMAINS,
    total: CLF_TOTAL_LESSONS,
    label: 'CLF-C02',
    progressClass: '[&_[data-slot=progress-indicator]]:bg-sky-400',
    activeLesson: 'text-sky-400',
    activeLessonBg: 'bg-slate-800 text-sky-400',
    homeHref: '/clf',
    defaultExpanded: { 'clf-domain-1': true },
  },
}

// Sidebar is ALWAYS dark regardless of light/dark mode
export default function Sidebar({ isOpen, onClose, activeCert = 'saa' }) {
  const cfg = CERT_CONFIG[activeCert] ?? CERT_CONFIG.saa

  const [expanded, setExpanded] = useState(cfg.defaultExpanded)
  const { isCompleted } = useProgress()
  const { isDark, toggle } = useTheme()

  const toggleDomain = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  // Count only the lessons for the active cert
  const certCompleted = cfg.domains
    .flatMap((d) => d.lessons)
    .filter((l) => isCompleted(l.id)).length

  return (
    <aside
      className={cn(
        'flex-shrink-0 bg-[#0d1117] border-r border-slate-800 flex flex-col h-full overflow-hidden transition-all duration-200 ease-in-out',
        isOpen ? 'w-64' : 'w-0'
      )}
    >
      {/* Inner wrapper keeps content at fixed width so it doesn't reflow during animation */}
      <div className="w-64 flex flex-col h-full">

        {/* Logo + close */}
        <div className="flex items-center border-b border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0 hover:bg-slate-800/50 transition-colors"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
              alt="AWS"
              className="h-6 w-auto flex-shrink-0 brightness-0 invert"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-100 leading-tight">AWS Study Guide</p>
              <p className="text-xs text-slate-500 leading-tight">Change cert</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            title="Close sidebar"
            className="flex-shrink-0 p-2 mr-2 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Cert progress */}
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">{cfg.label} Progress</span>
            <span className="text-slate-200 font-medium">{certCompleted}/{cfg.total}</span>
          </div>
          <Progress
            value={(certCompleted / cfg.total) * 100}
            className={cn('[&_[data-slot=progress-track]]:bg-slate-800', cfg.progressClass)}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">

          {/* Cert home + shared links */}
          <NavLink
            to={cfg.homeHref}
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium mb-0.5 transition-colors',
                isActive
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )
            }
          >
            <span className={cn(
              'w-4 h-4 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0',
              activeCert === 'clf' ? 'bg-sky-500/20 text-sky-300' : 'bg-blue-500/20 text-blue-300'
            )}>
              {activeCert === 'clf' ? 'CP' : 'SA'}
            </span>
            {cfg.label} Curriculum
          </NavLink>

          <NavLink
            to={activeCert === 'clf' ? '/clf/intro' : '/intro'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium mb-0.5 transition-colors',
                isActive
                  ? 'bg-aws-orange/15 text-aws-orange border border-aws-orange/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )
            }
          >
            <GraduationCap size={13} className="flex-shrink-0" />
            Exam Introduction
          </NavLink>

          <NavLink
            to={activeCert === 'clf' ? '/dictionary?cert=clf' : '/dictionary'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium mb-2 transition-colors',
                isActive
                  ? 'bg-aws-orange/15 text-aws-orange border border-aws-orange/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )
            }
          >
            <BookOpen size={13} className="flex-shrink-0" />
            AWS Services Dictionary
          </NavLink>

          <div className="border-t border-slate-800 mb-2" />

          {/* Domain list for active cert */}
          {cfg.domains.map((domain) => {
            const isExpanded = !!expanded[domain.id]
            const domainCompleted = domain.lessons.filter((l) => isCompleted(l.id)).length

            return (
              <div key={domain.id} className="mb-1">
                <button
                  onClick={() => toggleDomain(domain.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className={cn('w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold', domain.bgClass, domain.colorClass)}>
                    {domain.number}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-semibold text-slate-300 truncate">{domain.title}</p>
                    <p className="text-xs text-slate-500">{domain.percentage}% Â· {domainCompleted}/{domain.lessons.length}</p>
                  </div>
                  {isExpanded
                    ? <ChevronDown size={14} className="text-slate-600 flex-shrink-0" />
                    : <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="ml-2 pl-3 border-l border-slate-800 mt-0.5 space-y-0.5">
                    {domain.lessons.map((lesson) => {
                      const done = isCompleted(lesson.id)
                      if (!lesson.available) {
                        return (
                          <div key={lesson.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-slate-700 cursor-not-allowed">
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
                            cn(
                              'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors',
                              isActive
                                ? cfg.activeLessonBg
                                : done
                                ? 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                            )
                          }
                        >
                          {done
                            ? <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
                            : <Clock size={11} className="flex-shrink-0 opacity-30" />}
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
        <div className="px-4 py-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-600">Updated 2026</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={toggle}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="gap-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </div>

      </div>
    </aside>
  )
}

