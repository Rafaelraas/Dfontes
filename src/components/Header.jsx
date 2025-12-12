import { useState } from 'react'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2E5C8A', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
                <path d="M 30 60 L 30 45 L 40 35 L 50 45 L 60 35 L 70 45 L 70 60 L 60 60 L 60 50 L 50 55 L 40 50 L 40 60 Z" fill="white" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Dernival Fontes</h1>
              <p className="tagline">Consultoria de Imóveis</p>
            </div>
          </div>
          
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <a onClick={() => scrollToSection('inicio')}>Início</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('sobre')}>Sobre</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('imoveis')}>Imóveis</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('contato')}>Contato</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
