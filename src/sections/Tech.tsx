import { motion } from 'framer-motion'
import { useEffect } from 'react'

const tech = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'Framer Motion', 'OpenAI', 'LangChain', 'Hugging Face']

export default function Tech() {
  // Fix for website loading behavior - force scroll to top
  useEffect(() => {
    // Ensure page starts at home section
    window.scrollTo(0, 0)
    
    // Clean any hash fragments from URL
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <section aria-label="Tech" className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="edge-fade overflow-hidden border-y border-slate-200 bg-white/70 px-[8vw] dark:bg-slate-900/70 dark:border-slate-800"
      >
        <div className="marquee flex w-max gap-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {[...tech, ...tech].map((t, i) => (
            <span key={`${t}-${i}`} className="badge bg-white/90 dark:bg-slate-900/90">{t}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}