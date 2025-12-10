import { motion } from 'framer-motion'
import { useEffect } from 'react'

const tech = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'Framer Motion', 'OpenAI', 'LangChain', 'Hugging Face']

export default function Tech() {
  // Fix for website loading behavior -> force scroll to top
  useEffect(() => {
    // Ensure page starts at home section
    window.scrollTo(0, 0)

    // Clean any hash fragments from URL
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <section aria-label="Tech" className="relative py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl px-4"
      >
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/40 p-1 backdrop-blur-xl transition-all hover:bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:bg-slate-900/60">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent dark:via-slate-500/30" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent dark:via-slate-500/30" />

          <div className="flex overflow-hidden py-4 mask-linear-fade">
            <div className="marquee flex w-max gap-8 px-4 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-400">
              {[...tech, ...tech, ...tech].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="flex items-center gap-2 transition-colors hover:text-slate-900 dark:hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}