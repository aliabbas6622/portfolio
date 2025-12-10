import { motion } from 'framer-motion'
import { Search, PenTool, Code2 } from 'lucide-react'
import { fadeInUp, scaleIn, staggerContainer, transition } from '../lib/animations'
import SpotlightCard from '../components/SpotlightCard'

const steps = [
  {
    title: 'Discovery',
    desc: 'Understanding the core problem and user needs through research and data analysis.',
    icon: Search,
  },
  {
    title: 'Design',
    desc: 'Crafting intuitive interfaces with a focus on accessibility, motion, and visual hierarchy.',
    icon: PenTool,
  },
  {
    title: 'Development',
    desc: 'Building robust, scalable applications with modern tech stacks and clean code practices.',
    icon: Code2,
  }
]

export default function Gallery() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10"
        >
          <motion.h2 variants={fadeInUp} transition={transition} className="section-title">Methodology</motion.h2>
          <motion.p variants={fadeInUp} transition={transition} className="muted mt-1">My approach to building digital products.</motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...transition, delay: idx * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
