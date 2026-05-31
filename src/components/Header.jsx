import { useLocation, Link } from 'react-router-dom'
import { Home, ExternalLink, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLessonMeta } from '../data/curriculum'

const CERT_LABELS = {
  '/saa': { label: 'SAA-C03', color: 'text-blue-500' },
  '/clf': { label: 'CLF-C02', color: 'text-sky-500' },
  '/aif': { label: 'AIF-C01', color: 'text-violet-500' },
}

export default function Header({ sidebarOpen, onToggleSidebar }) {
  const location = useLocation()
  const match = location.pathname.match(/^\/lessons\/(.+)$/)
  const lessonId = match?.[1]
  const lessonMeta = lessonId ? getLessonMeta(lessonId) : null
  const isDictionary = location.pathname === '/dictionary'
  const isIntro = location.pathname === '/intro'
  const certLabel = CERT_LABELS[location.pathname]

  // Derive cert context from lesson prefix for lesson pages
  const lessonCert = lessonId?.startsWith('clf-') ? 'clf'
    : lessonId?.startsWith('aif-') ? 'aif'
    : 'saa'

  const certHref = lessonCert === 'clf' ? '/clf' : lessonCert === 'aif' ? '/aif' : '/saa'
  const certCode  = lessonCert === 'clf' ? 'CLF-C02' : lessonCert === 'aif' ? 'AIF-C01' : 'SAA-C03'

  return (
    <header className="h-12 flex items-center justify-between px-3 border-b border-[#e68a00] bg-[#FF9900] flex-shrink-0 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {/* Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="flex-shrink-0 p-1.5 rounded-lg transition-colors text-[#232F3E] hover:bg-black/10"
        >
          <PanelLeft size={15} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#232F3E]/70 min-w-0">
          {/* Home always goes to cert picker */}
          <Link to="/" className="hover:text-[#232F3E] transition-colors flex-shrink-0">
            <Home size={14} />
          </Link>

          {/* Cert home breadcrumb (e.g. /saa, /clf) */}
          {certLabel && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-xs font-bold text-[#232F3E]">{certLabel.label}</span>
            </>
          )}

          {/* Dictionary breadcrumb */}
          {isDictionary && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-[#232F3E] text-xs font-semibold">AWS Services Dictionary</span>
            </>
          )}

          {/* Intro breadcrumb */}
          {isIntro && (
            <>
              <span className="text-[#232F3E]/40">/</span>
              <span className="text-[#232F3E] text-xs font-semibold">Exam Introduction</span>
            </>
          )}

          {/* Lesson breadcrumb */}
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
