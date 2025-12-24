import { useState } from 'react'
import { login, validateEmail } from '../utils/auth'
import './Login.css'

function Login({ onLoginSuccess, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Por favor, insira um email válido')
      }

      // Attempt login
      const user = login(email, password)
      
      // Success
      if (onLoginSuccess) {
        onLoginSuccess(user)
      }
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>Acesso ao Painel Administrativo</h2>
          <button 
            className="close-btn" 
            onClick={handleClose} 
            aria-label="Fechar formulário de login"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              disabled={isLoading}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
              disabled={isLoading}
              aria-required="true"
              minLength="6"
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-info">
            <p>🔐 Área restrita para administradores</p>
            <p className="login-help">
              <small>Use suas credenciais de administrador para acessar o sistema</small>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
