import type { PropsWithChildren } from "react";

import { motion, useScroll, useTransform } from 'framer-motion'

import { useRef } from "react";

export default function Parallax({ children, intensity = 30, className = '' }: PropsWithChildren<{ intensity?: number; className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity])

  return (
    <motion.div ref={ref} style={{ y }} className={`relative will-change-transform ${className}`}>
      {children}
    </motion.div>
  )
}
