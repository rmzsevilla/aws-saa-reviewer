import { useState, useCallback } from 'react'

const STORAGE_KEY = 'aws-saa-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const markComplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const next = { ...prev, [lessonId]: { ...prev[lessonId], completed: true, completedAt: Date.now() } }
      saveProgress(next)
      return next
    })
  }, [])

  const markIncomplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const next = { ...prev, [lessonId]: { ...prev[lessonId], completed: false } }
      saveProgress(next)
      return next
    })
  }, [])

  const saveQuizScore = useCallback((lessonId, score, total) => {
    setProgress((prev) => {
      const existing = prev[lessonId] || {}
      const best = existing.bestScore ?? 0
      const next = {
        ...prev,
        [lessonId]: {
          ...existing,
          bestScore: Math.max(best, score),
          lastScore: score,
          totalQuestions: total,
          quizAttempts: (existing.quizAttempts || 0) + 1,
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isCompleted = useCallback((lessonId) => !!progress[lessonId]?.completed, [progress])

  const getScore = useCallback((lessonId) => progress[lessonId]?.bestScore ?? null, [progress])

  const completedCount = Object.values(progress).filter((v) => v.completed).length

  return { progress, markComplete, markIncomplete, saveQuizScore, isCompleted, getScore, completedCount }
}
