import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CertPicker from './pages/CertPicker'
import Home from './pages/Home'
import ClfHome from './pages/ClfHome'
import Intro from './pages/Intro'
import ClfIntro from './pages/ClfIntro'
import LessonPage from './pages/LessonPage'
import Dictionary from './pages/Dictionary'

function getActiveCert(pathname, search) {
  // Path-based detection (most reliable)
  if (pathname === '/clf' || pathname.startsWith('/clf/') || pathname.startsWith('/lessons/clf-')) return 'clf'
  // aif: pathname === '/aif' || pathname.startsWith('/aif/') || pathname.startsWith('/lessons/aif-')

  // Query-param fallback for cert-agnostic pages like /dictionary and /intro
  const params = new URLSearchParams(search)
  const certParam = params.get('cert')
  if (certParam === 'clf') return 'clf'

  return 'saa'
}

export default function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const mainRef = useRef(null)

  // Scroll the content area to the top on every route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  const activeCert = getActiveCert(location.pathname, location.search)

  // Cert picker is a full-screen experience: no sidebar or header
  if (location.pathname === '/') {
    return (
      <Routes>
        <Route path="/" element={<CertPicker />} />
      </Routes>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0ECE4] dark:bg-[#080d13]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCert={activeCert}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} activeCert={activeCert} />
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-[#F0ECE4] dark:bg-[#080d13]">
          <Routes>
            <Route path="/saa" element={<Home />} />
            <Route path="/clf" element={<ClfHome />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/clf/intro" element={<ClfIntro />} />
            <Route path="/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
