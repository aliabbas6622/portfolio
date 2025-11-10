import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, MessageCircle, Home, X, FlipHorizontal } from 'lucide-react'

interface MobileContextType {
  // Touch gestures
  enableSwipeGestures: boolean
  setEnableSwipeGestures: (enabled: boolean) => void

  // Pull to refresh
  enablePullToRefresh: boolean
  setEnablePullToRefresh: (enabled: boolean) => void

  // Touch feedback
  enableTouchFeedback: boolean
  setEnableTouchFeedback: (enabled: boolean) => void

  // Mobile-specific UI
  showBottomNav: boolean
  setShowBottomNav: (show: boolean) => void

  // Haptic feedback
  triggerHaptic: (type: 'light' | 'medium' | 'heavy') => void

  // Touch detection
  isTouchDevice: boolean
}

const MobileContext = createContext<MobileContextType | undefined>(undefined)

export function useMobileOptimizations() {
  const context = useContext(MobileContext)
  if (!context) {
    throw new Error('useMobileOptimizations must be used within a MobileOptimizationsProvider')
  }
  return context
}

interface MobileOptimizationsProviderProps {
  children: React.ReactNode
}

export function MobileOptimizationsProvider({ children }: MobileOptimizationsProviderProps) {
  // Touch detection
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Feature toggles
  const [enableSwipeGestures, setEnableSwipeGestures] = useState(true)
  const [enablePullToRefresh, setEnablePullToRefresh] = useState(true)
  const [enableTouchFeedback, setEnableTouchFeedback] = useState(true)
  const [showBottomNav, setShowBottomNav] = useState(true)

  // Pull to refresh state
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const currentY = useRef(0)

  // Touch gesture refs
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)

  // Haptic feedback
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [50],
        heavy: [100]
      }
      navigator.vibrate(patterns[type])
    }
  }, [])

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }

    checkTouchDevice()
    window.addEventListener('touchstart', checkTouchDevice, { once: true })
    return () => window.removeEventListener('touchstart', checkTouchDevice)
  }, [])

  // Pull to refresh functionality
  useEffect(() => {
    if (!enablePullToRefresh || !isTouchDevice) return

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return

      currentY.current = e.touches[0].clientY
      const distance = currentY.current - startY.current

      if (distance > 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, 120))
      }
    }

    const handleTouchEnd = () => {
      if (!isPulling) return

      if (pullDistance > 80) {
        // Trigger refresh
        triggerHaptic('medium')
        window.location.reload()
      }

      setIsPulling(false)
      setPullDistance(0)
      startY.current = 0
      currentY.current = 0
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enablePullToRefresh, isPulling, pullDistance, isTouchDevice, triggerHaptic])

  // Touch gesture handling for navigation
  useEffect(() => {
    if (!enableSwipeGestures || !isTouchDevice) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX
      touchEndY.current = e.changedTouches[0].clientY

      handleSwipeGesture()
    }

    const handleSwipeGesture = () => {
      const deltaX = touchEndX.current - touchStartX.current
      const deltaY = Math.abs(touchEndY.current - touchStartY.current)

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > 50 && deltaY < 100) {
        if (deltaX > 0) {
          // Swipe right - could go to previous section
          triggerHaptic('light')
          handleSwipeRight()
        } else {
          // Swipe left - could go to next section
          triggerHaptic('light')
          handleSwipeLeft()
        }
      }
    }

    const handleSwipeRight = () => {
      // Navigate to previous section or show menu
      const sections = ['#top', '#about', '#skills', '#projects', '#contact']
      const currentSection = sections.find(section => {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 100
        }
        return false
      })

      if (currentSection) {
        const currentIndex = sections.indexOf(currentSection)
        if (currentIndex > 0) {
          const prevSection = sections[currentIndex - 1]
          document.querySelector(prevSection)?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const handleSwipeLeft = () => {
      // Navigate to next section
      const sections = ['#top', '#about', '#skills', '#projects', '#contact']
      const currentSection = sections.find(section => {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 100
        }
        return false
      })

      if (currentSection) {
        const currentIndex = sections.indexOf(currentSection)
        if (currentIndex < sections.length - 1) {
          const nextSection = sections[currentIndex + 1]
          document.querySelector(nextSection)?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enableSwipeGestures, isTouchDevice, triggerHaptic])

  // Touch feedback
  useEffect(() => {
    if (!enableTouchFeedback || !isTouchDevice) return

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, [role="button"]')) {
        target.classList.add('touch-active')
        triggerHaptic('light')
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      target.classList.remove('touch-active')
    }

    const handleTouchCancel = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      target.classList.remove('touch-active')
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchcancel', handleTouchCancel)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [enableTouchFeedback, isTouchDevice, triggerHaptic])

  const contextValue: MobileContextType = {
    enableSwipeGestures,
    setEnableSwipeGestures,
    enablePullToRefresh,
    setEnablePullToRefresh,
    enableTouchFeedback,
    setEnableTouchFeedback,
    showBottomNav,
    setShowBottomNav,
    triggerHaptic,
    isTouchDevice,
  }

  return (
    <MobileContext.Provider value={contextValue}>
      {children}

      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {isPulling && pullDistance > 0 && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: pullDistance - 60 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <motion.div
                animate={{ rotate: pullDistance > 80 ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {pullDistance > 80 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation for mobile */}
      {isTouchDevice && (
        <BottomNavigation />
      )}

      {/* Touch gesture indicator */}
      {enableSwipeGestures && isTouchDevice && (
        <SwipeGestureIndicator />
      )}
    </MobileContext.Provider>
  )
}

// Bottom navigation component
function BottomNavigation() {
  const { showBottomNav, triggerHaptic } = useMobileOptimizations()
  const [activeTab, setActiveTab] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home', href: '#top', icon: Home },
    { id: 'projects', label: 'Projects', href: '#projects', icon: SwipeHorizontal },
    { id: 'contact', label: 'Contact', href: '#contact', icon: MessageCircle },
  ]

  const handleNavClick = useCallback((href: string, id: string) => {
    setActiveTab(id)
    triggerHaptic('light')
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [triggerHaptic])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.querySelector(item.href) as HTMLElement
      }))

      const currentSection = sections.find(({ element }) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 100
        }
        return false
      })

      if (currentSection) {
        setActiveTab(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  if (!showBottomNav) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="glass border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
          <nav className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </nav>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Swipe gesture indicator
function SwipeGestureIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const hasSeenIndicator = localStorage.getItem('swipe-indicator-seen')
    if (!hasSeenIndicator) {
      const timer = setTimeout(() => {
        setShowIndicator(true)
        localStorage.setItem('swipe-indicator-seen', 'true')
        setTimeout(() => setShowIndicator(false), 3000)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <SwipeHorizontal className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Swipe to navigate</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Touch feedback component
export function TouchFeedback({ children }: { children: React.ReactNode }) {
  const { enableTouchFeedback } = useMobileOptimizations()

  return (
    <div
      className={`touch-feedback-container ${enableTouchFeedback ? 'touch-feedback-enabled' : ''}`}
      style={{
        '--touch-feedback-scale': '0.95',
        '--touch-feedback-duration': '150ms',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// Mobile-optimized project card
export function MobileProjectCard({ children }: { children: React.ReactNode }) {
  const { triggerHaptic, isTouchDevice } = useMobileOptimizations()

  const handleInteraction = useCallback(() => {
    if (isTouchDevice) {
      triggerHaptic('light')
    }
  }, [isTouchDevice, triggerHaptic])

  return (
    <div
      className="mobile-project-card"
      onTouchStart={handleInteraction}
      style={{
        minHeight: isTouchDevice ? '120px' : 'auto',
        touchAction: 'manipulation',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// Swipeable component for galleries
export function SwipeableContainer({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = ''
}: {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
}) {
  const { enableSwipeGestures, triggerHaptic } = useMobileOptimizations()
  const touchStartX = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enableSwipeGestures) return

    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX.current

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
      triggerHaptic('light')
    }
  }, [enableSwipeGestures, onSwipeLeft, onSwipeRight, triggerHaptic])

  return (
    <div
      className={`swipeable-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: 'pan-y',
        userSelect: 'none',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}