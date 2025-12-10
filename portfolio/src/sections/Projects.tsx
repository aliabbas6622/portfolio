import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import SpotlightCard from '../components/SpotlightCard'


function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ ...transition, delay: index * 0.1 }}
      className="h-full"
    >
      <SpotlightCard className="h-full flex flex-col p-6 backdrop-blur-xl transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 shadow-sm transition-transform group-hover:scale-110 dark:bg-slate-800 dark:text-slate-300">
            <ArrowUpRight className="h-6 w-6" />
          </div>

          <div className="flex gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                title="View Source"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                title="View Project"
              >
                <ExternalLink className="h-4.5 w-4.5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {project.title}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-md bg-slate-100/80 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800/80 dark:text-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section overflow-hidden">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 md:mb-20"
        >
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">
            Featured Work
          </motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-2 max-w-2xl">
            Building intelligent applications with modern interfaces.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <div key={project.title}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
