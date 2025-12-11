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
            <h1>Dernival Fontes</h1>
            <p className="tagline">Imobiliária</p>
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
