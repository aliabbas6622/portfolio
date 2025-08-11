import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Force initial scroll to top when no hash is present
if (typeof window !== 'undefined') {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    // Clean any stray history state that might preserve scroll
    history.replaceState({}, document.title, window.location.pathname)
  }
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
