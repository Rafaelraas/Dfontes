import { useState, useEffect } from 'react'
import { getProperties, saveProperty, deleteProperty } from '../utils/storage'

function PropertyManager() {
  const [properties, setProperties] = useState([])
  const [editingProperty, setEditingProperty] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = () => {
    setProperties(getProperties())
  }

  const handleAdd = () => {
    setEditingProperty({
      type: 'Apartamento',
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      price: '',
      featured: false,
      status: 'available',
      description: ''
    })
    setShowForm(true)
  }

  const handleEdit = (property) => {
    setEditingProperty({ ...property })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      deleteProperty(id)
      loadProperties()
      // Notify other components that properties were updated
      window.dispatchEvent(new Event('propertiesUpdated'))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    try {
      saveProperty(editingProperty)
      setShowForm(false)
      setEditingProperty(null)
      loadProperties()
      // Notify other components that properties were updated
      window.dispatchEvent(new Event('propertiesUpdated'))
    } catch (error) {
      alert('Erro ao salvar imóvel: ' + error.message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleChange = (field, value) => {
    setEditingProperty(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="property-manager">
      <div className="manager-header">
        <h2>Gerenciar Imóveis</h2>
        <button className="btn-add" onClick={handleAdd}>
          + Adicionar Imóvel
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum imóvel cadastrado</h3>
          <p>Clique em "Adicionar Imóvel" para começar</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Localização</th>
                <th>Quartos</th>
                <th>Área</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => (
                <tr key={property.id}>
                  <td>
                    {property.type}
                    {property.featured && <span className="badge featured"> Destaque</span>}
                  </td>
                  <td>{property.location}</td>
                  <td>{property.bedrooms > 0 ? property.bedrooms : '-'}</td>
                  <td>{property.area}m²</td>
                  <td>{property.price}</td>
                  <td>
                    <span className={`badge ${property.status}`}>
                      {property.status === 'available' ? 'Disponível' : 'Vendido'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-icon edit" 
                        onClick={() => handleEdit(property)}
                        aria-label="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDelete(property.id)}
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
              <h3>{editingProperty.id ? 'Editar Imóvel' : 'Novo Imóvel'}</h3>
              <button className="close-btn" onClick={handleCancel}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="type">Tipo *</label>
                <select 
                  id="type"
                  value={editingProperty.type} 
                  onChange={(e) => handleChange('type', e.target.value)}
                  required
                >
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Localização *</label>
                <input 
                  id="location"
                  type="text"
                  value={editingProperty.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Ex: Ponta Negra - Natal/RN"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bedrooms">Quartos</label>
                  <input 
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={editingProperty.bedrooms}
                    onChange={(e) => handleChange('bedrooms', Number(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bathrooms">Banheiros</label>
                  <input 
                    id="bathrooms"
                    type="number"
                    min="0"
                    value={editingProperty.bathrooms}
                    onChange={(e) => handleChange('bathrooms', Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="area">Área (m²) *</label>
                  <input 
                    id="area"
                    type="number"
                    min="0"
                    value={editingProperty.area}
                    onChange={(e) => handleChange('area', Number(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Preço *</label>
                  <input 
                    id="price"
                    type="text"
                    value={editingProperty.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="Ex: R$ 450.000"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea 
                  id="description"
                  value={editingProperty.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Descreva o imóvel..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select 
                    id="status"
                    value={editingProperty.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    required
                  >
                    <option value="available">Disponível</option>
                    <option value="sold">Vendido</option>
                  </select>
                </div>

                <div className="form-group checkbox">
                  <input 
                    id="featured"
                    type="checkbox"
                    checked={editingProperty.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                  />
                  <label htmlFor="featured">Imóvel em Destaque</label>
                </div>
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

export default PropertyManager
