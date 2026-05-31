import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Home from './pages/Home'
import Intro from './pages/Intro'
import LessonPage from './pages/LessonPage'
import Dictionary from './pages/Dictionary'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F0ECE4] dark:bg-[#080d13]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#F0ECE4] dark:bg-[#080d13]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
