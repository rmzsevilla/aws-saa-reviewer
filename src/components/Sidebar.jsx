import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, CheckCircle2, Lock, Clock, Moon, Sun, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { DOMAINS, TOTAL_LESSONS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../contexts/ThemeContext'

export default function Sidebar() {
  const [expanded, setExpanded] = useState({ 'domain-1': true })
  const { isCompleted, completedCount } = useProgress()
  const { isDark, toggle } = useTheme()

  const toggleDomain = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 px-4 py-3.5 border-b border-border hover:bg-muted/40 transition-colors"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
          alt="AWS"
          className="h-6 w-auto flex-shrink-0"
          style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground leading-tight">SAA-C03</p>
          <p className="text-xs text-muted-foreground leading-tight">Study Guide · 2026</p>
        </div>
      </Link>

      {/* Overall progress */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="text-foreground font-medium">{completedCount}/{TOTAL_LESSONS}</span>
        </div>
        <Progress
          value={(completedCount / TOTAL_LESSONS) * 100}
          className="[&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:bg-aws-orange"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {/* Dictionary link */}
        <NavLink
          to="/dictionary"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium mb-2 transition-colors',
              isActive
                ? 'bg-aws-orange/10 text-aws-orange border border-aws-orange/20'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          }
        >
          <BookOpen size={13} className="flex-shrink-0" />
          AWS Services Dictionary
        </NavLink>

        <div className="border-t border-border mb-2" />

        {DOMAINS.map((domain) => {
          const isOpen = expanded[domain.id]
          const domainCompleted = domain.lessons.filter((l) => isCompleted(l.id)).length

          return (
            <div key={domain.id} className="mb-1">
              <button
                onClick={() => toggleDomain(domain.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className={cn('w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold', domain.bgClass, domain.colorClass)}>
                  {domain.number}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground truncate">{domain.title}</p>
                  <p className="text-xs text-muted-foreground">{domain.percentage}% · {domainCompleted}/{domain.lessons.length}</p>
                </div>
                {isOpen
                  ? <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
                  : <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />}
              </button>

              {isOpen && (
                <div className="ml-2 pl-3 border-l border-border mt-0.5 space-y-0.5">
                  {domain.lessons.map((lesson) => {
                    const done = isCompleted(lesson.id)
                    if (!lesson.available) {
                      return (
                        <div key={lesson.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-muted-foreground/50 cursor-not-allowed">
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
                              ? 'bg-muted text-aws-orange'
                              : done
                              ? 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                              : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
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
      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Updated 2026</span>
        <Button
          variant="outline"
          size="xs"
          onClick={toggle}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="gap-1.5"
        >
          {isDark ? <Sun size={12} /> : <Moon size={12} />}
          {isDark ? 'Light' : 'Dark'}
        </Button>
      </div>
    </aside>
  )
}
