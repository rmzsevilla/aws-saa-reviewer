import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Clock, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLessonMeta } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { lessonRegistry } from '../data/lessons'
import { ServiceTagList, ServiceGrid } from '../components/ServiceIcon'

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

  // Domain accent colors for the lesson header strip
  const headerAccent = {
    'domain-1':     'from-red-500/20 via-amber-500/10 to-transparent dark:from-red-500/15 dark:via-amber-500/8',
    'domain-2':     'from-blue-500/20 via-amber-500/10 to-transparent dark:from-blue-500/15 dark:via-amber-500/8',
    'domain-3':     'from-emerald-500/20 via-amber-500/10 to-transparent dark:from-emerald-500/15 dark:via-amber-500/8',
    'domain-4':     'from-amber-500/25 via-orange-400/10 to-transparent dark:from-amber-500/20 dark:via-orange-400/8',
    'clf-domain-1': 'from-sky-500/20 via-amber-500/10 to-transparent dark:from-sky-500/15 dark:via-amber-500/8',
    'clf-domain-2': 'from-violet-500/20 via-amber-500/10 to-transparent dark:from-violet-500/15 dark:via-amber-500/8',
    'clf-domain-3': 'from-teal-500/20 via-amber-500/10 to-transparent dark:from-teal-500/15 dark:via-amber-500/8',
    'clf-domain-4': 'from-amber-500/25 via-orange-400/10 to-transparent dark:from-amber-500/20 dark:via-orange-400/8',
  }[domain.id] || 'from-amber-500/20 via-orange-400/10 to-transparent'

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors mb-6">
        <ArrowLeft size={13} /> Back to curriculum
      </Link>

      {/* Lesson header — colored gradient strip */}
      <div className={cn('mb-8 -mx-5 sm:-mx-8 px-5 sm:px-8 pt-5 pb-6 bg-gradient-to-b border-b border-amber-500/20 dark:border-amber-500/15', headerAccent)}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', domain.badgeClass)}>
            Domain {domain.number}: {domain.title}
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
            <Clock size={11} /> {lessonMeta.duration}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">{lessonMeta.title}</h1>
        {lesson.meta?.description && (
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{lesson.meta.description}</p>
        )}

        {/* Services involved */}
        {services.length > 0 && (
          <div className="mt-5 pt-5 border-t border-black/[0.06] dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3">Services in this lesson</p>
            <ServiceGrid services={services} cert={lessonMeta.cert} />
            <ServiceTagList services={services} className="mt-2" />
          </div>
        )}
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
