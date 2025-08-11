import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Sparkles, Target } from 'lucide-react'

const tabs = [
  { key: 'story', label: 'Story', icon: BookOpen },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'interests', label: 'Interests', icon: Sparkles },
  { key: 'goals', label: 'Goals', icon: Target },
] as const

type TabKey = typeof tabs[number]['key']

export default function AboutTabs() {
  const [active, setActive] = useState<TabKey>('story')
  const ActiveIcon = tabs.find(t => t.key === active)!.icon

  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="mb-6">
          <h2 className="section-title">About Me</h2>
          <p className="muted mt-1">Switch between tabs to learn more.</p>
        </motion.div>
        <div className="rounded-2xl border border-slate-300 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="relative flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${active === t.key ? 'text-white dark:text-slate-900' : 'text-slate-700 hover:text-primary dark:text-slate-300'}`}
              >
                {active === t.key && (
                  <motion.span layoutId="tab-ind" className="absolute inset-0 -z-10 rounded-xl border border-slate-900 bg-slate-900 dark:border-white dark:bg-white" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                )}
                <span className={`absolute inset-0 -z-20 rounded-xl border ${active === t.key ? 'border-transparent' : 'border-slate-300 dark:border-slate-700'}`} />
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><ActiveIcon className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-wide">{tabs.find(t => t.key === active)!.label}</span></div>
              {active === 'story' && (
                <p>I’m Ali Abbas, an aspiring developer from Karachi who enjoys turning ideas into polished, intuitive products with thoughtful UI/UX and smooth interactions.</p>
              )}
              {active === 'education' && (
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
                  <li>BSCS — FAST NUCES, Karachi (starting)</li>
                  <li>Intermediate (Pre-Engineering) — Degree College Malir Cantt (completed)</li>
                </ul>
              )}
              {active === 'interests' && (
                <p>Web, AI, tooling, product design, and creating delightful micro-interactions that make software feel alive.</p>
              )}
              {active === 'goals' && (
                <p>Build accessible, high-quality products, contribute to open-source, and continue growing in AI-integrated user experiences.</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
