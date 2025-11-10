import { useReducedMotion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState, useCallback, useRef } from 'react'

// Animation configuration interface
interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  stiffness?: number
  damping?: number
  mass?: number
}

// Default animation configurations
const DEFAULT_CONFIGS = {
  fast: { duration: 0.2, easing: [0.2, 0.7, 0.2, 1] },
  normal: { duration: 0.4, easing: [0.2, 0.7, 0.2, 1] },
  slow: { duration: 0.6, easing: [0.2, 0.7, 0.2, 1] },
  spring: { stiffness: 300, damping: 30, mass: 1 },
  bouncy: { stiffness: 400, damping: 10, mass: 1 },
}

// Performance monitoring for animations
interface AnimationPerformance {
  fps: number
  frameTime: number
  isOptimal: boolean
}

export function useAnimationPerformance() {
  const [performance, setPerformance] = useState<AnimationPerformance>({
    fps: 60,
    frameTime: 16.67,
    isOptimal: true
  })

  const frameCount = useRef(0)
  const lastTime = useRef(Date.now())
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const measurePerformance = (timestamp: number) => {
      frameCount.current++

      if (timestamp - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (timestamp - lastTime.current))
        const frameTime = 1000 / fps
        const isOptimal = fps >= 55 && frameTime <= 18

        setPerformance({ fps, frameTime, isOptimal })

        frameCount.current = 0
        lastTime.current = timestamp
      }

      animationFrameId.current = requestAnimationFrame(measurePerformance)
    }

    animationFrameId.current = requestAnimationFrame(measurePerformance)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return performance
}

// Main hook for managing animations
export function useAnimations(customConfig?: Partial<AnimationConfig>) {
  const prefersReducedMotion = useReducedMotion()
  const performance = useAnimationPerformance()
  const [debugMode, setDebugMode] = useState(false)

  // Merge custom config with defaults
  const config = {
    ...DEFAULT_CONFIGS.normal,
    ...customConfig,
  }

  // Disable animations if user prefers reduced motion or performance is poor
  const shouldAnimate = !prefersReducedMotion && performance.isOptimal

  // Create spring values for smooth animations
  const createSpring = useCallback((to: number, springConfig?: Partial<AnimationConfig>) => {
    return useSpring(to, {
      ...DEFAULT_CONFIGS.spring,
      ...springConfig,
      immediate: !shouldAnimate,
    })
  }, [shouldAnimate])

  // Create animated values with transforms
  const createAnimatedValue = useCallback(
    (initialValue: number, transform?: (value: number) => any) => {
      const value = useMotionValue(initialValue)
      const spring = useSpring(value, {
        ...DEFAULT_CONFIGS.spring,
        ...config,
        immediate: !shouldAnimate,
      })

      if (transform) {
        return useTransform(spring, transform)
      }

      return spring
    },
    [config, shouldAnimate]
  )

  // Animation variants factory
  const createVariants = useCallback(
    <T extends Record<string, any>>(variants: T): T => {
      if (!shouldAnimate) {
        // Return disabled variants for reduced motion
        return Object.keys(variants).reduce((acc, key) => {
          (acc as any)[key] = typeof variants[key] === 'object' ? { ...variants[key], transition: { duration: 0 } } : variants[key]
          return acc
        }, {} as T)
      }

      return variants
    },
    [shouldAnimate]
  )

  // Stagger animation factory
  const createStagger = useCallback(
    (staggerDelay: number = 0.1, staggerDirection: number = 1) => {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay * staggerDirection,
            delayChildren: 0,
            duration: shouldAnimate ? config.duration : 0,
            ease: config.easing,
          },
        },
      }
    },
    [shouldAnimate, config]
  )

  // Individual animation presets
  const presets = {
    fadeIn: createVariants({
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }),

    fadeInUp: createVariants({
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    }),

    fadeInDown: createVariants({
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    }),

    fadeInLeft: createVariants({
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    }),

    fadeInRight: createVariants({
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    }),

    scaleIn: createVariants({
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    }),

    slideUp: createVariants({
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }),

    slideDown: createVariants({
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }),

    bounce: createVariants({
      hidden: { scale: 0.3, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: DEFAULT_CONFIGS.bouncy.stiffness,
          damping: DEFAULT_CONFIGS.bouncy.damping,
          duration: shouldAnimate ? 0.6 : 0,
        },
      },
    }),

    rotateIn: createVariants({
      hidden: { rotate: -180, opacity: 0 },
      visible: { rotate: 0, opacity: 1 },
    }),

    // Complex entrance animation
    entrance: createVariants({
      hidden: { opacity: 0, scale: 0.8, y: 50 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 1,
          duration: shouldAnimate ? 0.8 : 0,
        },
      },
    }),

    // Hover animation preset
    hover: createVariants({
      rest: { scale: 1, transition: { duration: 0.2 } },
      hover: { scale: 1.05, transition: { duration: 0.2 } },
    }),

    // Tap animation preset
    tap: createVariants({
      tap: { scale: 0.95, transition: { duration: 0.1 } },
    }),
  }

  // Scroll-triggered animation hook
  const useScrollAnimation = useCallback(
    (threshold: number = 0.1) => {
      const [ref, setRef] = useState<HTMLElement | null>(null)
      const [isInView, setIsInView] = useState(false)

      useEffect(() => {
        if (!ref) return

        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsInView(entry.isIntersecting)
          },
          { threshold, rootMargin: '-50px' }
        )

        observer.observe(ref)

        return () => observer.disconnect()
      }, [ref, threshold])

      return { ref: setRef, isInView }
    },
    []
  )

  // Staggered children animation
  const useStaggeredAnimation = useCallback(
    (itemCount: number, staggerDelay: number = 0.1) => {
      const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

      const showItem = useCallback((index: number) => {
        setVisibleItems(prev => new Set(prev).add(index))
      }, [])

      const hideItem = useCallback((index: number) => {
        setVisibleItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(index)
          return newSet
        })
      }, [])

      const showAll = useCallback(() => {
        const allIndices = Array.from({ length: itemCount }, (_, i) => i)
        setVisibleItems(new Set(allIndices))
      }, [itemCount])

      const hideAll = useCallback(() => {
        setVisibleItems(new Set())
      }, [])

      return {
        visibleItems,
        showItem,
        hideItem,
        showAll,
        hideAll,
        isItemVisible: (index: number) => visibleItems.has(index),
      }
    },
    []
  )

  // Debug mode
  const toggleDebugMode = useCallback(() => {
    setDebugMode(prev => !prev)
    if (!debugMode) {
      console.log('Animation Debug Mode Enabled')
      console.log('Performance:', performance)
      console.log('Reduced Motion:', prefersReducedMotion)
      console.log('Should Animate:', shouldAnimate)
    }
  }, [debugMode, performance, prefersReducedMotion, shouldAnimate])

  return {
    // State
    shouldAnimate,
    prefersReducedMotion,
    performance,
    debugMode,
    config,

    // Factory functions
    createSpring,
    createAnimatedValue,
    createVariants,
    createStagger,

    // Presets
    presets,

    // Hooks
    useScrollAnimation,
    useStaggeredAnimation,

    // Controls
    toggleDebugMode,
  }
}

