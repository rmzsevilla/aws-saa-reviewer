import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function QuizBlock({ questions, onComplete }) {
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const q = questions[current]
  const selected = answers[current]
  const isAnswered = selected !== undefined
  const isCorrect = selected === q.answer

  const handleSelect = (i) => {
    if (isAnswered) return
    setAnswers((prev) => ({ ...prev, [current]: i }))
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
    } else {
      const score = questions.filter((_, i) => answers[i] === questions[i].answer).length
      setShowResults(true)
      onComplete?.(score, questions.length)
    }
  }

  const handleReset = () => { setAnswers({}); setCurrent(0); setShowResults(false) }

  if (showResults) {
    const score = questions.filter((_, i) => answers[i] === questions[i].answer).length
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 text-center">
          <Trophy size={36} className={cn('mx-auto mb-3', pct >= 80 ? 'text-aws-orange' : 'text-muted-foreground')} />
          <p className="text-2xl font-bold text-foreground mb-1">{score} / {questions.length}</p>
          <p className={cn('text-sm font-medium mb-4',
            pct >= 80 ? 'text-emerald-600 dark:text-emerald-400'
            : pct >= 60 ? 'text-yellow-600 dark:text-yellow-400'
            : 'text-red-600 dark:text-red-400'
          )}>
            {pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Getting there — keep reviewing!' : 'Review this lesson again'}
          </p>
          <div className="space-y-3 text-left mt-6">
            {questions.map((q, i) => {
              const correct = answers[i] === q.answer
              return (
                <div key={i} className={cn('rounded-xl p-3 text-sm border',
                  correct
                    ? 'border-emerald-200 dark:border-emerald-600/30 bg-emerald-50 dark:bg-emerald-500/5'
                    : 'border-red-200 dark:border-red-600/30 bg-red-50 dark:bg-red-500/5'
                )}>
                  <div className="flex gap-2 items-start mb-1">
                    {correct
                      ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <XCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="text-foreground/80">{q.question}</p>
                  </div>
                  {!correct && (
                    <p className="ml-5 text-xs text-muted-foreground mt-1">
                      Correct: <span className="text-emerald-600 dark:text-emerald-400 font-medium">{q.options[q.answer]}</span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="mt-6 mx-auto flex gap-2">
            <RotateCcw size={14} /> Retry Quiz
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">{current + 1} / {questions.length}</span>
      </div>

      {/* Progress */}
      <Progress
        value={((current + 1) / questions.length) * 100}
        className="mb-5 [&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:bg-purple-500"
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <p className="text-foreground text-sm font-medium leading-relaxed">{q.question}</p>
        </div>
        <div className="p-4 space-y-2">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isRight = i === q.answer
            let cls = 'border-border bg-muted/30 text-foreground/80 hover:bg-muted hover:border-border/80 cursor-pointer'
            if (isAnswered) {
              if (isRight) cls = 'border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 cursor-default'
              else if (isSelected) cls = 'border-red-400 dark:border-red-500/60 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200 cursor-default'
              else cls = 'border-border/40 bg-muted/10 text-muted-foreground opacity-50 cursor-default'
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn('w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150', cls)}
              >
                <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={cn('px-5 py-3 border-t text-sm',
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'
              : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20'
          )}>
            <div className="flex items-center gap-2 mb-1">
              {isCorrect
                ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                : <XCircle size={14} className="text-red-500 flex-shrink-0" />}
              <p className={cn('font-semibold text-xs',
                isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
              )}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
            </div>
            <p className="text-muted-foreground text-xs ml-5 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <div className="px-4 pb-4 pt-2">
            <Button variant="secondary" className="w-full" onClick={handleNext}>
              {current < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
