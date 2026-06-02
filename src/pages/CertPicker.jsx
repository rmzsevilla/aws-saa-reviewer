import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '../contexts/ThemeContext'
import saaBadge from '../assets/saa-badge.png'

// ── Cert data grouped by vendor ───────────────────────────────────────────────
const VENDORS = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    certs: [
      {
        id: 'clf',
        code: 'CLF-C02',
        name: 'Cloud Practitioner',
        level: 'Foundational',
        badge: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
        questions: 65, duration: '90 min', passing: '700',
        domains: ['Cloud Concepts', 'Security & Compliance', 'Cloud Technology', 'Billing & Support'],
        description: 'Entry-level AWS certification. Validates foundational knowledge of cloud services and pricing. No prior experience required.',
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
        questions: 85, duration: '120 min', passing: '700',
        domains: ['AI & ML Concepts', 'Generative AI', 'AWS AI Services', 'Responsible AI'],
        description: 'Validates knowledge of AI/ML concepts, generative AI, and AWS AI/ML services.',
        available: false,
        href: null,
        accent: {
          border: 'border-violet-400/30 dark:border-violet-500/20',
          hoverBorder: '', glow: '',
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
        questions: 65, duration: '130 min', passing: '720',
        domains: ['Secure Architectures', 'Resilient Architectures', 'High-Performing', 'Cost-Optimized'],
        description: 'Most popular AWS cert. Design well-architected, scalable, and cost-optimized cloud solutions.',
        available: true,
        href: '/saa',
        accent: {
          border: 'border-blue-400/40 dark:border-blue-500/30',
          hoverBorder: 'hover:border-blue-400/80 dark:hover:border-blue-500/70',
          glow: 'hover:shadow-blue-400/10 dark:hover:shadow-blue-500/10',
          codeBadge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
          levelBadge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
          domainChip: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-500/20',
          btn: 'bg-[#FF9900] hover:bg-yellow-400 text-slate-900',
        },
      },
    ],
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    certs: [
      {
        id: 'az-900',
        code: 'AZ-900',
        name: 'Azure Fundamentals',
        level: 'Foundational',
        badge: 'https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
        questions: 60, duration: '45 min', passing: '700',
        domains: ['Cloud Concepts', 'Azure Architecture', 'Management & Governance', 'Security & Compliance'],
        description: 'Microsoft entry-level certification. Covers core Azure services, pricing, and cloud fundamentals.',
        available: false,
        href: null,
        accent: {
          border: 'border-blue-400/30 dark:border-blue-500/20',
          hoverBorder: '', glow: '',
          codeBadge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
          levelBadge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
          domainChip: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-500/20',
          btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
        },
      },
      {
        id: 'az-104',
        code: 'AZ-104',
        name: 'Azure Administrator',
        level: 'Associate',
        badge: 'https://images.credly.com/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-administrator-associate-600x600.png',
        questions: 60, duration: '120 min', passing: '700',
        domains: ['Identity & Governance', 'Storage', 'Compute', 'Virtual Networking', 'Monitoring'],
        description: 'Validates skills managing Azure subscriptions, identities, storage, virtual machines, and networking.',
        available: false,
        href: null,
        accent: {
          border: 'border-sky-400/30 dark:border-sky-500/20',
          hoverBorder: '', glow: '',
          codeBadge: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
          levelBadge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
          domainChip: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-500/20',
          btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
        },
      },
    ],
  },
  {
    id: 'cisco',
    name: 'Cisco',
    certs: [
      {
        id: 'ccna',
        code: 'CCNA',
        name: 'CCNA',
        level: 'Associate',
        badge: 'https://images.credly.com/images/683783d8-eaac-4c37-a14d-11bd8a36321d/ccna_600.png',
        questions: 100, duration: '120 min', passing: '825',
        domains: ['Network Fundamentals', 'Network Access', 'IP Connectivity', 'Security Fundamentals', 'Automation'],
        description: 'Industry-standard networking cert. Covers routing, switching, VLANs, and network security basics.',
        available: false,
        href: null,
        accent: {
          border: 'border-cyan-400/30 dark:border-cyan-500/20',
          hoverBorder: '', glow: '',
          codeBadge: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
          levelBadge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
          domainChip: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-500/20',
          btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
        },
      },
    ],
  },
  {
    id: 'comptia',
    name: 'CompTIA',
    certs: [
      {
        id: 'techplus',
        code: 'Tech+',
        name: 'CompTIA Tech+',
        level: 'Foundational',
        badge: 'https://images.credly.com/images/d358c04b-d081-424f-8221-d5d63f76c144/blob',
        questions: 75, duration: '60 min', passing: '650',
        domains: ['IT Concepts & Terminology', 'Infrastructure', 'Applications & Software', 'Security', 'Data & Analytics'],
        description: 'Pre-entry IT certification. Builds core technology literacy for anyone starting a career in IT.',
        available: false,
        href: null,
        accent: {
          border: 'border-red-400/30 dark:border-red-500/20',
          hoverBorder: '', glow: '',
          codeBadge: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30',
          levelBadge: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20',
          domainChip: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200/80 dark:border-red-500/20',
          btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
        },
      },
      {
        id: 'aplus',
        code: 'A+',
        name: 'CompTIA A+',
        level: 'Foundational',
        badge: 'https://images.credly.com/images/f6d62c5d-1e1d-4de6-92ee-8dc8c80b1c7b/blob',
        questions: 90, duration: '90 min', passing: '675',
        domains: ['Mobile Devices', 'Networking', 'Hardware', 'Virtualization & Cloud', 'Troubleshooting'],
        description: 'Core hardware and IT support cert. The industry standard for entry-level help desk and support roles.',
        available: false,
        href: null,
        accent: {
          border: 'border-orange-400/30 dark:border-orange-500/20',
          hoverBorder: '', glow: '',
          codeBadge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
          levelBadge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20',
          domainChip: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200/80 dark:border-orange-500/20',
          btn: 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed',
        },
      },
    ],
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────
function StatPill({ value, label }) {
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
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <img
            src={cert.badge}
            alt={`${cert.name} badge`}
            className={cn(
              'w-28 h-28 object-contain drop-shadow-md transition-transform duration-200',
              available && 'group-hover:scale-105',
              !available && 'grayscale'
            )}
          />
        </div>

        {/* Code badge */}
        <div className="flex items-center justify-center mb-3">
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border tracking-wide', accent.codeBadge)}>
            {cert.code}
          </span>
        </div>

        {/* Name + level */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 text-center mb-1.5 leading-tight">
          {cert.name}
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
              'Coming Soon'
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CertPicker() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-[#F0ECE4] dark:bg-[#080d13] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#232F3E] flex items-center justify-center">
            <BookOpen size={14} className="text-[#FF9900]" />
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-slate-200 tracking-tight">IT Cert Review</span>
        </div>
        <button
          onClick={toggle}
          className="text-xs text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-5 py-10">
        {/* Headline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#232F3E]/8 dark:bg-white/5 border border-[#232F3E]/15 dark:border-white/10 text-gray-600 dark:text-slate-400 text-xs font-semibold mb-5">
            <BookOpen size={12} />
            Cert Study Guide · 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3">
            Which certification are you studying for?
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base max-w-lg mx-auto">
            Choose a path to open its full curriculum: lessons, flashcards, and practice quizzes.
          </p>
        </div>

        {/* Vendor sections */}
        <div className="w-full max-w-5xl space-y-12">
          {VENDORS.map((vendor) => (
            <div key={vendor.id}>
              {/* Vendor divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gray-200 dark:bg-slate-800" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-600 px-1">
                  {vendor.name}
                </span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-slate-800" />
              </div>
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {vendor.certs.map((cert) => (
                  <CertCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-gray-400 dark:text-slate-600">
        Content verified against official exam guides · Updated 2026
      </div>
    </div>
  )
}
