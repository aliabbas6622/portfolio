import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import { fadeInUp, slideLeft, slideRight, transition, childStagger } from '../lib/animations'

export default function Projects() {
  const [active, setActive] = useState<number | null>(null)
  const activeProject = active != null ? projects[active] : null

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={transition} className="mb-6">
          <h2 className="section-title">Projects</h2>
          <p className="muted mt-1">A selection of things I’ve built recently.</p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...transition, delay: i * 0.05 }}
              whileHover={{ rotateX: -3, rotateY: 3, translateZ: 8, translateY: -6 }}
              style={{ transformPerspective: 900 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition will-change-transform hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`h-44 w-full bg-gradient-to-br from-indigo-300/50 via-sky-300/40 to-cyan-300/50 dark:from-indigo-500/30 dark:via-sky-500/25 dark:to-cyan-500/30`} />
              <motion.div variants={childStagger(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="p-5">
                <motion.h3 variants={fadeInUp} className="text-base font-semibold">{p.title}</motion.h3>
                <motion.p variants={fadeInUp} className="muted mt-1 text-sm">{p.description}</motion.p>
                {p.tags && (
                  <motion.div variants={fadeInUp} className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="badge text-xs">{t}</span>
                    ))}
                  </motion.div>
                )}
                <motion.div variants={fadeInUp} className="mt-3 flex gap-2">
                  <a href={p.href} className="btn btn-ghost text-sm">
                    View project <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                  <button onClick={() => setActive(i)} className="btn btn-ghost text-sm">Quick view</button>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActive(null)} />
    </section>
  )
}
