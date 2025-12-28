import { useState } from 'react'
import { pluralizePT } from '../utils/propertyHelpers'
import { 
  getClientSession, 
  getClientByEmail, 
  saveClient, 
  authenticateClient, 
  setClientSession,
  saveProposal 
} from '../utils/storage'
import ClientRegistration from './ClientRegistration'
import ClientLogin from './ClientLogin'
import './PropertyDetails.css'

function PropertyDetails({ property, onClose }) {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('register') // 'register' or 'login'
  
  if (!property) return null

  const handleQuoteRequest = () => {
    // Check if client is already logged in
    const client = getClientSession()
    
    if (client) {
      // Client is logged in, create proposal directly
      handleCreateProposal(client)
    } else {
      // Show registration/login modal
      setShowAuth(true)
      setAuthMode('register')
    }
  }
  
  const handleCreateProposal = (client) => {
    try {
      const message = `Gostaria de realizar uma proposta para o ${property.type} localizado em ${property.location} (${property.price}).`
      
      const proposal = {
        clientId: client.id,
        propertyId: property.id,
        message: message,
        status: 'pending'
      }
      
      saveProposal(proposal)
      
      alert('Proposta enviada com sucesso! Você pode acompanhar suas propostas no seu painel.')
      
      setShowAuth(false)
      onClose()
    } catch (error) {
      alert('Erro ao enviar proposta: ' + error.message)
    }
  }
  
  const handleRegisterSuccess = (formData) => {
    try {
      // Check if client already exists
      const existingClient = getClientByEmail(formData.email)
      if (existingClient) {
        alert('Email já cadastrado. Por favor, faça login.')
        setAuthMode('login')
        return
      }
      
      // Create new client
      const newClient = saveClient(formData)
      setClientSession(newClient)
      
      // Create proposal
      handleCreateProposal(newClient)
    } catch (error) {
      alert('Erro ao criar conta: ' + error.message)
    }
  }
  
  const handleLoginSuccess = (credentials) => {
    try {
      const client = authenticateClient(credentials.email, credentials.password)
      setClientSession(client)
      
      // Create proposal
      handleCreateProposal(client)
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message)
    }
  }
  
  const handleCloseAuth = () => {
    setShowAuth(false)
  }
  
  const handleSwitchToLogin = () => {
    setAuthMode('login')
  }
  
  const handleSwitchToRegister = () => {
    setAuthMode('register')
  }

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('property-details-overlay')) {
      onClose()
    }
  }

  return (
    <div 
      className="property-details-overlay" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-details-title"
    >
      <div className="property-details-modal">
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Fechar detalhes do imóvel"
        >
          ×
        </button>

        <div className="property-details-content">
          {property.featured && (
            <span className="badge-details" aria-label="Propriedade em destaque">
              Destaque
            </span>
          )}

          <div className="property-details-image">
            <div className="placeholder-image-large">
              <span className="placeholder-icon-large">🏠</span>
            </div>
          </div>

          <div className="property-details-info">
            <div className="property-type-details">{property.type}</div>
            <h2 id="property-details-title" className="property-location-details">
              {property.location}
            </h2>
            
            {property.description && (
              <p className="property-description-details">
                {property.description}
              </p>
            )}

            <div className="property-specs">
              <h3 className="specs-title">Características</h3>
              <div className="specs-grid">
                {property.bedrooms > 0 && (
                  <div className="spec-item">
                    <span className="spec-icon" aria-hidden="true">🛏️</span>
                    <div>
                      <div className="spec-label">Quartos</div>
                      <div className="spec-value">{property.bedrooms} {pluralizePT(property.bedrooms, 'quarto')}</div>
                    </div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="spec-item">
                    <span className="spec-icon" aria-hidden="true">🚿</span>
                    <div>
                      <div className="spec-label">Banheiros</div>
                      <div className="spec-value">{property.bathrooms} {pluralizePT(property.bathrooms, 'banheiro')}</div>
                    </div>
                  </div>
                )}
                <div className="spec-item">
                  <span className="spec-icon" aria-hidden="true">📏</span>
                  <div>
                    <div className="spec-label">Área</div>
                    <div className="spec-value">{property.area}m²</div>
                  </div>
                </div>
                <div className="spec-item">
                  <span className="spec-icon" aria-hidden="true">📍</span>
                  <div>
                    <div className="spec-label">Status</div>
                    <div className="spec-value">Disponível</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="property-details-footer">
              <div className="property-price-details">
                <div className="price-label">Preço</div>
                <div className="price-value">{property.price}</div>
              </div>
              <button 
                className="btn-quote"
                onClick={handleQuoteRequest}
                aria-label="Efetuar proposta para este imóvel"
              >
                Efetuar Proposta
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showAuth && authMode === 'register' && (
        <ClientRegistration
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          onClose={handleCloseAuth}
        />
      )}
      
      {showAuth && authMode === 'login' && (
        <ClientLogin
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
          onClose={handleCloseAuth}
        />
      )}
    </div>
  )
}

export default PropertyDetails