// Specialized hooks for common use cases
export function useEntranceAnimation(delay: number = 0) {
  const { presets, shouldAnimate, createVariants } = useAnimations()

  const variants = createVariants({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldAnimate ? 0.6 : 0,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
  })

  return { variants }
}

export function useHoverAnimation(scale: number = 1.05) {
  const { createVariants, shouldAnimate } = useAnimations()

  const variants = createVariants({
    rest: { scale: 1 },
    hover: {
      scale,
      transition: {
        duration: shouldAnimate ? 0.2 : 0,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
  })

  return { variants }
}

export function useStaggeredList(staggerDelay: number = 0.1) {
  const { createStagger, shouldAnimate, config } = useAnimations()

  const containerVariants = createStagger(staggerDelay)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldAnimate ? config.duration : 0,
        ease: config.easing,
      },
    },
  }

  return { containerVariants, itemVariants }
}

export function useModalAnimation() {
  const { shouldAnimate, createVariants } = useAnimations()

  const backdropVariants = createVariants({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldAnimate ? 0.2 : 0 },
    },
    exit: {
      opacity: 0,
      transition: { duration: shouldAnimate ? 0.15 : 0 },
    },
  })

  const modalVariants = createVariants({
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldAnimate ? 0.3 : 0,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: shouldAnimate ? 0.2 : 0 },
    },
  })

  return { backdropVariants, modalVariants }
}

// Performance optimization hook for heavy animations
export function useAnimationOptimizer(threshold: number = 30) {
  const [isOptimized, setIsOptimized] = useState(true)
  const { performance } = useAnimationPerformance()

  useEffect(() => {
    const shouldOptimize = performance.fps < threshold || !performance.isOptimal
    setIsOptimized(!shouldOptimize)

    if (shouldOptimize) {
      console.log('Animation optimization triggered due to performance:', performance)
    }
  }, [performance, threshold])

  return { isOptimized, performance }
}

// Debug component for animation development
export function AnimationDebugInfo() {
  const { performance, prefersReducedMotion, shouldAnimate, debugMode } = useAnimations()

  if (!debugMode) return null

  return (
    <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white p-4 rounded-lg text-xs font-mono max-w-xs">
      <h4 className="font-bold mb-2">Animation Debug Info</h4>
      <div className="space-y-1">
        <div>FPS: {performance.fps}</div>
        <div>Frame Time: {performance.frameTime.toFixed(2)}ms</div>
        <div>Optimal: {performance.isOptimal ? '✅' : '❌'}</div>
        <div>Reduced Motion: {prefersReducedMotion ? '✅' : '❌'}</div>
        <div>Should Animate: {shouldAnimate ? '✅' : '❌'}</div>
      </div>
    </div>
  )
}