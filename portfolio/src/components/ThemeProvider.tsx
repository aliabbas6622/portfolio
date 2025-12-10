import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'dark'
        const saved = localStorage.getItem('theme') as Theme | null
        if (saved) return saved
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = document.documentElement

        // Add transition class for smooth color changes
        root.style.setProperty('--theme-transition', 'background-color 0.5s ease, color 0.3s ease')

        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
