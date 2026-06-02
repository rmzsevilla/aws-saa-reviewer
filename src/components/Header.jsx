import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Home, ExternalLink, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLessonMeta } from '../data/courses/aws/saa/curriculum'
import ServiceSearch from './ServiceSearch'

const CERTS = [
  { id: 'clf', name: 'Cloud Practitioner',  href: '/clf', available: true },
  { id: 'aif', name: 'AI Practitioner',     href: '/aif', available: false },
  { id: 'saa', name: 'Solutions Architect', href: '/saa', available: true },
]

export default function Header({ sidebarOpen, onToggleSidebar, activeCert }) {
  const location = useLocation()
  const navigate = useNavigate()
  const match = location.pathname.match(/^\/lessons\/(.+)$/)
  const lessonId = match?.[1]
  const lessonMeta = lessonId ? getLessonMeta(lessonId) : null
  const isDictionary = location.pathname === '/dictionary'
  const isIntro = location.pathname === '/intro' || location.pathname === '/clf/intro'

  const lessonCert = lessonId?.startsWith('clf-') ? 'clf'
    : lessonId?.startsWith('aif-') ? 'aif'
    : 'saa'
  const certHref = lessonCert === 'clf' ? '/clf' : lessonCert === 'aif' ? '/aif' : '/saa'
  const certCode  = lessonCert === 'clf' ? 'CLF-C02' : lessonCert === 'aif' ? 'AIF-C01' : 'SAA-C03'

  return (
    // Always dark navy: never changes between light/dark mode
    <header className="h-12 flex items-center justify-between px-3 border-b border-white/10 bg-[#232F3E] flex-shrink-0 gap-3">

      {/* Left: toggle + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="flex-shrink-0 p-1.5 rounded-lg transition-colors text-white/60 hover:text-white hover:bg-white/10"
        >
          <PanelLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5 text-sm text-white/50 min-w-0">
          <Link to="/" className="hover:text-white transition-colors flex-shrink-0">
            <Home size={14} />
          </Link>

          {/* Cert home page */}
          {!lessonMeta && !isDictionary && !isIntro && activeCert && (
            <>
              <span className="text-white/25">/</span>
              <span className="text-xs font-semibold text-white/80">
                {activeCert === 'clf' ? 'CLF-C02' : activeCert === 'aif' ? 'AIF-C01' : 'SAA-C03'}
              </span>
            </>
          )}

          {/* Dictionary */}
          {isDictionary && (
            <>
              <span className="text-white/25">/</span>
              <span className="text-xs font-semibold text-white/80">Services Dictionary</span>
            </>
          )}

          {/* Intro pages */}
          {isIntro && (
            <>
              <span className="text-white/25">/</span>
              <span className="text-xs font-semibold text-white/80">Exam Introduction</span>
            </>
          )}

          {/* Lesson */}
          {lessonMeta && (
            <>
              <span className="text-white/25 flex-shrink-0">/</span>
              <Link to={certHref} className="text-xs text-white/40 hover:text-white/70 flex-shrink-0 transition-colors font-medium">
                {certCode}
              </Link>
              <span className="text-white/25 flex-shrink-0">/</span>
              <span className="text-xs font-semibold text-white/80 truncate">{lessonMeta.title}</span>
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
              title={cert.available ? `Switch to ${cert.name}` : `${cert.name}: coming soon`}
              className={cn(
                'relative text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all select-none',
                isActive
                  ? 'bg-[#FF9900] text-[#232F3E]'
                  : cert.available
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-white/25 cursor-not-allowed'
              )}
            >
              {cert.name}
              {!cert.available && (
                <span className="absolute -top-1.5 -right-1 text-[8px] font-semibold bg-white/10 text-white/40 px-1 rounded-full leading-4">
                  soon
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Right: search + AWS Certs link */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <ServiceSearch activeCert={activeCert} />
        <a
          href="https://aws.amazon.com/certification/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/80 flex items-center gap-1 transition-colors hidden lg:flex"
        >
          AWS Certs <ExternalLink size={11} />
        </a>
      </div>
    </header>
  )
}

