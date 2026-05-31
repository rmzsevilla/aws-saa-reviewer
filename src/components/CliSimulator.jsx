import { useState, useRef, useEffect } from 'react'
import { Terminal, CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy } from 'lucide-react'
import clsx from 'clsx'

const PROMPT = 'aws'

function parseLine(line) {
  // Colorize key patterns in output
  if (line.startsWith('ERROR') || line.startsWith('An error')) return { text: line, color: 'text-red-400' }
  if (line.startsWith('{') || line.startsWith('}') || line.startsWith('"') || line.startsWith('  "')) return { text: line, color: 'text-emerald-300' }
  if (line.startsWith('#')) return { text: line, color: 'text-slate-500' }
  if (line.includes('arn:aws')) return { text: line, color: 'text-aws-orange' }
  return { text: line, color: 'text-slate-300' }
}

export default function CliSimulator({ exercises }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([]) // { type: 'cmd'|'out'|'err'|'hint', text }
  const [cmdHistory, setCmdHistory] = useState([])
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1)
  const [done, setDone] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  const exercise = exercises[currentIdx]

  useEffect(() => {
    // Only auto-scroll the terminal once the user has run a command: never on
    // mount (that would yank the whole page down to the terminal on load).
    if (history.length === 0) return
    const el = bottomRef.current
    if (el) el.parentElement?.scrollTo({ top: el.parentElement.scrollHeight, behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [currentIdx])

  const normalize = (cmd) => cmd.trim().replace(/\s+/g, ' ').toLowerCase()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const trimmed = input.trim()
    setCmdHistory((h) => [trimmed, ...h])
    setCmdHistoryIdx(-1)

    const entry = [{ type: 'cmd', text: `$ ${trimmed}` }]

    // Check if command matches expected (flexible: ignore extra spaces, case-insensitive flags)
    const isCorrect = exercise.accept
      ? exercise.accept.some((a) => normalize(trimmed) === normalize(a))
      : normalize(trimmed) === normalize(exercise.command)

    if (isCorrect) {
      const outputLines = Array.isArray(exercise.output) ? exercise.output : [exercise.output]
      outputLines.forEach((l) => entry.push({ type: 'out', text: l }))
      entry.push({ type: 'success', text: `✓ Correct! ${exercise.successNote || ''}` })
      setHistory((h) => [...h, ...entry])
      setCompletedCount((c) => c + 1)
      setInput('')

      setTimeout(() => {
        if (currentIdx + 1 < exercises.length) {
          setCurrentIdx((i) => i + 1)
        } else {
          setDone(true)
        }
      }, 1200)
    } else {
      // Show partial output if wrong command but valid aws command
      entry.push({ type: 'err', text: `✗ Not quite. Check the command and try again.` })
      setHistory((h) => [...h, ...entry])
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1)
      setCmdHistoryIdx(next)
      setInput(cmdHistory[next] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(cmdHistoryIdx - 1, -1)
      setCmdHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  const showHint = () => {
    setHistory((h) => [...h, { type: 'hint', text: `Hint: ${exercise.hint}` }])
  }

  const reset = () => {
    setCurrentIdx(0)
    setHistory([])
    setCmdHistory([])
    setCompletedCount(0)
    setDone(false)
    setInput('')
  }

  if (done) {
    return (
      <div className="my-6 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-700">
          <Terminal size={13} className="text-aws-orange" />
          <span className="text-xs font-mono font-semibold text-slate-300">AWS CLI Lab</span>
        </div>
        <div className="bg-slate-950 p-8 text-center">
          <Trophy size={40} className="text-aws-orange mx-auto mb-3" />
          <p className="text-lg font-bold text-slate-100 mb-1">Lab Complete!</p>
          <p className="text-sm text-slate-400 mb-6">{completedCount} of {exercises.length} exercises completed</p>
          <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors">
            <RotateCcw size={13} /> Restart Lab
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Terminal header */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400 ml-2">AWS CLI Lab</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">{currentIdx + 1}/{exercises.length}</span>
      </div>

      {/* Exercise prompt */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3">
        <div className="flex items-start gap-2">
          <ChevronRight size={14} className="text-aws-orange flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-aws-orange uppercase tracking-wide mb-0.5">Exercise {currentIdx + 1}</p>
            <p className="text-sm text-slate-200 leading-relaxed">{exercise.task}</p>
            {exercise.context && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{exercise.context}</p>
            )}
          </div>
        </div>
        {exercise.hint && (
          <button onClick={showHint} className="mt-2 ml-5 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors">
            Show hint
          </button>
        )}
      </div>

      {/* Terminal output */}
      <div
        className="bg-slate-950 px-4 py-3 font-mono text-xs min-h-[120px] max-h-[260px] overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 && (
          <p className="text-slate-600 italic">Type a command below and press Enter...</p>
        )}
        {history.map((line, i) => {
          if (line.type === 'cmd') return <p key={i} className="text-slate-100">{line.text}</p>
          if (line.type === 'success') return (
            <p key={i} className="text-emerald-400 font-semibold mt-0.5">{line.text}</p>
          )
          if (line.type === 'err') return (
            <p key={i} className="text-red-400 mt-0.5">{line.text}</p>
          )
          if (line.type === 'hint') return (
            <p key={i} className="text-yellow-400 mt-0.5 italic">{line.text}</p>
          )
          const { text, color } = parseLine(line.text)
          return <p key={i} className={clsx('leading-relaxed', color)}>{text}</p>
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center gap-2">
        <span className="text-aws-orange font-mono text-xs font-bold flex-shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`aws ...`}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-600 outline-none caret-aws-orange"
        />
        <button type="submit" className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
          Enter ↵
        </button>
      </form>
    </div>
  )
}
