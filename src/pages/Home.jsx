import { Link } from 'react-router-dom'
import { Shield, RefreshCw, Zap, DollarSign, ArrowRight, CheckCircle2, Lock, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import { DOMAINS, TOTAL_LESSONS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../contexts/ThemeContext'
import saaBadge from '../assets/saa-badge.png'

const DOMAIN_ICONS = { 'domain-1': Shield, 'domain-2': RefreshCw, 'domain-3': Zap, 'domain-4': DollarSign }

export default function Home() {
  const { isCompleted, completedCount } = useProgress()
  const { isDark } = useTheme()
  const overallPct = Math.round((completedCount / TOTAL_LESSONS) * 100)

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
      {/* Hero */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
              alt="AWS"
              className="h-8 w-auto"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-aws-orange bg-aws-orange/10 border border-aws-orange/20 px-2.5 py-1 rounded-full">
              Certification Prep
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Solutions Architect Associate
            <span className="text-gray-400 dark:text-slate-500 font-normal ml-2 text-2xl">SAA-C03</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base max-w-xl">
            Structured curriculum covering all four exam domains. Learn with notes, interactive diagrams, flashcards, and practice quizzes.
          </p>
        </div>
        <img
          src={saaBadge}
          alt="AWS Certified Solutions Architect – Associate badge"
          className="hidden sm:block w-28 h-28 flex-shrink-0 drop-shadow-md"
        />
      </div>

      {/* Overall progress card */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">Your Progress</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{completedCount} of {TOTAL_LESSONS} lessons completed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-aws-orange">{overallPct}%</p>
          </div>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-aws-orange to-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {DOMAINS.map((d) => {
            const done = d.lessons.filter((l) => isCompleted(l.id)).length
            const pct = Math.round((done / d.lessons.length) * 100)
            const barColor = d.color === 'red' ? 'bg-red-500' : d.color === 'blue' ? 'bg-blue-500' : d.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
            return (
              <div key={d.id} className="text-center">
                <p className="text-xs text-gray-400 dark:text-slate-500 mb-1.5">Domain {d.number}</p>
                <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={clsx('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{done}/{d.lessons.length}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Exam info + dictionary banner */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 flex gap-3 items-start">
          <BookOpen size={16} className="text-aws-orange flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">About SAA-C03</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              65 questions · 130 minutes · Multiple choice &amp; multi-response · ~720/1000 passing score.
            </p>
          </div>
        </div>
        <Link to="/dictionary" className="bg-aws-orange/5 dark:bg-aws-orange/5 border border-aws-orange/20 rounded-xl p-4 flex gap-3 items-start hover:bg-aws-orange/10 transition-colors group">
          <span className="text-aws-orange text-lg flex-shrink-0">📚</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1 group-hover:text-aws-orange transition-colors">AWS Services Dictionary</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Reference for all SAA-C03 services with exam tips →</p>
          </div>
        </Link>
      </div>

      {/* Domain cards */}
      <div className="grid gap-4">
        {DOMAINS.map((domain) => {
          const Icon = DOMAIN_ICONS[domain.id]
          const done = domain.lessons.filter((l) => isCompleted(l.id)).length

          return (
            <div key={domain.id} className={clsx('rounded-2xl border p-5 bg-white dark:bg-slate-900/50', domain.borderClass)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', domain.bgClass)}>
                    <Icon size={18} className={domain.colorClass} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-slate-100">Domain {domain.number}</h2>
                      <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-semibold', domain.badgeClass)}>
                        {domain.percentage}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{domain.title}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{done}/{domain.lessons.length}</p>
              </div>

              <div className="space-y-1.5">
                {domain.lessons.map((lesson) => {
                  const completed = isCompleted(lesson.id)
                  if (!lesson.available) {
                    return (
                      <div key={lesson.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 dark:text-slate-600 bg-gray-50 dark:bg-slate-900/40">
                        <Lock size={11} className="flex-shrink-0" />
                        <span className="truncate">{lesson.title}</span>
                        <span className="ml-auto text-gray-300 dark:text-slate-700 text-xs">Soon</span>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={lesson.id}
                      to={`/lessons/${lesson.id}`}
                      className={clsx(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all group',
                        completed
                          ? 'bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 text-gray-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/10'
                          : 'bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
                      )}
                    >
                      {completed
                        ? <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                        : <div className={clsx('w-2.5 h-2.5 rounded-full flex-shrink-0', domain.bgClass)} />}
                      <span className="flex-1 truncate font-medium">{lesson.title}</span>
                      <span className="text-gray-400 dark:text-slate-600 text-xs">{lesson.duration}</span>
                      <ArrowRight size={11} className="text-gray-400 dark:text-slate-600 group-hover:text-gray-600 dark:group-hover:text-slate-400 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
