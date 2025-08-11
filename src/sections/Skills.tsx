import { motion } from 'framer-motion'
import { fadeInUp, scaleIn, staggerContainer, transition } from '../lib/animations'

const groups = [
  { title: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'C++'], level: 85 },
  { title: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Express'], level: 80 },
  { title: 'AI & Tools', items: ['OpenAI', 'LangChain', 'Hugging Face', 'Git', 'GitHub', 'VS Code'], level: 75 },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div variants={staggerContainer(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-6">
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">Skills</motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-1">Technologies I use to craft reliable products.</motion.p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transition, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-300 bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold">{g.title}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{g.level}%</span>
              </div>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-gradient-to-r from-indigo-400 to-blue-500" style={{ width: `${g.level}%` }} />
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="badge text-sm">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
