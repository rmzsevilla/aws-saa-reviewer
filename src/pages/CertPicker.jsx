import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FileQuestion, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '../contexts/ThemeContext'
import saaBadge from '../assets/saa-badge.png'

const CERTS = [
  {
    id: 'clf',
    code: 'CLF-C02',
    name: 'Cloud Practitioner',
    level: 'Foundational',
    badge: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    questions: 65,
    duration: '90 min',
    passing: 700,
    domains: ['Cloud Concepts', 'Security & Compliance', 'Cloud Technology', 'Billing & Support'],
    description: 'Entry-level certification for anyone new to AWS. No prior cloud experience required.',
    available: true,
    href: '/clf',
    accent: {
      border: 'border-sky-400/40 dark:border-sky-500/30',
      hoverBorder: 'hover:border-sky-400/80 dark:hover:border-sky-500/70',
      glow: 'hover:shadow-sky-400/10 dark:hover:shadow-sky-500/10',
      codeBadge: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
      levelBadge: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20',
      domainChip: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-500/20',
      btn: 'bg-sky-500 hover:bg-sky-400 text-white',
    },
  },
  {
    id: 'aif',
    code: 'AIF-C01',
    name: 'AI Practitioner',
    level: 'Foundational',
    badge: 'https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png',
    questions: 85,
    duration: '120 min',
    passing: 700,
    domains: ['AI & ML Concepts', 'Generative AI', 'AWS AI Services', 'Responsible AI', 'Security & Governance'],
    description: 'Validates knowledge of AI/ML concepts, generative AI, and AWS AI/ML services.',
    available: false,
    href: null,
    accent: {
      border: 'border-violet-400/30 dark:border-violet-500/20',
      hoverBorder: '',
      glow: '',
      codeBadge: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
      levelBadge: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20',
      domainChip: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-200/80 dark:border-violet-500/20',
      btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
    },
  },
  {
    id: 'saa',
    code: 'SAA-C03',
    name: 'Solutions Architect',
    level: 'Associate',
    badge: saaBadge,
    questions: 65,
    duration: '130 min',
    passing: 720,
    domains: ['Secure Architectures', 'Resilient Architectures', 'High-Performing', 'Cost-Optimized'],
    description: 'Most popular AWS cert. Validates ability to design well-architected cloud solutions.',
    available: true,
    href: '/saa',
    accent: {
      border: 'border-blue-400/40 dark:border-blue-500/30',
      hoverBorder: 'hover:border-blue-400/80 dark:hover:border-blue-500/70',
      glow: 'hover:shadow-blue-400/10 dark:hover:shadow-blue-500/10',
      codeBadge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
      levelBadge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
      domainChip: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-500/20',
      btn: 'bg-aws-orange hover:bg-yellow-400 text-slate-900',
    },
  },
]

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-base font-bold text-gray-800 dark:text-slate-100">{value}</span>
      <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
  )
}

function CertCard({ cert }) {
  const { accent, available } = cert

  const cardInner = (
    <div
      className={cn(
        'relative flex flex-col h-full rounded-2xl border bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md transition-all duration-200 overflow-hidden',
        accent.border,
        available && accent.hoverBorder,
        available && 'hover:shadow-xl cursor-pointer',
        available && accent.glow,
        !available && 'opacity-60'
      )}
    >
      {/* Coming soon ribbon */}
      {!available && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-slate-700">
            Coming Soon
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Badge image */}
        <div className="flex justify-center mb-5">
          <img
            src={cert.badge}
            alt={`${cert.name} badge`}
            className={cn(
              'w-32 h-32 object-contain drop-shadow-md transition-transform duration-200',
              available && 'group-hover:scale-105',
              !available && 'grayscale'
            )}
          />
        </div>

        {/* Cert code */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border tracking-wide', accent.codeBadge)}>
            {cert.code}
          </span>
        </div>

        {/* Name + level */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 text-center mb-1.5 leading-tight">
          AWS {cert.name}
        </h2>
        <div className="flex justify-center mb-4">
          <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full', accent.levelBadge)}>
            {cert.level}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-slate-400 text-center leading-relaxed mb-5">
          {cert.description}
        </p>

        {/* Stats */}
        <div className="flex justify-around py-3 border-y border-gray-100 dark:border-slate-800 mb-5">
          <StatPill value={cert.questions} label="Questions" />
          <div className="w-px bg-gray-100 dark:bg-slate-800" />
          <StatPill value={cert.duration} label="Duration" />
          <div className="w-px bg-gray-100 dark:bg-slate-800" />
          <StatPill value={`${cert.passing}+`} label="Passing" />
        </div>

        {/* Domain chips */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {cert.domains.map((d) => (
            <span
              key={d}
              className={cn('text-[11px] px-2.5 py-1 rounded-lg border font-medium', accent.domainChip)}
            >
              {d}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <div
            className={cn(
              'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors',
              accent.btn
            )}
          >
            {available ? (
              <>Start Studying <ArrowRight size={14} /></>
            ) : (
              'In Progress'
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (!available) return <div className="group h-full">{cardInner}</div>

  return (
    <Link to={cert.href} className="group h-full block">
      {cardInner}
    </Link>
  )
}

export default function CertPicker() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-[#F0ECE4] dark:bg-[#080d13] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
            alt="AWS"
            className="h-7 w-auto"
            style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
          />
          <span className="text-sm font-semibold text-gray-400 dark:text-slate-500">Certification Prep</span>
        </div>
        <button
          onClick={toggle}
          className="text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        {/* Headline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-aws-orange/10 border border-aws-orange/25 text-aws-orange text-xs font-semibold mb-5">
            <Award size={13} />
            AWS Study Guide · 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3">
            Which certification are you studying for?
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base max-w-lg mx-auto">
            Choose a path to open its full curriculum: lessons, flashcards, quizzes, and CLI labs.
          </p>
        </div>

        {/* Cert cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
          {CERTS.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-gray-400 dark:text-slate-600">
        Content verified against official AWS exam guides · Updated 2026
      </div>
    </div>
  )
}
