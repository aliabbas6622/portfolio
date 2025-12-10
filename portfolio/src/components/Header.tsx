import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import ScrollProgress from './ScrollProgress'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href) as HTMLElement | null).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed left-0 right-0 top-2 z-50"
    >
      <ScrollProgress />
      <nav className="container">
        <div className="glass mx-auto flex h-14 items-center justify-between rounded-full px-4 shadow">
          <a href="#top" className="text-sm font-extrabold tracking-tight">Ali Abbas</a>
          <ul className="hidden items-center gap-2 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${active === l.href ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="https://github.com/aliabbas6622" target="_blank" rel="noreferrer" className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:block"><Github className="h-4 w-4" /></a>
            <a href="https://linkedin.com/in/aliabbas6622" target="_blank" rel="noreferrer" className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:block"><Linkedin className="h-4 w-4" /></a>
            <a href="#contact" className="btn btn-ghost hidden md:inline-flex transition hover:-translate-y-0.5">Work with me</a>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
