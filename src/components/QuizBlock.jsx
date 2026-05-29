import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import clsx from 'clsx'

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
      <div className="my-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 overflow-hidden">
        <div className="p-6 text-center">
          <Trophy size={36} className={clsx('mx-auto mb-3', pct >= 80 ? 'text-aws-orange' : 'text-gray-400 dark:text-slate-500')} />
          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">{score} / {questions.length}</p>
          <p className={clsx('text-sm font-medium mb-4', pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400')}>
            {pct >= 80 ? 'Excellent work! 🎉' : pct >= 60 ? 'Getting there — keep reviewing!' : 'Review this lesson again'}
          </p>
          <div className="space-y-3 text-left mt-6">
            {questions.map((q, i) => {
              const correct = answers[i] === q.answer
              return (
                <div key={i} className={clsx('rounded-xl p-3 text-sm border', correct ? 'border-emerald-200 dark:border-emerald-600/30 bg-emerald-50 dark:bg-emerald-500/5' : 'border-red-200 dark:border-red-600/30 bg-red-50 dark:bg-red-500/5')}>
                  <div className="flex gap-2 items-start mb-1">
                    {correct ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="text-gray-700 dark:text-slate-300">{q.question}</p>
                  </div>
                  {!correct && (
                    <p className="ml-5 text-xs text-gray-500 dark:text-slate-400 mt-1">
                      Correct: <span className="text-emerald-600 dark:text-emerald-400 font-medium">{q.options[q.answer]}</span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          <button onClick={handleReset} className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg text-sm transition-colors">
            <RotateCcw size={14} /> Retry Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 dark:text-slate-400">{current + 1} / {questions.length}</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full mb-5 overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-800">
          <p className="text-gray-900 dark:text-slate-200 text-sm font-medium leading-relaxed">{q.question}</p>
        </div>
        <div className="p-4 space-y-2">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isRight = i === q.answer
            let cls = 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600 cursor-pointer'
            if (isAnswered) {
              if (isRight) cls = 'border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 cursor-default'
              else if (isSelected) cls = 'border-red-400 dark:border-red-500/60 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200 cursor-default'
              else cls = 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/20 text-gray-400 dark:text-slate-500 opacity-60 cursor-default'
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} className={clsx('w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150', cls)}>
                <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={clsx('px-5 py-3 border-t text-sm', isCorrect ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20')}>
            <div className="flex items-center gap-2 mb-1">
              {isCorrect ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" /> : <XCircle size={14} className="text-red-500 flex-shrink-0" />}
              <p className={clsx('font-semibold text-xs', isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400')}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
            </div>
            <p className="text-gray-600 dark:text-slate-400 text-xs ml-5 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <div className="px-4 pb-4 pt-2">
            <button onClick={handleNext} className="w-full py-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 text-sm font-medium transition-colors">
              {current < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
