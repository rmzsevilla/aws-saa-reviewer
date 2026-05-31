import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { AWS_SERVICES } from '../data/awsServices'
import { ICON_MAP } from './ServiceIcon'

// Build a flat, sorted list once at module load
const ALL_SERVICES = Object.values(AWS_SERVICES).sort((a, b) =>
  a.name.localeCompare(b.name)
)

function match(service, q) {
  const lq = q.toLowerCase()
  return (
    service.name.toLowerCase().includes(lq) ||
    service.fullName.toLowerCase().includes(lq) ||
    service.id.toLowerCase().includes(lq)
  )
}

// Services whose name starts with the query come first
function rank(results, q) {
  const lq = q.toLowerCase()
  return [...results].sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(lq)
    const bStarts = b.name.toLowerCase().startsWith(lq)
    if (aStarts && !bStarts) return -1
    if (!aStarts && bStarts) return 1
    return a.name.localeCompare(b.name)
  })
}

export default function ServiceSearch({ activeCert }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Close on navigation
  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [location.pathname, location.search])

  const results = query.trim().length > 0
    ? rank(ALL_SERVICES.filter((s) => match(s, query.trim())), query.trim()).slice(0, 8)
    : []

  const isOpen = open && results.length > 0

  function go(service) {
    const certParam = activeCert === 'clf' ? '?cert=clf&' : '?'
    navigate(`/dictionary${certParam}focus=${service.id}`)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  function handleKey(e) {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[cursor]) go(results[cursor])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  function handleChange(e) {
    setQuery(e.target.value)
    setOpen(true)
    setCursor(0)
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[cursor]
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      {/* Input */}
      <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 focus-within:bg-white/15 border border-white/15 focus-within:border-white/30 rounded-lg px-2.5 h-7 transition-colors w-48 focus-within:w-64 duration-200">
        <Search size={12} className="text-white/50 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKey}
          placeholder="Search services..."
          className="bg-transparent text-[12px] text-white placeholder-white/35 outline-none flex-1 min-w-0"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false) }} className="text-white/40 hover:text-white/70 flex-shrink-0">
            <X size={11} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#1a2433] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          <ul ref={listRef} className="max-h-72 overflow-y-auto py-1">
            {results.map((service, i) => {
              const svgSrc = ICON_MAP[service.id]
              const isActive = i === cursor
              return (
                <li key={service.id}>
                  <button
                    onMouseEnter={() => setCursor(i)}
                    onMouseDown={(e) => { e.preventDefault(); go(service) }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10">
                      {svgSrc
                        ? <img src={svgSrc} alt={service.name} className="w-6 h-6" />
                        : <span className="text-[9px] font-black text-white">{service.name.slice(0, 2)}</span>
                      }
                    </div>
                    {/* Text */}
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white leading-tight">{service.name}</p>
                      <p className="text-[10px] text-white/40 truncate leading-tight">{service.fullName}</p>
                    </div>
                    {/* Dictionary hint */}
                    <span className="ml-auto text-[10px] text-white/25 flex-shrink-0">Dictionary</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-white/5 px-3 py-1.5 flex items-center gap-2 text-[10px] text-white/30">
            <span>↑↓ navigate</span>
            <span>·</span>
            <span>Enter to open</span>
            <span>·</span>
            <span>Esc to close</span>
          </div>
        </div>
      )}
    </div>
  )
}
