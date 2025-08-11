import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, transition } from '../lib/animations'
import { Github, Linkedin } from 'lucide-react'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = encodeURIComponent(String(data.get('name') || ''))
    const email = encodeURIComponent(String(data.get('email') || ''))
    const message = encodeURIComponent(String(data.get('message') || ''))
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

    setSending(false)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
    form.reset()
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
            <h2 className="section-title">Let’s build something great</h2>
            <p className="muted mt-2">I'm open to new opportunities and collaborations</p>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            transition={transition}
            onSubmit={onSubmit}
            className="grid gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="name"
                  className="rounded-xl border border-white/20 bg-white/5 px-3 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-200/50 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-400/30"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="rounded-xl border border-white/20 bg-white/5 px-3 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-200/50 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-400/30"
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                className="min-h-[140px] rounded-xl border border-white/20 bg-white/5 px-3 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-200/50 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-400/30"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 font-semibold text-white shadow transition hover:from-blue-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? 'Preparing…' : 'Send'}
            </button>
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

          {toast && (
            <div className="pointer-events-none absolute inset-x-0 -bottom-10 mx-auto w-max rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow dark:bg-white dark:text-slate-900">Opening email…</div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
