import { useState } from 'react'
import './ClientRegistration.css'

function ClientRegistration({ onRegisterSuccess, onSwitchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate fields
      if (!formData.name.trim()) {
        throw new Error('Por favor, preencha seu nome completo')
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Por favor, insira um email válido')
      }

      if (!validatePhone(formData.phone)) {
        throw new Error('Por favor, insira um telefone válido no formato (84) 99999-9999')
      }

      if (formData.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem')
      }

      // Call parent success handler
      if (onRegisterSuccess) {
        onRegisterSuccess({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="client-auth-overlay">
      <div className="client-auth-container">
        <div className="client-auth-header">
          <h2>Criar Conta</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Fechar formulário de cadastro"
          >
            ✕
          </button>
        </div>

        <p className="client-auth-description">
          Crie sua conta para enviar propostas e acompanhar seu histórico
        </p>

        <form onSubmit={handleSubmit} className="client-auth-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
              disabled={isLoading}
              aria-required="true"
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
              placeholder="seu@email.com"
              required
              disabled={isLoading}
              aria-required="true"
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
              placeholder="(84) 99999-9999"
              required
              disabled={isLoading}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              minLength="6"
              disabled={isLoading}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              required
              minLength="6"
              disabled={isLoading}
              aria-required="true"
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-auth"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="client-auth-footer">
          <p>
            Já tem uma conta?{' '}
            <button 
              className="link-btn" 
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClientRegistration
