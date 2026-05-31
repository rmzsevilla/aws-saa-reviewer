import { Info, AlertTriangle, Lightbulb, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  note: {
    icon: Info,
    label: 'Note',
    classes: 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/40',
    labelClass: 'text-blue-600 dark:text-blue-400',
    iconClass: 'text-blue-500 dark:text-blue-400',
    textClass: 'text-blue-900 dark:text-blue-100',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    classes: 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/40',
    labelClass: 'text-yellow-700 dark:text-yellow-400',
    iconClass: 'text-yellow-500 dark:text-yellow-400',
    textClass: 'text-yellow-900 dark:text-yellow-100',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    classes: 'bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/40',
    labelClass: 'text-green-700 dark:text-green-400',
    iconClass: 'text-green-500 dark:text-green-400',
    textClass: 'text-green-900 dark:text-green-100',
  },
  important: {
    icon: Zap,
    label: 'Important',
    classes: 'bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40',
    labelClass: 'text-orange-700 dark:text-orange-400',
    iconClass: 'text-orange-500 dark:text-orange-400',
    textClass: 'text-orange-900 dark:text-orange-100',
  },
  examTip: {
    icon: Star,
    label: 'Exam Tip',
    classes: 'bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/40',
    labelClass: 'text-purple-700 dark:text-purple-300',
    iconClass: 'text-purple-500 dark:text-purple-400',
    textClass: 'text-purple-900 dark:text-purple-100',
  },
}

export default function Callout({ type = 'note', children }) {
  const v = VARIANTS[type] || VARIANTS.note
  const Icon = v.icon

  return (
    <div className={cn('my-5 rounded-xl border px-4 py-3.5 flex gap-3', v.classes)}>
      <Icon size={16} className={cn('flex-shrink-0 mt-0.5', v.iconClass)} />
      <div className={cn('flex-1 min-w-0 text-sm leading-relaxed', v.textClass)}>
        <span className={cn('font-semibold mr-1.5', v.labelClass)}>{v.label}:</span>
        {children}
      </div>
    </div>
  )
}
