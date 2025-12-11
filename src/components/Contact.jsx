import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder for form submission
    alert('Obrigado pelo contato! Em breve retornaremos.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contato" className="contact section">
      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle">
            Estamos prontos para ajudar você a encontrar o imóvel ideal
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Fale Conosco</h3>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <strong>Localização</strong>
                  <p>Natal - Rio Grande do Norte</p>
                  <p className="coverage">Atendemos Natal e toda Grande Natal</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <strong>Telefone</strong>
                  <p>(84) 9999-9999</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <strong>Email</strong>
                  <p>contato@dernivalfontes.com.br</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🕒</div>
                <div>
                  <strong>Horário</strong>
                  <p>Seg - Sex: 8h às 18h</p>
                  <p>Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>

            <div className="coverage-area">
              <h4>Áreas de Atuação</h4>
              <ul>
                <li>Natal</li>
                <li>Parnamirim</li>
                <li>São Gonçalo do Amarante</li>
                <li>Macaíba</li>
                <li>Extremoz</li>
                <li>Todo o Estado do RN</li>
              </ul>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(84) 99999-9999"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Como podemos ajudá-lo?"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
