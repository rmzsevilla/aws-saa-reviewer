import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('aws-theme')
    return saved !== 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('aws-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Apply on first mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, []) // eslint-disable-line

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
