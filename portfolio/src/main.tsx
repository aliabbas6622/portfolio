import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider'
import Loader from './components/Loader'

// Force initial scroll to top when no hash is present
if (typeof window !== 'undefined') {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    // Clean any stray history state that might preserve scroll
    history.replaceState({}, document.title, window.location.pathname)
  }
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0))
}

function Root() {
  const [loaded, setLoaded] = useState(false)

  return (
    <React.StrictMode>
      <ThemeProvider>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
        <App />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
