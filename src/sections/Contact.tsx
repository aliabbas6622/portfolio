import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import { Github, Linkedin, Check, X, AlertCircle, Loader2 } from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface FormTouched {
  name: boolean
  email: boolean
  message: boolean
}

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  })
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    message: false
  })
  const [isValid, setIsValid] = useState(false)
  const [validating, setValidating] = useState<{ [key: string]: boolean }>({})
  const formRef = useRef<HTMLFormElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout>()

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (error) {
        console.error('Failed to parse saved form data:', error)
      }
    }
  }, [])

  // Save form data to localStorage
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData))
    }
  }, [formData])

  // Validation functions
  const validateName = useCallback((name: string): string | undefined => {
    const trimmed = name.trim()
    if (!trimmed) return 'Name is required'
    if (trimmed.length < 2) return 'Name must be at least 2 characters'
    if (trimmed.length > 50) return 'Name must be less than 50 characters'
    return undefined
  }, [])

  const validateEmail = useCallback((email: string): string | undefined => {
    const trimmed = email.trim()
    if (!trimmed) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address'
    return undefined
  }, [])

  const validateMessage = useCallback((message: string): string | undefined => {
    const trimmed = message.trim()
    if (!trimmed) return 'Message is required'
    if (trimmed.length < 10) return 'Message must be at least 10 characters'
    if (trimmed.length > 1000) return 'Message must be less than 1000 characters'
    return undefined
  }, [])

  // Real-time validation with debounce
  const validateField = useCallback((field: keyof FormData, value: string) => {
    setValidating(prev => ({ ...prev, [field]: true }))

    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      let error: string | undefined

      switch (field) {
        case 'name':
          error = validateName(value)
          break
        case 'email':
          error = validateEmail(value)
          break
        case 'message':
          error = validateMessage(value)
          break
      }

      setErrors(prev => ({ ...prev, [field]: error }))
      setValidating(prev => ({ ...prev, [field]: false }))
    }, 300)
  }, [validateName, validateEmail, validateMessage])

  // Check if form is valid
  useEffect(() => {
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const messageError = validateMessage(formData.message)

    const hasErrors = !!(nameError || emailError || messageError)
    const hasEmptyFields = !formData.name.trim() || !formData.email.trim() || !formData.message.trim()

    setIsValid(!hasErrors && !hasEmptyFields)
  }, [formData, validateName, validateEmail, validateMessage])

  const handleInputChange = useCallback((field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    // Validate field if it has been touched
    if (touched[field]) {
      validateField(field, value)
    }
  }, [errors, touched, validateField])

  const handleBlur = useCallback((field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field])
  }, [formData, validateField])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })

    // Validate all fields
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const messageError = validateMessage(formData.message)

    const newErrors: FormErrors = {}
    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      // Focus on first field with error
      const firstErrorField = Object.keys(newErrors)[0] as keyof FormData
      const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLInputElement
      element?.focus()
      return
    }

    setSending(true)

    try {
      const name = encodeURIComponent(formData.name.trim())
      const email = encodeURIComponent(formData.email.trim())
      const message = encodeURIComponent(formData.message.trim())
      const subject = `Portfolio contact from ${name}`
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
      const href = `mailto:aliabbas6622tel@gmail.com?subject=${subject}&body=${body}`

      // Use a temporary anchor for better reliability across browsers
      const a = document.createElement('a')
      a.href = href
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()

      // Show success message
      setToast({ show: true, type: 'success', message: 'Email client opened successfully!' })

      // Clear form and localStorage
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
      setTouched({ name: false, email: false, message: false })
      localStorage.removeItem('contactFormData')

      // Reset form
      formRef.current?.reset()

    } catch (error) {
      console.error('Failed to open email client:', error)
      setToast({ show: true, type: 'error', message: 'Failed to open email client. Please try again.' })
    } finally {
      setSending(false)

      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }))
      }, 3000)
    }
  }, [sending, formData, validateName, validateEmail, validateMessage])

  const getFieldIcon = (field: keyof FormData) => {
    if (validating[field]) {
      return <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
    }
    if (touched[field] && errors[field]) {
      return <X className="h-4 w-4 text-red-500" />
    }
    if (touched[field] && !errors[field] && formData[field]) {
      return <Check className="h-4 w-4 text-green-500" />
    }
    return null
  }

  const getFieldClassName = (field: keyof FormData) => {
    const baseClass = "rounded-xl border px-3 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition dark:text-slate-100 dark:placeholder:text-slate-400 pr-10"

    if (errors[field]) {
      return `${baseClass} border-red-400 bg-red-50 focus:border-red-500 focus:bg-red-100 focus:ring-2 focus:ring-red-200/50 dark:border-red-600 dark:bg-red-900/20 dark:focus:border-red-500 dark:focus:ring-red-400/30`
    }

    if (touched[field] && !errors[field] && formData[field]) {
      return `${baseClass} border-green-400 bg-green-50 focus:border-green-500 focus:bg-green-100 focus:ring-2 focus:ring-green-200/50 dark:border-green-600 dark:bg-green-900/20 dark:focus:border-green-500 dark:focus:ring-green-400/30`
    }

    return `${baseClass} border-white/20 bg-white/5 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-blue-400/30`
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto w-full max-w-[600px] rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur md:p-12 dark:border-slate-700/60 dark:bg-slate-900/40"
        >
          <motion.div variants={fadeInUp} transition={transition} className="mb-10">
            <h2 className="section-title">Let's build something great</h2>
            <p className="muted mt-2">I'm open to new opportunities and collaborations</p>
          </motion.div>

          <motion.form
            ref={formRef}
            variants={fadeInUp}
            transition={transition}
            onSubmit={onSubmit}
            className="grid gap-4"
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  Name
                  {getFieldIcon('name')}
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    onBlur={handleBlur('name')}
                    className={getFieldClassName('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.div
                      id="name-error"
                      className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  Email
                  {getFieldIcon('email')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    onBlur={handleBlur('email')}
                    className={getFieldClassName('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.div
                      id="email-error"
                      className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  Message
                  {getFieldIcon('message')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {formData.message.length}/1000
                </span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  className={`${getFieldClassName('message')} min-h-[140px] resize-none`}
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  onBlur={handleBlur('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  maxLength={1000}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.message && touched.message && (
                  <motion.div
                    id="message-error"
                    className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={sending || !isValid}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 font-semibold text-white shadow transition-all duration-200 hover:from-blue-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:from-blue-500 disabled:hover:to-blue-600 relative overflow-hidden"
              whileHover={{ scale: sending || !isValid ? 1 : 1.02 }}
              whileTap={{ scale: sending || !isValid ? 1 : 0.98 }}
            >
              <AnimatePresence mode="wait">
                {sending ? (
                  <motion.div
                    key="sending"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing your message...
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Send Message
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <motion.div
            variants={fadeInUp}
            transition={transition}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <a
              href="https://linkedin.com/in/aliabbas6622"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/10 dark:text-slate-100 dark:hover:bg-slate-800/60"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.1c.5-1 1.7-2.1 3.5-2.1 3.8 0 4.5 2.5 4.5 5.7V24h-4v-6.5c0-1.6 0-3.7-2.3-3.7s-2.7 1.8-2.7 3.6V24h-4V8.5z"/></svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/aliabbas6622"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/10 dark:text-slate-100 dark:hover:bg-slate-800/60"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.14 8.96 7.49 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.01-2.05-3.05.66-3.69-1.3-3.69-1.3-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.46-2.43-.27-4.99-1.22-4.99-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.39.11-2.9 0 0 .92-.29 3.02 1.13.88-.24 1.82-.36 2.76-.36.93 0 1.88.12 2.76.36 2.1-1.42 3.02-1.13 3.02-1.13.6 1.51.22 2.62.11 2.9.7.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.16-5 5.43.39.33.74.98.74 1.98 0 1.43-.01 2.59-.01 2.95 0 .29.2.63.76.52 4.34-1.45 7.48-5.56 7.48-10.4C23.02 5.24 18.27.5 12 .5z"/></svg>
              GitHub
            </a>
          </motion.div>

          {/* Toast notifications */}
          <AnimatePresence>
            {toast.show && (
              <motion.div
                className={`absolute inset-x-0 -bottom-16 mx-auto w-max rounded-full px-4 py-2 text-sm font-semibold shadow-lg flex items-center gap-2 ${
                  toast.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="alert"
                aria-live="polite"
              >
                {toast.type === 'success' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
