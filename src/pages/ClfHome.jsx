import { Link } from 'react-router-dom'
import { Cloud, Shield, Zap, DollarSign, ArrowRight, CheckCircle2, Lock, BookOpen, GraduationCap, Library } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CLF_DOMAINS, CLF_TOTAL_LESSONS } from '../data/clf-curriculum'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../contexts/ThemeContext'

const DOMAIN_ICONS = {
  'clf-domain-1': Cloud,
  'clf-domain-2': Shield,
  'clf-domain-3': Zap,
  'clf-domain-4': DollarSign,
}

const DOMAIN_CARD_BG = {
  'clf-domain-1': 'bg-sky-50/80 dark:bg-slate-900/50',
  'clf-domain-2': 'bg-violet-50/80 dark:bg-slate-900/50',
  'clf-domain-3': 'bg-teal-50/80 dark:bg-slate-900/50',
  'clf-domain-4': 'bg-amber-50/80 dark:bg-slate-900/50',
}

export default function ClfHome() {
  const { isCompleted, progress } = useProgress()
  const { isDark } = useTheme()

  // Count only CLF lessons
  const clfCompletedCount = CLF_DOMAINS
    .flatMap((d) => d.lessons)
    .filter((l) => isCompleted(l.id)).length

  const overallPct = Math.round((clfCompletedCount / CLF_TOTAL_LESSONS) * 100)

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
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/25 px-2.5 py-1 rounded-full">
              Foundational
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Cloud Practitioner
            <span className="text-gray-400 dark:text-slate-500 font-normal ml-2 text-2xl">CLF-C02</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base max-w-xl">
            Foundational certification covering cloud concepts, security, core AWS services, and billing. 65 questions, 90 minutes, 700/1000 passing score.
          </p>
        </div>
        <img
          src="https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
          alt="AWS Certified Cloud Practitioner badge"
          className="hidden sm:block w-28 h-28 flex-shrink-0 object-contain drop-shadow-md"
        />
      </div>

      {/* Overall progress card */}
      <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">Your Progress</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{clfCompletedCount} of {CLF_TOTAL_LESSONS} lessons completed</p>
          </div>
          <p className="text-2xl font-bold text-sky-500">{overallPct}%</p>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-300 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {CLF_DOMAINS.map((d) => {
            const done = d.lessons.filter((l) => isCompleted(l.id)).length
            const pct = Math.round((done / d.lessons.length) * 100)
            const barColor = {
              sky: 'bg-sky-500',
              violet: 'bg-violet-500',
              teal: 'bg-teal-500',
              amber: 'bg-amber-500',
            }[d.color] || 'bg-sky-500'
            return (
              <div key={d.id} className="text-center">
                <p className="text-xs text-gray-400 dark:text-slate-500 mb-1.5">D{d.number}</p>
                <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{done}/{d.lessons.length}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 flex gap-3 items-start shadow-sm">
          <BookOpen size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">About CLF-C02</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              65 questions · 90 minutes · Multiple choice and multi-response · 700/1000 passing score.
            </p>
          </div>
        </div>
        <Link
          to="/clf/intro"
          className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 flex gap-3 items-start hover:bg-sky-500/10 transition-colors group shadow-sm"
        >
          <GraduationCap size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1 group-hover:text-sky-500 transition-colors">Exam Introduction</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">CLF-C02 exam format, domain breakdown, and study tips</p>
          </div>
        </Link>
        <Link
          to="/dictionary?cert=clf"
          className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 flex gap-3 items-start hover:bg-sky-500/10 transition-colors group shadow-sm sm:col-span-2"
        >
          <Library size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1 group-hover:text-sky-500 transition-colors">AWS Services Dictionary</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Browse all CLF-C02 services with key facts and exam tips</p>
          </div>
        </Link>
      </div>

      {/* Domain cards */}
      <div className="grid gap-4">
        {CLF_DOMAINS.map((domain) => {
          const Icon = DOMAIN_ICONS[domain.id]
          const done = domain.lessons.filter((l) => isCompleted(l.id)).length

          return (
            <div key={domain.id} className={cn('rounded-2xl border p-5 shadow-sm', domain.borderClass, DOMAIN_CARD_BG[domain.id])}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', domain.bgClass)}>
                    <Icon size={18} className={domain.colorClass} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-slate-100">Domain {domain.number}</h2>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold', domain.badgeClass)}>
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
                      <div key={lesson.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 dark:text-slate-600 bg-black/[0.03] dark:bg-slate-900/40 border border-black/[0.04] dark:border-slate-800">
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
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all group',
                        completed
                          ? 'bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 text-gray-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/10'
                          : 'bg-white/70 dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
                      )}
                    >
                      {completed
                        ? <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                        : <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', domain.bgClass)} />}
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
