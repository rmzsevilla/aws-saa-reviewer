import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Home from './pages/Home'
import LessonPage from './pages/LessonPage'
import Dictionary from './pages/Dictionary'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
