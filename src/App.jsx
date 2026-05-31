import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CertPicker from './pages/CertPicker'
import Home from './pages/Home'
import ClfHome from './pages/ClfHome'
import Intro from './pages/Intro'
import LessonPage from './pages/LessonPage'
import Dictionary from './pages/Dictionary'

function getActiveCert(pathname) {
  if (pathname === '/clf' || pathname.startsWith('/lessons/clf-')) return 'clf'
  // aif can be added here when ready: pathname === '/aif' || pathname.startsWith('/lessons/aif-')
  return 'saa'
}

export default function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeCert = getActiveCert(location.pathname)

  // Cert picker is a full-screen experience — no sidebar or header
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
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto bg-[#F0ECE4] dark:bg-[#080d13]">
          <Routes>
            <Route path="/saa" element={<Home />} />
            <Route path="/clf" element={<ClfHome />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
