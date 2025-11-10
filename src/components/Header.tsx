import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Menu, X, Search, ChevronUp, ExternalLink } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import ScrollProgress from './ScrollProgress'

const links = [
  { href: '#top', label: 'Home', description: 'Navigate to home section' },
  { href: '#about', label: 'About', description: 'Learn more about me' },
  { href: '#skills', label: 'Skills', description: 'View my technical skills' },
  { href: '#projects', label: 'Projects', description: 'See my portfolio projects' },
  { href: '#contact', label: 'Contact', description: 'Get in touch with me' },
]

const keyboardShortcuts = [
  { key: 'k', description: 'Open search', action: 'search' },
  { key: 'esc', description: 'Close modal/menu', action: 'close' },
  { key: '/', description: 'Quick navigation', action: 'navigate' },
  { key: '?', description: 'Show shortcuts', action: 'help' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredLinks = links.filter(link =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % filteredLinks.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev === 0 ? filteredLinks.length - 1 : prev - 1)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredLinks[selectedIndex]) {
            window.location.href = filteredLinks[selectedIndex].href
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredLinks, onClose])

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-auto mt-20 max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search navigation..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setSelectedIndex(0)
            }}
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {filteredLinks.length > 0 && (
          <div className="mt-4 space-y-1">
            {filteredLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  index === selectedIndex
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={onClose}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{link.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </div>
                <div className="text-xs opacity-70">{link.description}</div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">↑↓</kbd> to navigate,{' '}
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">Enter</kbd> to select,{' '}
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">Esc</kbd> to close
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-auto mt-20 max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Keyboard Shortcuts</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={shortcut.key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-sm font-mono dark:bg-slate-800 dark:border-slate-600">
                  {shortcut.key}
                </kbd>
                <span className="text-sm text-slate-700 dark:text-slate-300">{shortcut.description}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">Esc</kbd> to close this modal
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface SkipLinkProps {
  href: string
  children: string
}

function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </a>
  )
}

export function Header() {
  const [active, setActive] = useState('#top')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Meta/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        return
      }

      // ? for shortcuts
      if (e.key === '?' && !e.target || (e.target as HTMLElement)?.tagName === 'BODY') {
        e.preventDefault()
        setShortcutsOpen(true)
        return
      }

      // / for quick navigation
      if (e.key === '/' && !e.target || (e.target as HTMLElement)?.tagName === 'BODY') {
        e.preventDefault()
        setSearchOpen(true)
        return
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false)
        } else if (shortcutsOpen) {
          setShortcutsOpen(false)
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
        return
      }

      // Handle mobile menu keyboard navigation
      if (mobileMenuOpen && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement?.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement?.focus()
            }
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, shortcutsOpen, mobileMenuOpen])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href) as HTMLElement | null).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id)
            // Announce section change for screen readers
            const announcement = `Now viewing: ${entry.target.id} section`
            const announcer = document.getElementById('section-announcer')
            if (announcer) {
              announcer.textContent = announcement
            }
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Handle mobile menu focus trap
  useEffect(() => {
    if (mobileMenuOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement
      // Focus first menu item
      const firstMenuItem = mobileMenuRef.current?.querySelector('a') as HTMLElement
      firstMenuItem?.focus()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore focus and body scroll
      lastActiveElement.current?.focus()
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleNavClick = useCallback((href: string) => {
    setActive(href)
    setMobileMenuOpen(false)

    // Smooth scroll with better offset for mobile
    const element = document.querySelector(href) as HTMLElement
    if (element) {
      const offset = window.innerWidth < 768 ? 80 : 60
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed left-0 right-0 top-2 z-40"
      >
        <ScrollProgress />

        {/* Skip links for accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <SkipLink href="#navigation">Skip to navigation</SkipLink>

        {/* Screen reader announcer */}
        <div id="section-announcer" className="sr-only" aria-live="polite" aria-atomic="true" />

        <nav id="navigation" className="container">
          <div className="glass mx-auto flex h-14 items-center justify-between rounded-full px-4 shadow">
            {/* Logo/Brand */}
            <motion.a
              href="#top"
              onClick={() => handleNavClick('#top')}
              className="text-sm font-extrabold tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ali Abbas - Home"
            >
              Ali Abbas
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-2 md:flex" role="menubar">
              {links.map((l) => (
                <li key={l.href} role="none">
                  <motion.a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(l.href)
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      active === l.href
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                    role="menuitem"
                    aria-current={active === l.href ? 'page' : undefined}
                    aria-label={l.description}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Search button (desktop) */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:flex items-center gap-2 px-3 text-sm"
                aria-label="Open search (Ctrl+K)"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline px-1 py-0.5 bg-slate-100 rounded text-xs">⌘K</kbd>
              </motion.button>

              <ThemeToggle />

              {/* Social links (desktop) */}
              <motion.a
                href="https://github.com/aliabbas6622"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:block"
                aria-label="GitHub profile"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/aliabbas6622"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:block"
                aria-label="LinkedIn profile"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>

              {/* Work with me button (desktop) */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contact')
                }}
                className="btn btn-ghost hidden md:inline-flex transition hover:-translate-y-0.5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Work with me
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <X key="close" className="h-5 w-5" />
                  ) : (
                    <Menu key="menu" className="h-5 w-5" />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              ref={mobileMenuRef}
              className="absolute left-0 right-0 top-16 glass rounded-b-2xl p-4 shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <nav className="space-y-2" role="navigation">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      active === link.href
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                    role="menuitem"
                    aria-current={active === link.href ? 'page' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span>{link.label}</span>
                    {active === link.href && (
                      <motion.div
                        className="h-2 w-2 rounded-full bg-indigo-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.a>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                  <motion.button
                    onClick={() => setSearchOpen(true)}
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.05 }}
                  >
                    <Search className="h-5 w-5" />
                    Search Navigation
                  </motion.button>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.a
                      href="https://github.com/aliabbas6622"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (links.length + 1) * 0.05 }}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/aliabbas6622"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (links.length + 2) * 0.05 }}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </motion.a>
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 rounded-full bg-indigo-600 p-3 text-white shadow-lg hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </>
  )
}
