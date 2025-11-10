import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX, Eye, EyeOff, Type, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface AccessibilityContextType {
  // Screen reader support
  announceToScreenReader: (message: string) => void
  isScreenReaderEnabled: boolean

  // Focus management
  trapFocus: (element: HTMLElement) => () => void
  restoreFocus: () => void
  setFocus: (element: HTMLElement) => void

  // Reduced motion
  prefersReducedMotion: boolean
  toggleReducedMotion: () => void

  // High contrast mode
  highContrastMode: boolean
  toggleHighContrast: () => void

  // Font size controls
  fontSize: 'small' | 'medium' | 'large'
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void

  // Visual indicators
  showFocusIndicators: boolean
  toggleFocusIndicators: () => void

  // Keyboard navigation
  keyboardNavEnabled: boolean
  toggleKeyboardNav: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  // Screen reader support
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false)
  const announcerRef = useRef<HTMLDivElement>(null)

  // Focus management
  const lastFocusedElement = useRef<HTMLElement | null>(null)
  const focusTrapStack = useRef<HTMLElement[]>([])

  // Reduced motion
  const systemPrefersReducedMotion = useReducedMotion()
  const [manualReducedMotion, setManualReducedMotion] = useState(false)
  const prefersReducedMotion = systemPrefersReducedMotion || manualReducedMotion

  // High contrast mode
  const [highContrastMode, setHighContrastMode] = useState(false)

  // Font size
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  // Focus indicators
  const [showFocusIndicators, setShowFocusIndicators] = useState(true)

  // Keyboard navigation
  const [keyboardNavEnabled, setKeyboardNavEnabled] = useState(true)

  // Screen reader announcements
  const announceToScreenReader = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = message
      // Clear the announcement after it's been read
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [])

  // Focus management
  const trapFocus = useCallback((element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length === 0) return () => {}

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    focusTrapStack.current.push(element)

    // Focus first element
    firstElement?.focus()

    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleKeyDown)
      const index = focusTrapStack.current.indexOf(element)
      if (index > -1) {
        focusTrapStack.current.splice(index, 1)
      }
    }
  }, [])

  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus()
      lastFocusedElement.current = null
    }
  }, [])

  const setFocus = useCallback((element: HTMLElement) => {
    lastFocusedElement.current = document.activeElement as HTMLElement
    element.focus()
  }, [])

  // Motion controls
  const toggleReducedMotion = useCallback(() => {
    setManualReducedMotion(prev => !prev)
    announceToScreenReader(`Reduced motion ${!manualReducedMotion ? 'enabled' : 'disabled'}`)
  }, [manualReducedMotion, announceToScreenReader])

  // High contrast mode
  const toggleHighContrast = useCallback(() => {
    setHighContrastMode(prev => !prev)
    announceToScreenReader(`High contrast mode ${!highContrastMode ? 'enabled' : 'disabled'}`)
  }, [highContrastMode, announceToScreenReader])

  // Font size controls
  const increaseFontSize = useCallback(() => {
    setFontSize(prev => {
      if (prev === 'small') return 'medium'
      if (prev === 'medium') return 'large'
      return prev
    })
    announceToScreenReader('Font size increased')
  }, [announceToScreenReader])

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => {
      if (prev === 'large') return 'medium'
      if (prev === 'medium') return 'small'
      return prev
    })
    announceToScreenReader('Font size decreased')
  }, [announceToScreenReader])

  const resetFontSize = useCallback(() => {
    setFontSize('medium')
    announceToScreenReader('Font size reset to default')
  }, [announceToScreenReader])

  // Focus indicators
  const toggleFocusIndicators = useCallback(() => {
    setShowFocusIndicators(prev => !prev)
    announceToScreenReader(`Focus indicators ${!showFocusIndicators ? 'enabled' : 'disabled'}`)
  }, [showFocusIndicators, announceToScreenReader])

  // Keyboard navigation
  const toggleKeyboardNav = useCallback(() => {
    setKeyboardNavEnabled(prev => !prev)
    announceToScreenReader(`Keyboard navigation ${!keyboardNavEnabled ? 'enabled' : 'disabled'}`)
  }, [keyboardNavEnabled, announceToScreenReader])

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement

    // Apply reduced motion
    if (prefersReducedMotion) {
      root.style.setProperty('--motion-duration', '0s')
      root.classList.add('reduce-motion')
    } else {
      root.style.removeProperty('--motion-duration')
      root.classList.remove('reduce-motion')
    }

    // Apply high contrast mode
    if (highContrastMode) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply font size
    root.setAttribute('data-font-size', fontSize)
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }
    root.style.setProperty('--font-size-base', fontSizeMap[fontSize])

    // Apply focus indicators
    if (showFocusIndicators) {
      root.classList.add('show-focus-indicators')
    } else {
      root.classList.remove('show-focus-indicators')
    }

    // Apply keyboard navigation styles
    if (keyboardNavEnabled) {
      root.classList.add('keyboard-nav')
    } else {
      root.classList.remove('keyboard-nav')
    }
  }, [prefersReducedMotion, highContrastMode, fontSize, showFocusIndicators, keyboardNavEnabled])

  // Detect screen reader
  useEffect(() => {
    const handleScreenReaderChange = () => {
      const isScreenReader = window.speechSynthesis || navigator.userAgent.includes('NVDA') || navigator.userAgent.includes('JAWS')
      setIsScreenReaderEnabled(isScreenReader)
    }

    handleScreenReaderChange()
    window.addEventListener('resize', handleScreenReaderChange)
    return () => window.removeEventListener('resize', handleScreenReaderChange)
  }, [])

  // Global keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A: Open accessibility panel
      if (e.altKey && e.key === 'a') {
        e.preventDefault()
        // Toggle accessibility panel (would need to implement panel state)
        announceToScreenReader('Accessibility panel')
      }

      // Alt + M: Toggle reduced motion
      if (e.altKey && e.key === 'm') {
        e.preventDefault()
        toggleReducedMotion()
      }

      // Alt + C: Toggle high contrast
      if (e.altKey && e.key === 'c') {
        e.preventDefault()
        toggleHighContrast()
      }

      // Alt + Plus: Increase font size
      if (e.altKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault()
        increaseFontSize()
      }

      // Alt + Minus: Decrease font size
      if (e.altKey && e.key === '-') {
        e.preventDefault()
        decreaseFontSize()
      }

      // Alt + 0: Reset font size
      if (e.altKey && e.key === '0') {
        e.preventDefault()
        resetFontSize()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleReducedMotion, toggleHighContrast, increaseFontSize, decreaseFontSize, resetFontSize, announceToScreenReader])

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    isScreenReaderEnabled,
    trapFocus,
    restoreFocus,
    setFocus,
    prefersReducedMotion,
    toggleReducedMotion,
    highContrastMode,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    showFocusIndicators,
    toggleFocusIndicators,
    keyboardNavEnabled,
    toggleKeyboardNav,
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}

      {/* Screen reader announcer */}
      <div
        ref={announcerRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Skip links */}
      <SkipLinks />

      {/* Accessibility controls */}
      <AccessibilityControls />
    </AccessibilityContext.Provider>
  )
}

