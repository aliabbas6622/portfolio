import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time and then complete
        const timer = setTimeout(() => {
            setIsLoading(false)
            setTimeout(onComplete, 600) // Wait for exit animation
        }, 2000)

        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
                >
                    {/* Animated background blur shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-indigo-600/30 blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                x: [0, -50, 0],
                                y: [0, 30, 0],
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -bottom-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full bg-cyan-500/30 blur-[100px]"
                        />
                    </div>

                    {/* Main loader content */}
                    <div className="relative flex flex-col items-center gap-8">
                        {/* Animated logo/name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.h1
                                className="text-5xl font-extrabold tracking-tight text-white md:text-7xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Ali Abbas
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mt-2 text-lg text-slate-400"
                            >
                                AI Engineer & Developer
                            </motion.p>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '200px' }}
                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
                            className="h-1 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
                        />

                        {/* Animated dots */}
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="h-2 w-2 rounded-full bg-white"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
