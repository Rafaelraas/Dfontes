import './Hero.css'

function Hero() {
  const scrollToProperties = () => {
    const element = document.getElementById('imoveis')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">
          Encontre o Imóvel dos Seus Sonhos
        </h1>
        <p className="hero-subtitle">
          Especialistas em imóveis na Grande Natal e todo Rio Grande do Norte
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={scrollToProperties}>
            Ver Imóveis
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Fale Conosco
          </button>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <div className="feature-icon">📍</div>
            <p>Natal e RN</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🏠</div>
            <p>Venda e Aluguel</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <p>Atendimento Personalizado</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
