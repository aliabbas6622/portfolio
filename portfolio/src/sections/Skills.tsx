import { motion } from 'framer-motion'
import { fadeInUp, scaleIn, staggerContainer, transition } from '../lib/animations'
import SpotlightCard from '../components/SpotlightCard'

const groups = [
  { title: 'Languages & Core', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'], color: 'indigo' },
  { title: 'AI & Machine Learning', items: ['LangChain', 'OpenAI API', 'Hugging Face', 'PyTorch', 'NumPy', 'Pandas'], color: 'purple' },
  { title: 'Web Frameworks', items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Framer Motion'], color: 'cyan' },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div variants={staggerContainer(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-10 lg:mb-14">
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">Skills & Tools</motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-2 max-w-2xl">
            A comprehensive list of technologies I use to build robust and scalable applications.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transition, delay: i * 0.05 }}
              className="h-full"
            >
              <SpotlightCard className="h-full flex flex-col p-6">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{g.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="inline-flex items-center rounded-lg border border-slate-200/80 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-900/20"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
