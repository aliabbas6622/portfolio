import './index.css'
import { Footer } from './components/Footer'
import Background from './components/Background'
import BackToTop from './components/BackToTop'
import Dock from './components/Dock'
import Hero from './sections/Hero'
import Tech from './sections/Tech'
import About from './sections/About'
import AboutTabs from './sections/AboutTabs'
import Skills from './sections/Skills'
import Gallery from './sections/Gallery'
import Projects from './sections/Projects'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'
import Cursor from './components/Cursor'

function App() {
  return (
    <div className="font-sans">
      <Cursor />
      <Background />
      <Dock />
      <main>
        <Hero />
        <Tech />
        <About />
        <AboutTabs />
        <Skills />
        <Gallery />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