// Skip links component
function SkipLinks() {
  return (
    <div className="sr-only">
      <a
        href="#main-content"
        className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Skip to navigation
      </a>
      <a
        href="#accessibility-controls"
        className="focus:not-sr-only focus:absolute focus:top-28 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Accessibility controls
      </a>
    </div>
  )
}

// Accessibility controls component
function AccessibilityControls() {
  const {
    prefersReducedMotion,
    toggleReducedMotion,
    highContrastMode,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    showFocusIndicators,
    toggleFocusIndicators,
    announceToScreenReader
  } = useAccessibility()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        id="accessibility-controls"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        aria-label="Accessibility controls (Alt + A)"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Type className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-6 z-40 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Accessibility Settings
            </h3>

            <div className="space-y-4">
              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {prefersReducedMotion ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Reduce Motion
                  </span>
                </div>
                <button
                  onClick={() => {
                    toggleReducedMotion()
                    announceToScreenReader('Motion preference updated')
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    prefersReducedMotion ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  aria-pressed={prefersReducedMotion}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      prefersReducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    High Contrast
                  </span>
                </div>
                <button
                  onClick={() => {
                    toggleHighContrast()
                    announceToScreenReader('Contrast preference updated')
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    highContrastMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  aria-pressed={highContrastMode}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrastMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Type className="h-4 w-4" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Font Size
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      decreaseFontSize()
                      announceToScreenReader('Font size decreased')
                    }}
                    disabled={fontSize === 'small'}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease font size"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {fontSize === 'small' ? 'Small' : fontSize === 'medium' ? 'Medium' : 'Large'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      increaseFontSize()
                      announceToScreenReader('Font size increased')
                    }}
                    disabled={fontSize === 'large'}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase font size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      resetFontSize()
                      announceToScreenReader('Font size reset')
                    }}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Reset font size"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Focus Indicators */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <EyeOff className="h-4 w-4" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Focus Indicators
                  </span>
                </div>
                <button
                  onClick={() => {
                    toggleFocusIndicators()
                    announceToScreenReader('Focus indicators updated')
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showFocusIndicators ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  aria-pressed={showFocusIndicators}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showFocusIndicators ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Keyboard shortcuts: Alt+M (motion), Alt+C (contrast), Alt+Plus/Minus (font size)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}