import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AWS_SERVICES, CATEGORIES, getUsedCategories } from '../data/awsServices'
import { CLF_SERVICE_IDS } from '../data/cert-services'
import ServiceIcon from '../components/ServiceIcon'

const CERT_FILTERS = [
  { id: 'all', label: 'All Services', count: Object.keys(AWS_SERVICES).length },
  { id: 'clf', label: 'CLF-C02', count: Object.keys(AWS_SERVICES).filter((id) => CLF_SERVICE_IDS.has(id)).length },
  { id: 'saa', label: 'SAA-C03', count: Object.keys(AWS_SERVICES).length },
]

export default function Dictionary() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')
  const [expanded, setExpanded] = useState({})

  // Cert filter driven by URL param ?cert=clf|saa|all
  const certParam = searchParams.get('cert') ?? 'all'
  const certFilter = ['clf', 'saa', 'all'].includes(certParam) ? certParam : 'all'

  const setCertFilter = (val) => {
    setSearchParams(val === 'all' ? {} : { cert: val }, { replace: true })
  }

  const categories = getUsedCategories()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return Object.values(AWS_SERVICES).filter((s) => {
      const matchCert = certFilter === 'all' || certFilter === 'saa'
        ? true
        : CLF_SERVICE_IDS.has(s.id)
      const matchCat = selectedCat === 'all' || s.category === selectedCat
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.fullName.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      return matchCert && matchCat && matchQ
    })
  }, [query, selectedCat, certFilter])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach((s) => {
      if (!groups[s.category]) groups[s.category] = []
      groups[s.category].push(s)
    })
    return groups
  }, [filtered])

  const toggleService = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  const certLabel = certFilter === 'clf' ? 'CLF-C02' : certFilter === 'saa' ? 'SAA-C03' : 'all exams'

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
            alt="AWS"
            className="h-7 w-auto dark:invert"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Services Dictionary</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {certFilter === 'clf'
                ? 'Services covered in the CLF-C02 exam'
                : 'All AWS services covered across certification exams'}
            </p>
          </div>
        </div>
      </div>

      {/* Cert filter tabs */}
      <div className="flex gap-1.5 mb-5 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl w-fit">
        {CERT_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setCertFilter(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              certFilter === f.id
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            )}
          >
            {f.label}
            {f.id === 'clf' && (
              <span className="ml-1.5 text-[10px] text-sky-500 font-bold">{CERT_FILTERS[1].count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-aws-orange/40 focus:border-aws-orange/60 transition"
          />
        </div>
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-aws-orange/40"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 dark:text-slate-500 mb-5">
        {filtered.length} service{filtered.length !== 1 ? 's' : ''} for {certLabel}
      </p>

      {/* Service cards grouped by category */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([catKey, services]) => {
          const cat = CATEGORIES[catKey]
          if (!cat) return null
          return (
            <div key={catKey}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <h2 className="text-sm font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest">{cat.label}</h2>
                <span className="text-xs text-gray-400 dark:text-slate-500">({services.length})</span>
              </div>

              <div className="space-y-2">
                {services.map((service) => {
                  const isOpen = expanded[service.id]
                  const inClf = CLF_SERVICE_IDS.has(service.id)
                  return (
                    <div
                      key={service.id}
                      className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleService(service.id)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <ServiceIcon name={service.id} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-900 dark:text-slate-100">{service.name}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 truncate">{service.fullName}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: cat.color + '18', color: cat.color }}
                            >
                              {cat.label}
                            </span>
                            {/* CLF badge when showing all services */}
                            {certFilter === 'all' && inClf && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                CLF
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 truncate">{service.description}</p>
                        </div>
                        {isOpen ? <ChevronDown size={14} className="text-gray-400 flex-shrink-0" /> : <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-slate-800 animate-fade-in">
                          <p className="text-sm text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{service.description}</p>

                          <div className="grid sm:grid-cols-2 gap-4">
                            {service.keyFacts?.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Key Facts</p>
                                <ul className="space-y-1.5">
                                  {service.keyFacts.map((f, i) => (
                                    <li key={i} className="text-xs text-gray-600 dark:text-slate-400 flex gap-1.5 items-start">
                                      <span className="text-aws-orange flex-shrink-0 mt-0.5">▸</span>
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {service.examTips?.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-2">Exam Tips</p>
                                <ul className="space-y-1.5">
                                  {service.examTips.map((t, i) => (
                                    <li key={i} className="text-xs text-gray-600 dark:text-slate-400 flex gap-1.5 items-start">
                                      <span className="text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5">★</span>
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {service.relatedServices?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                              <span className="text-xs text-gray-400 dark:text-slate-500">Related:</span>
                              {service.relatedServices.map((rel) => {
                                const relSvc = AWS_SERVICES[rel]
                                const relColor = relSvc ? (CATEGORIES[relSvc.category]?.color || '#FF9900') : '#FF9900'
                                return (
                                  <span key={rel} className="text-xs px-2 py-0.5 rounded-full font-medium border" style={{ borderColor: relColor + '40', backgroundColor: relColor + '15', color: relColor }}>
                                    {rel}
                                  </span>
                                )
                              })}
                            </div>
                          )}

                          {service.lessonId && (
                            <a href={`/lessons/${service.lessonId}`} className="inline-flex items-center gap-1 text-xs text-aws-orange hover:underline mt-3">
                              Open lesson <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 dark:text-slate-400">No services match your filters</p>
            <button onClick={() => { setQuery(''); setSelectedCat('all'); setCertFilter('all') }} className="mt-3 text-xs text-aws-orange hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
