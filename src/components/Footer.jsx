import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dernival Fontes</h3>
            <p>Imobiliária</p>
            <p className="footer-description">
              Sua imobiliária de confiança em Natal e RN. 
              Realizando sonhos e construindo histórias.
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
              <li>📍 Natal - RN</li>
              <li>📞 (84) 9999-9999</li>
              <li>📧 contato@dernivalfontes.com.br</li>
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
