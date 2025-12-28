import { useState, useEffect } from 'react'
import { 
  getClientSession, 
  clearClientSession, 
  saveClient,
  getProposalsByClient,
  getMessagesByClient,
  getProperties
} from '../utils/storage'
import './ClientPortal.css'

function ClientPortal({ onClose }) {
  const [client, setClient] = useState(null)
  const [activeTab, setActiveTab] = useState('proposals') // proposals, messages, profile
  const [proposals, setProposals] = useState([])
  const [messages, setMessages] = useState([])
  const [properties, setProperties] = useState([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedData, setEditedData] = useState({})
  const [updateMessage, setUpdateMessage] = useState('')

  useEffect(() => {
    loadClientData()
  }, [])

  const loadClientData = () => {
    const currentClient = getClientSession()
    if (!currentClient) {
      onClose()
      return
    }

    setClient(currentClient)
    setEditedData(currentClient)
    
    // Load proposals and messages
    const clientProposals = getProposalsByClient(currentClient.id)
    const clientMessages = getMessagesByClient(currentClient.id)
    const allProperties = getProperties()
    
    setProposals(clientProposals)
    setMessages(clientMessages)
    setProperties(allProperties)
  }

  const handleLogout = () => {
    clearClientSession()
    onClose()
  }

  const handleEditProfile = () => {
    setIsEditingProfile(true)
    setUpdateMessage('')
  }

  const handleCancelEdit = () => {
    setIsEditingProfile(false)
    setEditedData(client)
    setUpdateMessage('')
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    
    try {
      // Mark changes as pending approval
      const updatedClient = {
        ...client,
        pendingUpdate: {
          ...editedData,
          requestedAt: new Date().toISOString()
        }
      }
      
      saveClient(updatedClient)
      setClient(updatedClient)
      setIsEditingProfile(false)
      setUpdateMessage('Suas alterações foram enviadas para aprovação do administrador.')
    } catch (error) {
      alert('Erro ao salvar alterações: ' + error.message)
    }
  }

  const handleProfileChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getPropertyById = (propertyId) => {
    return properties.find(p => p.id === propertyId)
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return '-'
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Rejeitada'
    }
    return labels[status] || status
  }

  const getStatusClass = (status) => {
    return `status-badge status-${status}`
  }

  if (!client) {
    return null
  }

  return (
    <div className="client-portal-overlay">
      <div className="client-portal-container">
        <div className="client-portal-header">
          <div>
            <h2>Meu Painel</h2>
            <p className="client-welcome">Bem-vindo(a), {client.name}</p>
          </div>
          <div className="header-actions">
            <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
            <button className="close-btn" onClick={onClose} aria-label="Fechar painel">
              ✕
            </button>
          </div>
        </div>

        <div className="client-portal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            Propostas ({proposals.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Mensagens ({messages.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Meu Perfil
          </button>
        </div>

        <div className="client-portal-content">
          {activeTab === 'proposals' && (
            <div className="proposals-list">
              <h3>Minhas Propostas</h3>
              {proposals.length === 0 ? (
                <div className="empty-state">
                  <p>Você ainda não enviou nenhuma proposta.</p>
                </div>
              ) : (
                <div className="proposals-grid">
                  {proposals.map(proposal => {
                    const property = getPropertyById(proposal.propertyId)
                    return (
                      <div key={proposal.id} className="proposal-card">
                        <div className="proposal-header">
                          <span className={getStatusClass(proposal.status)}>
                            {getStatusLabel(proposal.status)}
                          </span>
                          <span className="proposal-date">
                            {formatDate(proposal.createdAt)}
                          </span>
                        </div>
                        {property && (
                          <div className="proposal-property">
                            <h4>{property.type}</h4>
                            <p className="property-location">{property.location}</p>
                            <p className="property-price">{property.price}</p>
                          </div>
                        )}
                        {proposal.message && (
                          <div className="proposal-message">
                            <strong>Mensagem:</strong>
                            <p>{proposal.message}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-list">
              <h3>Minhas Mensagens</h3>
              {messages.length === 0 ? (
                <div className="empty-state">
                  <p>Você ainda não enviou nenhuma mensagem.</p>
                </div>
              ) : (
                <div className="messages-grid">
                  {messages.map(message => (
                    <div key={message.id} className="message-card">
                      <div className="message-header">
                        <span className="message-date">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <div className="message-content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-header">
                <h3>Meus Dados</h3>
                {!isEditingProfile && (
                  <button className="btn-edit" onClick={handleEditProfile}>
                    Editar Dados
                  </button>
                )}
              </div>

              {client.pendingUpdate && (
                <div className="pending-update-notice">
                  <strong>⏳ Atualização Pendente</strong>
                  <p>Você tem alterações aguardando aprovação do administrador.</p>
                </div>
              )}

              {updateMessage && (
                <div className="update-message">
                  {updateMessage}
                </div>
              )}

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      value={editedData.name || ''}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      value={editedData.email || ''}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={editedData.phone || ''}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-save">
                      Solicitar Atualização
                    </button>
                  </div>

                  <p className="form-note">
                    <small>* As alterações precisam ser aprovadas pelo administrador antes de serem aplicadas.</small>
                  </p>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Nome:</span>
                    <span className="info-value">{client.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{client.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Telefone:</span>
                    <span className="info-value">{client.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Cadastrado em:</span>
                    <span className="info-value">{formatDate(client.createdAt)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientPortal
