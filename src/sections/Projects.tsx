import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import { fadeInUp, slideLeft, slideRight, transition, childStagger } from '../lib/animations'

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  onQuickView: (index: number) => void
  isActive: boolean
}

function ProjectCard({ project, index, onQuickView, isActive }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isPressed, setIsPressed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onQuickView(index)
    }
  }, [index, onQuickView])

  const handleMouseDown = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false)
  }, [])

  const hoverAnimation = shouldReduceMotion ? {} : {
    rotateX: -2,
    rotateY: 2,
    translateZ: 12,
    translateY: -8,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    borderColor: 'rgb(99 102 241)',
  }

  const pressAnimation = isPressed ? { scale: 0.98 } : {}

  return (
    <motion.article
      ref={cardRef}
      variants={index % 2 === 0 ? slideLeft : slideRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        ...transition,
        delay: index * 0.05,
        type: shouldReduceMotion ? "tween" : "spring",
        stiffness: shouldReduceMotion ? undefined : 300,
        damping: shouldReduceMotion ? undefined : 30
      }}
      whileHover={hoverAnimation}
      whileTap={pressAnimation}
      style={{
        transformPerspective: shouldReduceMotion ? undefined : 900,
        willChange: "transform"
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      tabIndex={0}
      role="button"
      aria-label={`Project: ${project.title}. ${project.description}`}
      aria-expanded={isActive}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient overlay for enhanced visual effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Project image placeholder */}
      <div className={`h-44 w-full bg-gradient-to-br from-indigo-300/50 via-sky-300/40 to-cyan-300/50 dark:from-indigo-500/30 dark:via-sky-500/25 dark:to-cyan-500/30 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:bg-black/10" />
      </div>

      <motion.div variants={childStagger(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="p-5 relative z-10">
        <motion.h3 variants={fadeInUp} className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {project.title}
        </motion.h3>
        <motion.p variants={fadeInUp} className="muted mt-1 text-sm line-clamp-2">
          {project.description}
        </motion.p>
        {project.tags && (
          <motion.div variants={fadeInUp} className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="badge text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:group-hover:bg-indigo-900/30 dark:group-hover:text-indigo-300 transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}
        <motion.div variants={fadeInUp} className="mt-4 flex gap-2">
          <a
            href={project.href}
            className="btn btn-ghost text-sm inline-flex items-center group/btn hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label={`View project: ${project.title}`}
          >
            View project
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
          <button
            onClick={() => onQuickView(index)}
            className="btn btn-ghost text-sm hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label={`Quick view: ${project.title}`}
          >
            Quick view
          </button>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const activeProject = active != null ? projects[active] : null

  useEffect(() => {
    // Simulate loading projects data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section id="projects" className="section">
        <div className="container">
          <div className="mb-6">
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="mt-2 h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-44 bg-slate-200 dark:bg-slate-700 rounded-t-2xl" />
                <div className="p-5 bg-white dark:bg-slate-900 rounded-b-2xl border border-slate-200 dark:border-slate-800">
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={transition} className="mb-6">
          <h2 className="section-title">Projects</h2>
          <p className="muted mt-1">A selection of things I've built recently.</p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onQuickView={setActive}
              isActive={active === index}
            />
          ))}
        </div>
      </div>
      <ProjectModal
        project={activeProject}
        onClose={() => setActive(null)}
      />
    </section>
  )
}
