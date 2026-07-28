import { useEffect, useMemo } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChainRail, { BLOCKS } from './components/ChainRail'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const sectionIds = useMemo(() => BLOCKS.map((b) => b.id), [])
  const activeId = useActiveSection(sectionIds)
  useScrollReveal()

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || ''
    fetch(`${apiBase}/api/analytics/track?isResume=false`, {
      method: 'POST'
    }).catch(() => {
      // fail silently
    })
  }, [])

  return (
    <div className="grain relative min-h-screen">
      <div className="blob-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>
      <Nav />
      <ChainRail activeId={activeId} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
