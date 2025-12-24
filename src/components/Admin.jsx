import { useState } from 'react'
import PropertyManager from './PropertyManager'
import ClientManager from './ClientManager'
import './Admin.css'

function Admin({ onClose }) {
  const [activeTab, setActiveTab] = useState('properties')

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h1>Painel Administrativo</h1>
          <button className="close-btn" onClick={onClose} aria-label="Fechar painel">
            ✕
          </button>
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
