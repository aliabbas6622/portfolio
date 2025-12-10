import { motion, useMotionValue, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { ReactNode } from 'react'

export default function HoloCard({ children, className }: { children: ReactNode, className?: string }) {
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    const gradientX = useTransform(mouseX, [0, 1], [0, 100])
    const gradientY = useTransform(mouseY, [0, 1], [0, 100])

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        mouseX.set((clientX - left) / width)
        mouseY.set((clientY - top) / height)
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            className={clsx("group relative overflow-hidden rounded-3xl", className)}
        >
            {/* Animated holographic border */}
            <motion.div
                className="absolute -inset-[2px] rounded-3xl opacity-60 blur-sm"
                style={{
                    background: useTransform(
                        [gradientX, gradientY],
                        ([x, y]) => `conic-gradient(from 180deg at ${x}% ${y}%, #a855f7, #6366f1, #06b6d4, #10b981, #eab308, #f97316, #ef4444, #a855f7)`
                    )
                }}
            />

            {/* Inner container */}
            <div className="relative rounded-3xl border border-white/30 bg-white/80 p-1 backdrop-blur-2xl dark:border-slate-700/50 dark:bg-slate-950/80">

                {/* Glass Inner */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl dark:from-slate-900/80 dark:to-slate-900/60">

                    {/* Shimmer effect */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                            background: useTransform(
                                [gradientX, gradientY],
                                ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgba(139, 92, 246, 0.15), transparent 50%)`
                            )
                        }}
                    />

                    <div className="relative z-10 p-6 md:p-10">
                        {children}
                    </div>
                </div>
            </div>

            {/* Shine Line */}
            <motion.div
                className="pointer-events-none absolute top-0 -left-[100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                initial={{ left: '-100%' }}
                whileHover={{ left: '200%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </motion.div>
    )
}
