import { motion, useScroll, useTransform } from 'framer-motion'

export default function Background() {
  const { scrollY } = useScroll()
  const yTop = useTransform(scrollY, [0, 600], [0, 40])
  const yBottom = useTransform(scrollY, [0, 600], [0, -40])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(15 23 42 / 20%) 1px, transparent 0)",
          backgroundSize: '24px 24px',
        }}
      />
      {/* soft spotlights with parallax */}
      <motion.div style={{ y: yTop }} className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-300/60 to-cyan-300/60 blur-3xl" />
      <motion.div style={{ y: yBottom }} className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-300/60 to-sky-300/60 blur-3xl" />
    </div>
  )
}
