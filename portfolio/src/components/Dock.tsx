import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Home, User, Wrench, FolderKanban, Mail, Sun, Moon, Github, Linkedin } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const dockItems = [
    { href: '#top', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#skills', label: 'Skills', icon: Wrench },
    { href: '#projects', label: 'Projects', icon: FolderKanban },
    { href: '#contact', label: 'Contact', icon: Mail },
]

function DockIcon({
    item,
    mouseX,
    isActive
}: {
    item: typeof dockItems[0]
    mouseX: ReturnType<typeof useMotionValue<number>>
    isActive: boolean
}) {
    const ref = useRef<HTMLAnchorElement>(null)

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    // Smaller on mobile, magnify on desktop
    const widthSync = useTransform(distance, [-100, 0, 100], [44, 64, 44])
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

    return (
        <motion.a
            ref={ref}
            href={item.href}
            style={{ width, height: width }}
            className={`relative flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/30 shadow-md transition-colors dark:bg-slate-800/80 dark:border-slate-700/50 ${isActive ? 'ring-2 ring-indigo-500 ring-offset-1 ring-offset-white dark:ring-offset-slate-950' : ''}`}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
        >
            <item.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            {isActive && (
                <motion.div
                    layoutId="dock-indicator"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-indigo-500"
                />
            )}
        </motion.a>
    )
}

function ThemeToggleDock() {
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.button
            data-theme-toggle
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/30 shadow-md dark:bg-slate-800/80 dark:border-slate-700/50"
            whileHover={{ scale: 1.1, y: -6 }}
            whileTap={{ scale: 0.95 }}
        >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </motion.button>
    )
}

function SocialDock({ href, icon: Icon }: { href: string; icon: typeof Github }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/30 shadow-md dark:bg-slate-800/80 dark:border-slate-700/50"
            whileHover={{ scale: 1.1, y: -6 }}
            whileTap={{ scale: 0.95 }}
        >
            <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </motion.a>
    )
}

export default function Dock() {
    const [active, setActive] = useState('#top')
    const mouseX = useMotionValue(Infinity)

    useEffect(() => {
        const sections = dockItems.map((l) => document.querySelector(l.href) as HTMLElement | null).filter(Boolean) as HTMLElement[]
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive('#' + entry.target.id)
                })
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
        )
        sections.forEach((s) => io.observe(s))
        return () => io.disconnect()
    }, [])

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className="flex items-end gap-1.5 sm:gap-2">
                {/* Navigation Section */}
                <div className="flex items-end gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl bg-white/60 p-1.5 sm:p-2 backdrop-blur-xl border border-white/40 shadow-xl dark:bg-slate-900/60 dark:border-slate-700/50">
                    {dockItems.map((item) => (
                        <DockIcon key={item.href} item={item} mouseX={mouseX} isActive={active === item.href} />
                    ))}
                </div>

                {/* Utilities Section */}
                <div className="flex items-end gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl bg-white/60 p-1.5 sm:p-2 backdrop-blur-xl border border-white/40 shadow-xl dark:bg-slate-900/60 dark:border-slate-700/50">
                    <ThemeToggleDock />
                    <SocialDock href="https://github.com/aliabbas6622" icon={Github} />
                    <SocialDock href="https://linkedin.com/in/aliabbas6622" icon={Linkedin} />
                </div>
            </div>
        </motion.div>
    )
}
