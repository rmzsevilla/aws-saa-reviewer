import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Home, ExternalLink, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLessonMeta } from '../data/curriculum'

const CERTS = [
  { id: 'clf', code: 'CLF-C02', href: '/clf', available: true },
  { id: 'aif', code: 'AIF-C01', href: '/aif', available: false },
  { id: 'saa', code: 'SAA-C03', href: '/saa', available: true },
]

export default function Header({ sidebarOpen, onToggleSidebar, activeCert }) {
  const location = useLocation()
  const navigate = useNavigate()
  const match = location.pathname.match(/^\/lessons\/(.+)$/)
  const lessonId = match?.[1]
  const lessonMeta = lessonId ? getLessonMeta(lessonId) : null
  const isDictionary = location.pathname === '/dictionary'
  const isIntro = location.pathname === '/intro' || location.pathname === '/clf/intro'

  // Derive cert context from lesson prefix for lesson pages
  const lessonCert = lessonId?.startsWith('clf-') ? 'clf'
    : lessonId?.startsWith('aif-') ? 'aif'
    : 'saa'
  const certHref = lessonCert === 'clf' ? '/clf' : lessonCert === 'aif' ? '/aif' : '/saa'
  const certCode  = lessonCert === 'clf' ? 'CLF-C02' : lessonCert === 'aif' ? 'AIF-C01' : 'SAA-C03'

  return (
    <header className="h-12 flex items-center justify-between px-3 border-b border-[#e68a00] bg-[#FF9900] flex-shrink-0 gap-3">

      {/* Left: toggle + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="flex-shrink-0 p-1.5 rounded-lg transition-colors text-[#232F3E] hover:bg-black/10"
        >
          <PanelLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5 text-sm text-[#232F3E]/70 min-w-0">
          <Link to="/" className="hover:text-[#232F3E] transition-colors flex-shrink-0">
            <Home size={14} />
          </Link>

          {/* Cert home page */}
          {!lessonMeta && !isDictionary && !isIntro && activeCert && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-xs font-bold text-[#232F3E]">
                {activeCert === 'clf' ? 'CLF-C02' : activeCert === 'aif' ? 'AIF-C01' : 'SAA-C03'}
              </span>
            </>
          )}

          {/* Dictionary */}
          {isDictionary && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-[#232F3E] text-xs font-semibold">Services Dictionary</span>
            </>
          )}

          {/* Intro pages */}
          {isIntro && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-[#232F3E] text-xs font-semibold">Exam Introduction</span>
            </>
          )}

          {/* Lesson */}
          {lessonMeta && (
            <>
              <span className="text-[#232F3E]/40 flex-shrink-0">/</span>
              <Link to={certHref} className="text-xs text-[#232F3E]/60 hover:text-[#232F3E] flex-shrink-0 transition-colors font-medium">
                {certCode}
              </Link>
              <span className="text-[#232F3E]/40 flex-shrink-0">/</span>
              <span className="text-[#232F3E] text-xs font-semibold truncate">{lessonMeta.title}</span>
            </>
          )}
        </div>
      </div>

      {/* Center: cert switcher */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {CERTS.map((cert) => {
          const isActive = activeCert === cert.id
          return (
            <button
              key={cert.id}
              onClick={() => cert.available && navigate(cert.href)}
              disabled={!cert.available}
              title={cert.available ? `Switch to ${cert.code}` : `${cert.code} — coming soon`}
              className={cn(
                'relative text-[11px] font-bold px-2.5 py-1 rounded-md transition-all select-none',
                isActive
                  ? 'bg-[#232F3E] text-white shadow-sm'
                  : cert.available
                    ? 'text-[#232F3E]/70 hover:bg-black/10 hover:text-[#232F3E]'
                    : 'text-[#232F3E]/35 cursor-not-allowed'
              )}
            >
              {cert.code}
              {!cert.available && (
                <span className="absolute -top-1.5 -right-1 text-[8px] font-semibold bg-[#232F3E]/20 text-[#232F3E]/60 px-1 py-0 rounded-full leading-4">
                  soon
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Right: AWS Certs link */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href="https://aws.amazon.com/certification/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#232F3E]/70 hover:text-[#232F3E] flex items-center gap-1 transition-colors hidden sm:flex font-medium"
        >
          AWS Certs <ExternalLink size={11} />
        </a>
      </div>
    </header>
  )
}
