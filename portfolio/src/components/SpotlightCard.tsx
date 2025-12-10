import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import clsx from 'clsx'

export default function SpotlightCard({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top

        mouseX.set(x)
        mouseY.set(y)

        const centerX = width / 2
        const centerY = height / 2
        rotateX.set(((y - centerY) / centerY) * -4)
        rotateY.set(((x - centerX) / centerX) * 4)
    }

    function onMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={clsx(
                "group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60",
                className
            )}
        >
            {/* Subtle inner glow on hover */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(99, 102, 241, 0.08),
                            transparent 60%
                        )
                    `,
                }}
            />

            {/* Top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-600/50" />

            <div className="relative transform-gpu">{children}</div>
        </motion.div>
    )
}
