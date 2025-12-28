import { useState } from 'react'
import './ClientRegistration.css'

function ClientLogin({ onLoginSuccess, onSwitchToRegister, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate fields
      if (!validateEmail(formData.email)) {
        throw new Error('Por favor, insira um email válido')
      }

      if (!formData.password) {
        throw new Error('Por favor, digite sua senha')
      }

      // Call parent success handler
      if (onLoginSuccess) {
        onLoginSuccess({
          email: formData.email,
          password: formData.password
        })
      }
      
      // Reset loading state after successful login
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="client-auth-overlay">
      <div className="client-auth-container">
        <div className="client-auth-header">
          <h2>Entrar na Conta</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Fechar formulário de login"
          >
            ✕
          </button>
        </div>

        <p className="client-auth-description">
          Entre com suas credenciais para acessar suas propostas
        </p>

        <form onSubmit={handleSubmit} className="client-auth-form">
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
              autoComplete="email"
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
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
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
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="client-auth-footer">
          <p>
            Não tem uma conta?{' '}
            <button 
              className="link-btn" 
              onClick={onSwitchToRegister}
              disabled={isLoading}
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClientLogin
