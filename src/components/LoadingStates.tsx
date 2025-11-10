import { motion, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Skeleton loading components for different content types
export function ProjectCardSkeleton() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      <div className="h-44 bg-slate-200 dark:bg-slate-700 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
        </div>
        <div className="flex gap-2 mt-3">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}

export function FormSkeleton() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-14 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
      </div>
      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
    </motion.div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </motion.div>
  )
}

export function AvatarSkeleton({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const shouldReduceMotion = useReducedMotion()
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    />
  )
}

// Spinner components for loading states
export function Spinner({ size = 'medium', className = '' }: { size?: 'small' | 'medium' | 'large'; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  }

  if (shouldReduceMotion) {
    return (
      <div className={`${sizeClasses[size]} animate-pulse bg-slate-300 dark:bg-slate-600 rounded-full ${className}`} />
    )
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <Loader2 className="h-full w-full text-current" />
    </motion.div>
  )
}

// Progress bar component
export function ProgressBar({ progress = 0, className = '', showLabel = false }: { progress?: number; className?: string; showLabel?: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.2, 0.7, 0.2, 1]
          }}
        />
      </div>
    </div>
  )
}

// Shimmer effect for content loading
export function Shimmer({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      {children}
    </div>
  )
}

// Loading state component for async operations
export function LoadingState({
  message = 'Loading...',
  showProgress = false,
  progress = 0,
  className = ''
}: {
  message?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <Spinner size="large" className="text-indigo-600 dark:text-indigo-400 mb-4" />
      <motion.p
        className="text-slate-600 dark:text-slate-400 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {message}
      </motion.p>
      {showProgress && (
        <motion.div
          className="w-full max-w-xs mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressBar progress={progress} showLabel />
        </motion.div>
      )}
    </motion.div>
  )
}

// Staggered loading for lists and grids
export function StaggeredLoading({
  children,
  staggerDelay = 0.1,
  className = ''
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : index * staggerDelay,
            duration: shouldReduceMotion ? 0 : 0.3,
            ease: [0.2, 0.7, 0.2, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Pulse loading for indefinite loading states
export function PulseLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 bg-current rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: [0.2, 0.7, 0.2, 1]
          }}
        />
      ))}
    </div>
  )
}

// Error boundary fallback loading state
export function ErrorLoadingState({
  message = 'Something went wrong',
  onRetry
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-red-500 dark:text-red-400 mb-4">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {message}
      </h3>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

// Hook for managing loading states
export function useLoadingState(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Loading...')

  const startLoading = useCallback((newMessage = 'Loading...') => {
    setIsLoading(true)
    setProgress(0)
    setMessage(newMessage)
  }, [])

  const updateProgress = useCallback((newProgress: number, newMessage?: string) => {
    setProgress(Math.min(100, Math.max(0, newProgress)))
    if (newMessage) setMessage(newMessage)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setProgress(100)
  }, [])

  const resetLoading = useCallback(() => {
    setIsLoading(false)
    setProgress(0)
    setMessage('Loading...')
  }, [])

  return {
    isLoading,
    progress,
    message,
    startLoading,
    updateProgress,
    stopLoading,
    resetLoading
  }
}

// Import useState hook
import { useState, useCallback } from 'react'