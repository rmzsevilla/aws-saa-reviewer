import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { AWS_SERVICES, CATEGORIES } from '../data/awsServices'

const SIZES = {
  xs: { box: 'w-6 h-6 rounded', text: 'text-[7px]', label: 'text-[10px]' },
  sm: { box: 'w-8 h-8 rounded-lg', text: 'text-[8px]', label: 'text-xs' },
  md: { box: 'w-10 h-10 rounded-xl', text: 'text-[9px]', label: 'text-xs' },
  lg: { box: 'w-14 h-14 rounded-xl', text: 'text-[11px]', label: 'text-sm' },
  xl: { box: 'w-16 h-16 rounded-2xl', text: 'text-xs', label: 'text-sm' },
}

export default function ServiceIcon({ name, size = 'md', showLabel = false, className, asLink = false }) {
  const service = AWS_SERVICES[name]
  if (!service) return null

  const s = SIZES[size] || SIZES.md
  const catColor = CATEGORIES[service.category]?.color || '#FF9900'

  const icon = (
    <div className={clsx('flex flex-col items-center gap-1.5 flex-shrink-0', className)}>
      <div
        className={clsx(
          'flex items-center justify-center font-black text-white shadow-sm transition-transform hover:scale-105',
          s.box, s.text
        )}
        style={{ backgroundColor: catColor }}
        title={service.fullName}
      >
        {service.icon}
      </div>
      {showLabel && (
        <span className={clsx('text-center text-gray-600 dark:text-slate-400 leading-tight font-medium', s.label)}>
          {service.name}
        </span>
      )}
    </div>
  )

  if (asLink && service.lessonId) {
    return <Link to={`/lessons/${service.lessonId}`}>{icon}</Link>
  }

  return icon
}

// Row of service tags used in lesson headers
export function ServiceTagList({ services, className }) {
  if (!services?.length) return null
  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {services.map((id) => {
        const s = AWS_SERVICES[id]
        if (!s) return null
        const color = CATEGORIES[s.category]?.color || '#FF9900'
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
            style={{
              borderColor: color + '50',
              backgroundColor: color + '18',
              color: color,
            }}
            title={s.fullName}
          >
            <span
              className="w-4 h-4 rounded flex items-center justify-center text-[7px] font-black text-white flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {s.icon}
            </span>
            {s.name}
          </span>
        )
      })}
    </div>
  )
}

// Grid of services for a lesson (shown in sidebar of lesson page)
export function ServiceGrid({ services }) {
  if (!services?.length) return null
  return (
    <div className="flex flex-wrap gap-3 mt-4 mb-6">
      {services.map((id) => (
        <ServiceIcon key={id} name={id} size="md" showLabel />
      ))}
    </div>
  )
}
