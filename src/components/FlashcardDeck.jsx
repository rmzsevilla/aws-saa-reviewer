import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, CheckCircle2, XCircle } from 'lucide-react'
import clsx from 'clsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardDeck({ cards }) {
  const [deck, setDeck] = useState(cards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [mastered, setMastered] = useState(new Set())

  const visible = deck.filter((_, i) => !mastered.has(i))
  const currentOrigIndex = deck.indexOf(visible[index] || deck[0])
  const card = visible[index] || deck[0]

  const next = useCallback(() => {
    setFlipped(false)
    setIndex((i) => (i + 1) % Math.max(visible.length, 1))
  }, [visible.length])

  const prev = useCallback(() => {
    setFlipped(false)
    setIndex((i) => (i - 1 + Math.max(visible.length, 1)) % Math.max(visible.length, 1))
  }, [visible.length])

  const handleShuffle = () => { setDeck(shuffle(deck)); setIndex(0); setFlipped(false) }
  const handleReset = () => { setDeck(cards); setIndex(0); setFlipped(false); setMastered(new Set()) }

  const markMastered = () => {
    setMastered((prev) => new Set([...prev, currentOrigIndex]))
    setFlipped(false)
    const remaining = visible.length - 1
    if (remaining === 0) return
    setIndex((i) => Math.min(i, remaining - 1))
  }

  const unmaster = () => {
    setMastered((prev) => { const n = new Set(prev); n.delete(currentOrigIndex); return n })
  }

  if (!card) return null

  const remaining = visible.length
  const masteredCount = mastered.size

  return (
    <div className="my-6">
      {/* Stats row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{masteredCount} mastered</span>
          <span className="text-gray-400 dark:text-slate-600">/</span>
          <span className="text-gray-500 dark:text-slate-400">{cards.length} total</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500">{index + 1} / {remaining}</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${(masteredCount / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        className={clsx(
          'relative min-h-[180px] rounded-2xl border cursor-pointer select-none transition-all duration-200',
          flipped
            ? 'bg-white dark:bg-slate-800 border-aws-orange/50 shadow-md'
            : 'bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
        )}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="absolute top-3 right-3">
          <span className="text-xs text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-900/80 px-2 py-0.5 rounded-full">
            {index + 1}/{remaining}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={clsx(
            'text-xs font-semibold px-2 py-0.5 rounded-full',
            flipped
              ? 'bg-aws-orange/20 text-aws-orange'
              : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
          )}>
            {flipped ? 'Answer' : 'Question'}
          </span>
        </div>
        <div className="flex items-center justify-center min-h-[180px] px-8 py-12 text-center">
          <p className={clsx('text-sm sm:text-base leading-relaxed whitespace-pre-line', flipped ? 'text-gray-900 dark:text-slate-100' : 'text-gray-700 dark:text-slate-300')}>
            {flipped ? card.back : card.front}
          </p>
        </div>
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-300 dark:text-slate-600">
          Click to {flipped ? 'see question' : 'reveal answer'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <div className="flex items-center gap-1">
          <button onClick={handleShuffle} className="p-2 rounded-lg text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Shuffle">
            <Shuffle size={14} />
          </button>
          <button onClick={handleReset} className="p-2 rounded-lg text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Reset">
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {flipped && (
          <div>
            {mastered.has(currentOrigIndex) ? (
              <button onClick={unmaster} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                <XCircle size={13} /> Unmark
              </button>
            ) : (
              <button onClick={markMastered} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-600/30 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 transition-colors">
                <CheckCircle2 size={13} /> Mastered
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
