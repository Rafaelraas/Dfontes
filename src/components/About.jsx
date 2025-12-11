import './About.css'

function About() {
  return (
    <section id="sobre" className="about section">
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">Sobre Nós</h2>
          <p className="section-subtitle">
            Sua imobiliária de confiança em Natal e RN
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              A <strong>Imobiliária Dernival Fontes</strong> atua há anos no mercado 
              imobiliário da Grande Natal e em todo o estado do Rio Grande do Norte, 
              oferecendo soluções completas para compra, venda e locação de imóveis.
            </p>
            <p className="about-description">
              Nossa missão é facilitar a realização do sonho da casa própria e 
              proporcionar os melhores negócios imobiliários para nossos clientes, 
              com transparência, profissionalismo e atendimento personalizado.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">🎯</div>
                <h3>Missão</h3>
                <p>Conectar pessoas aos seus imóveis ideais com excelência e transparência</p>
              </div>
              
              <div className="highlight-card">
                <div className="highlight-icon">👁️</div>
                <h3>Visão</h3>
                <p>Ser referência no mercado imobiliário de Natal e RN</p>
              </div>
              
              <div className="highlight-card">
                <div className="highlight-icon">💎</div>
                <h3>Valores</h3>
                <p>Integridade, compromisso e satisfação do cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
