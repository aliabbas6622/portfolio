import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin } from 'lucide-react'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import Hero3D from '../components/Hero3D'

export default function Hero() {
  return (
    <section id="top" className="relative pt-16" style={{ minHeight: 'calc(100svh - 64px)' }}>
      <Hero3D />
      <div className="container flex items-center justify-center py-12">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl space-y-6 text-center"
        >
          <motion.div variants={fadeInUp} transition={transition} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow backdrop-blur dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            BS Artificial Intelligence • FAST NUCES '29
          </motion.div>
          <motion.h1 variants={fadeInUp} transition={transition} className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            <span className="gradient-text">Ali Abbas</span>
          </motion.h1>
          <motion.p variants={fadeInUp} transition={transition} className="muted text-lg md:text-xl max-w-3xl mx-auto">
            Driven engineering student passionate about <span className="font-bold text-slate-900 dark:text-white">software engineering</span>. Proficient in <span className="font-semibold text-slate-900 dark:text-white">Python</span>, <span className="font-semibold text-slate-900 dark:text-white">C/C++</span>, and <span className="font-semibold text-slate-900 dark:text-white">LangChain</span>. Eager to learn and contribute to innovative projects at the intersection of <span className="text-slate-900 font-semibold dark:text-white">AI</span> and <span className="text-slate-900 font-semibold dark:text-white">Modern Web</span>.
          </motion.p>
          <motion.div variants={fadeInUp} transition={transition} className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="h-4 w-4" />
            <span>Karachi Division, Sindh, Pakistan</span>
          </motion.div>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#projects" className="btn btn-primary shadow-lg shadow-indigo-500/20">View my work</a>
            <a href="mailto:aliabbas6622tel@gmail.com" className="btn btn-ghost"><Mail className="mr-2 h-4 w-4" /> Let's talk</a>
            <a href="https://www.linkedin.com/in/ali-abbasaa1967299" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
          </motion.div>
          <motion.div variants={fadeInUp} transition={transition} className="flex flex-wrap justify-center gap-2 pt-2 text-sm">
            <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-900/20 dark:text-indigo-300">Python</span>
            <span className="badge border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/30 dark:bg-purple-900/20 dark:text-purple-300">LangChain</span>
            <span className="badge">C/C++</span>
            <span className="badge">AI & Machine Learning</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
