import { useState, useEffect } from 'react'
import { getClients, saveClient, deleteClient } from '../utils/storage'

function ClientManager() {
  const [clients, setClients] = useState([])
  const [editingClient, setEditingClient] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = () => {
    setClients(getClients())
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

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteClient(id)
      loadClients()
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    try {
      saveClient(editingClient)
      setShowForm(false)
      setEditingClient(null)
      loadClients()
    } catch (error) {
      alert('Erro ao salvar cliente: ' + error.message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingClient(null)
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
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email || '-'}</td>
                  <td>{client.phone || '-'}</td>
                  <td>{client.city || '-'}</td>
                  <td>{formatDate(client.createdAt)}</td>
                  <td>
                    <div className="table-actions">
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
    </div>
  )
}

export default ClientManager
