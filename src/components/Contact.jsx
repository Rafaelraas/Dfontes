import { useState } from 'react'
import { getClientSession, saveMessage } from '../utils/storage'
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
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um email válido.')
      return
    }

    // Phone validation (basic Brazilian format)
    const phoneRegex = /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      alert('Por favor, insira um telefone válido no formato (84) 99999-9999.')
      return
    }

    // Check if client is logged in
    const client = getClientSession()
    
    // Save message
    try {
      const message = {
        clientId: client ? client.id : null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }
      
      saveMessage(message)
      
      alert('Obrigado pelo contato! Em breve retornaremos.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.')
      console.error('Error saving message:', error)
    }
  }

  return (
    <section id="contato" className="contact section" aria-label="Seção de contato">
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
            <div className="info-items" role="list">
              <div className="info-item" role="listitem">
                <div className="info-icon" aria-hidden="true">📍</div>
                <div>
                  <strong>Localização</strong>
                  <p>Rua Poço Branco, 33 - Parnamirim/RN</p>
                  <p className="coverage">CEP: 59152-280</p>
                  <p className="coverage">Atendemos Natal e toda Grande Natal</p>
                </div>
              </div>

              <div className="info-item" role="listitem">
                <div className="info-icon" aria-hidden="true">📞</div>
                <div>
                  <strong>Telefone</strong>
                  <p><a href="tel:+558499999999" aria-label="Ligar para (84) 9999-9999">(84) 9999-9999</a></p>
                </div>
              </div>

              <div className="info-item" role="listitem">
                <div className="info-icon" aria-hidden="true">📧</div>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:contato@dernivalfontes.com.br" aria-label="Enviar email para contato@dernivalfontes.com.br">contato@dernivalfontes.com.br</a></p>
                </div>
              </div>

              <div className="info-item" role="listitem">
                <div className="info-icon" aria-hidden="true">🕒</div>
                <div>
                  <strong>Horário</strong>
                  <p>Seg - Sex: 8h às 18h</p>
                  <p>Sábado: 8h às 12h</p>
                </div>
              </div>

              <div className="info-item" role="listitem">
                <div className="info-icon" aria-hidden="true">🏛️</div>
                <div>
                  <strong>CRECI</strong>
                  <p>6359 - 17° REGIÃO (RN)</p>
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

          <form className="contact-form" onSubmit={handleSubmit} aria-label="Formulário de contato">
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
                aria-required="true"
                aria-describedby="name-help"
              />
              <span id="name-help" className="sr-only">Digite seu nome completo</span>
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
                aria-required="true"
                aria-describedby="email-help"
              />
              <span id="email-help" className="sr-only">Digite seu endereço de email</span>
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
                aria-required="true"
                aria-describedby="phone-help"
              />
              <span id="phone-help" className="sr-only">Digite seu telefone com DDD</span>
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
                placeholder="Como podemos ajudá-lo? Descreva o imóvel que você procura."
                aria-required="true"
                aria-describedby="message-help"
              ></textarea>
              <span id="message-help" className="sr-only">Descreva suas necessidades ou dúvidas</span>
            </div>

            <button type="submit" className="btn btn-primary" aria-label="Enviar formulário de contato">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
