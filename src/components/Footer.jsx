import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dernival Fontes</h3>
            <p>Consultoria de Imóveis</p>
            <p className="footer-description">
              🏠 VENDA | LOCAÇÃO | ADMINISTRAÇÃO DE IMÓVEIS
            </p>
            <p className="footer-creci">
              📊 CRECI RN: 6359 - 17° REGIÃO
            </p>
          </div>

          <div className="footer-section">
            <h4>Navegação</h4>
            <ul>
              <li>
                <a onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}>
                  Início
                </a>
              </li>
              <li>
                <a onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
                  Sobre
                </a>
              </li>
              <li>
                <a onClick={() => document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' })}>
                  Imóveis
                </a>
              </li>
              <li>
                <a onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul>
              <li>📍 Rua Poço Branco, 33</li>
              <li>Nova Parnamirim, Parnamirim</li>
              <li>Rio Grande do Norte</li>
              <li>CEP: 59152-280</li>
              <li>🔗 <a href="https://linktr.ee/DernivalFontes" target="_blank" rel="noopener noreferrer">linktr.ee/DernivalFontes</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Áreas de Atuação</h4>
            <ul>
              <li>Natal</li>
              <li>Grande Natal</li>
              <li>Rio Grande do Norte</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Imobiliária Dernival Fontes. Todos os direitos reservados.</p>
          <p className="footer-dev">
            Desenvolvido com ❤️ para facilitar seus negócios imobiliários
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
