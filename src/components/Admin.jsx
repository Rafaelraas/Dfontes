import { useState, useEffect } from 'react'
import PropertyManager from './PropertyManager'
import ClientManager from './ClientManager'
import Login from './Login'
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth'
import './Admin.css'

function Admin({ onClose }) {
  const [activeTab, setActiveTab] = useState('properties')
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check authentication status on mount
    const user = getCurrentUser()
    if (user) {
      setAuthenticated(true)
      setCurrentUser(user)
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    setCurrentUser(null)
  }

  // If not authenticated, show login form
  if (!authenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} onClose={onClose} />
  }

  // If authenticated, show admin panel
  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <div>
            <h1>Painel Administrativo</h1>
            {currentUser && (
              <p className="admin-user-info">
                Olá, {currentUser.name} ({currentUser.email})
              </p>
            )}
          </div>
          <div className="admin-header-actions">
            <button 
              className="btn-logout" 
              onClick={handleLogout}
              aria-label="Sair do painel"
              title="Sair"
            >
              🚪 Sair
            </button>
            <button className="close-btn" onClick={onClose} aria-label="Fechar painel">
              ✕
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Imóveis
          </button>
          <button 
            className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            Clientes
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'properties' && <PropertyManager />}
          {activeTab === 'clients' && <ClientManager />}
        </div>
      </div>
    </div>
  )
}

export default Admin
