import { useState, useEffect } from 'react'
import { getClients, saveClient, deleteClient, getProposals, getProperties } from '../utils/storage'

function ClientManager() {
  const [clients, setClients] = useState([])
  const [proposals, setProposals] = useState([])
  const [properties, setProperties] = useState([])
  const [editingClient, setEditingClient] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [viewingClient, setViewingClient] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setClients(getClients())
    setProposals(getProposals())
    setProperties(getProperties())
  }

  const handleAdd = () => {
    setEditingClient({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      address: '',
      city: '',
      state: 'RN',
      interests: '',
      notes: ''
    })
    setShowForm(true)
  }

  const handleEdit = (client) => {
    setEditingClient({ ...client })
    setShowForm(true)
  }
  
  const handleViewDetails = (client) => {
    setViewingClient(client)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteClient(id)
      loadData()
    }
  }
  
  const handleApprovePendingUpdate = (client) => {
    if (!client.pendingUpdate) return
    
    if (window.confirm('Deseja aprovar as alterações solicitadas pelo cliente?')) {
      const updatedClient = {
        ...client,
        ...client.pendingUpdate,
        pendingUpdate: null
      }
      saveClient(updatedClient)
      loadData()
      alert('Alterações aprovadas com sucesso!')
    }
  }
  
  const handleRejectPendingUpdate = (client) => {
    if (!client.pendingUpdate) return
    
    if (window.confirm('Deseja rejeitar as alterações solicitadas pelo cliente?')) {
      const updatedClient = {
        ...client,
        pendingUpdate: null
      }
      saveClient(updatedClient)
      loadData()
      alert('Alterações rejeitadas.')
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    try {
      saveClient(editingClient)
      setShowForm(false)
      setEditingClient(null)
      loadData()
    } catch (error) {
      alert('Erro ao salvar cliente: ' + error.message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingClient(null)
  }
  
  const handleCloseDetails = () => {
    setViewingClient(null)
  }

  const handleChange = (field, value) => {
    setEditingClient(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return '-'
    return new Date(isoDate).toLocaleDateString('pt-BR')
  }
  
  const getClientProposals = (clientId) => {
    return proposals.filter(p => p.clientId === clientId)
  }
  
  const getPropertyById = (propertyId) => {
    return properties.find(p => p.id === propertyId)
  }
  
  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Rejeitada'
    }
    return labels[status] || status
  }

  return (
    <div className="client-manager">
      <div className="manager-header">
        <h2>Gerenciar Clientes</h2>
        <button className="btn-add" onClick={handleAdd}>
          + Adicionar Cliente
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum cliente cadastrado</h3>
          <p>Clique em "Adicionar Cliente" para começar</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className={client.pendingUpdate ? 'has-pending-update' : ''}>
                  <td>
                    {client.name}
                    {client.pendingUpdate && <span className="pending-badge">⏳</span>}
                  </td>
                  <td>{client.email || '-'}</td>
                  <td>{client.phone || '-'}</td>
                  <td>{client.city || '-'}</td>
                  <td>{formatDate(client.createdAt)}</td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-icon view" 
                        onClick={() => handleViewDetails(client)}
                        aria-label="Ver detalhes"
                        title="Ver detalhes"
                      >
                        👁️
                      </button>
                      {client.pendingUpdate && (
                        <>
                          <button 
                            className="btn-icon approve" 
                            onClick={() => handleApprovePendingUpdate(client)}
                            aria-label="Aprovar alterações"
                            title="Aprovar alterações"
                          >
                            ✅
                          </button>
                          <button 
                            className="btn-icon reject" 
                            onClick={() => handleRejectPendingUpdate(client)}
                            aria-label="Rejeitar alterações"
                            title="Rejeitar alterações"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      <button 
                        className="btn-icon edit" 
                        onClick={() => handleEdit(client)}
                        aria-label="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDelete(client.id)}
                        aria-label="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && handleCancel()}>
          <div className="form-container">
            <div className="form-header">
              <h3>{editingClient.id ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              <button className="close-btn" onClick={handleCancel}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input 
                  id="name"
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ex: João da Silva"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input 
                    id="phone"
                    type="tel"
                    value={editingClient.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(84) 99999-9999"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input 
                  id="cpf"
                  type="text"
                  value={editingClient.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Endereço</label>
                <input 
                  id="address"
                  type="text"
                  value={editingClient.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Cidade</label>
                  <input 
                    id="city"
                    type="text"
                    value={editingClient.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Natal"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">Estado</label>
                  <select 
                    id="state"
                    value={editingClient.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  >
                    <option value="RN">RN</option>
                    <option value="PB">PB</option>
                    <option value="CE">CE</option>
                    <option value="PE">PE</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="interests">Interesses</label>
                <input 
                  id="interests"
                  type="text"
                  value={editingClient.interests}
                  onChange={(e) => handleChange('interests', e.target.value)}
                  placeholder="Ex: Apartamento 3 quartos, Ponta Negra"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Observações</label>
                <textarea 
                  id="notes"
                  value={editingClient.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Anotações sobre o cliente..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {viewingClient && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && handleCloseDetails()}>
          <div className="form-container client-details-modal">
            <div className="form-header">
              <h3>Detalhes do Cliente</h3>
              <button className="close-btn" onClick={handleCloseDetails}>✕</button>
            </div>

            <div className="client-details-content">
              <div className="details-section">
                <h4>Informações Pessoais</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingClient.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{viewingClient.email || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Telefone:</span>
                    <span className="value">{viewingClient.phone || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CPF:</span>
                    <span className="value">{viewingClient.cpf || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cidade:</span>
                    <span className="value">{viewingClient.city || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cadastrado em:</span>
                    <span className="value">{formatDate(viewingClient.createdAt)}</span>
                  </div>
                </div>
              </div>

              {viewingClient.pendingUpdate && (
                <div className="details-section pending-section">
                  <h4>Alterações Pendentes</h4>
                  <div className="pending-changes">
                    {viewingClient.pendingUpdate.name !== viewingClient.name && (
                      <div className="change-item">
                        <span className="change-label">Nome:</span>
                        <span className="change-old">{viewingClient.name}</span>
                        <span className="change-arrow">→</span>
                        <span className="change-new">{viewingClient.pendingUpdate.name}</span>
                      </div>
                    )}
                    {viewingClient.pendingUpdate.email !== viewingClient.email && (
                      <div className="change-item">
                        <span className="change-label">Email:</span>
                        <span className="change-old">{viewingClient.email}</span>
                        <span className="change-arrow">→</span>
                        <span className="change-new">{viewingClient.pendingUpdate.email}</span>
                      </div>
                    )}
                    {viewingClient.pendingUpdate.phone !== viewingClient.phone && (
                      <div className="change-item">
                        <span className="change-label">Telefone:</span>
                        <span className="change-old">{viewingClient.phone}</span>
                        <span className="change-arrow">→</span>
                        <span className="change-new">{viewingClient.pendingUpdate.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="pending-actions">
                    <button 
                      className="btn-approve" 
                      onClick={() => {
                        handleApprovePendingUpdate(viewingClient)
                        handleCloseDetails()
                      }}
                    >
                      ✅ Aprovar Alterações
                    </button>
                    <button 
                      className="btn-reject" 
                      onClick={() => {
                        handleRejectPendingUpdate(viewingClient)
                        handleCloseDetails()
                      }}
                    >
                      ❌ Rejeitar Alterações
                    </button>
                  </div>
                </div>
              )}

              <div className="details-section">
                <h4>Propostas ({getClientProposals(viewingClient.id).length})</h4>
                {getClientProposals(viewingClient.id).length === 0 ? (
                  <p className="no-data">Nenhuma proposta enviada</p>
                ) : (
                  <div className="proposals-list">
                    {getClientProposals(viewingClient.id).map(proposal => {
                      const property = getPropertyById(proposal.propertyId)
                      return (
                        <div key={proposal.id} className="proposal-item">
                          <div className="proposal-status">
                            <span className={`status-badge status-${proposal.status}`}>
                              {getStatusLabel(proposal.status)}
                            </span>
                            <span className="proposal-date">{formatDate(proposal.createdAt)}</span>
                          </div>
                          {property && (
                            <div className="proposal-property">
                              <strong>{property.type}</strong> - {property.location}
                              <div className="property-price">{property.price}</div>
                            </div>
                          )}
                          {proposal.message && (
                            <div className="proposal-message">
                              <em>{proposal.message}</em>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientManager
