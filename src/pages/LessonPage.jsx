import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Clock, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLessonMeta } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { lessonRegistry } from '../data/lessons'
import { ServiceTagList, ServiceGrid } from '../components/ServiceIcon'

// AWS brand: #232F3E dark navy, #FF9900 orange
// Domain accent colors: used for the top bar stripe and subtle gradient tint
const DOMAIN_ACCENT = {
  'domain-1':     '#ef4444',  // red-500
  'domain-2':     '#3b82f6',  // blue-500
  'domain-3':     '#10b981',  // emerald-500
  'domain-4':     '#f59e0b',  // amber-500
  'clf-domain-1': '#0ea5e9',  // sky-500
  'clf-domain-2': '#8b5cf6',  // violet-500
  'clf-domain-3': '#14b8a6',  // teal-500
  'clf-domain-4': '#f59e0b',  // amber-500
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const lessonMeta = getLessonMeta(lessonId)
  const { isCompleted, markComplete, markIncomplete } = useProgress()
  const lesson = lessonRegistry[lessonId]
  const completed = isCompleted(lessonId)

  useEffect(() => { window.scrollTo(0, 0) }, [lessonId])

  if (!lessonMeta || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-2">Lesson not found</h2>
        <p className="text-gray-400 dark:text-slate-500 mb-6">This lesson doesn't exist yet or the URL is incorrect.</p>
        <Link to="/" className="text-sm text-aws-orange hover:underline">← Back to curriculum</Link>
      </div>
    )
  }

  const { Content } = lesson
  const domain = lessonMeta.domain
  const services = lesson.meta?.services || []
  const accentColor = DOMAIN_ACCENT[domain.id] || '#FF9900'

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors mb-6">
        <ArrowLeft size={13} /> Back to curriculum
      </Link>

      {/* Lesson header: AWS dark navy with domain accent stripe */}
      <div className="mb-8 -mx-5 sm:-mx-8 overflow-hidden rounded-none">
        {/* Top accent stripe in domain color */}
        <div className="h-1 w-full" style={{ background: accentColor }} />

        {/* Dark header body: always #232F3E regardless of light/dark mode */}
        <div className="px-5 sm:px-8 pt-5 pb-6 bg-[#232F3E]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Domain badge: solid domain color, always readable on dark bg */}
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: accentColor + '30',
                borderColor: accentColor + '60',
                color: accentColor,
              }}
            >
              Domain {domain.number}: {domain.title}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={11} /> {lessonMeta.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{lessonMeta.title}</h1>
          {lesson.meta?.description && (
            <p className="text-slate-300 text-sm leading-relaxed">{lesson.meta.description}</p>
          )}

          {/* Services involved */}
          {services.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Services in this lesson</p>
              <ServiceGrid services={services} cert={lessonMeta.cert} />
              <ServiceTagList services={services} className="mt-2" />
            </div>
          )}
        </div>
      </div>

      {/* Lesson content */}
      <div className="lesson-prose">
        <Content />
      </div>

      {/* Mark complete */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/70 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
              {completed ? 'Lesson completed ✓' : 'Mark as complete'}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
              {completed ? 'Click to unmark if you want to revisit.' : 'Check this off when you feel confident.'}
            </p>
          </div>
          <button
            onClick={() => (completed ? markIncomplete(lessonId) : markComplete(lessonId))}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              completed
                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/10'
                : 'bg-aws-orange text-slate-900 hover:bg-yellow-400'
            )}
          >
            <CheckCircle2 size={15} />
            {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </div>
  )
}
