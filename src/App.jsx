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

export default function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Cert picker is a full-screen experience with no sidebar or header
  if (location.pathname === '/') {
    return (
      <Routes>
        <Route path="/" element={<CertPicker />} />
      </Routes>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0ECE4] dark:bg-[#080d13]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
