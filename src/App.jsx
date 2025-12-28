import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Properties from './components/Properties'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'
import ClientPortal from './components/ClientPortal'
import './App.css'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [showClientPortal, setShowClientPortal] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+K or Cmd+K to open admin panel
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowAdmin(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="app">
      <Header onOpenClientPortal={() => setShowClientPortal(true)} />
      <main>
        <Hero />
        <About />
        <Properties />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setShowAdmin(true)} />
      
      {showAdmin && <Admin onClose={() => setShowAdmin(false)} />}
      {showClientPortal && <ClientPortal onClose={() => setShowClientPortal(false)} />}
    </div>
  )
}

export default App
