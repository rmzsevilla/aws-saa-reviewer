import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground">{cards.length} total</span>
        </div>
        <span className="text-xs text-muted-foreground">{index + 1} / {remaining}</span>
      </div>

      {/* Progress: emerald fill for mastery */}
      <Progress
        value={(masteredCount / cards.length) * 100}
        className="mb-4 [&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:bg-emerald-500"
      />

      {/* Card */}
      <div
        className={cn(
          'relative min-h-[180px] rounded-2xl border cursor-pointer select-none transition-all duration-200',
          flipped
            ? 'bg-card border-aws-orange/50 shadow-md'
            : 'bg-muted/30 border-border hover:border-border/80'
        )}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="absolute top-3 right-3">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {index + 1}/{remaining}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          {flipped ? (
            <Badge style={{ backgroundColor: '#FF990033', color: '#FF9900', borderColor: '#FF990055' }}>
              Answer
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Question
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-center min-h-[180px] px-8 py-12 text-center">
          <p className={cn('text-sm sm:text-base leading-relaxed whitespace-pre-line',
            flipped ? 'text-foreground' : 'text-foreground/80'
          )}>
            {flipped ? card.back : card.front}
          </p>
        </div>
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground/50">
          Click to {flipped ? 'see question' : 'reveal answer'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={handleShuffle} title="Shuffle">
            <Shuffle size={14} />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleReset} title="Reset">
            <RotateCcw size={14} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" onClick={prev}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={next}>
            <ChevronRight size={18} />
          </Button>
        </div>

        {flipped && (
          <div>
            {mastered.has(currentOrigIndex) ? (
              <Button variant="outline" size="sm" onClick={unmaster} className="gap-1.5 text-xs">
                <XCircle size={13} /> Unmark
              </Button>
            ) : (
              <Button size="sm" onClick={markMastered}
                className="gap-1.5 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-600/30 hover:bg-emerald-100 dark:hover:bg-emerald-600/20">
                <CheckCircle2 size={13} /> Mastered
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
