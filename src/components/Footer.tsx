export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-300 py-6 dark:border-slate-700">
      <div className="container flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>© {year} Ali Abbas</span>
        <a href="#top" className="hover:text-primary">Back to top</a>
      </div>
    </footer>
  )
}
